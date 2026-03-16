# Tips from building 795 lines of Claude Code slash commands that generate full-stack apps from a URL

I built a set of Claude Code slash commands that take a URL, scrape the site, clone the design section-by-section, and output a deployed full-stack app. Three commands: `/prototype` → `/implement` → `/ship`. Here's what I learned along the way.

## What didn't work

**v1: "Be creative"** — I connected 7 MCP servers (Design Inspiration, v0, 21st.dev, Firecrawl, etc.) and told Claude to "explore design concepts and build something creative." Every single output looked the same: purple-orange gradients, aurora effects, neon glows. Three prototypes, basically identical. Claude was pulling every decorative component the MCP tools suggested and stacking them all.

**v2: Modularizing alone didn't fix it** — I split the 900-line monolithic prompt into 7 phase files. Better structure, same generic results. The problem wasn't organization — it was the strategy.

## What worked

**v3: Showing a reference screenshot instead of abstract rules** — This was the turning point. Instead of "create 3 design concepts," I changed it to "find 3 reference sites, screenshot them, clone section-by-section, swap the color palette." Same pipeline, wildly different outputs because the references were different.

**v4: Cutting 7 phases down to 3** — v3 worked but took 40+ minutes per run. I simplified to: (1) Explore & Plan (Firecrawl scrape + branding extraction), (2) Generate (2 prototypes), (3) Diff Loop (Playwright screenshot → compare → fix, max 3 rounds). Total time dropped to ~30 min.

## 5 specific tips

1. **Don't tell it to "be creative." Show a screenshot.** — 100 abstract rules < 1 reference image. Claude follows visual references far better than text descriptions of what "good design" looks like.

2. **Split your prompt into phases. 349 lines in one file works if each phase has its own context budget.** — When I had 900 lines in a single prompt, Claude ignored instructions at the bottom. Splitting into phases with clear boundaries fixed this.

3. **Let it fix its own code. Build → check → self-review → fix, cap at 3.** — I call this the "Ralph Loop." The agent builds, type-checks, lints, reviews its own output, then fixes. Capped at 3 rounds to avoid infinite loops. Works better than manual intervention.

4. **`/clear` between phases. Context window is real.** — Phase 1 scraping results pollute Phase 2 code generation. Writing plan.md as a file handoff and clearing context between phases improved output quality noticeably.

5. **File-based handoff. Agent writes analysis/, next agent reads it.** — Instead of passing context through the conversation, Phase 1 writes structured files (PRD, requirements, branding JSON) that Phase 2 reads fresh. Clean interface between phases.

## Results

- 33 files, ~3,570 lines of code
- Next.js full-stack app, deployed
- 795 lines of slash command prompts total (349 prototype + 411 implement + 35 ship)
- 9 MCP servers as agent tools

Open-sourced the full prompt set (English + Korean) if anyone finds it useful:
https://github.com/lofcgi/claude-code-best-of-n
