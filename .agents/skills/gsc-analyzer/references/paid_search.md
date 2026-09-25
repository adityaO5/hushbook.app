# Paid Search Analysis Reference

## Strategic Framework

### Strategy 1: Non-Ranking High-Intent Keywords
Identify keywords where:
- Organic position: >20 or not ranking
- Query contains commercial signals
- Competitor likely bidding (inferred from query structure)

**Rationale**: Can't wait for organic ranking; PPC provides immediate visibility

### Strategy 2: SERP Domination
Target keywords where:
- Already ranking position 1-5 organically
- High commercial value
- Significant search volume

**Rationale**: Own more SERP real estate, capture incremental clicks, defend against competitors

### Strategy 3: Testing Ground
Use PPC to test keywords before investing in SEO:
- High-volume keywords in position 15-30
- Uncertain conversion potential
- Test landing page effectiveness

## Commercial Intent Signals

**High Intent (Bottom Funnel)**:
- buy, purchase, order, pricing, cost, quote
- [product] + [location]
- [brand] + [product]
- best [product] for [use case]
- [product] reviews, comparisons
- demo, trial, free trial
- near me, same day, fast shipping

**Medium Intent (Mid Funnel)**:
- vs, versus, alternative, compared
- pros and cons, benefits
- [product] features
- how much does [product] cost

**Lower Intent (Top Funnel)**:
- what is, how to, guide
- examples, templates
- learn, understand

## Keyword Categorization for Campaigns

### Brand Campaigns
- Own brand terms
- Brand + product combinations
- Misspellings of brand

### Competitor Campaigns
- Competitor brand names (if legally permissible)
- "[Competitor] alternative"
- "[Competitor] vs [Your brand]"

### Product/Service Campaigns
- Core product keywords
- Feature-specific keywords
- Use case keywords

### Long-Tail Campaigns
- Specific problem + solution queries
- Detailed product specifications
- Location-based queries

## Bid Strategy Recommendations

| Keyword Type | Organic Position | Recommended Strategy |
|--------------|------------------|----------------------|
| Brand terms | 1-3 | Low bid, defensive |
| High-intent, no organic | >20 | Aggressive bid |
| High-intent, good organic | 1-5 | Medium bid, domination |
| Informational | Any | Usually skip or low bid |
| Competitor terms | N/A | Test carefully, track ROI |

## Estimated Value Calculation

Without actual CPC data, estimate relative value:
- Impressions × CTR potential × conversion rate assumption × avg order value
- Compare to industry CPCs when known

## Output Format: Paid Search Opportunities Report

```markdown
# Paid Search Opportunity Report: [Domain]

## Executive Summary
- High-priority PPC opportunities: X keywords
- Estimated monthly search volume: X
- Primary campaign recommendations: X

## Campaign 1: Non-Ranking High-Intent Keywords
Keywords we're not ranking for organically that have strong commercial intent.

| Keyword | Impressions | Intent Level | Campaign Type | Priority |
|---------|-------------|--------------|---------------|----------|

### Recommended Ad Groups
1. **[Ad Group Name]**: [keyword list]
   - Suggested headlines: [...]
   - Landing page recommendation: [...]

## Campaign 2: SERP Domination Opportunities
Keywords where we rank organically but should also run ads.

| Keyword | Organic Pos | Impressions | Clicks | Rationale |
|---------|-------------|-------------|--------|-----------|

### ROI Consideration
At organic position [X], we capture ~[Y]% of clicks. Adding PPC at estimated [Z] CPC could capture additional [A]% for $[B]/month.

## Campaign 3: Competitor Conquesting
Opportunities to target competitor-related queries.

| Query Pattern | Volume | Opportunity |
|---------------|--------|-------------|

## Keywords to Avoid (Poor PPC Fit)
| Keyword | Reason |
|---------|--------|
| [kw] | Informational intent, low conversion |
| [kw] | Already position 1, diminishing returns |

## Budget Allocation Recommendation
| Campaign | Priority | Suggested % of Budget |
|----------|----------|----------------------|

## Landing Page Recommendations
| Keyword Cluster | Recommended Landing Page | Notes |
|-----------------|--------------------------|-------|
```
