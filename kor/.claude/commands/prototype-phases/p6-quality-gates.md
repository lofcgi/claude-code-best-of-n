# Phase 6: 자동 Quality Gates

4단계 자동화된 품질 검증. 각 Gate를 순서대로 통과해야 다음 Gate로 진행.

---

## Gate 1: 정적 분석

Grep/코드 검사로 자동 검증.

### 검사 항목
```bash
# 인라인 hex 검사 (design-tokens.ts 외 파일에서)
grep -rn '#[0-9a-fA-F]\{6\}' prototypes/_app/app/ --include="*.tsx" | grep -v design-tokens | grep -v globals.css

# 금지 폰트 검사
grep -rn "Inter\|Roboto\|Arial\|Helvetica\|Open Sans\|Lato" prototypes/_app/app/ --include="*.tsx"

# 섹션 수 검사 (각 랜딩 페이지에서 Section/section 태그 카운트)
grep -c "Section\|<section" prototypes/_app/app/a/page.tsx
grep -c "Section\|<section" prototypes/_app/app/b/page.tsx
grep -c "Section\|<section" prototypes/_app/app/c/page.tsx

# 페이지 내 function 정의 검사 (export default 외)
grep -n "^function \|^const .* = (" prototypes/_app/app/a/page.tsx
grep -n "^function \|^const .* = (" prototypes/_app/app/b/page.tsx
grep -n "^function \|^const .* = (" prototypes/_app/app/c/page.tsx

# linear easing 검사
grep -rn "ease: \"linear\"\|transition: \"linear\"\|easing: linear" prototypes/_app/ --include="*.tsx"
```

### 기준
| 항목 | 기준 | 실패 시 |
|------|------|---------|
| 인라인 hex | 0개 (design-tokens.ts 외) | 코드에서 design-tokens import로 교체 |
| 금지 폰트 | 0개 | 커스텀 폰트로 교체 |
| 섹션 수 | 각 랜딩 ≥ 8 | 섹션 추가 |
| 페이지 내 function | 0개 (export default만) | 컴포넌트 파일로 분리 |
| linear easing | 0개 | spring physics로 교체 |

→ 실패 항목 있으면 코드 수정 → 재검사

---

## Gate 2: 빌드 검증

```bash
cd prototypes/_app && npm run build
```

### shadcn v4 호환성 주의사항
- `DialogTrigger`/`DialogClose`: `asChild` 대신 `render={<Component />}` 사용
- `Select onValueChange`: `string | null` 타입 — null 체크 필요
- `Checkbox`: `@base-ui/react` 기반 — `checked` prop 대신 `defaultChecked` 확인

### 기준
| 항목 | 기준 | 실패 시 |
|------|------|---------|
| 빌드 에러 | 0개 | 에러 수정 → 재빌드 (max 3) |

### 프리미엄 인프라 검증
빌드 성공 후 추가 확인:
- `components/premium/` 디렉토리 존재
- `components/sections/section-wrapper.tsx` 존재
- `globals.css`에 프리미엄 keyframes (aurora, marquee, shimmer) 포함
- `lib/utils.ts`에 `generateNoisePattern` 함수 포함
- `lib/design-tokens.ts` 존재

---

## Gate 3: 비주얼 스코어카드 (Ralph Loop 결과)

Phase 5 Ralph Loop의 최종 결과를 기반으로 판정.

### 기준
| 항목 | 기준 | 실패 시 |
|------|------|---------|
| 구조 항목 | 전체 통과 | Ralph Loop 재진입 (max 2) |
| 비주얼 깊이 | 13개 중 10개 통과 | Ralph Loop 재진입 (max 2) |
| 콘텐츠 | 4개 중 3개 통과 | 카피 수정 |
| 애니메이션 | 4개 중 3개 통과 | 코드 수정 |

### 프리미엄 품질 스코어카드 (프로토타입별)

```
**구조 (전체 통과 필수)**
[ ] Hero가 min-h-screen
[ ] 섹션 수 ≥ 8
[ ] 최소 1개 섹션이 비대칭/bento 레이아웃
[ ] 섹션 간격 py-40 이상
[ ] 플로팅/glass-morphism 네비게이션 존재
[ ] BrowserMockup에 앱 스크린샷 표시

**비주얼 깊이 (13개 중 10개 통과)**
[ ] Hero에 레이어드 배경
[ ] 그라디언트 섹션에 grain/noise 텍스처
[ ] 카드 hover spotlight/glow 효과
[ ] 최소 1개 섹션에 parallax 또는 scroll-reveal
[ ] 배경 장식 요소 (blobs, beams, dots, meteors)
[ ] 이미지 5개+ 사용
[ ] Hero에 5개+ 시각 레이어
[ ] Hero 헤드라인 72px+ (text-6xl md:text-8xl)
[ ] GradientText로 핵심 키워드 강조
[ ] CTA에 glow 효과 (box-shadow 30px+)
[ ] 섹션 패딩 py-40+
[ ] BrowserMockup에 perspective/tinted shadow
[ ] Font이 AI slop 기본값이 아님

**콘텐츠 (4개 중 3개 통과)**
[ ] 구체적 수치 사용
[ ] 헤드라인에 클리셰 없음
[ ] CTA가 동사+혜택 형태
[ ] Feature 이름이 브랜드 고유 용어

**애니메이션 (4개 중 3개 통과)**
[ ] Hero 헤드라인에 텍스트 애니메이션
[ ] Feature 카드에 스크롤 진입 애니메이션
[ ] Stats에 count-up 애니메이션
[ ] 상시 ambient 애니메이션 최소 1개

**차별화 (전체 통과 필수)**
[ ] 3개 프로토타입 Hero 기법이 모두 다름
[ ] 3개 프로토타입 Feature 레이아웃이 모두 다름
[ ] 3개 프로토타입 섹션 구성이 모두 다름
[ ] 배경 패턴 공유 없음
[ ] 색상 팔레트 명확히 구분
```

---

## Gate 4: Lighthouse 검증

lighthouse-mcp를 사용하여 접근성/성능 점수 확인.

### 기준
| 항목 | 기준 | 실패 시 |
|------|------|---------|
| Accessibility | ≥ 80 | 접근성 수정 → 재검사 (max 2) |

### 주요 접근성 수정 항목
- `alt` 속성 누락된 이미지
- 색상 대비 부족
- 포커스 순서/키보드 접근성
- ARIA 라벨 누락
- heading 계층 구조

---

## Gate 통과 후

1. 각 프로토타입에 README.md 포함 (prototypes/interface-{a,b,c}/README.md):
   - 디자인 컨셉 설명
   - 스크린 구성 설명
   - 사용된 프리미엄 컴포넌트
   - 섹션 구성 (차별화 매트릭스에서)
   - 장단점

2. Quality Gates 결과를 `prototypes/quality-report.md`에 기록

---

> **CHECKPOINT**: 4개 Gate 모두 통과. 빌드 에러 0, 인라인 hex 0, 금지 폰트 0, 각 랜딩 섹션 ≥ 8, 비주얼 스코어카드 통과, Lighthouse a11y ≥ 80.
