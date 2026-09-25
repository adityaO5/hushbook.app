# Brand vs. Non-Brand Analysis Reference

## Why This Matters

Brand and non-brand traffic tell different stories:

| Traffic Type | Indicates | Growth Drivers |
|--------------|-----------|----------------|
| **Brand** | Brand awareness, recall, reputation | Marketing, PR, word-of-mouth, ads |
| **Non-Brand** | SEO effectiveness, content quality, market reach | Content, links, technical SEO |

A company growing brand traffic but flat non-brand has marketing working but SEO struggling.
A company growing non-brand but flat brand has SEO working but brand awareness lagging.

## Brand Term Detection

### Obvious Brand Patterns
- Exact brand name: `scite`
- Brand + qualifier: `scite ai`, `scite assistant`
- Domain variations: `scite.ai`, `scite.ia`, `sciteai`
- Common misspellings: `scrite`, `sctie`, `sciete`
- Branded product names

### Ambiguous Terms (Require User Confirmation)
- Generic + brand overlap: `cite ai` (could be brand or generic)
- Partial matches: `site ai`, `sci ai`
- Product category terms that sound like brand

### Likely Non-Brand
- Generic category terms: `research ai`, `ai for research`
- Question queries: `what is`, `how to`
- Competitor terms: other brand names
- Purely informational: `foid meaning`

## Brand Term Detection Prompt

When analyzing data, use AskUserQuestion to confirm brand terms:

**Suggested prompt structure:**
> I've identified these as likely brand terms based on patterns. Please confirm:
>
> **Detected as Brand** (confirm or remove):
> - [list of detected brand terms]
>
> **Uncertain** (should these be brand?):
> - [list of ambiguous terms]
>
> **Additional brand terms to add?**
> - [text input option]

## Metrics to Calculate

### Brand Metrics
- Total brand clicks & impressions
- Brand CTR (typically higher, 20-50%+)
- Brand position (should be 1-2)
- Brand term count & variations

### Non-Brand Metrics
- Total non-brand clicks & impressions
- Non-brand CTR (typically lower, 2-10%)
- Average non-brand position
- Non-brand keyword diversity

### Comparative Analysis
- Brand % of total clicks (healthy: 20-40%, concerning if >60%)
- Brand vs non-brand growth rate
- Brand CTR vs non-brand CTR gap
- Position distribution differences

## Health Indicators

### Healthy Signals
- Non-brand growing faster than brand (SEO working)
- Brand CTR >40% (strong brand recognition)
- Non-brand CTR improving over time
- Diverse non-brand keyword portfolio

### Warning Signs
- Brand >70% of clicks (over-reliance on brand)
- Non-brand declining while brand grows (SEO issues)
- Brand CTR declining (competitors/brand dilution)
- Low non-brand keyword diversity (content gaps)

## Irrelevant Query Filtering

Some queries rank inadvertently. Flag for exclusion:
- Adult/explicit content terms
- Completely unrelated topics
- Spam patterns
- Foreign language gibberish

These should be separated from analysis as they skew metrics.

## Output Format: Brand Analysis Report

```markdown
# Brand vs. Non-Brand Analysis: [Domain]

## Traffic Composition

| Metric | Brand | Non-Brand | Total |
|--------|-------|-----------|-------|
| Clicks | X | X | X |
| % of Total | X% | X% | 100% |
| Impressions | X | X | X |
| Avg CTR | X% | X% | X% |
| Avg Position | X | X | X |

## Brand Health Assessment

**Brand Dependency Score**: [Low/Medium/High]
- Brand share: X% (target: 20-40%)
- Assessment: [interpretation]

**Brand Performance**:
- CTR: X% (benchmark: >40% = strong)
- Position: X (benchmark: <1.5 = strong)
- Variations captured: X terms

## Non-Brand Performance

**SEO Effectiveness Score**: [Low/Medium/High]
- Non-brand clicks: X
- Keyword diversity: X unique terms
- Average position: X

**Top Non-Brand Keywords**:
| Keyword | Clicks | Impressions | Position | Opportunity |
|---------|--------|-------------|----------|-------------|

## Growth Analysis

| Metric | Brand Trend | Non-Brand Trend | Insight |
|--------|-------------|-----------------|---------|

## Strategic Recommendations

### If Brand-Heavy (>50% brand traffic):
1. Invest in content marketing for non-brand keywords
2. Build topical authority in core subject areas
3. Target informational queries to build funnel

### If Non-Brand Weak:
1. [Specific recommendations based on data]

### Brand Protection:
1. [Recommendations for brand term defense]

## Excluded Queries
Queries removed from analysis as irrelevant:
| Query | Reason |
|-------|--------|
```
