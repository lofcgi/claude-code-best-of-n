# Phase 3: Project Scaffolding

## a) Create Project (Based on Official Documentation)
```bash
npx create-next-app@latest prototypes/_app --yes
```
`--yes`: Automatically applies recommended defaults such as TypeScript, Tailwind CSS, App Router, Turbopack, etc.

## b) Install shadcn/ui + Dependencies
```bash
cd prototypes/_app
npx shadcn@latest init -t next
npx shadcn@latest add button input checkbox badge dropdown-menu select dialog avatar scroll-area separator table textarea card
npm install lucide-react framer-motion mini-svg-data-uri
```

## c) Install Fonts
Check the palette data in research.md and fonts in reference-tokens.json, and install distinctive fonts **other than Inter/Roboto/Arial**.

Recommended fonts (refer to aesthetics-guide.md):
- **Code/Tech**: JetBrains Mono, Fira Code, Space Grotesk
- **Editorial**: Playfair Display, Crimson Pro, Fraunces
- **Startup/Modern**: Clash Display, Satoshi, Cabinet Grotesk
- **Distinctive**: Bricolage Grotesque, Newsreader, General Sans

When using Google Fonts, import via `next/font/google`:
```typescript
// app/layout.tsx
import { Space_Grotesk, Crimson_Pro } from "next/font/google";

const headingFont = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });
const bodyFont = Crimson_Pro({ subsets: ["latin"], variable: "--font-body" });
```

## d) Common Layout (app/layout.tsx)
- Maintain dark mode as default (dark class on html)
- Common fonts, metadata
- For light mode prototypes, override using a `className="light"` wrapper on the page itself

## e) Add External Image Domains to next.config.ts
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'picsum.photos' },
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'illustrations.popsy.co' },
  ],
},
```

## f) Create Directory Structure
```bash
mkdir -p prototypes/_app/components/premium
mkdir -p prototypes/_app/components/sections
```
- `components/premium/`: Place Aceternity/Magic UI component code in Phase 4
- `components/sections/`: Place SectionWrapper and section components

## g) Create Premium Background Effect Components
Read `.claude/commands/prototype-references/premium-components.md` and
create the following components in `components/premium/` by copying the reference code exactly:
- background-beams.tsx
- lamp-effect.tsx
- aurora-background.tsx
- meteors.tsx
- sparkles.tsx
- gradient-text.tsx
- floating-dock.tsx
**Do NOT simplify or omit** — copy the reference code exactly.

## h) Create SectionWrapper Component
Read `.claude/commands/prototype-references/section-templates.md` and
create SectionWrapper at `components/sections/section-wrapper.tsx`.

A wrapper that enforces at least 2-layer backgrounds on all sections:
```tsx
<SectionWrapper palette={p} variant="gradient">
  {/* Auto: base + gradient/pattern + noise + scroll-reveal */}
  {children}
</SectionWrapper>
```

## i) Add Premium Utility CSS to globals.css
Append after existing styles (aurora, grain, grid, dots, marquee, shimmer, spotlight, glow, meteor, gradient-x, sparkle-float keyframes and utility classes).

## j) Extend lib/utils.ts
Add utility functions beyond the existing `cn()`:
```typescript
export function generateNoisePattern(opacity: number = 0.02): string {
  return `url("data:image/svg+xml,...")`;
}
```

## k) Auto-generate lib/design-tokens.ts
Auto-generate from research.md palette data + image URL mappings:
```typescript
export const palettes = {
  a: { primary: "#hex", accent: "#hex", surface: "#hex", text: "#hex", mode: "dark" },
  b: { /* Palette B */ },
  c: { /* Palette C */ },
} as const;

export const images = {
  a: {
    hero: "{URL}",
    features: ["{URL1}", "{URL2}", "{URL3}", "{URL4}", "{URL5}"],
    backgrounds: ["{URL1}", "{URL2}", "{URL3}"],
    avatars: ["{URL1}", "{URL2}", "{URL3}", "{URL4}", "{URL5}"],
    productScreenshots: ["/screenshots/a-app.png", "/screenshots/a-history.png"],
  },
  b: { /* ... */ },
  c: { /* ... */ },
} as const;

export const typography = {
  headlineFont: "'Cabinet Grotesk', sans-serif",
  bodyFont: "'General Sans', sans-serif",
} as const;
```
- **No inline hex values** — all pages must import and use this file

## l) Preparation: Fetch Premium Component Code via Context7
1. `resolve-library-id("aceternity-ui")` → `query-docs("{component name from concepts.md item 10}")`
2. `resolve-library-id("magic-ui")` → `query-docs("{component name from concepts.md item 10}")`
3. Save the extracted component source code to the `components/premium/` directory

---

> **CHECKPOINT**: Verify that the `prototypes/_app` project has been created, and that the following are complete: 7 base components + additional components fetched from Context7 in `components/premium/`, `components/sections/section-wrapper.tsx`, `lib/design-tokens.ts`, premium utilities in globals.css, and custom font configuration.
