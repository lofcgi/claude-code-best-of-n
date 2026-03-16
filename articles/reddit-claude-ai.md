# It took 2 days to build the slash commands, 1 hour to build the project site — open-sourced 795 lines of prompts

**TL;DR:** Built 3 Claude Code slash commands (`/prototype`, `/implement`, `/ship`) that take a URL, scrape it, clone the design, and deploy a full-stack Next.js app. Went through 4 prompt rewrites (v1→v4). Open-sourced the full 795-line prompt set.

I'm in a Korean dev bootcamp where one of the assignments is to build a service using Claude. Instead of just coding with it, I wanted to figure out how to actually use an AI agent well — so I built a pipeline that automates the whole thing.

---

## How the same project looked across versions

| v1: Neon overload | v0 only: Design OK, code mess | v4: Reference clone |
|:---:|:---:|:---:|
| <img src="https://raw.githubusercontent.com/lofcgi/claude-code-fast-proto/main/_example2/images/v1-voxforge-hero.png" width="280" /> | <img src="https://raw.githubusercontent.com/lofcgi/claude-code-fast-proto/main/_example2/images/v0-only.png" width="280" /> | <img src="https://raw.githubusercontent.com/lofcgi/claude-code-fast-proto/main/_example2/images/final-a-hero.png" width="280" /> |

## What it does

You give it a URL. It scrapes the site with Firecrawl, extracts branding (colors, fonts, spacing), generates 2 prototypes, then converts your pick into a full-stack app and deploys it.

Three commands:
- `/prototype` — URL → scrape → branding extraction → 2 prototypes
- `/implement` — prototype → full-stack app (autonomous build-fix loop)
- `/ship` — deploy to Vercel

Uses 9 MCP servers as tools (Firecrawl, Playwright, 21st-dev, Context7, etc.).

**Live demos** (no real API calls — use the Demo button on the Dubbing page):
- https://project-nine-nu-52.vercel.app/
- https://project-kimanlee.vercel.app/

## What I learned from 4 rewrites

**v1 — "Be creative" = generic results.** Connected 7 MCP servers, told Claude to explore concepts. Every output: purple-orange gradients, aurora effects, neon glow. Three prototypes, basically identical. MCP tools suggest decorative components and Claude uses all of them.

**Research phase** — Had Claude compare v0 vs Claude Code. v0 wins on design, Claude Code wins on code quality. Then scraped real SaaS sites with Firecrawl — pro sites use pure black + 2 accent colors, product UI screenshots as hero, minimal animation. None of the decorative effects AI defaults to.

**v3 — Reference cloning was the breakthrough.** Changed from "generate creative concepts" to "find reference sites, screenshot them, clone section-by-section, swap colors." Same pipeline, different results every time.

**v4 — 7 phases → 3 phases.** Explore & Plan → Generate → Diff Loop (Playwright screenshot comparison, max 3 rounds). Run time dropped from 40+ min to ~30 min. Added `/clear` between phases for context management.

## Tips

1. **Show a screenshot, don't say "be creative"** — one reference image > 100 abstract design rules
2. **Split prompts into phases with `/clear` between them** — 900 lines in one shot = Claude ignores the bottom half
3. **Self-fixing loops work but cap at 3 rounds** — build → check → review → fix
4. **`/clear` between phases** — Phase 1 scraping data pollutes Phase 2 code generation. plan.md as file handoff + context reset = better output
5. **Validate MCP servers before running** — keys expire, servers crash mid-pipeline

## Links

- **GitHub (MIT)**: https://github.com/lofcgi/claude-code-fast-proto
- **Demo 1**: https://project-nine-nu-52.vercel.app/
- **Demo 2**: https://project-kimanlee.vercel.app/
- Prompts available in English and Korean

Happy to answer questions about the prompt structure or MCP setup.
