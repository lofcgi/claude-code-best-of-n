---
title: "It took 2 days to build the slash commands, but only 1 hour to build the project site"
published: false
tags: ai, webdev, promptengineering, opensource
---

I built a pipeline using Claude Code slash commands. Put in a URL, and it handles prototyping → full-stack app → deployment on its own.

Building the pipeline itself took two days, but once it was done, a service project site comes out in an hour with just slash commands — no manual coding.

I'm currently in a Korean dev bootcamp, and one of the assignments was to build a service using Claude. Instead of just coding with Claude, I wanted to go deeper: "How do I actually use an AI agent well?" That's what led to this pipeline.

Here's how the same project looked across pipeline versions:

| v1: Neon overload | v0 only: Design OK, code mess | v4: Reference clone |
|:---:|:---:|:---:|
| <img src="https://raw.githubusercontent.com/lofcgi/claude-code-fast-proto/main/_example2/images/v1-voxforge-hero.png" width="280" /> | <img src="https://raw.githubusercontent.com/lofcgi/claude-code-fast-proto/main/_example2/images/v0-only.png" width="280" /> | <img src="https://raw.githubusercontent.com/lofcgi/claude-code-fast-proto/main/_example2/images/final-a-hero.png" width="280" /> |

**Live demos:**
- https://project-nine-nu-52.vercel.app/
- https://project-kimanlee.vercel.app/

> Neither site makes real API calls. Use the Demo button on the Dubbing page to try the full flow.

The full 795 lines of prompts are [open-sourced on GitHub](https://github.com/lofcgi/claude-code-fast-proto).

---

## Try it yourself

### Requirements

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code/overview) (`npm i -g @anthropic-ai/claude-code`)
- Node.js 18+
- Git

### Clone and run

```bash
git clone https://github.com/lofcgi/claude-code-fast-proto.git
cd claude-code-fast-proto/eng    # Korean: cd kor
```

Put your target URL in `input/url.md` (one URL per line, first one is the main reference). If you have a PRD, add it as `prd.md` or a PDF in the same folder (optional).

```bash
claude          # loads .mcp.json automatically
/prototype      # Phase 1-3 runs automatically
```

Two prototypes appear in `prototypes/a` and `prototypes/b`. Pick one:

```bash
/implement a    # convert to full-stack app
/ship           # deploy to Vercel
```

Check `_example/` for a real run example.

### MCP server setup

`.mcp.json` defines 11 servers, loaded automatically when you run `claude` from the repo directory.

**No API key needed (6):**
Sequential Thinking, Playwright, Context7, Defuddle Fetch, Lighthouse, v0

**API key required (4):**

| Server | Env variable | Where to get it |
|--------|-------------|-----------------|
| Firecrawl | `FIRECRAWL_API_KEY` | firecrawl.dev |
| 21st-dev | `TWENTY_FIRST_API_KEY` | 21st.dev/magic/console |
| Design Inspiration | `SERPER_API_KEY` | serper.dev |
| GitHub | `GITHUB_TOKEN` | github.com/settings/tokens |

**OAuth:** Vercel — only needed for `/ship`. Authenticates via browser.

Missing keys just disable that server. Everything else works. Set keys via:

```bash
# Option 1: shell profile (~/.zshrc etc.)
export FIRECRAWL_API_KEY="fc-..."

# Option 2: Claude Code config
claude config set env FIRECRAWL_API_KEY fc-...
```

The assignment was to build a service using Claude, so I wanted to do full-stack development purely through Claude. The goal was to prototype an AI dubbing service called "VoiceBridge." Coding without an agent didn't fit the assignment's intent, so I dug into "how to actually use an AI agent well."

---

## v1: 50-line prompt

Started simple. Created a `/prototype` slash command in Claude Code with a 7-step prototyping pipeline.

Had 7 MCP servers connected: Design Inspiration, v0, 21st.dev, Firecrawl, Unsplash, Playwright, Sequential Thinking.

```
Phase 1: Search UI references via Design Inspiration MCP
Phase 2: Derive 3 abstract concepts
Phase 3: Scaffolding
Phase 4: Delegate design generation to v0 MCP
Phase 5: Polish components with 21st.dev
Phase 6: Build verification
Phase 7: Playwright screenshot QA
```

Result: Aurora, beam, sparkle, gradient mesh effects covered the entire site. The MCP tools recommended decorative components like Aceternity and MagicUI, and Claude used every single one. Made 3 prototypes — all three looked nearly identical.

When you derive concepts abstractly, they converge to the same place every time.

---

## "Why isn't this working?" — Research by Claude

Before fixing the prompts, I needed to understand why they weren't working. So I had Claude do the research:

> "Compare v0 and Claude Code. Which is better at design quality, which at code quality? Analyze real professional sites and find what's different."

I tried building the same thing with both tools. What v0 made "looked" better visually. But open the code and it's a mess. So I wanted to map out each tool's strengths.

Claude's findings after web research:

| | Design | Code |
|---|---|---|
| v0 / Tempo / 21st.dev | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Claude Code | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

Then it scraped real SaaS sites with Firecrawl and extracted common patterns from professional sites:

1. Pure black background + 2-color accent only (no rainbow)
2. Product UI screenshot as hero (not abstract effects)
3. 100px headline / 14px body (extreme typographic contrast)
4. One section, one feature (full-width, 80-120px spacing)
5. Minimal animation (scroll reveal + marquee at most)

In short: MCP tools suggest decorative components, and Claude uses all of them. Professional sites don't have any of those effects.

---

## v2 → v3: Modularization, then strategy change

v2 was a structural improvement. Split the 900-line monolithic prompt into a 142-line orchestrator + 7 phase files. This was because of Claude Code's context window issue — when it read 900 lines at once, it ignored instructions toward the end. Splitting into phase files so it only reads the relevant phase improved instruction compliance.

But v2 still produced similar results. Structure improved, but the strategy itself was wrong.

So v3 changed the strategy entirely:

```
BEFORE: Research → 3 abstract concepts → premium components → generate
AFTER:  Research → 3 reference sites + screenshots → 1:1 clone → swap colors
```

Instead of "be creative," it became "look at this and copy it." Same pipeline, but different references meant different results.

---

## v4: Threw out all 7 phases, down to 3

v3 worked well but 7 phases was too heavy. Validation scripts and prerequisite checks at every transition... over 40 minutes per run.

Studied real practitioners' workflows and extracted three principles:
- **Saqoosha**: "Take screenshots and compare. Your eyes are accurate."
- **Boris Cherny**: "Add rules learned from failures to CLAUDE.md immediately."
- **monday.com**: "Don't dump all context at once — build it phase by phase."

So I simplified:

| Phase | What it does | MCP tools |
|-------|-------------|-----------|
| 1. Explore & Plan | URL → Firecrawl scrape + branding JSON → plan.md | Firecrawl, Design Inspiration |
| 2. Generate | plan.md → 2 prototypes (clone + variation) | 21st-dev, Context7 |
| 3. Diff Loop | Playwright screenshot → compare to reference → fix (max 3x) | Playwright |

Key changes:
- **v0 is in `.mcp.json` but removed from the core pipeline** — showing a reference is enough for Claude Code on its own
- **`/clear` between phases** — prevents context pollution. plan.md is the only interface between phases
- **Design rules changed from "enforce" to "reference"** — rigid rules killed creativity

### What each MCP server actually does

| MCP Server | What the agent uses it for |
|------------|---------------------------|
| Firecrawl | Scrapes reference URLs for content, layout, branding |
| Playwright | Screenshot capture, visual diff loop, built app testing |
| 21st-dev | Sources production-grade UI components |
| Design Inspiration | Searches Dribbble/Behance/Awwwards for design references |
| Context7 | Fetches up-to-date framework/library docs |
| Sequential Thinking | Breaks complex analysis into structured steps |
| Defuddle Fetch | Extracts clean content from web pages |
| Lighthouse | Measures built app performance |
| GitHub | Branch management, PR creation |
| Vercel | Final app deployment |

---

## Real run: VoiceBridge AI dubbing service prototype

Here's the actual run with the v4 pipeline.

**Phase 1 — Explore & Plan (5 min)**

Fed the reference URLs to Firecrawl. Branding JSON comes out automatically — colors, fonts, spacing, button styles. Generated plan.md.

**Phase 2 — Generate (15 min)**

Built 2 prototypes based on plan.md (reference clone + variation).

**Phase 3 — Diff Loop (10 min, 3 rounds)**

Playwright screenshots → compare to reference → fix differences. Three rounds.

Total: 30 minutes. One URL in, 2 prototypes + feature pages out.

---

## Generated directory structure

Files the pipeline auto-generates:

```
_example/
├── analysis/
│   ├── prd.md                    # Auto-generated PRD
│   ├── requirements.json         # Feature requirements
│   ├── acceptance-criteria.md    # Pass/fail criteria
│   ├── evaluation-matrix.md     # Evaluation matrix
│   └── tech-constraints.md      # Technical constraints
├── prototypes/
│   ├── a/                        # Prototype A (clone)
│   └── b/                        # Prototype B (variation)
└── project/                      # Full-stack app (33 files, ~3,570 LOC)
```

Note: `.claude/commands/` contains the pipeline slash command prompts (input files). These are the command definitions, not generated output.

---

## 5 prompt engineering tips

Things I picked up from v1 through v4:

1. **Show a screenshot instead of saying "be creative."** One reference image beats 100 abstract rules. "Make it look nice" converges to the same result every time. "Clone this" produces variety because references vary.

2. **Split prompts into phases.** 349 lines in one file works fine — as long as each phase gets its own context budget. 900 lines in one shot and Claude ignores the bottom half.

3. **Let it fix its own code.** Build → type-check → lint → self-review → fix, capped at 3 rounds. The agent catching its own mistakes is faster than human intervention.

4. **`/clear` between phases.** Phase 1 scraping results pollute Phase 2 code generation. Write plan.md as a file, clear context, read it fresh. Quality goes up.

5. **Validate MCP servers before running.** A server in the config doesn't mean it works. Keys expire, servers crash. Always do a test call before starting the pipeline.

---

## Wrapping up

Going from v1 to v4 felt exactly like refactoring software. 900-line monolith → 7-phase modules → reference clone strategy → 3-phase lightweight.

The refactoring patterns are the same. When a monolith becomes unmaintainable you split it, splitting requires interfaces, and when it gets complex you simplify again.

The full 795 lines of prompts are [on GitHub](https://github.com/lofcgi/claude-code-fast-proto).

Drop a star if you find it useful — and if you [leave your email in an issue](https://github.com/lofcgi/claude-code-fast-proto/issues/new?template=prd-template-request.md), I'll send you the PRD we used to build the two demo projects.
