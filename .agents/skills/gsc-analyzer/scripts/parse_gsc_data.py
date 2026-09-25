#!/usr/bin/env python3
"""
Parse Google Search Console zip export files or CSV directories.
Extracts and normalizes data from GSC Performance reports.
Supports brand term classification and filtering.
"""

import zipfile
import csv
import json
import sys
import os
import re
from io import TextIOWrapper
from pathlib import Path


def parse_gsc_zip(zip_path: str, output_dir: str = None) -> dict:
    """
    Parse a Google Search Console zip export file.

    Args:
        zip_path: Path to the GSC zip file
        output_dir: Optional directory to write JSON output files

    Returns:
        Dictionary containing parsed data from all CSVs in the zip
    """
    results = {
        "queries": [],
        "pages": [],
        "countries": [],
        "devices": [],
        "dates": [],
        "search_appearance": [],
        "metadata": {
            "source_file": zip_path,
            "files_found": []
        }
    }

    with zipfile.ZipFile(zip_path, 'r') as zf:
        for filename in zf.namelist():
            if not filename.endswith('.csv'):
                continue

            results["metadata"]["files_found"].append(filename)
            lower_name = filename.lower()

            with zf.open(filename) as f:
                reader = csv.DictReader(TextIOWrapper(f, encoding='utf-8-sig'))
                rows = list(reader)

                # Normalize the data based on file type
                normalized = [normalize_row(row) for row in rows]
                categorize_data(results, lower_name, normalized)

    # Calculate summary statistics
    results["summary"] = calculate_summary(results)

    # Write output files if directory specified
    if output_dir:
        write_output_files(results, output_dir)

    return results


def parse_gsc_directory(dir_path: str, output_dir: str = None) -> dict:
    """
    Parse GSC data from a directory of CSV files (unzipped export).

    Args:
        dir_path: Path to directory containing GSC CSV files
        output_dir: Optional directory to write JSON output files

    Returns:
        Dictionary containing parsed data from all CSVs
    """
    results = {
        "queries": [],
        "pages": [],
        "countries": [],
        "devices": [],
        "dates": [],
        "search_appearance": [],
        "metadata": {
            "source_file": dir_path,
            "files_found": []
        }
    }

    dir_path = Path(dir_path)
    for csv_file in dir_path.glob("*.csv"):
        results["metadata"]["files_found"].append(csv_file.name)
        lower_name = csv_file.name.lower()

        with open(csv_file, 'r', encoding='utf-8-sig') as f:
            reader = csv.DictReader(f)
            rows = list(reader)
            normalized = [normalize_row(row) for row in rows]
            categorize_data(results, lower_name, normalized)

    # Calculate summary statistics
    results["summary"] = calculate_summary(results)

    # Write output files if directory specified
    if output_dir:
        write_output_files(results, output_dir)

    return results


def categorize_data(results: dict, filename: str, normalized: list):
    """Categorize normalized data into appropriate result category."""
    lower_name = filename.lower()

    if 'queries' in lower_name or 'query' in lower_name:
        results["queries"] = normalized
    elif 'pages' in lower_name or 'page' in lower_name:
        results["pages"] = normalized
    elif 'countries' in lower_name or 'country' in lower_name:
        results["countries"] = normalized
    elif 'devices' in lower_name or 'device' in lower_name:
        results["devices"] = normalized
    elif 'dates' in lower_name or 'date' in lower_name or 'chart' in lower_name:
        results["dates"] = normalized
    elif 'search' in lower_name and 'appearance' in lower_name:
        results["search_appearance"] = normalized
    else:
        # Try to categorize by column names
        if normalized and 'query' in normalized[0]:
            results["queries"] = normalized
        elif normalized and 'page' in normalized[0]:
            results["pages"] = normalized


def normalize_row(row: dict) -> dict:
    """Normalize GSC CSV row with consistent field names and types."""
    normalized = {}

    for key, value in row.items():
        # Normalize key names (handle various GSC export formats)
        clean_key = key.lower().strip()
        clean_key = clean_key.replace(' ', '_')
        clean_key = clean_key.replace('top_', '')  # "Top queries" -> "queries"

        # Map common variations
        key_mapping = {
            'clicks': 'clicks',
            'impressions': 'impressions',
            'ctr': 'ctr',
            'position': 'position',
            'average_position': 'position',
            'avg_position': 'position',
            'query': 'query',
            'queries': 'query',
            'page': 'page',
            'pages': 'page',
            'url': 'page',
            'country': 'country',
            'device': 'device',
            'date': 'date'
        }

        final_key = key_mapping.get(clean_key, clean_key)

        # Convert numeric fields
        if final_key in ['clicks', 'impressions']:
            try:
                normalized[final_key] = int(value.replace(',', '')) if value else 0
            except (ValueError, AttributeError):
                normalized[final_key] = int(value) if value else 0
        elif final_key in ['ctr']:
            try:
                # Handle percentage format (e.g., "5.2%" or "0.052")
                if isinstance(value, str) and '%' in value:
                    normalized[final_key] = float(value.replace('%', '').replace(',', '')) / 100
                else:
                    val = float(value) if value else 0
                    # If value > 1, assume it's a percentage needing division
                    normalized[final_key] = val / 100 if val > 1 else val
            except (ValueError, AttributeError):
                normalized[final_key] = 0.0
        elif final_key in ['position']:
            try:
                normalized[final_key] = float(value.replace(',', '')) if value else 0
            except (ValueError, AttributeError):
                normalized[final_key] = float(value) if value else 0
        else:
            normalized[final_key] = value

    return normalized


def detect_brand_terms(queries: list, brand_hints: list = None) -> dict:
    """
    Auto-detect potential brand terms from query data.

    Args:
        queries: List of query dicts with 'query' field
        brand_hints: Optional list of known brand terms/patterns

    Returns:
        Dict with 'likely_brand', 'uncertain', 'likely_nonbrand' lists
    """
    if not queries:
        return {"likely_brand": [], "uncertain": [], "likely_nonbrand": []}

    # Get top queries by clicks (likely includes brand terms)
    sorted_queries = sorted(queries, key=lambda x: x.get('clicks', 0), reverse=True)
    top_queries = [q.get('query', '') for q in sorted_queries[:50]]

    # Find potential brand patterns from high-CTR, position 1-2 queries
    brand_candidates = []
    for q in queries:
        query_text = q.get('query', '')
        ctr = q.get('ctr', 0)
        pos = q.get('position', 100)
        clicks = q.get('clicks', 0)

        # High CTR + top position + significant clicks = likely brand
        if ctr > 0.25 and pos < 2.5 and clicks > 100:
            brand_candidates.append(query_text)

    # Extract common root terms from brand candidates
    brand_roots = set()
    for term in brand_candidates[:20]:
        words = term.lower().split()
        for word in words:
            if len(word) > 2 and word not in ['the', 'and', 'for', 'with', 'how', 'what', 'login', 'free']:
                brand_roots.add(word)

    # Add any provided brand hints
    if brand_hints:
        for hint in brand_hints:
            brand_roots.add(hint.lower())

    # Classify all queries
    likely_brand = []
    uncertain = []
    likely_nonbrand = []

    for q in queries:
        query_text = q.get('query', '').lower()

        # Check if query contains brand roots
        contains_brand = any(root in query_text for root in brand_roots)

        # High CTR signals
        ctr = q.get('ctr', 0)
        pos = q.get('position', 100)

        if contains_brand and ctr > 0.15 and pos < 3:
            likely_brand.append(q)
        elif contains_brand:
            uncertain.append(q)
        else:
            likely_nonbrand.append(q)

    return {
        "likely_brand": likely_brand,
        "uncertain": uncertain,
        "likely_nonbrand": likely_nonbrand,
        "detected_brand_roots": list(brand_roots)
    }


def classify_queries_with_brand_terms(queries: list, brand_terms: list) -> dict:
    """
    Classify queries as brand or non-brand using confirmed brand terms.

    Args:
        queries: List of query dicts
        brand_terms: List of confirmed brand term patterns (strings)

    Returns:
        Dict with 'brand' and 'nonbrand' query lists
    """
    # Build regex patterns from brand terms
    patterns = []
    for term in brand_terms:
        # Escape special chars and allow for common variations
        escaped = re.escape(term.lower())
        # Allow for spacing/punctuation variations
        pattern = escaped.replace(r'\ ', r'[\s._-]*')
        patterns.append(pattern)

    combined_pattern = '|'.join(patterns) if patterns else None

    brand_queries = []
    nonbrand_queries = []

    for q in queries:
        query_text = q.get('query', '').lower()

        is_brand = False
        if combined_pattern:
            if re.search(combined_pattern, query_text):
                is_brand = True

        if is_brand:
            q['is_brand'] = True
            brand_queries.append(q)
        else:
            q['is_brand'] = False
            nonbrand_queries.append(q)

    return {
        "brand": brand_queries,
        "nonbrand": nonbrand_queries
    }


def calculate_summary(data: dict, brand_terms: list = None) -> dict:
    """Calculate summary statistics from parsed GSC data."""
    summary = {
        "total_queries": len(data["queries"]),
        "total_pages": len(data["pages"]),
        "total_clicks": 0,
        "total_impressions": 0,
        "avg_ctr": 0,
        "avg_position": 0,
        "queries_in_top_3": 0,
        "queries_in_top_10": 0,
        "queries_position_4_to_10": 0,
        "queries_position_11_to_20": 0,
        "high_impression_low_position": 0,
    }

    if data["queries"]:
        clicks = [q.get("clicks", 0) for q in data["queries"]]
        impressions = [q.get("impressions", 0) for q in data["queries"]]
        positions = [q.get("position", 0) for q in data["queries"]]
        ctrs = [q.get("ctr", 0) for q in data["queries"]]

        summary["total_clicks"] = sum(clicks)
        summary["total_impressions"] = sum(impressions)
        summary["avg_ctr"] = sum(ctrs) / len(ctrs) if ctrs else 0
        summary["avg_position"] = sum(positions) / len(positions) if positions else 0

        for q in data["queries"]:
            pos = q.get("position", 100)
            imp = q.get("impressions", 0)

            if pos <= 3:
                summary["queries_in_top_3"] += 1
            if pos <= 10:
                summary["queries_in_top_10"] += 1
            if 4 <= pos <= 10:
                summary["queries_position_4_to_10"] += 1
            if 11 <= pos <= 20:
                summary["queries_position_11_to_20"] += 1
            if imp >= 100 and pos > 5:
                summary["high_impression_low_position"] += 1

        # Brand/Non-brand breakdown if brand terms provided
        if brand_terms:
            classified = classify_queries_with_brand_terms(data["queries"], brand_terms)
            brand_clicks = sum(q.get("clicks", 0) for q in classified["brand"])
            nonbrand_clicks = sum(q.get("clicks", 0) for q in classified["nonbrand"])
            brand_impressions = sum(q.get("impressions", 0) for q in classified["brand"])
            nonbrand_impressions = sum(q.get("impressions", 0) for q in classified["nonbrand"])

            summary["brand"] = {
                "query_count": len(classified["brand"]),
                "clicks": brand_clicks,
                "impressions": brand_impressions,
                "click_share": brand_clicks / summary["total_clicks"] if summary["total_clicks"] else 0,
                "avg_ctr": sum(q.get("ctr", 0) for q in classified["brand"]) / len(classified["brand"]) if classified["brand"] else 0,
                "avg_position": sum(q.get("position", 0) for q in classified["brand"]) / len(classified["brand"]) if classified["brand"] else 0,
            }
            summary["nonbrand"] = {
                "query_count": len(classified["nonbrand"]),
                "clicks": nonbrand_clicks,
                "impressions": nonbrand_impressions,
                "click_share": nonbrand_clicks / summary["total_clicks"] if summary["total_clicks"] else 0,
                "avg_ctr": sum(q.get("ctr", 0) for q in classified["nonbrand"]) / len(classified["nonbrand"]) if classified["nonbrand"] else 0,
                "avg_position": sum(q.get("position", 0) for q in classified["nonbrand"]) / len(classified["nonbrand"]) if classified["nonbrand"] else 0,
            }

    return summary


def write_output_files(results: dict, output_dir: str):
    """Write parsed data to output files."""
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    with open(output_path / "gsc_data.json", 'w') as f:
        json.dump(results, f, indent=2)

    # Write individual CSVs for easier analysis
    for key in ["queries", "pages", "countries", "devices", "dates"]:
        if results[key]:
            write_csv(results[key], output_path / f"{key}.csv")


def write_csv(data: list, filepath: Path):
    """Write list of dicts to CSV file."""
    if not data:
        return

    with open(filepath, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)


def main():
    if len(sys.argv) < 2:
        print("Usage: python parse_gsc_data.py <path_to_gsc_zip_or_dir> [output_directory] [--brand term1,term2,...]")
        print("\nExamples:")
        print("  python parse_gsc_data.py ~/Downloads/searchconsole-export.zip ./output")
        print("  python parse_gsc_data.py ~/Downloads/gsc-folder/ ./output")
        print("  python parse_gsc_data.py ~/Downloads/gsc.zip ./output --brand scite,scite.ai")
        sys.exit(1)

    source_path = sys.argv[1]
    output_dir = None
    brand_terms = None

    # Parse remaining args
    i = 2
    while i < len(sys.argv):
        if sys.argv[i] == '--brand' and i + 1 < len(sys.argv):
            brand_terms = [t.strip() for t in sys.argv[i + 1].split(',')]
            i += 2
        else:
            output_dir = sys.argv[i]
            i += 1

    if not os.path.exists(source_path):
        print(f"Error: Path not found: {source_path}")
        sys.exit(1)

    # Parse based on path type
    if os.path.isdir(source_path):
        results = parse_gsc_directory(source_path, output_dir)
    else:
        results = parse_gsc_zip(source_path, output_dir)

    # Recalculate summary with brand terms if provided
    if brand_terms:
        results["summary"] = calculate_summary(results, brand_terms)

    # Print summary
    print("\n📊 Google Search Console Data Summary")
    print("=" * 50)
    print(f"Files found: {', '.join(results['metadata']['files_found'])}")
    print(f"\nQueries: {results['summary']['total_queries']:,}")
    print(f"Pages: {results['summary']['total_pages']:,}")
    print(f"Total Clicks: {results['summary']['total_clicks']:,}")
    print(f"Total Impressions: {results['summary']['total_impressions']:,}")
    print(f"Avg CTR: {results['summary']['avg_ctr']:.2%}")
    print(f"Avg Position: {results['summary']['avg_position']:.1f}")

    print(f"\n🎯 Position Distribution:")
    print(f"  Top 3: {results['summary']['queries_in_top_3']:,}")
    print(f"  Positions 4-10: {results['summary']['queries_position_4_to_10']:,}")
    print(f"  Positions 11-20: {results['summary']['queries_position_11_to_20']:,}")

    print(f"\n💡 Opportunities:")
    print(f"  High-volume keywords outside top 5: {results['summary']['high_impression_low_position']:,}")

    # Brand breakdown if available
    if 'brand' in results['summary']:
        b = results['summary']['brand']
        nb = results['summary']['nonbrand']
        print(f"\n🏷️  Brand vs Non-Brand:")
        print(f"  Brand clicks: {b['clicks']:,} ({b['click_share']:.1%} of total)")
        print(f"  Brand CTR: {b['avg_ctr']:.1%} | Position: {b['avg_position']:.1f}")
        print(f"  Non-brand clicks: {nb['clicks']:,} ({nb['click_share']:.1%} of total)")
        print(f"  Non-brand CTR: {nb['avg_ctr']:.1%} | Position: {nb['avg_position']:.1f}")
    else:
        # Auto-detect brand terms for user confirmation
        detected = detect_brand_terms(results["queries"])
        if detected["detected_brand_roots"]:
            print(f"\n🔍 Detected potential brand terms: {', '.join(detected['detected_brand_roots'])}")
            print(f"   Run with --brand flag to classify: --brand {','.join(detected['detected_brand_roots'])}")

    if output_dir:
        print(f"\n✅ Data exported to: {output_dir}")


if __name__ == "__main__":
    main()
