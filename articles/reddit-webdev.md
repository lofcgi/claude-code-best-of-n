# Made a set of Claude Code commands that take a URL and output a deployed Next.js app — here's the prompt architecture

I've been working on a pipeline of Claude Code slash commands that takes a URL as input and outputs a deployed full-stack app. Thought the prompt architecture might be interesting to discuss.

## Final output spec

- Next.js (App Router), React 19, TypeScript
- Auth.js v5, Turso (SQLite), Drizzle ORM
- 33 source files, ~3,570 LOC
- Deployed on Vercel

## The 3 commands

| Command | What it does | Lines |
|---------|-------------|-------|
| `/prototype` | Firecrawl scrapes the URL → extracts branding JSON (colors, fonts, spacing) → generates 2 prototypes by cloning the reference section-by-section | 349 |
| `/implement` | Converts chosen prototype to full-stack app → runs autonomous build/check/review/fix loop (max 3 rounds) | 411 |
| `/ship` | Validates env vars → deploys via Vercel CLI | 35 |

Total: 795 lines of markdown prompts that program agent behavior.

## Prompt structure evolution

This went through 4 major rewrites:

**v1 (monolithic)** — Single 900-line prompt, 7 phases. Told Claude to "explore design concepts creatively." Every output had the same purple-neon aesthetic because the MCP tools kept suggesting Aceternity/MagicUI components and Claude used all of them.

**v2 (modular)** — Split into 142-line orchestrator + 7 phase files. Better context management but same generic outputs. Structural improvement, same bad strategy.

**v3 (reference cloning)** — Key pivot. Instead of generating abstract concepts, the agent now finds reference sites, screenshots them, and clones section-by-section with palette swaps. Immediately got diverse, professional-looking results.

**v4 (simplified)** — 7 phases → 3. Removed v0 MCP (redundant once you show reference screenshots). Added Playwright visual diff loop. Dropped execution time from 40min to ~30min.

## Using MCP as a toolchain

9 MCP servers give the agent capabilities beyond code generation:

| Server | Agent use |
|--------|----------|
| Firecrawl | Scrapes reference URL → content + layout + branding JSON |
| Playwright | Screenshots for visual diff loop + testing built apps |
| 21st-dev | Sources production UI components |
| Context7 | Live framework docs (catches API changes between Next 15→16) |
| Unsplash | Real images instead of placeholder boxes |
| Design Inspiration | Dribbble/Behance/Awwwards reference search |
| Sequential Thinking | Structures complex analysis steps |
| GitHub | Branch management, PRs |
| Vercel | Deployment |

The interesting part is how the agent chains these. Phase 1 scrapes with Firecrawl, extracts branding, grabs Unsplash images, writes plan.md. Phase 2 reads plan.md, sources components from 21st-dev, checks docs with Context7, generates code. Phase 3 takes Playwright screenshots, compares to reference, and iterates.

## Self-fixing build loop

The `/implement` command has what I call a "Ralph Loop":

```
build → type-check → lint ──→ pass? ──→ self-review ──→ done
                              │                          │
                              fail                      issues found
                              │                          │
                              └──→ fix + rebuild ←───────┘
                                   (max 3 rounds)
```

The agent reads its own build errors, diagnoses the issue, fixes it, and rebuilds. Capped at 3 rounds. In practice it usually resolves in 1-2.

## Limitations

- **Context window** — Phase 1's scraping output eats context. `/clear` between phases is mandatory, with plan.md as the only handoff.
- **MCP reliability** — API keys expire, servers crash. The pipeline validates MCP availability before starting but runtime failures still happen.
- **Design ceiling** — Reference cloning gets you 80% of the way. The last 20% (microinteractions, custom illustrations) still needs human input.
- **One-shot architecture** — The pipeline generates the initial app but isn't designed for iterative feature development.

Open-sourced the full prompt set (English + Korean): https://github.com/lofcgi/claude-code-best-of-n
