# Phase 2: Concept Development (Output: `prototypes/concepts.md`)

Based on `prototypes/research.md` and `analysis/prd.md`, define 3 interface concepts.
**You must record them in the `prototypes/concepts.md` file using the structure below.**

---

## 2-A: Page Structure Design (PRD + Concept Based)
- Synthesize the PRD's functional requirements and each concept's UX direction to freely design the pages/views needed for each prototype
- **Page composition can differ per concept** — do not force a fixed "main + sub" structure
- Minimum 3 pages, maximum 4 pages (landing + 2-3 app pages)
- **All concepts must start with a landing page (`/{x}`)**:
  - `/{x}` = Landing page (Hero + Feature introduction + CTA)
  - `/{x}/app` or `/{x}/dashboard` etc. = Actual app feature pages

---

## 2-B: Per-Concept Definition (Each concept must include all items below)
1. **Concept Name**
2. **Core Layout Pattern**
3. **Target User**
4. **Differentiator**
5. **Visual Identity**: One of Palette A/B/C from research.md (each concept must use a different palette)
6. **Page Composition**: List of pages designed for this concept + each route path + each page's role
7. **Visual Asset Direction**: Description of visual elements suitable for this concept
8. **Landing Page Composition**: Hero section style + main section flow + CTA copy/action
9. **Animation Direction**: Transition/scroll animation style suitable for this concept
10. **Premium Component Selection** (must be selected from research.md §7):
    - Hero technique: {AuroraBackground | HeroParallax | LampEffect | BackgroundBeams} — **All 3 concepts must use different Hero techniques**
    - Feature layout: {BentoGrid | CardSpotlight Grid | GlareCard Row | MagicCard Grid} — **At least 1 concept must use BentoGrid**
    - Social Proof: {InfiniteMovingCards | AnimatedBeam | NumberTicker}
    - Background decoration: {SparklesCore, DotPattern, Meteors, GridPattern} pick 1-2
    - Text animation: {TextGenerateEffect | TypingAnimation | BlurIn}
    - Navigation: {FloatingNavbar | FloatingDock}

---

## 2-C: Key Section Composition Differentiation Matrix (Required)

**Each concept's section order and types must differ.** Repeating the same 5 sections with only color changes 3 times leads to homogenization. The structure itself must differ to be truly "different concepts".

Based on the reference blueprints in research.md §9, define the section composition for each concept with clear differentiation:

```
## Differentiation Matrix

| Element | Concept A | Concept B | Concept C |
|------|-----------|-----------|-----------|
| Number of sections | 10 | 8 | 9 |
| 2nd section | Trust Metrics | Product Demo | Client Logos |
| 3rd section | BentoGrid Features | Comparison Table | Video Showcase |
| Social Proof position | 6th | 4th | 8th |
| Pricing included | No | Yes | No |
| FAQ included | No | No | Yes |
| Unique section | Comparison Table | Interactive Demo | Case Studies |
```

**Rules**:
- Each concept must have at least 8 sections
- At least 2 section types must differ across the 3 concepts
- Section order must differ for all (identical order is prohibited)

---

## Differentiation Requirements
- The 3 concepts must represent fundamentally different UX paradigms
- The 3 concepts must use different visual identities (palettes)
- **The 3 concepts must use different Hero techniques — not just color differences but structural differentiation**
- **The 3 concepts must have different section compositions**

---

> **CHECKPOINT**: Verify that the 3 concepts in `prototypes/concepts.md` have each been assigned a different Palette, a different Hero technique, **a different section composition**, that the differentiation matrix is included, and that each concept has at least 8 sections defined.
