---
description: Generate 3 UI prototype interfaces using v0, design references, and AI components
allowed-tools: [Read, Write, Bash, Glob, Grep, "mcp:firecrawl:*", "mcp:context7:*", "mcp:v0:*", "mcp:21st-dev-magic:*", "mcp:design-inspiration:*", "mcp:playwright:*"]
---

Read analysis/prd.md and generate 3 UI interface prototypes.

## Pre-flight Checks (run first)

1. **Environment Variable & MCP Live Verification** (must follow this order):

   a) Check required environment variables via Bash:
      ```bash
      echo "FIRECRAWL_API_KEY=${FIRECRAWL_API_KEY:+set}"
      echo "SERPER_API_KEY=${SERPER_API_KEY:+set}"
      echo "TWENTY_FIRST_API_KEY=${TWENTY_FIRST_API_KEY:+set}"
      echo "UNSPLASH_ACCESS_KEY=${UNSPLASH_ACCESS_KEY:+set}"
      ```
      → If output is empty, that environment variable is ❌

   b) Test each required MCP server with a real call (verify tools actually work):
      - Firecrawl: call `firecrawl_scrape` (url: "https://example.com", formats: ["markdown"])
      - Design Inspiration: simple search test call
      - 21st-dev Magic: simple component search test call
      - Context7: call `resolve-library-id` (libraryName: "react", query: "test")
      - v0: call `getUser` to verify authentication status
      → If each call returns without error ✅, if error occurs ❌

   c) Display results in a table:
      | MCP Server | Env Var | Test Call | Final | Required | Purpose |
      |------------|---------|-----------|-------|----------|---------|
      | Firecrawl | ✅/❌ | ✅/❌ | ✅/❌ | **Required** | Competitor app UI research |
      | Design Inspiration | ✅/❌ | ✅/❌ | ✅/❌ | **Required** | Design reference research |
      | 21st-dev Magic | ✅/❌ | ✅/❌ | ✅/❌ | **Required** | UI component generation/polishing |
      | Context7 | N/A | ✅/❌ | ✅/❌ | **Required** | Latest framework docs reference |
      | v0 | N/A | ✅/❌ | ✅/❌ | **Required** | Prototype code generation |
      | Unsplash API | ✅/❌ | N/A | ✅/❌ | Recommended | High-quality images for landing pages |

> **⛔ CRITICAL: If any required MCP Final status is ❌ — stop immediately.**
> **Never bypass with "proceeding without", "skipping", etc.**
> Display the following guidance and do NOT begin prototyping:
> 1. Check if `.mcp.json` exists → if not, run `cp .mcp.json.example .mcp.json`
> 2. Set required API key environment variables:
>    - `FIRECRAWL_API_KEY` — https://firecrawl.dev
>    - `SERPER_API_KEY` — https://serper.dev (for Design Inspiration)
>    - `TWENTY_FIRST_API_KEY` — https://21st.dev (for Magic MCP)
> 3. Restart Claude Code (exit → claude)
> 4. Verify all required servers show ✅ with `/mcp` command
> 5. Run `/prototype` again

2. Verify analysis/prd.md and analysis/requirements.json exist
   → If missing, display "Please run /analyze first" and stop

---

## Phase 1: Research (output: `prototypes/research.md`)

1. Read analysis/prd.md and analysis/requirements.json.

2. **Call Design Inspiration MCP and record results in research.md**:
   - Call `collectui_search` or `collectui_browse` with 3-4 keywords related to the PRD domain
   - Analyze UI layouts, color schemes, typography, and interaction patterns
   - **Search for at least 3 distinctly different visual styles, including both dark mode and light mode**
   - **You MUST record all results in `prototypes/research.md`**

3. **Call 21st-dev Magic MCP `component_inspiration` and record results in research.md**:
   - Search for 3-4 key component types needed for the project (e.g., card, sidebar, table, kanban)
   - **You MUST record all results in `prototypes/research.md`**

4. **Scrape 2-3 competitor apps with Firecrawl and record results in research.md**:
   - Crawl competitor apps or similar services mentioned in the PRD using `firecrawl_scrape`
   - Analyze UI layouts, navigation patterns, and branding (colors, fonts)
   - **Extract 3 distinctly different palette directions from competitor app color schemes. At least one must use a fundamentally different hue.**
   - **You MUST record all results in `prototypes/research.md`**

5. **Scrape 2-3 modern landing page references with Firecrawl and record results in research.md**:
   - Research the latest SaaS/app landing page trends (e.g., perso.ai, linear.app, vercel.com, cal.com)
   - Analysis points:
     - Hero section composition (headline + subtext + CTA placement)
     - Scroll animation patterns (fade-in, slide-up, parallax)
     - Section transition methods (full-screen snap, smooth scroll)
     - Trust element placement (logo marquee, statistics, social proof)
     - CTA button styles and placement strategies
   - **You MUST record all results in `prototypes/research.md`**

6. **Curate domain-relevant images via Unsplash API** (only when UNSPLASH_ACCESS_KEY is available):
   - Scrape Unsplash search result pages using Firecrawl `firecrawl_scrape`:
     - 3-4 PRD domain-related keywords (e.g., "productivity app", "task management", "team collaboration")
     - Hero background keywords (e.g., "abstract gradient", "minimalist workspace", "dark abstract")
   - Or call Unsplash API directly: `https://api.unsplash.com/search/photos?query={keyword}&client_id={UNSPLASH_ACCESS_KEY}`
   - **Curate 3-5 image URLs per concept (A/B/C) and record in research.md**:
     - 1 Hero background image
     - 2-3 Feature section images
     - 1 mood/atmosphere image
   - Unsplash image URL format: `https://images.unsplash.com/photo-{id}?w={width}&h={height}&fit=crop&q=80`
   - **If no UNSPLASH_ACCESS_KEY**: use picsum.photos and CSS gradients as fallback (skip this step)

7. **Write `prototypes/research.md` structured with these 6 sections**:
   ```markdown
   # Design Research

   ## 1. Color Palettes (3 Visual Identities)

   ### Palette A: {mood name} (e.g., "Cold Dark")
   - Mode: dark/light
   - Primary: #hex — usage
   - Accent: #hex — usage
   - Surface: #hex — background
   - Text: #hex — body text
   - Mood: one-line description

   ### Palette B: {mood name} (e.g., "Warm Neutral")
   - Mode: dark/light
   - Primary: #hex — usage
   - Accent: #hex — usage
   - Surface: #hex — background
   - Text: #hex — body text
   - Mood: one-line description

   ### Palette C: {mood name} (e.g., "Clean Light")
   - Mode: dark/light
   - Primary: #hex — usage
   - Accent: #hex — usage
   - Surface: #hex — background
   - Text: #hex — body text
   - Mood: one-line description

   ## 2. Recommended Layout Patterns
   - Pattern 1: description (source: where discovered)
   - Pattern 2: description (source: where discovered)
   - Pattern 3: description (source: where discovered)

   ## 3. Key Component List
   - Component 1: description + recommended style
   - Component 2: description + recommended style
   - Component 3: description + recommended style

   ## 4. Design References
   - Reference app 1: URL + UI patterns to reference + screenshot: prototypes/references/ref-{name}.png
   - Reference app 2: URL + UI patterns to reference + screenshot: prototypes/references/ref-{name}.png

   ## 5. Landing Page Patterns
   - Hero style: description (source: where discovered)
   - Scroll animations: pattern list
   - CTA patterns: button style + placement
   - Section flow: recommended section sequence (Hero → Features → Social Proof → CTA)

   ## 6. Curated Images (Unsplash)
   ### For Concept A
   - Hero: URL + description
   - Feature 1: URL + description
   - Feature 2: URL + description

   ### For Concept B
   - Hero: URL + description
   - Feature 1: URL + description

   ### For Concept C
   - Hero: URL + description
   - Feature 1: URL + description
   ```

8. **Capture reference app screenshots with Playwright and save**:
   - Select 2-3 URLs from the design references section of research.md
   - For each URL, run `browser_navigate` → `browser_take_screenshot`
   - Save screenshots to `prototypes/references/` directory (filename: `ref-{appname}.png`)
   - Add screenshot paths to the "Design References" section of research.md
   - Also capture screenshots of landing page reference URLs discovered in step 5
   - These screenshots will be used as visual references for v0 prompts in Phase 4 or as Claude Code fallback references

> **CHECKPOINT**: Verify `prototypes/research.md` contains 6 sections (5 if no Unsplash) (including 3 palettes) and `prototypes/references/` contains at least 2 screenshots.

---

## Phase 2: Concept Definition (output: `prototypes/concepts.md`)

Define 3 interface concepts based on `prototypes/research.md` and `analysis/prd.md`.
**You MUST write them to `prototypes/concepts.md` using the structure below.**

### 2-A: Page Structure Design (PRD + Concept driven)
- Combine the PRD's feature requirements with each concept's UX direction to freely design the pages/views each prototype needs
- **Page structure can differ between concepts** — do NOT force a fixed "main + secondary" pattern
- Minimum 3 pages, maximum 4 pages (landing + 2-3 app pages)
- **All concepts MUST start with a landing page (`/{x}`)** as the entry point:
  - `/{x}` = Landing page (Hero + feature showcase + CTA)
  - `/{x}/app` or `/{x}/dashboard` etc. = Actual app feature pages
- Example) Landing page → Dashboard (marketing-focused service)
  - Example) Landing page → Workspace (tool-type app)
  - Example) Landing page → Onboarding/signup → Main feature (community/SaaS)
  - Example) Landing page → List → Detail (content/e-commerce)
- **Even for the same PRD, the 3 concepts' page structures can and should differ**

### 2-B: Per-Concept Definition (each concept MUST include all items below)
1. **Concept name**
2. **Core layout pattern**
3. **Target user**
4. **Differentiator**
5. **Visual identity**: one of Palette A/B/C from research.md (each concept MUST use a different palette)
6. **Page structure**: pages designed for this concept + route paths + each page's role
   (e.g., `/a` = landing, `/a/app` = main feature or `/b` = dashboard, `/b/detail` = detail view)
7. **Visual asset direction**: description of visual elements suited to this concept
   (e.g., "picsum user avatars", "CSS gradient backgrounds", "domain-related placeholder images")
8. **Landing page structure**: Hero section style + main section flow + CTA copy/action
   (e.g., "Full-screen Hero with gradient → 3-feature showcase → social proof → footer CTA → navigate to /a/app")
9. **Animation direction**: transition/scroll animation style suited to this concept
   (e.g., "fade-up on scroll, smooth section transitions, hover scale on cards")

- The 3 concepts MUST represent fundamentally different UX paradigms
- The 3 concepts MUST use different visual identities (palettes)

> **CHECKPOINT**: Verify `prototypes/concepts.md` has 3 concepts each assigned a different Palette, each concept defines at least 3 pages (including landing), and each concept's page flow reflects its unique character.

---

## Phase 3: Project Scaffolding

a) **Create project** (per official docs):
   ```bash
   npx create-next-app@latest prototypes/_app --yes
   ```
   `--yes`: Auto-applies recommended defaults (TypeScript, Tailwind CSS, App Router, Turbopack)

b) **Install shadcn/ui + dependencies**:
   ```bash
   cd prototypes/_app
   npx shadcn@latest init -t next
   npx shadcn@latest add button input checkbox badge dropdown-menu select dialog avatar scroll-area separator table textarea card
   npm install lucide-react framer-motion
   ```

c) **Shared layout** (app/layout.tsx):
   - Keep dark mode by default (dark class on html)
   - Shared fonts, metadata
   - Light mode prototypes override via `className="light"` wrapper on their own pages

d) **Add external image domains to `next.config.ts`**:
   ```typescript
   images: {
     remotePatterns: [
       { protocol: 'https', hostname: 'picsum.photos' },
       { protocol: 'https', hostname: 'images.unsplash.com' },
       { protocol: 'https', hostname: 'illustrations.popsy.co' },  // free illustrations
     ],
   },
   ```

---

## Phase 4: v0 Code Generation (Core — PRIMARY)

> **⛔ NEVER write prototype code directly — use ONLY v0-generated code.**

### v0 Prompt Template (Vercel 3-Part Framework)

For each prototype page, call `createChat` with the template below. **You MUST inject concepts.md and research.md results**:

```
## 1. Product Surface
Build a {concept_name} interface for {project_name}.
Core features: {5-8 specific feature requirements extracted from prd.md}
Layout: {layout chosen for this concept — e.g., "sidebar + main list", "kanban columns", "dashboard grid"}
Page: {this page's role — e.g., "main list view", "detail/edit view"}

## 2. Context of Use
Target users: {target users from PRD — e.g., "individual productivity users who need quick task capture and organization"}
Primary use case: {core usage scenario — e.g., "daily task management with priority-based workflow"}
Design reference apps: {references extracted from research.md — e.g., "Notion's clean typography, Linear's smooth animations, Todoist's quick-add UX"}

## 3. Constraints & Taste
- Next.js 15 App Router, TypeScript
- This page is one view of a multi-page app. It should be self-contained but include Link navigation to other pages.
- Tailwind CSS + shadcn/ui components (import from @/components/ui/*)
- Available shadcn: button, input, checkbox, badge, select, dialog, card, avatar, scroll-area, separator, dropdown-menu, textarea, table
- Icons: lucide-react only
- Color palette: {full hex values of the Palette assigned to this concept in concepts.md — e.g., "primary: #6366f1, accent: #8b5cf6, surface: #1e1e2e, text: #e2e8f0"}
- Mode: {dark/light — from the Palette's Mode in concepts.md}
- Visual mood: {Palette's Mood description}
- Typography: Inter or system font, clear hierarchy (text-2xl headings, text-sm labels)
- Mock data: 8-10 realistic items with varied states
- Visual assets: use the following for visual richness:
  - Placeholder images: https://picsum.photos/{width}/{height}?random={n}
    (user avatars: 40x40, hero images: 800x400, thumbnails: 200x200)
  - CSS gradients, subtle background patterns (dot grid, radial gradient)
  - Domain-related visuals: {insert visual asset direction from concepts.md}
- "NO external API calls" exception: picsum.photos static image URLs are allowed
- Quality: Notion/Linear/Vercel Dashboard level — pixel-perfect spacing, subtle transitions (150-200ms),
  hover states on all interactive elements, focus rings, smooth animations (framer-motion style CSS)
- Responsive: mobile-first, graceful degradation from desktop to mobile
- NO database, NO authentication — pure UI prototype with useState/useReducer
```

### Landing Page Prompt Template

Use the template below when generating the landing page (`/{x}`) for each prototype:

```
## 1. Product Surface
Build a modern landing page for {project_name} — a {one-line project description}.
This is NOT the app itself, but a marketing/introduction page that showcases the product.

Sections (in order):
1. **Hero**: Large headline + subtext + Primary CTA button ("Get Started" / "Try Now" → /{x}/app link)
2. **Feature Showcase**: Visualize 3-4 core features as cards/grid (icon + title + description)
3. **App Preview**: App UI mockup or screenshot area (picsum placeholder or CSS mockup)
4. **Social Proof / Stats**: User count, completed tasks, etc. as number stats or 2-3 testimonial cards
5. **CTA Footer**: Final call-to-action section + Secondary CTA button

## 2. Context of Use
Target users: {PRD target users} — this landing page communicates product value to first-time visitors.
Design reference: {research.md landing page patterns section content} — modern SaaS landing in perso.ai, linear.app style

## 3. Constraints & Taste
- Next.js 15 App Router, TypeScript
- This page is the **landing/entry page** of a multi-page app. MUST include Link/Button navigating to app feature pages (/{x}/app etc.).
- Tailwind CSS + shadcn/ui components (import from @/components/ui/*)
- Available shadcn: button, input, card, badge, avatar, separator
- Icons: lucide-react only
- **framer-motion**: use for scroll animations
  - Hero: fade-in + slide-up (duration 0.8s, delay stagger)
  - Feature cards: scroll-triggered fade-up (whileInView)
  - Stats: count-up animation on scroll
  - Sections: smooth reveal on viewport entry
- Color palette: {concepts.md Palette hex}
- Mode: {dark/light}
- Visual mood: {Palette Mood description}
- Visual assets (image strategy to make the landing page visually rich):
  - **Hero background**: CSS gradient (radial/linear gradient with blur overlay) + background dot/grid pattern
  - **Feature section images**: Use Unsplash URLs directly from research.md "Curated Images" section. If unavailable, use `https://picsum.photos/800/400?random={n}` or CSS mockups
  - **App Preview / Mockup**: Capture Playwright screenshots of the actual app page (/{x}/app) and use them, or recreate app UI inside a CSS browser frame
  - **Testimonial avatars**: https://picsum.photos/40/40?random={n} (face placeholders)
  - **Feature icons**: lucide-react icons placed inside gradient background circles
  - **Trust elements**: Fake brand logo marquee made with SVG (CSS animation)
  - **Illustrations**: CSS-only decorative elements (blur blob, gradient orb, floating shapes)
- Typography: Inter or system font
  - Hero headline: text-5xl md:text-7xl font-bold
  - Sub text: text-xl text-muted-foreground
  - Section titles: text-3xl font-semibold
- NO database, NO authentication — pure static landing page
- Quality: perso.ai / linear.app level — full-screen Hero, smooth scroll animations, generous spacing (py-24+)
```

### Execution Steps

1. **Call `createChat` based on the page structure in concepts.md**:
   - One createChat call per page per prototype
   - **Generate the landing page first**, then generate the app pages
   - Use the landing page template for landing pages, use the existing template for app pages
   - Total calls = pages per prototype × 3
   - Maximum 3 pages per prototype (v0 API cost management)
   - For second and subsequent pages, use `sendChatMessage` to pass the first page's code as context for design consistency

2. **Retrieve generated code with `getChat`**:
   - Parse and extract ```tsx code blocks from response messages
   - Adjust import paths to match project structure (@/components/ui/*)

3. **Write to files** (following route paths from concepts.md):
   - app/a/ subtree ← Interface A pages
   - app/b/ subtree ← Interface B pages
   - app/c/ subtree ← Interface C pages
   - app/page.tsx ← Simple index with just `/a`, `/b`, `/c` links (no v0 needed, write directly)

4. **If v0 code causes build errors**: send error message via `sendChatMessage` to request fix (max 2 times)

> **v0 Failure Fallback** — only if v0 API fails after 3 attempts:
> 1. Notify user: "v0 API connection failed. Proceeding with Claude Code direct generation as fallback."
> 2. Compose a detailed prompt from research.md's design system (color hex codes, typography, layout patterns)
> 3. Reference screenshots in `prototypes/references/` using Read
> 4. For each prototype: "Implement a {concept_name} interface referencing this screenshot's layout and style.
>    Apply the following design system: {full color/typography/component spec from research.md}"
> 5. Verify that research.md hex codes, component list, and layout patterns are reflected in the code
>
> ⚠️ Use this fallback ONLY when v0 completely fails — if v0 works, always use v0

> **CHECKPOINT**: Verify all prototype page files contain v0-generated code (or fallback-generated code). Do NOT proceed to Phase 5 if any are missing.

---

## Phase 5: Component Polishing (21st-dev builder + refiner)

1. Select the most critical UI component from each prototype's **main page** (e.g., task card, kanban column, stat widget)

2. **Call `21st_magic_component_builder` to generate a high-quality version of that component**
   - Integrate the generated component into the prototype

3. **Pass each prototype's main page file in full to `21st_magic_component_refiner` for polishing** (exclude other pages — API cost management)
   - Refiner input: current code + "Polish to Notion/Linear level — spacing, transitions, hover states, typography"
   - Update the file with refiner results

> **CHECKPOINT**: Verify builder 1x + refiner 1x per prototype = minimum 6 calls total. If under, make additional calls.

---

## Phase 6: Build Verification + Integration

1. Run `npm run build`

2. **shadcn v4 compatibility notes** (to prevent build errors):
   - `DialogTrigger`/`DialogClose`: use `render={<Component />}` instead of `asChild`
   - `Select onValueChange`: type is `string | null` — add null check
   - `Checkbox`: `@base-ui/react` based — check `defaultChecked` instead of `checked` prop

3. If errors occur, send fix request to v0 via `sendChatMessage` (max 3 times)

4. Include README.md for each prototype (prototypes/interface-{a,b,c}/README.md):
   - Design concept description
   - Screen layout explanation (including multi-page structure)
   - Pros and cons

> **CHECKPOINT**: Verify `npm run build` succeeds. Do NOT proceed to Phase 7 if it fails.

---

## Phase 7: Visual Verification (Playwright)

1. Start the dev server:
   ```bash
   cd prototypes/_app && npm run dev &
   ```
   Wait 3 seconds for server startup

2. **Screenshot all pages of each prototype**:
   - Reference concepts.md page structure to screenshot every route for each prototype
   - Run Playwright `browser_navigate` → `browser_take_screenshot`:
     - `http://localhost:3000/a/...` (Interface A all pages)
     - `http://localhost:3000/b/...` (Interface B all pages)
     - `http://localhost:3000/c/...` (Interface C all pages)

3. **Analyze each screenshot with Read** — using Claude multimodal vision:
   - Check for blank pages, error messages, or broken layouts
   - Check spacing/alignment issues
   - Check color contrast problems
   - Check text readability
   - Verify that research.md's design system (color palette, layout patterns) is actually reflected
   - **Visual differentiation**: Verify 3 prototypes have distinctly different colors/moods.
     If two prototypes look too similar, flag as critical issue and modify color variables.
   - **Visual assets**: If only text + icons are present with no images/gradients/patterns,
     flag as issue and add them.
   - **Inter-page navigation**: Verify Links between pages work correctly
   - **Landing page verification**:
     - Hero section fills the viewport (full-screen hero)
     - CTA button is clear and links to app page
     - Scroll animations are smooth (screenshot after Playwright scroll)
     - Sufficient spacing between sections (py-24 or more)
     - Visual consistency between landing and app pages (same palette)
     - **Image/visual richness**: If only text + icons, flag as issue — at least 2 of these visual elements must be present: Hero background gradient, App Preview mockup, Feature images
     - **App Preview mockup**: If possible, capture Playwright screenshots of app pages and use in the landing page's App Preview section
   - **List specific shortcomings compared to "Notion/Linear level"**

4. **Fix discovered issues in the code**:
   - Fix listed issues in priority order
   - After fixing, re-screenshot the affected page → re-analyze with Read
   - Max 2 iterations (total screenshots: initial + up to 2 fix rounds)

5. **Compare reference screenshots in `prototypes/references/` with current prototype screenshots**:
   - If there are clearly lacking visual elements compared to references, apply additional fixes

> **CHECKPOINT**: Verify all screenshots display proper UI, 3 prototypes are visually differentiated, and visual analysis reveals no critical issues.

---

## Final Output

1. Display to user:
   "View the 3 prototypes in your browser:
    - http://localhost:3000/a — Interface A ({concept name}): {page list}
    - http://localhost:3000/b — Interface B ({concept name}): {page list}
    - http://localhost:3000/c — Interface C ({concept name}): {page list}
   Please review and choose."

2. Summarize all 3 prototypes in a table:
   | Prototype | Entry URL | Concept | Palette | Page Structure | Pros | Cons |
   Ask the user to choose, then after selection:
   - Stop the dev server
   - "Selection complete. Next step: run /setup-versions {a|b|c}"

Final directory structure:
```
prototypes/
├── research.md               ← Phase 1 (with 3 palettes + landing page patterns)
├── concepts.md               ← Phase 2 (concepts + landing structure + animation direction)
├── references/
│   ├── ref-{app1}.png
│   ├── ref-{app2}.png
│   └── ref-{landing-ref}.png  ← Landing reference screenshot
├── _app/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx          ← Simple index with /a, /b, /c links only
│   │   ├── a/
│   │   │   ├── page.tsx        ← Landing page (Hero + CTA → /a/app)
│   │   │   ├── app/page.tsx    ← App feature page
│   │   │   └── {route}/page.tsx
│   │   ├── b/
│   │   │   ├── page.tsx        ← Landing page
│   │   │   ├── app/page.tsx
│   │   │   └── {route}/page.tsx
│   │   └── c/
│   │       ├── page.tsx        ← Landing page
│   │       ├── app/page.tsx
│   │       └── {route}/page.tsx
│   ├── components/ui/
│   └── lib/utils.ts
└── interface-{a,b,c}/
    └── README.md
```
