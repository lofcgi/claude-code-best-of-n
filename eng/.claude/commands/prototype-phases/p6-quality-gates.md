# Phase 6: Automated Quality Gates

4-stage automated quality verification. Each Gate must be passed in order before proceeding to the next.

---

## Gate 1: Static Analysis

Automated verification via Grep/code inspection.

### Checklist
```bash
# Inline hex check (in files other than design-tokens.ts)
grep -rn '#[0-9a-fA-F]\{6\}' prototypes/_app/app/ --include="*.tsx" | grep -v design-tokens | grep -v globals.css

# Prohibited font check
grep -rn "Inter\|Roboto\|Arial\|Helvetica\|Open Sans\|Lato" prototypes/_app/app/ --include="*.tsx"

# Section count check (count Section/section tags in each landing page)
grep -c "Section\|<section" prototypes/_app/app/a/page.tsx
grep -c "Section\|<section" prototypes/_app/app/b/page.tsx
grep -c "Section\|<section" prototypes/_app/app/c/page.tsx

# In-page function definition check (other than export default)
grep -n "^function \|^const .* = (" prototypes/_app/app/a/page.tsx
grep -n "^function \|^const .* = (" prototypes/_app/app/b/page.tsx
grep -n "^function \|^const .* = (" prototypes/_app/app/c/page.tsx

# linear easing check
grep -rn "ease: \"linear\"\|transition: \"linear\"\|easing: linear" prototypes/_app/ --include="*.tsx"
```

### Criteria
| Item | Criteria | On Failure |
|------|----------|------------|
| Inline hex | 0 (outside design-tokens.ts) | Replace with design-tokens import in code |
| Prohibited fonts | 0 | Replace with custom fonts |
| Section count | Each landing >= 8 | Add sections |
| In-page functions | 0 (only export default) | Extract to component files |
| linear easing | 0 | Replace with spring physics |

> If any item fails, fix the code and re-check

---

## Gate 2: Build Verification

```bash
cd prototypes/_app && npm run build
```

### shadcn v4 Compatibility Notes
- `DialogTrigger`/`DialogClose`: Use `render={<Component />}` instead of `asChild`
- `Select onValueChange`: Type is `string | null` — null check required
- `Checkbox`: Based on `@base-ui/react` — check `defaultChecked` instead of `checked` prop

### Criteria
| Item | Criteria | On Failure |
|------|----------|------------|
| Build errors | 0 | Fix errors and rebuild (max 3) |

### Premium Infrastructure Verification
Additional checks after successful build:
- `components/premium/` directory exists
- `components/sections/section-wrapper.tsx` exists
- `globals.css` contains premium keyframes (aurora, marquee, shimmer)
- `lib/utils.ts` contains `generateNoisePattern` function
- `lib/design-tokens.ts` exists

---

## Gate 3: Visual Scorecard (Ralph Loop Results)

Judgment based on final results from Phase 5 Ralph Loop.

### Criteria
| Item | Criteria | On Failure |
|------|----------|------------|
| Structural items | All passed | Re-enter Ralph Loop (max 2) |
| Visual depth | 10 of 13 passed | Re-enter Ralph Loop (max 2) |
| Content | 3 of 4 passed | Fix copy |
| Animation | 3 of 4 passed | Fix code |

### Premium Quality Scorecard (Per Prototype)

```
**Structure (All must pass)**
[ ] Hero is min-h-screen
[ ] Section count >= 8
[ ] At least 1 section uses asymmetric/bento layout
[ ] Section spacing py-40 or more
[ ] Floating/glass-morphism navigation exists
[ ] BrowserMockup displays app screenshot

**Visual Depth (10 of 13 must pass)**
[ ] Hero has layered background
[ ] Gradient sections have grain/noise texture
[ ] Card hover spotlight/glow effect
[ ] At least 1 section has parallax or scroll-reveal
[ ] Background decorative elements (blobs, beams, dots, meteors)
[ ] 5+ images used
[ ] Hero has 5+ visual layers
[ ] Hero headline 72px+ (text-6xl md:text-8xl)
[ ] Key keywords highlighted with GradientText
[ ] CTA has glow effect (box-shadow 30px+)
[ ] Section padding py-40+
[ ] BrowserMockup has perspective/tinted shadow
[ ] Font is not AI slop default

**Content (3 of 4 must pass)**
[ ] Specific numbers used
[ ] No cliches in headlines
[ ] CTA is verb+benefit format
[ ] Feature names use brand-specific terminology

**Animation (3 of 4 must pass)**
[ ] Hero headline has text animation
[ ] Feature cards have scroll-enter animation
[ ] Stats have count-up animation
[ ] At least 1 always-on ambient animation

**Differentiation (All must pass)**
[ ] All 3 prototypes use different Hero techniques
[ ] All 3 prototypes use different Feature layouts
[ ] All 3 prototypes have different section compositions
[ ] No shared background patterns
[ ] Color palettes are clearly distinct
```

---

## Gate 4: Lighthouse Verification

Check accessibility/performance scores using lighthouse-mcp.

### Criteria
| Item | Criteria | On Failure |
|------|----------|------------|
| Accessibility | >= 80 | Fix accessibility issues and re-check (max 2) |

### Key Accessibility Fixes
- Images missing `alt` attributes
- Insufficient color contrast
- Focus order/keyboard accessibility
- Missing ARIA labels
- Heading hierarchy

---

## After Passing All Gates

1. Include a README.md for each prototype (prototypes/interface-{a,b,c}/README.md):
   - Design concept description
   - Screen composition description
   - Premium components used
   - Section composition (from differentiation matrix)
   - Pros and cons

2. Record Quality Gates results in `prototypes/quality-report.md`

---

> **CHECKPOINT**: All 4 Gates passed. Build errors 0, inline hex 0, prohibited fonts 0, each landing section >= 8, visual scorecard passed, Lighthouse a11y >= 80.
