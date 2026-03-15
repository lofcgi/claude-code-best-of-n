# Phase 4: 섹션 단위 코드 생성 (근본 변경)

> **⛔ v0 제거. Claude Code가 직접 코드를 생성한다.**
> 레퍼런스 블루프린트 + 프리빌트 컴포넌트 + 디자인 토큰 조합으로 생성.

---

## 핵심 원칙: 섹션 단위 생성

**현재 문제**: 페이지 전체를 한번에 생성 (1000줄) → 컴포넌트 인라인 재정의, 비주얼 밀도 불균일

**변경**:
1. `components/sections/` 디렉토리에 섹션 컴포넌트 생성
2. 각 섹션을 개별 파일로 생성 → 페이지에서 import만
3. **인라인 컴포넌트 정의 절대 금지** — `components/premium/` 또는 `components/sections/`에서 import만 허용

### ⛔ 절대 금지 규칙
```
페이지 파일 내 function 정의 금지 (export default만 허용)
```

모든 섹션 컴포넌트는 별도 파일에 정의하고 페이지에서 import.

---

## ⛔ 코드 생성 전 필수 참조 (협상 불가)
1. `.claude/commands/prototype-references/visual-architecture.md`를 Read하라
2. `.claude/commands/prototype-references/aesthetics-guide.md`를 Read하라
3. `.claude/commands/prototype-references/section-templates.md`를 Read하라
4. `.claude/commands/prototype-references/copy-guide.md`를 Read하라
5. 해당 파일의 코드 패턴과 카피 공식을 정확히 따르라

---

## 생성 순서 (중요!)
1. **앱 페이지 먼저 생성** (app/{x}/app/page.tsx 등)
2. Phase 4.5에서 앱 페이지 스크린샷 캡처
3. **섹션 컴포넌트 개별 생성** → `components/sections/`
4. **랜딩 페이지 조립** — 섹션 import + 조합

---

## 섹션 컴포넌트 구조

```
components/sections/
├── section-wrapper.tsx         ← Phase 3에서 생성
├── hero-beams.tsx              ← Concept A Hero (BackgroundBeams)
├── hero-aurora.tsx             ← Concept B Hero (AuroraBackground)
├── hero-lamp.tsx               ← Concept C Hero (LampEffect)
├── trust-metrics.tsx           ← NumberTicker 통계
├── feature-bento.tsx           ← BentoGrid 레이아웃
├── feature-spotlight.tsx       ← SpotlightCard Grid
├── comparison-table.tsx        ← Glass-morphism 비교표
├── testimonials.tsx            ← 아바타 + 인용문
├── process-steps.tsx           ← 좌우 교대 + 스크린샷
├── stats-section.tsx           ← NumberTicker + 장식
├── client-logos.tsx            ← InfiniteMarquee
├── faq-section.tsx             ← Accordion
├── pricing-section.tsx         ← 3티어 카드
├── footer-cta.tsx              ← 대형 CTA
└── floating-nav.tsx            ← Glass-morphism 네비
```

---

## 앱 페이지 생성 규칙

- `design-tokens.ts`에서 colors/images 가져오기 (인라인 hex 금지)
- `components/premium/`에서 UI 컴포넌트 import
- `prototypes/references/`의 레퍼런스 스크린샷을 Read로 참조하여 비주얼 수준 맞춤
- 앱 페이지 프리미엄 요구사항:
  - Sidebar/Nav: glass-morphism (backdrop-blur-md, bg-white/5)
  - Cards: 반드시 hover 효과 — border glow 또는 cursor-following spotlight
  - Empty states: CSS 추상 도형 — 순수 텍스트만 금지
  - Micro-interactions: 버튼 press scale(0.97), input focus시 primary glow ring
  - 모든 애니메이션: spring physics — linear 금지

---

## 랜딩 페이지 생성 규칙

### 페이지 파일 구조 (예시)
```tsx
// app/a/page.tsx — import만, function 정의 금지
import { HeroBeams } from "@/components/sections/hero-beams";
import { TrustMetrics } from "@/components/sections/trust-metrics";
import { FeatureBento } from "@/components/sections/feature-bento";
import { ComparisonTable } from "@/components/sections/comparison-table";
// ...

import { palettes, images } from "@/lib/design-tokens";

export default function LandingA() {
  const p = palettes.a;
  const img = images.a;

  return (
    <main>
      <HeroBeams palette={p} images={img} />
      <TrustMetrics palette={p} />
      <FeatureBento palette={p} images={img} />
      <ComparisonTable palette={p} />
      {/* ... 최소 8개 섹션 */}
    </main>
  );
}
```

### 카피 작성 (copy-guide.md 필수 참조)
- **헤드라인**: 2-4 단어, 브랜드 고유 표현 (클리셰 금지)
- **서브텍스트**: 1문장, 15-20 단어, 구체적 수치 포함
- **Feature 이름**: 2-3 단어, 브랜드 용어 (일반 명사 금지)
- **CTA**: 동사 + 혜택 ("지금 더빙 시작" not "시작하기")
- **수치**: 구체적 (10,847 not 10,000, 98.5% not 99%)

### Visual Architecture (모든 섹션 공통, 협상 불가)
- Hero: 5레이어 아키텍처 (visual-architecture.md)
- Hero headline: text-6xl md:text-8xl font-black
- GradientText 필수
- CTA: glow box-shadow 30px+ 60px dual layer
- BrowserMockup: 3D perspective 또는 tinted shadow
- 모든 섹션: SectionWrapper 사용 (최소 2레이어 배경)
- 섹션 패딩: py-40 최소
- 애니메이션: spring physics만
- 이미지: 페이지당 최소 5개
- 아바타: 최소 3개 (64px, Unsplash)
- Feature 카드: 이미지 필수 (텍스트+아이콘만 금지)

### 비주얼 에셋 필수 조건
- **페이지당 이미지(Unsplash/스크린샷) 최소 5개**
- **BrowserMockup 최소 1개** (앱 프리뷰)
- **텍스트+아이콘만의 Feature 카드 금지**
- **아바타 이미지 최소 3개** (testimonial)

---

## Phase 4.5: 앱 스크린샷 → 랜딩 주입

> 이 Phase는 앱 페이지 생성 완료 후, 랜딩 페이지 생성 전에 실행.

1. **dev 서버 시작**:
   ```bash
   cd prototypes/_app && npm run dev &
   ```
   서버 시작까지 3초 대기

2. **Playwright로 각 앱 페이지 스크린샷**:
   - 뷰포트 1280x800
   - `browser_navigate` → `browser_take_screenshot`
   - 저장: `public/screenshots/{concept}-app.png`

3. **각 랜딩의 Hero/Feature에서 BrowserMockup 내부에 해당 스크린샷 표시**:
   ```tsx
   <BrowserMockup url="app.{projectname}.ai">
     <img src="/screenshots/a-app.png" alt="{Project Name} App" className="w-full" />
   </BrowserMockup>
   ```

4. dev 서버 종료

---

## 실행 절차

1. **앱 페이지 생성** (concepts.md 페이지 구성 참조):
   - app/a/app/page.tsx, app/b/app/page.tsx, app/c/app/page.tsx
   - 및 추가 앱 페이지들

2. **Phase 4.5 실행** — 앱 스크린샷 캡처

3. **섹션 컴포넌트 개별 생성**:
   - section-templates.md를 참조하여 각 섹션 타입 구현
   - 각 섹션 생성 후 빌드 에러 없는지 확인

4. **랜딩 페이지 조립**:
   - app/a/page.tsx, app/b/page.tsx, app/c/page.tsx
   - 차별화 매트릭스의 섹션 순서를 정확히 따를 것
   - research.md §9 블루프린트를 기반으로 하되, 컨셉별 변형 적용

5. **app/page.tsx** ← `/a`, `/b`, `/c` 링크만 있는 간단한 인덱스

---

> **CHECKPOINT**: 각 프로토타입의 모든 페이지 파일이 생성되었는지, 페이지 파일에 function 정의가 없는지 (export default만), 인라인 hex가 없고 design-tokens.ts를 참조하는지, 각 랜딩이 최소 8개 섹션을 포함하는지, BrowserMockup에 앱 스크린샷이 삽입되었는지 확인하라.
