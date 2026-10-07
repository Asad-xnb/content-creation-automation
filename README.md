# Daily LinkedIn Posts Pipeline

> Complete automation system for generating, building, and delivering LinkedIn content for **Receptralink**: 16 posts per day (4 Reddit-based + 7 AI news + 5 report-driven performance posts) with carousel PDFs, infographic PNGs, and Slack delivery.

> **Content positioning — the "Receptralink Voice."** As of 2026-06-14, every stream is governed by [`content-doctrine.md`](content-doctrine.md): we write for ambitious generalists who want to know where AI is going and how to get ahead, framed around AI's impact on work, income, skills, and the future. Technical tutorials, indie-hacker tactics, and tool how-tos are out (they underperform); future-of-work, opportunity, and accessible explainers are in. `receptralink` stays the brand. The doctrine overrides older topic guidance in any skill file.

---

## Prerequisites

### Software
- **Node.js** ≥ 18 (for Puppeteer visual rendering scripts)
- **Python 3.10+** (for data fetching and LLM generation)
- **puppeteer-core** npm package (global or in `carousel-routine/`)

### API Keys (stored in `.env`)
```
OPENROUTER_API_KEY=...      # For LLM post generation
ANTHROPIC_API_KEY=...       # Alternative LLM provider
SLACK_BOT_TOKEN=...         # For Slack delivery (xoxb-...)
SLACK_CHANNEL_ID=...        # Target Slack channel (e.g. C012345678)
```

### NPM Dependencies
```bash
npm install puppeteer --no-save
cd carousel-routine && npm install
```

---

## Pipeline Overview (16 posts = 4 Reddit + 7 AI News + 5 Performance)

```
┌───────────────────────────────────────────────────────────┐
│  PHASE 1: DATA FETCHING                                   │
│  ├── Reddit: 6 subreddits via RSS/JSON/Apify              │
│  ├── AI News: 9 sources (newsletters, blogs, PH)          │
│  └── Infographic dataset: 1 fresh dataset via search      │
├───────────────────────────────────────────────────────────┤
│  PHASE 2: CONTENT GENERATION (via LLM)                    │
│  ├── 4 Reddit posts: Collab Article, Poll, Carousel, Info │
│  ├── 7 AI News posts: 7 archetypes                        │
│  └── 5 Performance posts: report-driven winners           │
├───────────────────────────────────────────────────────────┤
│  PHASE 3: VISUAL ASSET CREATION                           │
│  ├── Carousel: 7 slides HTML → PNG → PDF                  │
│  └── Infographic: HTML → PNG screenshot                   │
├───────────────────────────────────────────────────────────┤
│  PHASE 4: SLACK DELIVERY & REVIEW                         │
│  ├── All 16 post texts sent to Slack                      │
│  ├── Carousel PDF native upload to Slack                  │
│  └── Infographic PNG native upload to Slack               │
└───────────────────────────────────────────────────────────┘
```

> **Note on Scheduling:** This pipeline intentionally stops at Slack delivery. Because AI can occasionally hallucinate, the Slack channel acts as a daily "newspaper" for review. Once approved in Slack, you can manually copy the posts to LinkedIn or Buffer. Alternatively, there is a zero-setup local scheduler (`schedule_all_posts.cjs`) that uses your own browser session to natively post to LinkedIn.

---

## File Reference

### 🧠 Skill Instructions (the brain)
| File | Purpose |
|------|---------|
| `content-doctrine.md` | **North star** — the Receptralink positioning, broadened audience, topic filter, and DROP/AMPLIFY lists that govern every stream |
| `daily-linkedin-posts/SKILL.md` | Master orchestration skill — the full pipeline steps |
| `commands/linkedin-content.md` | Reddit post writing rules, output format, banned words |
| `skills/linkedin-ai-news-engine/SKILL.md` | AI news engine — 7 archetype post generation |
| `skills/linkedin-performance-engine/SKILL.md` | Performance engine — 5 posts modeled on Receptralink's own analytics |
| `receptralink_linkedin_content_report.md` | Live LinkedIn analytics report — the performance engine reads this each run; drop in an updated report to refresh the winning patterns |
| `skills/branded-carousel/SKILL.md` | Carousel design system, slide layouts, brand research |
| `skills/branded-carousel/FORMATS.md` | Carousel format templates featuring the Receptralink dark-teal aesthetic |
| `skills/illustration-formats/SKILL.md` | 5 infographic formats featuring the Receptralink aesthetic |

### 🔍 Data Fetching Scripts
| File | Purpose |
|------|---------|
| `fetch_reddit_apify.py` | Primary: Fetch Reddit via Apify API (paid, most reliable) |
| `fetch_reddit_fallback.py` | Fallback: Fetch Reddit JSON endpoints directly |
| `fetch_reddit_rss.py` | Last resort: Fetch Reddit RSS feeds (no engagement metrics) |
| `fetch_ai_news_rss.py` | Fetch AI news from newsletter RSS feeds |

### 🤖 Content Generation Scripts
| File | Purpose |
|------|---------|
| `generate_posts_via_openrouter.py` | Generate Reddit-based posts via OpenRouter/Claude API |
| `generate_ai_news.py` | Generate 7 AI news posts |
| `write_today_data.py` | Master script: combines all posts into daily output file |

### 🎨 Visual & Delivery Scripts
| File | Purpose |
|------|---------|
| `build_carousel.cjs` | Renders the HTML slides to PNG and packs them into the final Carousel PDF |
| `generate_daily_paper.py` | Local HTML compiler that wraps all 16 posts in a beautiful browser-readable UI |
| `slack_deliver.py` / MCP Tool | Uploads the raw text and visual files natively to your private Slack workspace for review |
| `schedule_all_posts.cjs` | Zero-setup local scheduler that takes control of your own Chrome browser to post natively |
