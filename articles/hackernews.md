# Show HN: Claude Code slash commands that turn a URL into a deployed app

**Link**: https://github.com/lofcgi/claude-code-best-of-n

---

**Comment:**

I built a set of Claude Code slash commands (795 lines of markdown prompts) that take a URL as input and output a deployed full-stack app.

How it works: three commands. `/prototype` scrapes the URL with Firecrawl, extracts branding (colors, fonts, spacing), and generates 2 UI prototypes by cloning the reference section-by-section. `/implement` converts the prototype to a full-stack Next.js app with an autonomous build → type-check → lint → self-review → fix loop (capped at 3 rounds). `/ship` validates env vars and deploys to Vercel.

The prompts went through 4 rewrites. v1 was a monolithic 900-line prompt that told Claude to "be creative" — every output looked identical (purple neon everything). v2 modularized into 7 phases — better structure, same generic results. v3 switched to reference-based cloning — quality jumped immediately. v4 simplified to 3 phases and added a Playwright visual diff loop.

Key lesson: telling Claude to "be creative" produces the median of its training data. Showing a reference screenshot and saying "clone this, swap the palette" produces diverse, professional-looking output.

The pipeline uses 9 MCP servers as agent tools (Firecrawl, Playwright, 21st-dev, Context7, Unsplash, etc.). Each phase writes files (plan.md, analysis/) that the next phase reads — file-based handoff with `/clear` between phases for context management.

Real run: URL in, 30 minutes, 33 files / ~3,570 LOC deployed.

Open source (MIT), available in English and Korean. Happy to answer questions about the prompt architecture or MCP setup.
