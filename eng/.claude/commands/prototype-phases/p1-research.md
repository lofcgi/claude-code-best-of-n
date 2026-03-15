# Phase 1: 3-Layer Design Research (Output: `prototypes/research.md`)

## 3-Layer Extraction Architecture

| Layer | Tool | Extraction Target | Output Location |
|-------|------|-------------------|-----------------|
| Structure | Defuddle MCP (`defuddle_fetch`) | Section order, content types, hierarchy | `research.md §9` |
| Branding | Firecrawl `branding` format | Colors, fonts, spacing, component patterns | `reference-tokens.json` |
| Visual | Playwright screenshots | Visual benchmarks | `references/*.png` |

---

## ⚠️ Context Management Rules (Required — Violation Causes Context Explosion)
- Run MCP calls in parallel **at most 2 at a time** (no more than 3 simultaneous calls)
- After receiving each MCP response, **immediately** write a summary of key points to the corresponding section in `prototypes/research.md`
- After recording is complete, move on to the next batch of MCP calls (do not accumulate responses in context)
- `onlyMainContent: true` must always be applied
- For 21st-dev and Unsplash responses, extract only the necessary URLs/names and immediately record them to file

---

## Execution Steps

### 1. Read PRD
Read analysis/prd.md and analysis/requirements.json.

### 2. Design Inspiration MCP Search
- Call `collectui_search` or `collectui_browse` with 3-4 keywords related to the PRD domain
- Analyze UI layout, color schemes, typography, and interaction patterns
- **Search for at least 3 different visual styles including both dark mode and light mode**
- **You must record the results in `prototypes/research.md`**

### 3. 21st-dev Magic Component Search
- Search for 3-4 core components using `component_inspiration`
- **You must record the results in `prototypes/research.md`**

### 4. Firecrawl Competitor App Scraping (2-3 apps)
- Crawl URLs of competitor apps or similar services mentioned in the PRD using `firecrawl_scrape`
- `formats: ["markdown"]`, `onlyMainContent: true`
- Analyze UI layout, navigation patterns, branding (colors, fonts)
- **Extract 3 different palette directions. At least one must be a fundamentally different color family (hue)**
- **You must record the results in `prototypes/research.md`**

### 5. 🆕 Firecrawl Branding Token Extraction
- Crawl 1-2 reference sites using `firecrawl_scrape` (`formats: ["branding", "screenshot"]`)
- Extraction targets: colors, fonts, spacing, component patterns
- Save results to `prototypes/reference-tokens.json`:
  ```json
  {
    "source": "{URL}",
    "colors": { "primary": "#hex", "accent": "#hex", "background": "#hex" },
    "fonts": { "heading": "FontName", "body": "FontName" },
    "spacing": { "sectionPadding": "value", "cardGap": "value" },
    "patterns": ["bento-grid", "glass-morphism", "etc"]
  }
  ```

### 6. Firecrawl Modern Landing Page References (2-3 pages)
- Research the latest SaaS/app landing page trends (perso.ai, linear.app, vercel.com, cal.com, etc.)
- Analysis points:
  - Hero section composition
  - Scroll animation patterns
  - Section transition methods
  - Trust element placement
  - CTA button style and placement strategy

### 7. Firecrawl Additional Premium References
- `https://stripe.com/` — Bento grid, real product mockups, depth
- `https://perso.ai/` — AI service landing benchmark
- `https://height.app/` — SVG wave hero background
- Use WebSearch to explore 1-2 additional award-winning landing pages
- Record discovered visual techniques in research.md §4

### 8. Firecrawl Premium Component Gallery
- `https://ui.aceternity.com/components` → Premium component name + description list
- `https://magicui.design/docs/components` → Animation component name + description list
- Record premium component mapping per PRD section in research.md §7

### 9. 🆕 Defuddle MCP Structure Extraction
- Use Defuddle MCP to extract the content structure of the top service in the PRD domain
- **Full section order list** (Hero → Trust → Features → ...)
- **Layout pattern for each section** (60/40 split, 3-col grid, full-width, bento, etc.)
- **Content type for each section** (text only, image+text, interactive, statistics, etc.)
- Record in research.md §9:
  ```
  ## 9. Reference Section Blueprint
  Source: {URL}
  1. Hero: 60/40 split (text left, product image right), trust badge below
  2. Trust Metrics: 4-col statistics (specific numbers + labels)
  3. Client Logos: infinite marquee or grid
  ...minimum 10 sections
  ```

### 10. 🆕🔑 Expanded Image Curation (8-10 images/concept)
- Search PRD domain-related keywords using Unsplash MCP `search_photos` (4-5 keywords)
- **At least 8-10 images per concept**:
  - Feature background images: 4
  - Avatar images: 5
  - Decorative/background images: 1-2
- Specify image usage strategy for each section type:
  ```
  ## 6. Curated Images (Mapped by Section)

  ### Image Usage Strategy
  - Hero background: CSS gradient + overlay
  - Hero right side: App screenshot inside BrowserMockup (captured in Phase 4.5)
  - Feature cards: Relevant image for each card (text+icon only is prohibited)
  - Trust section: Actual service screenshots (CSS browser frame)
  - Testimonial: Unsplash avatars (64x64)
  - Process Flow: Product screenshot next to each step

  ### For Concept A (8-10 images)
  - Feature 1-4: {URL}
  - Avatar 1-5: {URL}
  - Background 1-2: {URL}
  - Product Screenshots: [Captured in Phase 4.5]

  ### For Concept B ...
  ### For Concept C ...
  ```

### 11. Record Anti-Pattern Prohibition List
Record the anti-pattern list in research.md §8 (same as existing).

### 12. Playwright Reference Screenshots
- Select 2-3 URLs from the design references in research.md
- `browser_navigate` → `browser_take_screenshot`
- Save to `prototypes/references/` (filename: `ref-{appname}.png`)
- **Also capture screenshots of Stripe and Perso.ai** (for premium references)

### 13. Final Structuring of research.md
```markdown
# Design Research

## 1. Color Palettes (3 Visual Identities)
### Palette A: {mood name}
### Palette B: {mood name}
### Palette C: {mood name}

## 2. Recommended Layout Patterns
## 3. Core Component List
## 4. Design References
## 5. Landing Page Patterns

## 6. Curated Images (Mapped by Section) — 8-10 images per concept
## 7. Premium Component Mapping
## 8. Anti-Patterns (Prohibition List)
## 9. Reference Section Blueprint (Defuddle + Firecrawl)
```

---

> **CHECKPOINT**: Verify that the `prototypes/research.md` file includes all 9 sections, §6 has **8-10 images per concept** mapping, §9 has a Defuddle-based section blueprint, `prototypes/reference-tokens.json` has been created, and at least 2 screenshots exist in `prototypes/references/`.
