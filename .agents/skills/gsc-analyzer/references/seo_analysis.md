# SEO Analysis Reference

## Opportunity Scoring Framework

### Quick Win Opportunities (Score: High Priority)
Keywords meeting ALL criteria:
- Position: 4-10 (page 1, not top 3)
- Impressions: >500/month
- CTR: Below position average (see CTR benchmarks)

**Action**: On-page optimization, internal linking, content refresh

### Striking Distance Keywords (Score: Medium-High Priority)
Keywords meeting ALL criteria:
- Position: 11-20
- Impressions: >200/month
- Page exists and is indexed

**Action**: Content expansion, backlink building, technical improvements

### High-Volume Underperformers (Score: High Priority)
Keywords meeting criteria:
- Impressions: >1000/month
- Position: >5
- CTR: Below 2%

**Action**: Title/meta optimization, featured snippet optimization, content restructure

## CTR Benchmarks by Position

| Position | Expected CTR | Below Average |
|----------|--------------|---------------|
| 1        | 25-35%       | <20%          |
| 2        | 12-18%       | <10%          |
| 3        | 8-12%        | <6%           |
| 4-5      | 5-8%         | <4%           |
| 6-10     | 2-5%         | <2%           |
| 11-20    | 0.5-2%       | <0.5%         |

## Click Share Analysis

**Click Share Formula**: `clicks / impressions * (1 / expected_ctr_for_position)`

Normalized click share accounts for position. Value >1 = outperforming, <1 = underperforming.

### Cannibalization Detection
Multiple pages ranking for same query cluster:
1. Group queries by semantic similarity
2. Check if different pages rank for same cluster
3. Flag when primary page has lower position than secondary

## Output Format: SEO Opportunities Report

```markdown
# SEO Analysis Report: [Domain]

## Executive Summary
- Total queries analyzed: X
- Quick win opportunities: X
- Estimated traffic potential: X clicks/month

## Priority 1: Quick Wins (Position 4-10, High Volume)

| Keyword | Current Pos | Impressions | Current Clicks | CTR | Ranking Page | Opportunity |
|---------|-------------|-------------|----------------|-----|--------------|-------------|
| [kw]    | [pos]       | [imp]       | [clicks]       | [%] | [url]        | [action]    |

## Priority 2: Striking Distance (Position 11-20)

[Same table format]

## Priority 3: CTR Optimization (Below-Average CTR)

[Same table format with CTR comparison]

## Cannibalization Issues

| Query Cluster | Pages Competing | Recommended Primary | Action |
|---------------|-----------------|---------------------|--------|

## Recommended Actions
1. [Specific actionable recommendation with page URL]
2. [...]
```
