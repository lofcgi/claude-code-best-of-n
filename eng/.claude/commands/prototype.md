---
description: Generate 3 UI prototype interfaces using v0, design references, and AI components
allowed-tools: [Read, Write, Bash, Glob, Grep, "mcp:firecrawl:*", "mcp:context7:*", "mcp:v0:*", "mcp:21st-dev-magic:*", "mcp:design-inspiration:*"]
---

Read analysis/prd.md and generate 3 UI interface prototypes.

## Tasks

1. Read analysis/prd.md and analysis/requirements.json

1-1. **Design Reference Research with Design Inspiration MCP** (if MCP available):
   - Search Dribbble, Behance, and Awwwards for design references related to the PRD's domain
   - Analyze UI layouts, color schemes, typography, and interaction patterns
   - Use findings to inform prototype design
   → If MCP unavailable: Skip this step and proceed. Inform the user: "Skipping design reference research — Design Inspiration MCP not connected."

1-2. **UI Component Inspiration with 21st-dev Magic MCP** (if MCP available):
   - Explore UI component patterns and design systems relevant to the project
   - Identify reusable component ideas for the prototypes
   → If MCP unavailable: Skip this step and proceed. Inform the user: "Skipping UI component exploration — 21st-dev Magic MCP not connected."

1-3. **Competitor App UI Research with Firecrawl** (if MCP available):
   - Crawl competitor apps or similar services mentioned in the PRD using Firecrawl
   - Analyze UI layouts, navigation patterns, and key feature placement
   - Use findings to inform prototype design
   → If MCP unavailable: Skip this step and proceed. Inform the user: "Skipping competitor UI research — Firecrawl not connected."

2. Determine 3 interface concepts:
   - Interface A: Minimal (single page, focused on core features)
   - Interface B: Dashboard (SaaS style, sidebar + main)
   - Interface C: Studio (professional tool feel, media-centric)

3. Generate code for each concept in prototypes/interface-{a,b,c}/:
   - Use v0 MCP to generate prototype code (if available)
   - Fallback: Write React + shadcn/ui code directly
   - page.tsx (main page layout)
   - components/ (core UI components)
   - Tech: React + shadcn/ui + Tailwind CSS
   - Dark mode by default

4. Include README.md in each prototype:
   - Design concept description
   - Screen layout explanation
   - Pros and cons

5. Summarize all 3 prototypes in a table:
   | Prototype | Concept | Pros | Cons |
   Ask the user to choose, then after selection guide:
   "Selection complete. Next step: run /setup-versions {a|b|c}"
