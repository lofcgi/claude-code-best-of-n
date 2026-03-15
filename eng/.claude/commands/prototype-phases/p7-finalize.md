# Phase 7: Finalization + Output

Final wrap-up after passing all Quality Gates.

---

## 1. Final Screenshots

Take screenshots of all pages for each prototype to verify the final visuals:

1. **Start the dev server** (skip if already running):
   ```bash
   cd prototypes/_app && npm run dev &
   ```

2. **Screenshot all pages**:
   - Refer to the page structure in concepts.md and screenshot all routes of each prototype
   - Playwright `browser_navigate` → `browser_take_screenshot`

3. **Scroll-based screenshots** — for each landing:
   - 5 scroll positions: 0%, 25%, 50%, 75%, 100%
   - `browser_take_screenshot` at each position

4. **Final analysis of each screenshot using Read**:
   - No blank pages, error messages, or broken layouts
   - All 3 prototypes are visually and structurally differentiated
   - App screenshots display correctly in BrowserMockup

---

## 2. Reference Comparison

Final comparison with reference screenshots in `prototypes/references/`:
- Verify visual quality against Stripe/Vercel/Linear references
- If any clearly lacking elements are found, make a final revision (maximum 1 round)

---

## 3. Final Output

1. Guide the user:
   ```
   브라우저에서 3가지 프로토타입을 확인하세요:
    - http://localhost:3000/a — Interface A ({컨셉명}): {페이지 목록}
    - http://localhost:3000/b — Interface B ({컨셉명}): {페이지 목록}
    - http://localhost:3000/c — Interface C ({컨셉명}): {페이지 목록}
   확인 후 선택해주세요.
   ```

2. Summarize the 3 prototypes in a table:
   | Prototype | Entry URL | Concept | Palette | Hero Technique | Feature Layout | Section Count | Unique Sections | Pros | Cons |

3. Ask the user to choose, and after selection:
   - Stop the dev server
   - "Selection complete. Next step: run /setup-versions {a|b|c}."

---

## Final Directory Structure

```
prototypes/
├── research.md               ← Phase 1 (9 sections + reference-tokens.json)
├── concepts.md               ← Phase 2 (concepts + differentiation matrix)
├── reference-tokens.json     ← Phase 1 (branding tokens)
├── ralph-loop-log.md         ← Phase 5 (Ralph Loop results)
├── quality-report.md         ← Phase 6 (Quality Gates results)
├── references/
│   ├── ref-{app1}.png
│   ├── ref-{app2}.png
│   ├── ref-{stripe}.png
│   └── ref-{perso}.png
├── _app/
│   ├── app/
│   │   ├── globals.css        ← Premium utility CSS
│   │   ├── layout.tsx         ← Custom fonts
│   │   ├── page.tsx           ← /a, /b, /c links
│   │   ├── a/
│   │   │   ├── page.tsx       ← Landing (8+ sections, imports only)
│   │   │   ├── app/page.tsx
│   │   │   └── {route}/page.tsx
│   │   ├── b/ (same structure)
│   │   └── c/ (same structure)
│   ├── components/
│   │   ├── ui/                ← shadcn/ui
│   │   ├── premium/           ← Aceternity/Magic UI components
│   │   └── sections/          ← Section components (including SectionWrapper)
│   ├── lib/
│   │   ├── utils.ts           ← cn() + generateNoisePattern()
│   │   └── design-tokens.ts   ← Palettes + images + typography
│   └── public/
│       └── screenshots/       ← App page screenshots
├── interface-{a,b,c}/
│   └── README.md
```
