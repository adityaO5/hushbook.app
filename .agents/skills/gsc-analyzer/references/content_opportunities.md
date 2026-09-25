# Content Opportunity Analysis Reference

## Content Gap Identification

### Type 1: Query Clusters Without Dedicated Content
Identify keyword groups where:
- Multiple related queries exist in GSC data
- No single page comprehensively covers the topic
- Combined impression potential is significant (>1000/month)

**Signal**: Keywords with "how to", "what is", "guide", "tutorial" ranking to non-guide pages

### Type 2: Long-Tail Expansion
Find opportunities where:
- Head term ranks well (position 1-5)
- Related long-tail queries rank poorly (position >10)
- Long-tail queries have meaningful volume

**Action**: Create supporting content targeting long-tail terms with internal links to pillar

### Type 3: Question-Based Content
Identify question queries:
- Filter for queries containing: "how", "what", "why", "when", "where", "which", "can", "does", "is"
- Check if current ranking page answers the question
- Prioritize by impression volume

### Type 4: Comparison/Alternative Content
Identify queries containing:
- "vs", "versus", "alternative", "compared to"
- "best", "top", "review"
- Competitor brand names

## Topic Clustering Algorithm

1. Extract all unique queries
2. Group by semantic root (remove stop words, stem)
3. Calculate cluster metrics:
   - Total impressions
   - Average position
   - Number of queries in cluster
   - Best ranking page

## Content Prioritization Matrix

| Metric | Weight | Scoring |
|--------|--------|---------|
| Total cluster impressions | 40% | >5000=10, >1000=7, >500=5, >100=3 |
| Competition (avg position) | 30% | <20=10, <30=7, <50=5 |
| Query count in cluster | 20% | >10=10, >5=7, >3=5 |
| Commercial intent signals | 10% | buy/price/best=10, how-to=5, info=3 |

## Intent Classification

**Commercial/Transactional**: buy, price, cost, purchase, order, deal, discount, coupon, cheap, best, top, review
**Informational**: how to, what is, guide, tutorial, learn, examples, definition
**Navigational**: brand names, specific product names, login, support
**Local**: near me, in [city], local, directions

## Output Format: Content Opportunities Report

```markdown
# Content Opportunity Report: [Domain]

## Executive Summary
- New content opportunities identified: X
- Total potential impressions: X/month
- Priority content pieces: X

## High-Priority New Content

### 1. [Proposed Title]
- **Target Cluster**: [primary keyword + related terms]
- **Search Intent**: [informational/commercial/etc]
- **Potential Impressions**: X/month
- **Current Gap**: [why this content doesn't exist]
- **Recommended Format**: [guide/comparison/list/etc]
- **Internal Linking**: Link from [existing pages]

### 2. [Next opportunity...]

## Content Refresh Opportunities
Pages ranking but underperforming that could capture more traffic with updates:

| Page | Current Keywords | Missing Keywords | Recommended Updates |
|------|------------------|------------------|---------------------|

## Question-Based Content Opportunities

| Question Query | Impressions | Current Pos | Content Recommendation |
|----------------|-------------|-------------|------------------------|

## Long-Tail Expansion Map

| Pillar Content | Supporting Topics to Create | Combined Potential |
|----------------|-----------------------------|--------------------|
```
