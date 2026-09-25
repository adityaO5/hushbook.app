# Strategic Frameworks for GSC Analysis

## Revenue Impact Estimation

### SaaS Revenue Model
Connect traffic to business outcomes using this framework:

```
Monthly Revenue Impact =
  Traffic Gain × Conversion Rate × Trial-to-Paid Rate × ACV
```

**Default Assumptions (adjust per client):**
| Metric | Low | Medium | High |
|--------|-----|--------|------|
| Organic → Trial | 1.5% | 2.5% | 4% |
| Trial → Paid | 8% | 12% | 18% |
| ACV (Individual) | $150 | $300 | $500 |
| ACV (Team/Enterprise) | $2,000 | $5,000 | $15,000 |

### Opportunity Sizing Template

| Opportunity | Traffic Gain | Trials (2.5%) | Revenue (12% × $300) |
|-------------|--------------|---------------|----------------------|
| [Opportunity 1] | +X clicks | +Y trials | $Z/month |

**Always ask user**: "What's your conversion rate and average contract value?" to customize.

## Funnel Stage Classification

### Stage Definitions

| Stage | Intent Signal | Keywords Contain | Priority for SaaS |
|-------|---------------|------------------|-------------------|
| **TOFU** | Learning, exploring | "what is", "how to", "guide", "101" | Content marketing |
| **MOFU** | Comparing options | "best", "vs", "comparison", "alternative", "review" | HIGH - conversion opportunity |
| **BOFU** | Ready to buy | "pricing", "free trial", "demo", "[brand]", "login" | Highest intent |
| **Retention** | Existing users | "[brand] login", "how to use [feature]" | Customer success |

### Classification Rules
1. Brand terms → BOFU or Retention
2. "Best X" or "X vs Y" → MOFU (high priority)
3. "What is X" or "How to X" → TOFU
4. "[Competitor] alternative" → MOFU (very high intent)

## Share of Voice Analysis

Estimate competitive position from GSC data:

### Position-Based Share of Voice
| Position | Estimated Click Share |
|----------|----------------------|
| 1 | 25-35% |
| 2 | 12-18% |
| 3 | 8-12% |
| 4-5 | 5-8% |
| 6-10 | 2-5% |
| 11-20 | 0.5-2% |

### Competitive Intelligence Signals
Look for competitor names in query data:
- Users searching "[competitor]" landing on your site = comparison opportunity
- "[competitor] alternative" queries = conquesting opportunity
- Your brand + competitor in same query = direct comparison happening

## Anomaly Detection Framework

### Traffic Anomalies
- **Sudden drop >20%**: Algorithm update, technical issue, or lost ranking
- **Sudden spike**: Viral content, news mention, or seasonality
- **Gradual decline**: Competitive pressure or content decay

### CTR Anomalies
- **High impressions, low CTR**: Poor title/meta, wrong intent match
- **Low impressions, high CTR**: Niche but valuable—expand content
- **CTR below position benchmark**: Optimization opportunity

### Position Anomalies
- **Position 4-10 with high volume**: Quick win territory
- **Position 11-20 with high volume**: Striking distance
- **Position 1-3 with low CTR**: Title/meta needs work

## Executive Summary Template

For board meetings, investor updates, or exec reviews:

```markdown
# [Company] Organic Search Performance - [Period]

## Headline Metrics
| KPI | Value | Trend | vs. Target |
|-----|-------|-------|------------|

## Key Risks
1. [Risk with business impact]
2. [Risk with business impact]

## Key Opportunities
1. [Opportunity with revenue estimate]
2. [Opportunity with revenue estimate]

## Resource Requirements
- [Specific ask with justification]

## 90-Day Priorities
1. [Priority with owner and timeline]
```

## OKR Framework for SEO

### Suggested Objectives & Key Results

**Objective: Reduce dependency on brand traffic**
- KR1: Increase non-brand click share from X% to Y%
- KR2: Grow non-brand clicks by Z% QoQ
- KR3: Publish N new SEO-optimized landing pages

**Objective: Improve organic conversion efficiency**
- KR1: Increase average non-brand CTR from X% to Y%
- KR2: Improve average non-brand position from X to Y
- KR3: Reduce bounce rate on top landing pages by Z%

**Objective: Capture competitive search demand**
- KR1: Rank top 5 for N "[competitor] alternative" keywords
- KR2: Create comparison content for top 3 competitors
- KR3: Launch PPC campaigns for competitor terms

## Seasonality Patterns

### Academic/Research SaaS
- **Peak**: September-November (academic year start)
- **Secondary Peak**: January-March (new semester)
- **Trough**: June-August (summer break)
- **Holiday Dip**: Mid-December to early January

### B2B SaaS General
- **Peak**: Q1 (new budgets), Q4 (use-it-or-lose-it)
- **Trough**: Summer months, late December

When analyzing trends, always normalize for seasonality before concluding there's a problem.
