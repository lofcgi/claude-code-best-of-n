# X (Twitter) Thread

## Tweet 1
made Claude Code slash commands that take a URL and build a full-stack app from it. some notes on what worked:

[image: before/after — reference site vs generated prototype]

## Tweet 2
first attempt: told Claude "be creative" with 7 MCP tools connected.

got the exact same purple-neon output three times in a row. every "creative" prototype looked identical.

[image: v1-voxforge-hero.png]

## Tweet 3
the fix wasn't better prompts. it was showing a reference screenshot instead of describing what I wanted.

"be creative" → same output every time
"clone this, swap the palette" → actually different results

## Tweet 4
went from 7 phases to 3:

1. scrape URL with Firecrawl → extract branding → plan.md
2. clone reference section-by-section → 2 prototypes
3. Playwright screenshot → compare to reference → fix (3x max)

## Tweet 5
the self-fixing loop is the most useful part:

build → type-check → lint → pass? → self-review → done
                              ↓
                         fail → fix → rebuild (max 3 rounds)

resolves most issues in 1-2 rounds without human input.

## Tweet 6
context window tip: /clear between phases.

Phase 1 scraping results pollute Phase 2 code generation. write plan.md as a file, clear context, let the next phase read it fresh.

## Tweet 7
3 prompt engineering tips that actually mattered:

- show screenshots, don't describe
- cap self-fix loops at 3 rounds
- file-based handoff between phases (plan.md), not conversation context

## Tweet 8
another one: 900 lines in one prompt = Claude ignores the bottom half.

349 lines per file with clear phase boundaries = follows everything.

context budget per phase > total prompt length.

## Tweet 9
actual results:

- 33 files, ~3,570 LOC
- Next.js + React 19 + Auth.js v5
- 795 lines of slash command prompts
- 9 MCP servers as agent tools
- URL to deployed app in ~30 min

## Tweet 10
the prompts are 795 lines of markdown. open source, MIT.

English + Korean versions. if you use Claude Code, you can run /prototype and it just goes.

github.com/lofcgi/claude-code-best-of-n
