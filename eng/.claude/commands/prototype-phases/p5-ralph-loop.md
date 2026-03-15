# Phase 5: Ralph Loop (Autonomous Visual Feedback)

Generate -> Screenshot -> Evaluate -> Fix autonomous loop.
After code generation, automatically verify visual quality and autonomously fix deficiencies.

---

## Loop Architecture

```
┌─ 생성 완료 ──────────────────────────────┐
│                                          │
▼                                          │
스크린샷 (5 스크롤 위치 × 3 랜딩)          │
▼                                          │
구조적 평가 (섹션별 점수):                  │
  - 비주얼 레이어 수 [1-5]                  │
  - 이미지 존재 여부 [yes/no]               │
  - 빈 공간 비율 [>40% = fail]              │
  - 텍스트 대 비주얼 비율                    │
▼                                          │
실패 섹션 TOP 3 → 타겟 수정 ───────────────┘
(최대 3회 반복)
```

---

## Step 1: Screenshot Capture

1. **Start dev server** (skip if already running):
   ```bash
   cd prototypes/_app && npm run dev &
   ```

2. **Take screenshots at 5 scroll positions for each landing page**:
   - 0% (Hero), 25%, 50%, 75%, 100% (Footer)
   - Playwright `browser_navigate` -> scroll -> `browser_take_screenshot`
   ```
   browser_evaluate: window.scrollTo(0, document.body.scrollHeight * 0.25)
   → browser_take_screenshot
   ```
   - 3 landings x 5 positions = 15 screenshots

---

## Step 2: Structural Evaluation (Per-Section Scoring)

Analyze each screenshot using Read (Claude multimodal vision).

### Evaluation Matrix (Per Section)

| Evaluation Criteria | Scoring Standard | Pass/Fail |
|----------|----------|-----------|
| Number of visual layers | Hero: 5+, General: 2+ | < threshold = Fail |
| Image presence | Images in Feature cards | No = Fail |
| Empty space ratio | Relative to total screen area | > 40% = Fail |
| Text:Visual ratio | Text-only vs visual elements | > 70% text = Fail |
| Background depth | Gradient/pattern/noise | Solid color only = Fail |
| Hover/interaction visuals | Card border, glow | None = Fail |

### Evaluation Result Recording Format
```markdown
## Ralph Loop — Iteration {N}

### Landing A (/a)
| 스크롤 위치 | 보이는 섹션 | 비주얼 레이어 | 이미지 | 빈공간 | 결과 |
|------------|-----------|-------------|--------|--------|------|
| 0% | Hero | 5 | Yes (mockup) | 20% | ✅ |
| 25% | Trust + Features | 2 | No | 45% | ❌ |
| 50% | Demo + Social | 3 | Yes | 15% | ✅ |
| 75% | Process + Stats | 1 | No | 60% | ❌ |
| 100% | CTA + Footer | 2 | No | 30% | ✅ |

**실패 섹션**: Features (이미지 없음), Process (1레이어, 이미지 없음)
```

---

## Step 3: Reference Comparison

Perform side-by-side vision analysis with `prototypes/references/ref-perso.png` (or other premium references):

```markdown
### 레퍼런스 비교
- **비주얼 밀도**: 프로토타입이 [훨씬 적음/비슷/더 많음]
- **이미지 사용**: 레퍼런스 대비 [부족/적절/과다]
- **배경 깊이**: 레퍼런스 대비 [단조로움/비슷/더 풍부]
- **개선 필요 TOP 3**:
  1. {구체적 섹션 + 문제점 + 해결 방향}
  2. {구체적 섹션 + 문제점 + 해결 방향}
  3. {구체적 섹션 + 문제점 + 해결 방향}
```

---

## Step 4: Targeted Fixes

Apply specific fixes for the TOP 3 failed sections:

1. **Insufficient images**: Add Unsplash images or CSS visuals
2. **Insufficient layers**: Change SectionWrapper variant, add background effects
3. **Excessive empty space**: Add content, add decorative elements
4. **Excessive text**: Add image/chart/icon visuals

### Fix Rules
- **Only modify section component files** (do not touch page files)
- **Refer to section-templates.md** to check visual density requirements for the section type
- **Only reference colors from design-tokens.ts** (no inline hex values)

---

## Step 5: Re-verification

After fixes, re-screenshot at the relevant section positions -> re-analyze with Read.

---

## Iteration Limit

- **Maximum 3 iterations**
- Iteration count: recorded in `prototypes/ralph-loop-log.md`
- If failed items remain after 3 iterations, handle them in Phase 6 Quality Gates

---

## Output

- `prototypes/ralph-loop-log.md`: Evaluation results + fix details for each iteration
- Modified section component files

---

> **CHECKPOINT**: Verify that the Ralph Loop has been executed at least once, that evaluation results are recorded in ralph-loop-log.md, and that fixes have been applied to failed sections.
