---
description: Reference-based 3 UI prototype generation — structural differentiation + image-first + specific content
allowed-tools: [Read, Write, Bash, Glob, Grep, "mcp:firecrawl:*", "mcp:context7:*", "mcp:21st-dev-magic:*", "mcp:design-inspiration:*", "mcp:playwright:*", "mcp:unsplash:*", "mcp:defuddle-fetch:*", "mcp:lighthouse-mcp:*"]
---

Read analysis/prd.md and generate 3 UI interface prototypes.

## Core Philosophy

**4 axes to break free from "AI-generated cookie-cutter" designs:**
1. **Reference-based generation** — Extract and follow the section structure (composition) of professional sites
2. **Image-first** — 60% of pro sites' visual richness comes from images. No text+icon-only sections allowed
3. **Specific content** — No round numbers/cliche copy. Use specific figures + brand-unique expressions
4. **Visual density** — Single-layer backgrounds/conservative typography/default buttons are AI slop indicators.
   You MUST follow `prototype-references/visual-architecture.md` and
   `prototype-references/aesthetics-guide.md`.

---

## Pre-checks (Perform first)

1. **Environment variables and MCP live operation verification** (must follow order below):

   a) Verify required environment variables exist via Bash:
      ```bash
      echo "FIRECRAWL_API_KEY=${FIRECRAWL_API_KEY:+설정됨}"
      echo "SERPER_API_KEY=${SERPER_API_KEY:+설정됨}"
      echo "TWENTY_FIRST_API_KEY=${TWENTY_FIRST_API_KEY:+설정됨}"
      echo "UNSPLASH_ACCESS_KEY=${UNSPLASH_ACCESS_KEY:+설정됨}"
      ```
      → If output is empty, the environment variable is missing ❌

   b) Test call each required MCP server (verify the tool actually works):
      - Firecrawl: Call `firecrawl_scrape` (url: "https://example.com", formats: ["markdown"])
      - Design Inspiration: Simple search test call
      - 21st-dev Magic: Simple component search test call
      - Context7: Call `resolve-library-id` (libraryName: "react", query: "test")
      - Unsplash: Call `search_photos` (query: "test") — treat as recommended if unavailable
      - Defuddle: Test call `defuddle_fetch` — fall back to Firecrawl if unavailable
      → If each call responds without errors ✅, if error occurs ❌

   c) Output results as a table:
      | MCP Server | Env Variable | Test Call | Final | Required | Purpose |
      |------------|-------------|-----------|-------|----------|---------|
      | Firecrawl | ✅/❌ | ✅/❌ | ✅/❌ | **Required** | Competitor app UI + branding token extraction |
      | Design Inspiration | ✅/❌ | ✅/❌ | ✅/❌ | **Required** | Design reference research |
      | 21st-dev Magic | ✅/❌ | ✅/❌ | ✅/❌ | **Required** | UI component generation/polishing |
      | Context7 | N/A | ✅/❌ | ✅/❌ | **Required** | Latest framework documentation reference |
      | Unsplash | ✅/❌ | ✅/❌ | ✅/❌ | **Recommended** | High-quality image curation |
      | Defuddle | N/A | ✅/❌ | ✅/❌ | **Recommended** | Clean content structure extraction |
      | Lighthouse | N/A | ✅/❌ | ✅/❌ | **Recommended** | Accessibility/performance score verification |

> **⛔ CRITICAL: If any required MCP's final status is ❌ — stop immediately.**
> **Never bypass with "proceeding without it", "skipping", etc.**
> Print the following instructions and do NOT start prototyping:
> 1. Check if `.mcp.json` file exists → if not, `cp .mcp.json.example .mcp.json`
> 2. Set required API key environment variables:
>    - `FIRECRAWL_API_KEY` — https://firecrawl.dev
>    - `SERPER_API_KEY` — https://serper.dev (for Design Inspiration)
>    - `TWENTY_FIRST_API_KEY` — https://21st.dev (for Magic MCP)
> 3. Restart Claude Code (exit → claude)
> 4. Verify all required servers show ✅ with `/mcp` command
> 5. Run `/prototype` again

2. **Recommended plugin check** — If the `frontend-design` plugin is installed, Phase 4 code generation quality improves significantly:
   ```bash
   claude plugin list 2>/dev/null | grep -q "frontend-design" && echo "✅ frontend-design 플러그인 설치됨" || echo "⚠️ 미설치 — 권장: /plugin marketplace add anthropics/claude-code && /plugin install frontend-design@claude-code-plugins"
   ```
   - **⚠️ Do not stop even if not installed** — This is a recommendation, not a requirement

3. Verify that analysis/prd.md and analysis/requirements.json files exist
   → If missing, display "Please run /analyze first" and stop

---

## Pipeline Execution (7 Phases)

Each Phase has detailed instructions in its own sub-skill file.
**You MUST execute in order, and only proceed to the next Phase after passing each Phase's CHECKPOINT.**

### Phase 1: 3-Layer Design Research
Read and execute `.claude/commands/prototype-phases/p1-research.md`.
- 3-layer extraction: Structure (Defuddle) + Branding (Firecrawl branding) + Visual (Playwright)
- Expanded image curation: 8-10 images per concept
- Output: `prototypes/research.md` (9 sections), `prototypes/reference-tokens.json`

### Phase 2: Concept Derivation
Read and execute `.claude/commands/prototype-phases/p2-concepts.md`.
- Includes section composition differentiation matrix
- Output: `prototypes/concepts.md`

### Phase 3: Project Scaffolding
Read and execute `.claude/commands/prototype-phases/p3-scaffold.md`.
- Font installation + SectionWrapper + design-tokens.ts
- Output: `prototypes/_app/` project

### Phase 4: Section-by-Section Code Generation
Read and execute `.claude/commands/prototype-phases/p4-generate.md`.
- **⛔ No function definitions in page files (export default only)**
- **⛔ No inline hex values (import from design-tokens.ts)**
- **⛔ No inline component definitions (import from components/ only)**
- Reference consultation required: visual-architecture.md, aesthetics-guide.md, section-templates.md, copy-guide.md
- Output: Section components + page files

### Phase 5: Ralph Loop (Autonomous Visual Feedback)
Read and execute `.claude/commands/prototype-phases/p5-ralph-loop.md`.
- Generate → Screenshot → Evaluate → Fix autonomous loop (max 3 iterations)
- Reference comparison: Compare visual density against sites like perso.ai
- Output: `prototypes/ralph-loop-log.md`

### Phase 6: Quality Gates
Read and execute `.claude/commands/prototype-phases/p6-quality-gates.md`.
- Gate 1: Static analysis (0 inline hex, 0 forbidden fonts, sections ≥ 8)
- Gate 2: Build verification (0 errors)
- Gate 3: Visual scorecard (all structural checks pass, visual 10/13)
- Gate 4: Lighthouse (a11y ≥ 80)
- Output: `prototypes/quality-report.md`

### Phase 7: Finalization + Output
Read and execute `.claude/commands/prototype-phases/p7-finalize.md`.
- Final screenshots + reference comparison
- Present 3 prototypes to user in a table
- Request selection

---

## Core Rules Summary (Common to All Phases)

| Rule | Description |
|------|-------------|
| No inline hex | Import from design-tokens.ts |
| No functions in page files | export default only, import everything else from components/ |
| No inline components | Import from components/premium/ or components/sections/ |
| SectionWrapper required | Minimum 2-layer background for all sections |
| Images required | No text+icon-only Feature cards |
| Specific figures | No round numbers (10,847 not 10,000) |
| Spring physics | No linear easing |
| py-40 minimum | No py-24/py-32 |
| 8+ sections | Minimum 8 sections per landing page |
| Hero 5 layers | No fewer than 5 layers |
| CTA glow | No default filled buttons, box-shadow 30px+ |
| Custom fonts | No Inter/Roboto/Arial |
