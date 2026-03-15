# Phase 5: Ralph Loop (자율 비주얼 피드백)

Generate → Screenshot → Evaluate → Fix 자율 루프.
코드 생성 후 시각적 품질을 자동으로 검증하고 부족한 부분을 자율 수정한다.

---

## 루프 아키텍처

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

## Step 1: 스크린샷 캡처

1. **dev 서버 시작** (이미 실행 중이면 스킵):
   ```bash
   cd prototypes/_app && npm run dev &
   ```

2. **각 랜딩페이지에 대해 5개 스크롤 위치에서 스크린샷**:
   - 0% (Hero), 25%, 50%, 75%, 100% (Footer)
   - Playwright `browser_navigate` → 스크롤 → `browser_take_screenshot`
   ```
   browser_evaluate: window.scrollTo(0, document.body.scrollHeight * 0.25)
   → browser_take_screenshot
   ```
   - 3개 랜딩 × 5 위치 = 15장

---

## Step 2: 구조적 평가 (섹션별 점수)

각 스크린샷을 Read로 분석 (Claude 멀티모달 비전).

### 평가 매트릭스 (섹션별)

| 평가 항목 | 점수 기준 | Pass/Fail |
|----------|----------|-----------|
| 비주얼 레이어 수 | Hero: 5+, 일반: 2+ | < 기준 = Fail |
| 이미지 존재 | Feature 카드에 이미지 | No = Fail |
| 빈 공간 비율 | 전체 화면 대비 | > 40% = Fail |
| 텍스트:비주얼 비율 | 텍스트만 vs 비주얼 요소 | > 70% 텍스트 = Fail |
| 배경 깊이 | 그라디언트/패턴/노이즈 | 단색만 = Fail |
| 호버/인터랙션 시각 | 카드 border, glow | 없음 = Fail |

### 평가 결과 기록 형식
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

## Step 3: 레퍼런스 비교

`prototypes/references/ref-perso.png` (또는 다른 프리미엄 레퍼런스)과 나란히 비전 분석:

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

## Step 4: 타겟 수정

실패 섹션 TOP 3에 대해 구체적 수정:

1. **이미지 부족**: Unsplash 이미지 추가 또는 CSS 비주얼 추가
2. **레이어 부족**: SectionWrapper variant 변경, 배경 효과 추가
3. **빈 공간 과다**: 콘텐츠 추가, 장식 요소 추가
4. **텍스트 과다**: 이미지/차트/아이콘 비주얼 추가

### 수정 규칙
- **섹션 컴포넌트 파일만 수정** (페이지 파일은 건드리지 않음)
- **section-templates.md 참조**하여 해당 섹션 타입의 비주얼 밀도 요구사항 확인
- **design-tokens.ts에서만 색상 참조** (인라인 hex 금지)

---

## Step 5: 재검증

수정 후 해당 섹션 위치에서 재스크린샷 → Read로 재분석.

---

## 반복 제한

- **최대 3회 반복**
- 반복 횟수: `prototypes/ralph-loop-log.md`에 기록
- 3회 반복 후에도 실패 항목이 있으면 Phase 6 Quality Gates에서 처리

---

## 출력물

- `prototypes/ralph-loop-log.md`: 각 반복의 평가 결과 + 수정 내용
- 수정된 섹션 컴포넌트 파일들

---

> **CHECKPOINT**: Ralph Loop이 최소 1회 실행되었는지, ralph-loop-log.md에 평가 결과가 기록되었는지, 실패 섹션에 대한 수정이 적용되었는지 확인하라.
