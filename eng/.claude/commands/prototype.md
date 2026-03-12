---
description: Generate 3 reference-based UI prototypes — structural differentiation + image-first + specific content
allowed-tools: [Read, Write, Bash, Glob, Grep, "mcp:firecrawl:*", "mcp:context7:*", "mcp:21st-dev-magic:*", "mcp:design-inspiration:*", "mcp:playwright:*", "mcp:unsplash:*"]
---

Read analysis/prd.md and generate 3 UI interface prototypes.

## Core Philosophy

**Three pillars to break free from "generic AI-generated" designs:**
1. **Reference-based generation** — Extract section compositions from professional sites and follow their structure
2. **Image-first** — 60% of a professional site's visual richness comes from images. Sections with only text + icons are prohibited
3. **Specific content** — No round numbers or cliche copy. Use specific metrics + brand-unique expressions

## Pre-checks (perform first)

1. **Verify environment variables and live MCP operation** (follow this exact order):

   a) Use Bash to confirm required environment variables exist:
      ```bash
      echo "FIRECRAWL_API_KEY=${FIRECRAWL_API_KEY:+set}"
      echo "SERPER_API_KEY=${SERPER_API_KEY:+set}"
      echo "TWENTY_FIRST_API_KEY=${TWENTY_FIRST_API_KEY:+set}"
      echo "UNSPLASH_ACCESS_KEY=${UNSPLASH_ACCESS_KEY:+set}"
      ```
      → If output is empty, the corresponding environment variable is missing ❌

   b) Make a test call to each required MCP server (verify the tool actually works):
      - Firecrawl: Call `firecrawl_scrape` (url: "https://example.com", formats: ["markdown"])
      - Design Inspiration: Make a simple search test call
      - 21st-dev Magic: Make a simple component search test call
      - Context7: Call `resolve-library-id` (libraryName: "react", query: "test")
      - Unsplash: Call `search_photos` (query: "test") — treat as recommended if unavailable
      → If each call responds without error ✅, if error occurs ❌

   c) Output results as a table:
      | MCP Server | Env Variable | Test Call | Final | Required | Purpose |
      |------------|-------------|-----------|-------|----------|---------|
      | Firecrawl | ✅/❌ | ✅/❌ | ✅/❌ | **Required** | Competitor app UI + reference blueprint extraction |
      | Design Inspiration | ✅/❌ | ✅/❌ | ✅/❌ | **Required** | Design reference research |
      | 21st-dev Magic | ✅/❌ | ✅/❌ | ✅/❌ | **Required** | UI component generation/polishing |
      | Context7 | N/A | ✅/❌ | ✅/❌ | **Required** | Latest framework documentation reference |
      | Unsplash | ✅/❌ | ✅/❌ | ✅/❌ | **Recommended** | High-quality image curation |

> **⛔ CRITICAL: If any required MCP's final status is ❌ — stop immediately.**
> **Never bypass with "proceeding without it", "skipping", etc.**
> Print the following instructions and do not start prototyping:
> 1. Check if `.mcp.json` file exists → if not, run `cp .mcp.json.example .mcp.json`
> 2. Set the required API key environment variables:
>    - `FIRECRAWL_API_KEY` — https://firecrawl.dev
>    - `SERPER_API_KEY` — https://serper.dev (for Design Inspiration)
>    - `TWENTY_FIRST_API_KEY` — https://21st.dev (for Magic MCP)
> 3. Restart Claude Code (exit → claude)
> 4. Run `/mcp` to confirm all required servers show ✅
> 5. Run `/prototype` again

2. **Check recommended plugin** — If the `frontend-design` plugin is installed, Phase 4 code generation quality improves significantly:
   ```bash
   claude plugin list 2>/dev/null | grep -q "frontend-design" && echo "✅ frontend-design plugin installed" || echo "⚠️ Not installed — recommended: /plugin marketplace add anthropics/claude-code && /plugin install frontend-design@claude-code-plugins"
   ```
   - When installed: Bold aesthetics, differentiated typography/palettes, asymmetric layouts, and high-quality animations are automatically applied
   - When not installed: The skill's instructions alone will still work, but the plugin provides stronger baseline quality guarantees
   - **⚠️ Do NOT stop if not installed** — this is a recommendation, not a requirement

3. Verify that analysis/prd.md and analysis/requirements.json files exist
   → If missing, display "Run /analyze first" and stop

---

## Phase 1: Research (output: `prototypes/research.md`)

1. Read analysis/prd.md and analysis/requirements.json.

2. **Call Design Inspiration MCP and record results in research.md**:
   - Call `collectui_search` or `collectui_browse` with 3-4 keywords related to the PRD domain
   - Analyze UI layouts, color schemes, typography, and interaction patterns
   - **Search for at least 3 different visual styles including both dark mode and light mode**
   - **Record all results in `prototypes/research.md`**

3. **Call 21st-dev Magic MCP `component_inspiration` and record results in research.md**:
   - Search for 3-4 core component types needed for the project (e.g., card, sidebar, table, kanban)
   - **Record all results in `prototypes/research.md`**

4. **Scrape 2-3 competitor apps with Firecrawl and record results in research.md**:
   - Crawl URLs of competitor apps or similar services mentioned in the PRD using `firecrawl_scrape`
   - Analyze UI layouts, navigation patterns, and branding (colors, fonts)
   - **Extract 3 different palette directions from competitor color schemes. At least one must use a fundamentally different hue family.**
   - **Record all results in `prototypes/research.md`**

5. **Scrape 2-3 modern landing page references with Firecrawl and record results in research.md**:
   - Research the latest SaaS/app landing page trends (e.g., perso.ai, linear.app, vercel.com, cal.com, etc.)
   - Analysis points:
     - Hero section composition (headline + subtext + CTA placement)
     - Scroll animation patterns (fade-in, slide-up, parallax)
     - Section transition methods (full-screen snap, smooth scroll)
     - Trust element placement (logo marquee, statistics, social proof)
     - CTA button styling and placement strategy

6. **🆕 Scrape additional premium references with Firecrawl** (beyond competitor apps):
   - `https://stripe.com/` — bento grids, real product mockups, depth
   - `https://perso.ai/` — AI service landing benchmark
   - `https://height.app/` — SVG wave hero backgrounds
   - Use WebSearch to discover 1-2 additional award-winning landing pages
   - Record discovered visual techniques in research.md §4 (Design References)

7. **Scrape premium component galleries with Firecrawl**:
   - Scrape `https://ui.aceternity.com/components` → extract premium component names + descriptions
   - Scrape `https://magicui.design/docs/components` → extract animation component names + descriptions
   - Record per-section premium component mapping in research.md §7

8. **🆕🔑 Reference section blueprint extraction** (core input for Phase 4):
   - Scrape the top service in the PRD domain (perso.ai or #1 competitor) + 1 premium reference with Firecrawl
   - **Extract full section order list** (Hero → Trust → Features → ...)
   - **Layout pattern for each section** (60/40 split, 3-col grid, full-width, bento, etc.)
   - **Content type for each section** (text only, image+text, interactive, statistics, etc.)
   - Record in research.md §9:
     ```
     ## 9. Reference Section Blueprint
     Source: {URL}
     1. Hero: 60/40 split (text left, product image right), trust badge below
     2. Trust Metrics: 4-col statistics (specific numbers + labels)
     3. Client Logos: infinite marquee or grid
     4. Feature Showcase: image carousel + descriptions
     5. Comparison Table: vs. competitors table
     6. Benefits Grid: 6-col icon+number cards
     7. Product Demo: app screenshot inside browser frame
     8. Testimonials: photo + quote + name/role
     9. Workflow/Process: step-by-step visuals
     10. FAQ: accordion
     ...minimum 10 sections
     ```
   - **Why**: This blueprint determines section structure in Phase 4. Following a professional site's structure breaks away from AI patterns.

9. **🆕🔑 Per-section image mapping** (enhanced image strategy):
   - Search PRD domain-related keywords (4-5 keywords) using Unsplash MCP `search_photos`
   - If UNSPLASH_ACCESS_KEY is unavailable, scrape Unsplash search result pages with Firecrawl
   - **Specify image usage approach for each section type**:
     ```
     ## 6. Curated Images (per-section mapping)

     ### Image Usage Strategy
     - Hero background: CSS gradient + overlay (gradient mask over image)
     - Hero right side: App page screenshot inside BrowserMockup (captured in Phase 4.5)
     - Feature cards: relevant image for each card (text+icon only is prohibited)
     - Trust section: actual service screenshots (CSS browser frame)
     - Testimonial: Unsplash avatars (40x40) + name + role
     - Process Flow: step-by-step screenshots or icon illustrations beside each step

     ### For Concept A
     - Hero product image: [App page Playwright screenshot — captured in Phase 4.5]
     - Feature 1: Unsplash URL — {domain-related}
     - Feature 2: Unsplash URL — {domain-related}
     - Feature 3: Unsplash URL — {domain-related}
     - Trust background: CSS gradient (from palette)

     ### For Concept B ...
     ### For Concept C ...
     ```
   - **Unsplash image URL format**: `https://images.unsplash.com/photo-{id}?w={width}&h={height}&fit=crop&q=80`
   - If UNSPLASH_ACCESS_KEY is unavailable: substitute with picsum.photos and CSS gradients

10. **Anti-pattern blocklist — record in research.md §8**:
    ```
    ## 8. Anti-patterns (Blocklist)
    - Symmetric 3-column identical grids (→ use BentoGrid)
    - Center-aligned-only layouts (→ use asymmetric placement)
    - Flat cards without hover effects (→ use Spotlight/Glare effects)
    - Gray placeholder boxes (→ use CSS mockups or gradients)
    - linear easing animations (→ use spring physics)
    - Single-layer backgrounds (→ layer gradient + pattern + particles)
    - Uniform section heights (→ vary dramatically: min-h-screen hero, compact stats)
    - Round numbers (10,000, 100%) (→ specific figures: 10,847, 98.5%)
    - Cliche copy ("innovative", "next-gen", "all-in-one") (→ brand-unique expressions)
    - Feature cards with only text+icons (→ images or CSS visuals required)
    - 5-6 section layouts (→ minimum 8 sections)
    ```

11. **Capture reference app screenshots with Playwright and save them**:
    - Select 2-3 URLs from the design references section of research.md
    - Run `browser_navigate` → `browser_take_screenshot` for each URL
    - Save screenshots to `prototypes/references/` directory (filename: `ref-{appname}.png`)
    - **Also capture screenshots of Stripe, Perso.ai, Height.app** (for premium references)

12. **Structure and write the `prototypes/research.md` file with the following 9 sections**:
    ```markdown
    # Design Research

    ## 1. Color Palettes (3 Visual Identities)
    ### Palette A: {mood name}
    - Mode: dark/light
    - Primary: #hex — usage
    - Accent: #hex — usage
    - Surface: #hex — background
    - Text: #hex — body text
    - Mood: one-line description

    ### Palette B: {mood name}
    (same structure)

    ### Palette C: {mood name}
    (same structure)

    ## 2. Recommended Layout Patterns
    ## 3. Core Component List
    ## 4. Design References
    ## 5. Landing Page Patterns

    ## 6. Curated Images (per-section mapping)
    (Image usage strategy + per-concept mapping from step 9 above)

    ## 7. Premium Component Mapping
    ## 8. Anti-patterns (Blocklist)

    ## 9. Reference Section Blueprint
    (Section structure extraction results from step 8 above)
    ```

> **CHECKPOINT**: Verify that `prototypes/research.md` contains all 9 sections (including §9 Reference Section Blueprint), §6 has per-section image mapping, and `prototypes/references/` contains at least 2 screenshots.

---

## Phase 2: Concept Definition (output: `prototypes/concepts.md`)

Define 3 interface concepts based on `prototypes/research.md` and `analysis/prd.md`.
**Record everything in `prototypes/concepts.md` with the structure below.**

### 2-A: Page Structure Design (PRD + concept-based)
- Synthesize PRD functional requirements and each concept's UX direction to freely design pages/views needed for each prototype
- **Page composition can differ per concept** — do not force a fixed "main + secondary" structure
- Minimum 3 pages, maximum 4 pages (landing + 2-3 app pages)
- **All concepts must start with a landing page (`/{x}`)**:
  - `/{x}` = Landing page (Hero + feature introduction + CTA)
  - `/{x}/app` or `/{x}/dashboard` etc. = Actual app feature pages

### 2-B: Per-concept Definition (include all items below for each concept)
1. **Concept name**
2. **Core layout pattern**
3. **Target user**
4. **Differentiator**
5. **Visual identity**: One of Palette A/B/C from research.md (each concept must use a different palette)
6. **Page composition**: Page list designed for this concept + route paths + each page's role
7. **Visual asset direction**: Description of visual elements suitable for this concept
8. **Landing page composition**: Hero section style + main section flow + CTA copy/action
9. **Animation direction**: Transition/scroll animation style suitable for this concept
10. **Premium component selection** (must select from research.md §7):
    - Hero technique: {AuroraBackground | HeroParallax | LampEffect | BackgroundBeams} — **All 3 concepts must use different Hero techniques**
    - Feature layout: {BentoGrid | CardSpotlight Grid | GlareCard Row | MagicCard Grid} — **At least 1 concept must use BentoGrid**
    - Social Proof: {InfiniteMovingCards | AnimatedBeam | NumberTicker}
    - Background decoration: 1-2 from {SparklesCore, DotPattern, Meteors, GridPattern}
    - Text animation: {TextGenerateEffect | TypingAnimation | BlurIn}
    - Navigation: {FloatingNavbar | FloatingDock}

### 2-C: 🆕🔑 Section Composition Differentiation Matrix (required)

**Section order and types must differ per concept.** Repeating the same 5 sections with only color changes 3 times → homogenization. The structure itself must differ for genuinely "different concepts".

Based on the reference blueprint in research.md §9, define differentiated section compositions for each concept:

```
## Differentiation Matrix

| Element | Concept A | Concept B | Concept C |
|---------|-----------|-----------|-----------|
| Section count | 10 | 8 | 9 |
| 2nd section | Trust Metrics | Product Demo | Client Logos |
| 3rd section | BentoGrid Features | Comparison Table | Video Showcase |
| Social Proof position | 6th | 4th | 8th |
| Pricing included | No | Yes | No |
| FAQ included | No | No | Yes |
| Unique section | Comparison Table | Interactive Demo | Case Studies |
```

**Rules**:
- Minimum 8 sections per concept
- At least 2 section types must differ across the 3 concepts
- Section order must be different for all (identical ordering is prohibited)

- The 3 concepts must represent fundamentally different UX paradigms
- The 3 concepts must use different visual identities (palettes)
- **The 3 concepts must use different Hero techniques — structural differentiation, not just color changes**
- **🆕 The 3 concepts must have different section compositions**

> **CHECKPOINT**: Verify that `prototypes/concepts.md` has 3 concepts each assigned a different Palette, different Hero technique, **different section composition**, includes the differentiation matrix, and each concept has at least 8 sections defined.

---

## Phase 3: Project Scaffolding

a) **Create project** (per official docs):
   ```bash
   npx create-next-app@latest prototypes/_app --yes
   ```
   `--yes`: Automatically applies recommended defaults for TypeScript, Tailwind CSS, App Router, Turbopack, etc.

b) **Install shadcn/ui + dependencies**:
   ```bash
   cd prototypes/_app
   npx shadcn@latest init -t next
   npx shadcn@latest add button input checkbox badge dropdown-menu select dialog avatar scroll-area separator table textarea card
   npm install lucide-react framer-motion mini-svg-data-uri
   ```

c) **Common layout** (app/layout.tsx):
   - Keep dark mode as default (dark class on html)
   - Common fonts, metadata
   - Light-mode prototypes use a `className="light"` wrapper on their own pages to override

d) **Add external image domains to `next.config.ts`**:
   ```typescript
   images: {
     remotePatterns: [
       { protocol: 'https', hostname: 'picsum.photos' },
       { protocol: 'https', hostname: 'images.unsplash.com' },
       { protocol: 'https', hostname: 'illustrations.popsy.co' },
     ],
   },
   ```

e) **Create `components/premium/` directory**:
   ```bash
   mkdir -p prototypes/_app/components/premium
   ```
   Premium Aceternity/Magic UI component code will be placed in this directory during Phase 4.

f) **Append premium utility CSS to `app/globals.css`** (after existing styles):
   ```css
   /* === Premium Visual Utilities === */

   /* Aurora animation */
   @keyframes aurora {
     0%, 100% { background-position: 50% 50%, 50% 50%; }
     50% { background-position: 100% 50%, 0% 50%; }
   }
   .animate-aurora {
     animation: aurora 15s ease infinite;
     background-size: 300% 300%, 200% 200%;
   }

   /* Grain/Noise texture overlay */
   .bg-noise::after {
     content: "";
     position: absolute;
     inset: 0;
     background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
     opacity: 0.02;
     pointer-events: none;
     z-index: 1;
   }

   /* Grid pattern background */
   .bg-grid {
     background-image:
       linear-gradient(to right, hsl(var(--foreground) / 0.03) 1px, transparent 1px),
       linear-gradient(to bottom, hsl(var(--foreground) / 0.03) 1px, transparent 1px);
     background-size: 40px 40px;
   }

   /* Dot pattern background */
   .bg-dots {
     background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
     background-size: 24px 24px;
     opacity: 0.15;
   }

   /* Infinite marquee */
   @keyframes marquee {
     from { transform: translateX(0); }
     to { transform: translateX(-50%); }
   }
   .animate-marquee {
     animation: marquee 30s linear infinite;
   }

   /* Shimmer skeleton */
   @keyframes shimmer {
     from { background-position: -200% 0; }
     to { background-position: 200% 0; }
   }
   .animate-shimmer {
     background: linear-gradient(90deg, transparent 25%, hsl(var(--foreground) / 0.05) 50%, transparent 75%);
     background-size: 200% 100%;
     animation: shimmer 2s ease-in-out infinite;
   }

   /* Spotlight cursor-tracking glow */
   .card-spotlight {
     position: relative;
     overflow: hidden;
   }
   .card-spotlight::before {
     content: "";
     position: absolute;
     inset: 0;
     background: radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), hsl(var(--primary) / 0.06), transparent 40%);
     pointer-events: none;
     z-index: 1;
   }

   /* Button/Card glow effect */
   .glow {
     box-shadow: 0 0 20px -5px hsl(var(--primary) / 0.3);
   }
   .glow-hover:hover {
     box-shadow: 0 0 30px -5px hsl(var(--primary) / 0.5);
   }
   ```

g) **Extend `lib/utils.ts`** — add utility functions beyond the existing `cn()`:
   ```typescript
   // Add below the cn() function:
   export function generateNoisePattern(opacity: number = 0.02): string {
     return `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='${opacity}'/%3E%3C/svg%3E")`;
   }
   ```

h) **🆕 Auto-generate `lib/design-tokens.ts`** (research.md → code constants):
   ```typescript
   // Auto-generated from research.md palette data
   export const palettes = {
     a: {
       primary: "{Palette A Primary hex}",
       accent: "{Palette A Accent hex}",
       surface: "{Palette A Surface hex}",
       text: "{Palette A Text hex}",
       mode: "dark" | "light",
     },
     b: { /* Palette B */ },
     c: { /* Palette C */ },
   } as const;

   // Image URL mapping from research.md §6
   export const images = {
     a: {
       hero: "{Unsplash URL or placeholder}",
       features: ["{URL1}", "{URL2}", "{URL3}"],
       avatars: ["{URL1}", "{URL2}", "{URL3}"],
     },
     b: { /* ... */ },
     c: { /* ... */ },
   } as const;
   ```
   - **No inline hex values** — all pages must import from this file

---

## Phase 4: Page Code Generation (🆕 fundamental redesign — Claude Code generates directly)

> **⛔ v0 removed. Claude Code generates code directly.**
> Generated using reference blueprints + prebuilt components + design tokens.
>
> **💡 If the `frontend-design` plugin is installed** — it automatically activates during this Phase,
> applying bold aesthetic choices, asymmetric compositions, and high-quality typography/motion by default.
> The plugin's design judgment + this skill's reference blueprints/copy guidelines combine for the best results.

### Generation Order (important!)
1. **Generate app pages first** (app/{x}/app/page.tsx, etc.)
2. Capture app page screenshots in Phase 4.5
3. **Generate landing pages** — insert app screenshots into BrowserMockup

### Preparation: Fetch premium component code via Context7

1. `resolve-library-id("aceternity-ui")` → `query-docs("{component names from concepts.md item 10}")`
2. `resolve-library-id("magic-ui")` → `query-docs("{component names from concepts.md item 10}")`
3. Save extracted component source code to `components/premium/` directory:
   ```
   components/premium/
   ├── spotlight-card.tsx     — mouse-tracking glow (applied to all cards by default)
   ├── multi-layer-hero.tsx   — 4-layer Hero background
   ├── bento-grid.tsx         — asymmetric grid
   ├── browser-mockup.tsx     — CSS browser frame (critical — wraps app screenshots)
   ├── infinite-marquee.tsx   — seamless marquee
   ├── text-reveal.tsx        — text animation
   ├── number-ticker.tsx      — count-up
   └── floating-nav.tsx       — glass-morphism navigation
   ```

### App Page Generation Rules

Write code directly based on research.md's design system + concepts.md's concept definitions:

- Import colors/images from `design-tokens.ts` (no inline hex)
- Import UI components from `components/premium/`
- Reference screenshots in `prototypes/references/` via Read to match visual quality
- App page premium requirements:
  - Sidebar/Nav: glass-morphism (backdrop-blur-md, bg-white/5 or bg-black/20, subtle 1px border at 10% opacity)
  - Cards: must have hover effects — border glow or cursor-following spotlight
  - Empty states: CSS abstract shape illustrations — plain text only is prohibited
  - Micro-interactions: button press scale(0.97), input focus primary glow ring
  - All animations: spring physics `{ type: "spring", stiffness: 200, damping: 25 }` — linear is prohibited

### Landing Page Generation Rules (🆕 core change)

**Follow the "Reference Section Blueprint" from research.md §9 for section composition.**
**Apply the differentiated per-concept section order defined in concepts.md's differentiation matrix.**

For each section:
1. Import colors/images from `design-tokens.ts` (no inline hex)
2. Import UI components from `components/premium/`
3. **Use Unsplash images extensively (sections with only text+icons are prohibited)**
4. **Use specific figures (98.5%, 400K+, 10X, etc. — round numbers are prohibited)**

### Copywriting Guidelines (🆕)
- **Headlines**: 2-4 words, brand-unique expressions (cliches prohibited: "innovative", "next-gen", "all-in-one")
- **Subtext**: 1 sentence, 15-20 words, include specific figures
- **Feature names**: 2-3 words, brand terminology (generic nouns prohibited)
- **CTA**: verb + benefit ("Start dubbing now" not "Get started")

### Required Sections (minimum 8)
1. FloatingNav (glass-morphism)
2. Hero (MultiLayerHero + BrowserMockup with app screenshot)
3. Trust Metrics (NumberTicker — 4 specific figures)
4. Feature Showcase (BentoGrid + SpotlightCard + images)
5. Product Demo / App Preview (BrowserMockup — full-size)
6. Social Proof (InfiniteMarquee or TestimonialGrid)
7. Process Flow (3-5 steps + per-step visuals)
8. Footer CTA
+ Additional per-concept sections (Comparison, FAQ, Pricing, Case Study, etc. — per differentiation matrix)

### Visual Asset Requirements (🆕)
- **Minimum 5 images per page (Unsplash/screenshots)**
- **At least 1 BrowserMockup** (app preview)
- **Feature cards with only text+icons are prohibited** (images or CSS visuals required)
- **Minimum 3 avatar images** (testimonials)

### Landing Visual Architecture (common rules for all sections, non-negotiable)
- Animations: must use spring physics `{ type: "spring", stiffness: 200, damping: 25 }`. linear/ease-in-out prohibited.
- Depth: every section must have at least 2 visual layers (background effect + content).
- Asymmetry: at least 2 sections must use off-center, asymmetric layouts.
- Hover: all interactive elements must have transform on hover.
- Grain: all gradient backgrounds must have a noise overlay (opacity 0.015-0.03).
- Spacing: section padding minimum py-32. Hero must be min-h-screen.
- Floating navigation: glass-morphism (backdrop-blur-md, bg-white/5, border-white/10)

### Execution Procedure

1. **Generate app pages first** (refer to concepts.md page composition):
   - app/a/app/page.tsx, app/b/app/page.tsx, app/c/app/page.tsx
   - Plus additional app pages

2. **Execute Phase 4.5** (see below) — capture app screenshots

3. **Generate landing pages** — insert app screenshots into BrowserMockup:
   - app/a/page.tsx, app/b/page.tsx, app/c/page.tsx
   - Follow the differentiation matrix section order exactly
   - Base on research.md §9 blueprint but apply per-concept variations

4. **app/page.tsx** ← Simple index with links to `/a`, `/b`, `/c` only (write directly)

> **CHECKPOINT**: Verify that all page files for each prototype have been created, no inline hex values exist (only design-tokens.ts references), and each landing page contains at least 8 sections.

---

## Phase 4.5: App Screenshots → Landing Injection (🆕 new)

> Execute this phase after app page generation is complete, before landing page generation.

1. **Start dev server**:
   ```bash
   cd prototypes/_app && npm run dev &
   ```
   Wait 3 seconds for server startup

2. **Take Playwright screenshots of each app page**:
   - Viewport screenshot (1280x800)
   - `browser_navigate` → `browser_take_screenshot`
   - Save to: `public/screenshots/{concept}-app.png`
   - Example: `public/screenshots/a-app.png`, `b-app.png`, `c-app.png`

3. **Display the corresponding screenshot inside BrowserMockup in each landing's Hero/Feature section**:
   ```tsx
   <BrowserMockup url="app.{projectname}.ai">
     <img src="/screenshots/a-app.png" alt="{Project Name} App" className="w-full" />
   </BrowserMockup>
   ```

4. **This is the key to achieving the perso.ai-like "showing the real product" feel**

5. Stop dev server (will restart during build verification)

---

## Phase 5: Structure + Content + Visual Checklist Verification (🆕 redesigned)

> **Replaces the previous 21st-dev-centric polishing with checklist-based verification.**
> Fix failed items directly in code during each round.

### Round 1 — Structure Verification:
Read each landing page's code with Read and check:
- □ Section count >= 8?
- □ BrowserMockup displays actual app screenshot (`/screenshots/`)?
- □ Zero inline hex colors? (design-tokens references only)
- □ At least 2 sections with asymmetric layout?
- □ Section order for all 3 landings matches the differentiation matrix?

→ Fix code for any failed items

### Round 2 — Visual Asset Verification:
- □ 5+ images used?
- □ Zero text+icon-only cards?
- □ 3+ avatar images?
- □ 3+ sections with CSS gradient/pattern backgrounds?
- □ At least 1 BrowserMockup?

→ Add images/visuals for any failed items

### Round 3 — Content Verification:
- □ Specific figures used instead of round numbers (10,000, 100%)?
- □ No cliches in headlines? ("innovative", "next-gen", "all-in-one")
- □ CTAs in verb+benefit format?
- □ Feature names use brand-specific terminology?

→ Fix copy for any failed items

### Round 4 — Differentiation Verification:
- □ Section order differs across all 3 landings?
- □ At least 2 section types differ across all 3 landings?
- □ Color palettes clearly distinguishable?
- □ Hero techniques all different?

→ Restructure sections or use 21st-dev refiner for differentiation if failed

### 21st-dev Selective Use (only if Round 4 fails)
- Call `21st_magic_component_refiner` for prototypes lacking differentiation (maximum 3 calls)
- Call with specific restructuring instructions

> **CHECKPOINT**: All 4 rounds passed. Zero failed items per round.

---

## Phase 6: Build Verification + Integration

1. Run `npm run build`

2. **shadcn v4 compatibility notes** (build error prevention):
   - `DialogTrigger`/`DialogClose`: Use `render={<Component />}` instead of `asChild`
   - `Select onValueChange`: `string | null` type — null check required
   - `Checkbox`: `@base-ui/react` based — verify `defaultChecked` instead of `checked` prop

3. Fix code directly if errors occur (maximum 3 attempts)

4. **Premium infrastructure verification**:
   - Confirm `components/premium/` directory exists
   - Confirm `globals.css` includes premium keyframes (aurora, marquee, shimmer)
   - Confirm `lib/utils.ts` includes `generateNoisePattern` function
   - Confirm `lib/design-tokens.ts` exists

5. Include a README.md for each prototype (prototypes/interface-{a,b,c}/README.md):
   - Design concept description
   - Screen composition description (including multi-page structure)
   - Premium components used
   - Section composition (from differentiation matrix)
   - Pros and cons

> **CHECKPOINT**: `npm run build` succeeds AND premium infrastructure + design-tokens verified. Do not proceed to Phase 7 if build fails.

---

## Phase 7: Visual Verification (Playwright) — 🆕 Enhanced Scorecard

1. Start the development server:
   ```bash
   cd prototypes/_app && npm run dev &
   ```
   Wait 3 seconds for server startup

2. **Take screenshots of all pages for each prototype**:
   - Reference page composition from concepts.md to screenshot all routes for each prototype
   - Run Playwright `browser_navigate` → `browser_take_screenshot`

3. **Scroll-based screenshots** — for each landing page:
   - Take screenshots at 5 scroll positions: 0%, 25%, 50%, 75%, 100%
   - Use Playwright `browser_evaluate` to run `window.scrollTo(0, document.body.scrollHeight * {pct})`
   - `browser_take_screenshot` at each position

4. **Analyze each screenshot with Read** — Claude multimodal vision:
   - Check for blank pages, error messages, broken layouts
   - Spacing/alignment issues
   - Color contrast problems
   - Whether research.md's design system is actually reflected
   - **Visual differentiation**: Do the 3 prototypes have different colors/moods?
   - **Visual assets**: Flag if only text+icons with no images/gradients/patterns
   - **BrowserMockup**: Is the app screenshot displaying correctly?
   - **Section count**: Are 8+ sections visible in scroll screenshots?
   - **Visual consistency between landing and app pages** (same palette)

5. **🆕 Premium Quality Scorecard** (evaluate per prototype, record results):

   ```
   ### Premium Quality Scorecard — Prototype {A/B/C}

   **Structure (all must pass)**
   [ ] Hero is min-h-screen
   [ ] Section count >= 8
   [ ] At least 1 section with asymmetric/bento layout
   [ ] Section spacing py-32 or greater
   [ ] Floating/glass-morphism navigation present
   [ ] BrowserMockup displays app screenshot

   **Visual Depth (5 of 6 must pass)**
   [ ] Hero has layered background (gradient + pattern + particles/decoration)
   [ ] Grain/noise texture present on gradient sections
   [ ] Card hover spotlight/glow effect working
   [ ] At least 1 section with parallax or scroll-reveal effect
   [ ] Background decoration elements present (blobs, beams, dots, meteors)
   [ ] 5+ images used (Unsplash/screenshots)

   **Content (3 of 4 must pass)**
   [ ] Specific figures used (no round numbers)
   [ ] No cliches in headlines
   [ ] CTAs in verb+benefit format
   [ ] Feature names use brand-specific terminology

   **Animation (3 of 4 must pass)**
   [ ] Text animation on Hero headline
   [ ] Scroll-entry animation on Feature cards (translate+fade)
   [ ] Count-up animation on Stats
   [ ] At least 1 ambient animation (particles, aurora, floating shapes, marquee)

   **Differentiation (all must pass)**
   [ ] All 3 prototype Hero techniques are different
   [ ] All 3 prototype Feature layouts are different
   [ ] All 3 prototype section compositions are different
   [ ] No shared background patterns
   [ ] Color palettes clearly distinguished (different hue families)
   ```

   **If more than 2 items fail**: Run a targeted fix round — fix specific failing items in code → re-screenshot → re-evaluate. Maximum 2 iterations.

6. **Fix discovered issues in code**:
   - Prioritize scorecard failures, then visual issues
   - Re-screenshot and re-analyze affected pages after fixes
   - Maximum 2 iterations

7. **Compare against reference screenshots in `prototypes/references/`**:
   - If there are clearly lacking visual elements compared to Stripe/Vercel/Linear references, make additional fixes

> **CHECKPOINT**: All screenshots show normal UI, premium quality scorecard passes for all 3 prototypes (maximum 2 failures allowed), all 3 prototypes are visually + structurally differentiated, and BrowserMockup displays app screenshots correctly.

---

## Final Output

1. Inform the user:
   "Check the 3 prototypes in your browser:
    - http://localhost:3000/a — Interface A ({concept name}): {page list}
    - http://localhost:3000/b — Interface B ({concept name}): {page list}
    - http://localhost:3000/c — Interface C ({concept name}): {page list}
   Please review and select one."

2. Summarize the 3 prototypes in a table:
   | Prototype | Entry URL | Concept | Palette | Hero Technique | Feature Layout | Section Count | Unique Sections | Pros | Cons |
   Ask the user to select, then after selection:
   - Stop the development server
   - "Selection complete. Next step: run /setup-versions {a|b|c}."

Final directory structure:
```
prototypes/
├── research.md               ← Phase 1 (9 sections: including §9 Reference Section Blueprint)
├── concepts.md               ← Phase 2 (concepts + differentiation matrix + premium component selection)
├── references/
│   ├── ref-{app1}.png
│   ├── ref-{app2}.png
│   ├── ref-{stripe}.png
│   └── ref-{landing-ref}.png
├── _app/
│   ├── app/
│   │   ├── globals.css        ← includes premium utility CSS
│   │   ├── layout.tsx
│   │   ├── page.tsx          ← links to /a, /b, /c
│   │   ├── a/
│   │   │   ├── page.tsx        ← landing (8+ sections, BrowserMockup + app screenshot)
│   │   │   ├── app/page.tsx    ← app feature page
│   │   │   └── {route}/page.tsx
│   │   ├── b/
│   │   │   ├── page.tsx        ← landing (different section composition)
│   │   │   ├── app/page.tsx
│   │   │   └── {route}/page.tsx
│   │   └── c/
│   │       ├── page.tsx        ← landing (different section composition)
│   │       ├── app/page.tsx
│   │       └── {route}/page.tsx
│   ├── components/
│   │   ├── ui/               ← shadcn/ui components
│   │   └── premium/          ← Aceternity/Magic UI component code
│   ├── lib/
│   │   ├── utils.ts          ← cn() + generateNoisePattern()
│   │   └── design-tokens.ts  ← palette + image URL constants
│   └── public/
│       └── screenshots/      ← app page Playwright screenshots
│           ├── a-app.png
│           ├── b-app.png
│           └── c-app.png
└── interface-{a,b,c}/
    └── README.md
```
