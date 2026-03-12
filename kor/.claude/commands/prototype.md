---
description: v0, 디자인 레퍼런스, AI 컴포넌트를 활용한 3가지 UI 프로토타입 생성
allowed-tools: [Read, Write, Bash, Glob, Grep, "mcp:firecrawl:*", "mcp:context7:*", "mcp:v0:*", "mcp:21st-dev-magic:*", "mcp:design-inspiration:*", "mcp:playwright:*"]
---

analysis/prd.md를 읽고 3가지 UI 인터페이스 프로토타입을 생성하세요.

## 사전 체크 (먼저 수행)

1. **환경변수 및 MCP 실제 동작 검증** (반드시 아래 순서대로):

   a) Bash로 필수 환경변수 존재 확인:
      ```bash
      echo "FIRECRAWL_API_KEY=${FIRECRAWL_API_KEY:+설정됨}"
      echo "SERPER_API_KEY=${SERPER_API_KEY:+설정됨}"
      echo "TWENTY_FIRST_API_KEY=${TWENTY_FIRST_API_KEY:+설정됨}"
      echo "UNSPLASH_ACCESS_KEY=${UNSPLASH_ACCESS_KEY:+설정됨}"
      ```
      → 출력이 비어있으면 해당 환경변수 ❌

   b) 각 필수 MCP 서버 테스트 호출 (도구가 실제로 동작하는지 확인):
      - Firecrawl: `firecrawl_scrape` 호출 (url: "https://example.com", formats: ["markdown"])
      - Design Inspiration: 간단한 검색 테스트 호출
      - 21st-dev Magic: 간단한 컴포넌트 검색 테스트 호출
      - Context7: `resolve-library-id` 호출 (libraryName: "react", query: "test")
      - v0: `getUser` 호출로 인증 상태 확인
      → 각 호출이 에러 없이 응답하면 ✅, 에러 발생 시 ❌

   c) 결과를 표로 출력:
      | MCP 서버 | 환경변수 | 테스트 호출 | 최종 | 필수 | 용도 |
      |----------|----------|-----------|------|------|------|
      | Firecrawl | ✅/❌ | ✅/❌ | ✅/❌ | **필수** | 경쟁 앱 UI 리서치 |
      | Design Inspiration | ✅/❌ | ✅/❌ | ✅/❌ | **필수** | 디자인 레퍼런스 리서치 |
      | 21st-dev Magic | ✅/❌ | ✅/❌ | ✅/❌ | **필수** | UI 컴포넌트 생성/폴리싱 |
      | Context7 | N/A | ✅/❌ | ✅/❌ | **필수** | 최신 프레임워크 문서 참조 |
      | v0 | N/A | ✅/❌ | ✅/❌ | **필수** | 프로토타입 코드 생성 |
      | Unsplash API | ✅/❌ | N/A | ✅/❌ | 권장 | 랜딩페이지 고품질 이미지 |

> **⛔ CRITICAL: 필수 MCP의 최종 상태가 하나라도 ❌이면 — 즉시 중단.**
> **절대로 "없이 진행합니다", "스킵합니다" 등으로 우회하지 말 것.**
> 아래 안내를 출력하고 프로토타이핑을 시작하지 말 것:
> 1. `.mcp.json` 파일이 있는지 확인 → 없으면 `cp .mcp.json.example .mcp.json`
> 2. 필요한 API 키 환경변수 설정:
>    - `FIRECRAWL_API_KEY` — https://firecrawl.dev
>    - `SERPER_API_KEY` — https://serper.dev (Design Inspiration용)
>    - `TWENTY_FIRST_API_KEY` — https://21st.dev (Magic MCP용)
> 3. Claude Code 재시작 (exit → claude)
> 4. `/mcp` 명령으로 필수 서버 모두 ✅인지 확인
> 5. 다시 `/prototype` 실행

2. analysis/prd.md, analysis/requirements.json 파일 존재 확인
   → 없으면 "먼저 /analyze를 실행하세요" 안내 후 중단

---

## Phase 1: 리서치 (출력물: `prototypes/research.md`)

1. analysis/prd.md와 analysis/requirements.json을 읽어라.

2. **Design Inspiration MCP를 호출하고 결과를 research.md에 기록하라**:
   - PRD 도메인과 관련된 키워드 3-4개로 `collectui_search` 또는 `collectui_browse`를 호출하라
   - UI 레이아웃, 색상 스킴, 타이포그래피, 인터랙션 패턴을 분석하라
   - **다크모드와 라이트모드를 모두 포함하여 최소 3가지 서로 다른 비주얼 스타일을 검색하라**
   - **반드시 결과를 `prototypes/research.md`에 기록하라**

3. **21st-dev Magic MCP `component_inspiration`을 호출하고 결과를 research.md에 기록하라**:
   - 프로젝트에 필요한 핵심 컴포넌트 3-4종(예: card, sidebar, table, kanban)을 검색하라
   - **반드시 결과를 `prototypes/research.md`에 기록하라**

4. **Firecrawl로 경쟁 앱 2-3개를 스크랩하고 결과를 research.md에 기록하라**:
   - PRD에 언급된 경쟁 앱이나 유사 서비스의 URL을 `firecrawl_scrape`로 크롤링하라
   - UI 레이아웃, 네비게이션 패턴, 브랜딩(색상, 폰트)을 분석하라
   - **경쟁 앱들의 색상 스킴에서 3가지 서로 다른 팔레트 방향을 추출하라. 최소 하나는 근본적으로 다른 색상 계열(hue)을 사용하라.**
   - **반드시 결과를 `prototypes/research.md`에 기록하라**

5. **Firecrawl로 모던 랜딩페이지 레퍼런스 2-3개를 스크랩하고 결과를 research.md에 기록하라**:
   - 최신 SaaS/앱 랜딩페이지 트렌드를 조사하라 (예: perso.ai, linear.app, vercel.com, cal.com 등)
   - 분석 포인트:
     - Hero 섹션 구성 (헤드라인 + 서브텍스트 + CTA 배치)
     - 스크롤 애니메이션 패턴 (fade-in, slide-up, parallax)
     - 섹션 전환 방식 (full-screen snap, smooth scroll)
     - 신뢰 요소 배치 (로고 마퀴, 통계, 소셜 프루프)
     - CTA 버튼 스타일 및 배치 전략
   - **반드시 결과를 `prototypes/research.md`에 기록하라**

6. **Unsplash API로 프로젝트 도메인에 맞는 이미지를 큐레이션하라** (UNSPLASH_ACCESS_KEY가 있을 때만):
   - Firecrawl `firecrawl_scrape`로 Unsplash 검색 결과 페이지를 스크랩하라:
     - PRD 도메인 관련 키워드 3-4개 (예: "productivity app", "task management", "team collaboration")
     - Hero 배경용 키워드 (예: "abstract gradient", "minimalist workspace", "dark abstract")
   - 또는 Unsplash API 직접 호출: `https://api.unsplash.com/search/photos?query={keyword}&client_id={UNSPLASH_ACCESS_KEY}`
   - **각 컨셉(A/B/C)에 적합한 이미지 URL 3-5개씩 큐레이션하여 research.md에 기록하라**:
     - Hero 배경 이미지 1개
     - Feature 섹션 이미지 2-3개
     - 분위기/무드 이미지 1개
   - Unsplash 이미지 URL 형식: `https://images.unsplash.com/photo-{id}?w={width}&h={height}&fit=crop&q=80`
   - **UNSPLASH_ACCESS_KEY 없으면**: picsum.photos와 CSS 그라디언트로 대체 (이 step 스킵)

7. **`prototypes/research.md` 파일을 아래 4개 섹션으로 구조화하여 작성하라**:
   ```markdown
   # Design Research

   ## 1. 색상 팔레트 (3가지 비주얼 아이덴티티)

   ### Palette A: {무드명} (예: "Cold Dark")
   - Mode: dark/light
   - Primary: #hex — 용도
   - Accent: #hex — 용도
   - Surface: #hex — 배경
   - Text: #hex — 본문
   - Mood: 한 줄 설명

   ### Palette B: {무드명} (예: "Warm Neutral")
   - Mode: dark/light
   - Primary: #hex — 용도
   - Accent: #hex — 용도
   - Surface: #hex — 배경
   - Text: #hex — 본문
   - Mood: 한 줄 설명

   ### Palette C: {무드명} (예: "Clean Light")
   - Mode: dark/light
   - Primary: #hex — 용도
   - Accent: #hex — 용도
   - Surface: #hex — 배경
   - Text: #hex — 본문
   - Mood: 한 줄 설명

   ## 2. 추천 레이아웃 패턴
   - 패턴 1: 설명 (출처: 어디서 발견)
   - 패턴 2: 설명 (출처: 어디서 발견)
   - 패턴 3: 설명 (출처: 어디서 발견)

   ## 3. 핵심 컴포넌트 목록
   - 컴포넌트 1: 설명 + 추천 스타일
   - 컴포넌트 2: 설명 + 추천 스타일
   - 컴포넌트 3: 설명 + 추천 스타일

   ## 4. 디자인 레퍼런스
   - 레퍼런스 앱 1: URL + 참고할 UI 패턴 + 스크린샷: prototypes/references/ref-{name}.png
   - 레퍼런스 앱 2: URL + 참고할 UI 패턴 + 스크린샷: prototypes/references/ref-{name}.png

   ## 5. 랜딩페이지 패턴
   - Hero 스타일: 설명 (출처: 어디서 발견)
   - 스크롤 애니메이션: 패턴 목록
   - CTA 패턴: 버튼 스타일 + 배치
   - 섹션 구성: 추천 섹션 흐름 (Hero → Features → Social Proof → CTA)

   ## 6. 큐레이션된 이미지 (Unsplash)
   ### Concept A용
   - Hero: URL + 설명
   - Feature 1: URL + 설명
   - Feature 2: URL + 설명

   ### Concept B용
   - Hero: URL + 설명
   - Feature 1: URL + 설명

   ### Concept C용
   - Hero: URL + 설명
   - Feature 1: URL + 설명
   ```

8. **Playwright로 레퍼런스 앱 스크린샷을 캡처하고 저장하라**:
   - research.md의 디자인 레퍼런스 섹션에서 URL 2-3개를 선택하라
   - 각 URL에 대해 `browser_navigate` → `browser_take_screenshot` 수행
   - 스크린샷을 `prototypes/references/` 디렉토리에 저장하라 (파일명: `ref-{앱이름}.png`)
   - research.md의 "디자인 레퍼런스" 섹션에 스크린샷 경로를 추가하라
   - 랜딩페이지 레퍼런스 URL도 포함하여 스크린샷을 캡처하라
   - 이 스크린샷은 Phase 4에서 v0 프롬프트 또는 Fallback 시 Claude Code에 시각 참고자료로 사용된다

> **CHECKPOINT**: `prototypes/research.md` 파일이 6개 섹션 (Unsplash 없으면 5개)(3-팔레트 포함)을 모두 포함하고, `prototypes/references/` 에 스크린샷 2장 이상 존재하는지 확인하라.

---

## Phase 2: 컨셉 도출 (출력물: `prototypes/concepts.md`)

`prototypes/research.md`와 `analysis/prd.md`를 기반으로 3가지 인터페이스 컨셉을 정의하라.
**반드시 `prototypes/concepts.md` 파일에 아래 구조로 기록하라.**

### 2-A: 페이지 구조 설계 (PRD + 컨셉 기반)
- PRD의 기능 요구사항과 각 컨셉의 UX 방향을 종합하여 각 프로토타입에 필요한 페이지/뷰를 자유롭게 설계하라
- **페이지 구성은 컨셉마다 다를 수 있다** — 고정된 "메인+보조" 구조를 강제하지 마라
- 최소 3페이지, 최대 4페이지 (랜딩 + 앱 페이지 2-3개)
- **모든 컨셉이 랜딩페이지(`/{x}`)로 시작**하도록 강제:
  - `/{x}` = 랜딩페이지 (Hero + 기능 소개 + CTA)
  - `/{x}/app` 또는 `/{x}/dashboard` 등 = 실제 앱 기능 페이지들
- 예) 랜딩페이지 → 대시보드 (마케팅 중심 서비스)
  - 예) 랜딩페이지 → 워크스페이스 (도구형 앱)
  - 예) 랜딩페이지 → 온보딩/가입 → 메인 기능 (커뮤니티/SaaS)
  - 예) 랜딩페이지 → 목록 → 상세 (콘텐츠/이커머스)

### 2-B: 컨셉별 정의 (각 컨셉에 아래 항목 모두 포함)
1. **컨셉명**
2. **핵심 레이아웃 패턴**
3. **타겟 사용자**
4. **차별점**
5. **비주얼 아이덴티티**: research.md의 Palette A/B/C 중 하나 (각 컨셉은 반드시 다른 팔레트)
6. **페이지 구성**: 이 컨셉에 맞게 설계한 페이지 목록 + 각 라우트 경로 + 각 페이지의 역할
   (예: `/a` = 랜딩, `/a/app` = 메인 기능 또는 `/b` = 대시보드, `/b/detail` = 상세 뷰)
7. **비주얼 에셋 방향**: 이 컨셉에 적합한 시각 요소 설명
   (예: "picsum 유저 아바타", "CSS 그라디언트 배경", "도메인 관련 플레이스홀더 이미지")
8. **랜딩페이지 구성**: Hero 섹션 스타일 + 주요 섹션 흐름 + CTA 문구/동작
   (예: "풀스크린 Hero with gradient → 3-feature showcase → social proof → footer CTA → /a/app으로 이동")
9. **애니메이션 방향**: 이 컨셉에 적합한 전환/스크롤 애니메이션 스타일
   (예: "fade-up on scroll, smooth section transitions, hover scale on cards")

- 3가지 컨셉은 반드시 서로 다른 UX 패러다임을 대표해야 한다
- 3가지 컨셉은 반드시 서로 다른 비주얼 아이덴티티(팔레트)를 사용해야 한다

> **CHECKPOINT**: `prototypes/concepts.md` 파일에 3개 컨셉이 각각 다른 Palette를 배정받았는지, 각 컨셉에 최소 3페이지 (랜딩 포함) 구성이 정의되었는지, 3개 컨셉의 페이지 흐름이 각 컨셉의 성격을 반영하는지 확인하라.

---

## Phase 3: 프로젝트 스캐폴딩

a) **프로젝트 생성** (공식 문서 기준):
   ```bash
   npx create-next-app@latest prototypes/_app --yes
   ```
   `--yes`: TypeScript, Tailwind CSS, App Router, Turbopack 등 권장 기본값 자동 적용

b) **shadcn/ui + 의존성 설치**:
   ```bash
   cd prototypes/_app
   npx shadcn@latest init -t next
   npx shadcn@latest add button input checkbox badge dropdown-menu select dialog avatar scroll-area separator table textarea card
   npm install lucide-react framer-motion
   ```

c) **공통 레이아웃** (app/layout.tsx):
   - 다크 모드 기본 (dark class on html) 유지
   - 공통 폰트, 메타데이터
   - 라이트모드 프로토타입은 자체 페이지에서 `className="light"` wrapper를 사용하여 override

d) **`next.config.ts`에 외부 이미지 도메인 추가**:
   ```typescript
   images: {
     remotePatterns: [
       { protocol: 'https', hostname: 'picsum.photos' },
       { protocol: 'https', hostname: 'images.unsplash.com' },
       { protocol: 'https', hostname: 'illustrations.popsy.co' },  // 무료 일러스트
     ],
   },
   ```

---

## Phase 4: v0 코드 생성 (핵심 — PRIMARY)

> **⛔ 절대로 직접 프로토타입 코드를 작성하지 마라 — v0가 생성한 코드만 사용하라.**

### v0 프롬프트 템플릿 (Vercel 3-Part Framework)

각 프로토타입의 각 페이지 생성 시 아래 템플릿으로 `createChat`을 호출하라. **반드시 concepts.md와 research.md의 결과를 삽입하라**:

```
## 1. Product Surface
Build a {concept_name} interface for {project_name}.
Core features: {prd.md에서 추출한 기능 요구사항 5-8개, 구체적으로}
Layout: {컨셉별 선택된 레이아웃 — 예: "sidebar + main list", "kanban columns", "dashboard grid"}
Page: {이 페이지의 역할 — 예: "메인 리스트 뷰", "상세/편집 뷰"}

## 2. Context of Use
Target users: {PRD의 타겟 사용자 — 예: "individual productivity users who need quick task capture and organization"}
Primary use case: {핵심 사용 시나리오 — 예: "daily task management with priority-based workflow"}
Design reference apps: {research.md에서 추출한 레퍼런스 — 예: "Notion's clean typography, Linear's smooth animations, Todoist's quick-add UX"}

## 3. Constraints & Taste
- Next.js 15 App Router, TypeScript
- 이 페이지는 멀티페이지 앱의 한 뷰이다. 자체 완결적이되 다른 페이지로의 Link 네비게이션을 포함하라.
- Tailwind CSS + shadcn/ui components (import from @/components/ui/*)
- Available shadcn: button, input, checkbox, badge, select, dialog, card, avatar, scroll-area, separator, dropdown-menu, textarea, table
- Icons: lucide-react only
- Color palette: {concepts.md에서 이 컨셉에 배정된 Palette의 hex 전체 — 예: "primary: #6366f1, accent: #8b5cf6, surface: #1e1e2e, text: #e2e8f0"}
- Mode: {dark/light — concepts.md에서 이 컨셉에 배정된 Palette의 Mode}
- Visual mood: {Palette의 Mood 설명}
- Typography: Inter or system font, clear hierarchy (text-2xl headings, text-sm labels)
- Mock data: 8-10 realistic items with varied states
- Visual assets: 시각적 풍부함을 위해 아래를 활용하라:
  - 플레이스홀더 이미지: https://picsum.photos/{width}/{height}?random={n}
    (유저 아바타: 40x40, 히어로 이미지: 800x400, 썸네일: 200x200)
  - CSS 그라디언트, 미묘한 배경 패턴 (dot grid, radial gradient)
  - 도메인 관련 비주얼: {concepts.md의 비주얼 에셋 방향 삽입}
- "NO external API calls" 예외: picsum.photos 정적 이미지 URL은 허용
- Quality: Notion/Linear/Vercel Dashboard 수준 — pixel-perfect spacing, subtle transitions (150-200ms),
  hover states on all interactive elements, focus rings, smooth animations (framer-motion style CSS)
- Responsive: mobile-first, graceful degradation from desktop to mobile
- NO database, NO authentication — pure UI prototype with useState/useReducer
```

### 랜딩페이지 전용 프롬프트 템플릿

각 프로토타입의 랜딩페이지(`/{x}`) 생성 시 아래 템플릿을 사용하라:

```
## 1. Product Surface
Build a modern landing page for {project_name} — a {한 줄 프로젝트 설명}.
This is NOT the app itself, but a marketing/introduction page that showcases the product.

Sections (순서대로):
1. **Hero**: 대형 헤드라인 + 서브텍스트 + Primary CTA 버튼 ("지금 시작하기" / "Try Now" → /{x}/app 링크)
2. **Feature Showcase**: 핵심 기능 3-4개를 카드/그리드로 시각화 (아이콘 + 제목 + 설명)
3. **App Preview**: 앱 UI 목업 또는 스크린샷 영역 (picsum placeholder 또는 CSS mockup)
4. **Social Proof / Stats**: 사용자 수, 완료 작업 수 등 숫자 통계 또는 testimonial 카드 2-3개
5. **CTA Footer**: 마지막 행동 유도 섹션 + Secondary CTA 버튼

## 2. Context of Use
Target users: {PRD 타겟 사용자} — 이 랜딩페이지는 첫 방문자에게 제품 가치를 전달한다.
Design reference: {research.md 랜딩페이지 패턴 섹션 내용} — perso.ai, linear.app 스타일의 모던 SaaS 랜딩

## 3. Constraints & Taste
- Next.js 15 App Router, TypeScript
- 이 페이지는 멀티페이지 앱의 **랜딩/진입 페이지**이다. 앱 기능 페이지(/{x}/app 등)로 이동하는 Link/Button을 반드시 포함하라.
- Tailwind CSS + shadcn/ui components (import from @/components/ui/*)
- Available shadcn: button, input, card, badge, avatar, separator
- Icons: lucide-react only
- **framer-motion**: 스크롤 애니메이션에 사용하라
  - Hero: fade-in + slide-up (duration 0.8s, delay stagger)
  - Feature cards: scroll-triggered fade-up (whileInView)
  - Stats: count-up animation on scroll
  - Sections: smooth reveal on viewport entry
- Color palette: {concepts.md Palette hex}
- Mode: {dark/light}
- Visual mood: {Palette Mood 설명}
- Visual assets (랜딩페이지를 시각적으로 풍부하게 만들기 위한 이미지 전략):
  - **Hero 배경**: CSS 그라디언트 (radial/linear gradient with blur overlay) + 배경 dot/grid 패턴
  - **Feature 섹션 이미지**: research.md "큐레이션된 이미지" 섹션의 Unsplash URL을 직접 사용하라. 없으면 `https://picsum.photos/800/400?random={n}` 또는 CSS 목업
  - **App Preview / 목업**: 실제 앱 페이지(/{x}/app)의 Playwright 스크린샷을 캡처하여 사용하거나, CSS로 만든 브라우저 프레임 안에 앱 UI를 재현
  - **Testimonial 아바타**: https://picsum.photos/40/40?random={n} (사람 얼굴 placeholder)
  - **Feature 아이콘**: lucide-react 아이콘을 그라디언트 배경 원 안에 배치
  - **신뢰 요소**: SVG로 만든 가상 브랜드 로고 마퀴 (CSS animation)
  - **일러스트**: CSS-only 장식 요소 (blur blob, gradient orb, floating shapes)
- Typography: Inter or system font
  - Hero headline: text-5xl md:text-7xl font-bold
  - Sub text: text-xl text-muted-foreground
  - Section titles: text-3xl font-semibold
- NO database, NO authentication — pure static landing page
- Quality: perso.ai / linear.app 수준 — 풀스크린 Hero, smooth scroll animations, 넉넉한 여백(py-24+)
```

### 실행 절차

1. **concepts.md의 페이지 구성을 참조하여 `createChat`을 호출하라**:
   - 각 프로토타입의 각 페이지에 대해 1회씩 createChat 호출
   - **랜딩페이지를 첫 번째로 생성**하고, 이후 앱 페이지들을 생성하라
   - 랜딩페이지 생성 시 랜딩 전용 템플릿 사용, 앱 페이지는 기존 템플릿 사용
   - 총 호출 = 프로토타입당 페이지 수 × 3
   - 최대 프로토타입당 3페이지 (v0 API 비용 관리)
   - 두 번째 이후 페이지 생성 시 `sendChatMessage`로 첫 페이지 코드를 컨텍스트로 전달하여 디자인 일관성 유지

2. **`getChat`으로 생성된 코드를 회수하라**:
   - 응답 메시지에서 ```tsx 코드 블록을 파싱하여 추출하라
   - 추출한 코드의 import 경로를 프로젝트 구조에 맞게 조정하라 (@/components/ui/*)

3. **파일에 기록하라** (concepts.md의 라우트 경로에 따라):
   - app/a/ 하위 ← Interface A 페이지들
   - app/b/ 하위 ← Interface B 페이지들
   - app/c/ 하위 ← Interface C 페이지들
   - app/page.tsx ← `/a`, `/b`, `/c` 링크만 있는 간단한 인덱스 (v0 불필요, 직접 작성)

4. **v0 코드가 빌드 에러를 일으키면**: `sendChatMessage`로 에러 메시지를 보내 수정 요청하라 (최대 2회)

> **v0 실패 시 Fallback** — v0 API가 3회 시도에도 동작하지 않는 경우에 한해:
> 1. 사용자에게 "v0 API 연결 실패. Fallback으로 Claude Code 직접 생성을 진행합니다." 안내
> 2. research.md의 디자인 시스템(색상 hex, 타이포, 레이아웃 패턴)을 상세 프롬프트로 구성하라
> 3. `prototypes/references/`의 레퍼런스 스크린샷을 Read로 참조하라
> 4. 각 프로토타입 생성 시: "이 스크린샷의 레이아웃과 스타일을 참고하여 {컨셉명} 인터페이스를 구현하라.
>    반드시 아래 디자인 시스템을 적용하라: {research.md 색상/타이포/컴포넌트 전문}"
> 5. 반드시 research.md의 hex 코드, 컴포넌트 목록, 레이아웃 패턴이 코드에 반영되었는지 확인하라
>
> ⚠️ 이 fallback은 v0 완전 실패 시에만 사용 — v0가 동작하면 반드시 v0를 사용하라

> **CHECKPOINT**: 각 프로토타입의 모든 페이지 파일이 v0 생성 코드(또는 fallback 생성 코드)를 포함하는지 확인하라. 누락 시 Phase 5로 진행하지 마라.

---

## Phase 5: 컴포넌트 폴리싱 (21st-dev builder + refiner)

1. 각 프로토타입의 **메인 페이지**에서 가장 핵심적인 UI 컴포넌트 1개를 선택하라 (예: task card, kanban column, stat widget)

2. **`21st_magic_component_builder`를 호출하여 해당 컴포넌트의 고품질 버전을 생성하라**
   - 생성된 컴포넌트를 프로토타입에 통합하라

3. **각 프로토타입의 메인 페이지 파일 전체를 `21st_magic_component_refiner`에 전달하여 폴리싱하라** (보조 페이지는 제외 — API 비용 관리)
   - refiner 입력: 현재 코드 + "Notion/Linear 수준으로 polish — spacing, transitions, hover states, typography"
   - refiner 결과를 반영하여 파일을 업데이트하라

> **CHECKPOINT**: 프로토타입당 builder 1회 + refiner 1회 = 최소 6회 호출을 확인하라. 미달 시 추가 호출하라.

---

## Phase 6: 빌드 검증 + 통합

1. `npm run build` 실행

2. **shadcn v4 호환성 주의사항** (빌드 에러 방지):
   - `DialogTrigger`/`DialogClose`: `asChild` 대신 `render={<Component />}` 사용
   - `Select onValueChange`: `string | null` 타입 — null 체크 필요
   - `Checkbox`: `@base-ui/react` 기반 — `checked` prop 대신 `defaultChecked` 확인

3. 에러 발생 시 v0에 `sendChatMessage`로 수정 요청하라 (최대 3회)

4. 각 프로토타입에 README.md 포함 (prototypes/interface-{a,b,c}/README.md):
   - 디자인 컨셉 설명
   - 스크린 구성 설명 (멀티페이지 구조 포함)
   - 장단점

> **CHECKPOINT**: `npm run build` 성공을 확인하라. 실패 시 Phase 7로 진행하지 마라.

---

## Phase 7: 시각 검증 (Playwright)

1. 개발 서버를 시작하라:
   ```bash
   cd prototypes/_app && npm run dev &
   ```
   서버 시작까지 3초 대기

2. **각 프로토타입의 모든 페이지를 스크린샷하라**:
   - concepts.md의 페이지 구성을 참조하여 각 프로토타입의 모든 라우트를 스크린샷
   - Playwright `browser_navigate` → `browser_take_screenshot` 수행:
     - `http://localhost:3000/a/...` (Interface A 전체 페이지)
     - `http://localhost:3000/b/...` (Interface B 전체 페이지)
     - `http://localhost:3000/c/...` (Interface C 전체 페이지)

3. **각 스크린샷을 Read로 분석하라** — Claude 멀티모달 비전을 사용하여:
   - 빈 페이지, 에러 메시지, 깨진 레이아웃 여부 확인
   - spacing/alignment 이슈 확인
   - 색상 대비(contrast) 문제 확인
   - 텍스트 가독성 확인
   - research.md의 디자인 시스템(색상 팔레트, 레이아웃 패턴)이 실제로 반영되었는지 확인
   - **비주얼 차별화**: 3개 프로토타입이 서로 다른 색상/분위기인지 확인.
     두 프로토타입이 너무 비슷하면 치명적 이슈로 플래그하고 색상 변수를 수정하라.
   - **비주얼 에셋**: 텍스트+아이콘만 있고 이미지/그라디언트/패턴이 없으면
     이슈로 플래그하고 추가하라.
   - **페이지 간 네비게이션**: 보조 페이지로의 Link가 작동하는지 확인
   - **랜딩페이지 검증**:
     - Hero 섹션이 뷰포트를 채우는지 (full-screen hero)
     - CTA 버튼이 명확하고 앱 페이지로 연결되는지
     - 스크롤 애니메이션이 자연스러운지 (Playwright에서 scroll 후 스크린샷)
     - 섹션 간 여백이 충분한지 (py-24 이상)
     - 랜딩과 앱 페이지 간 비주얼 일관성 (같은 팔레트)
     - **이미지/비주얼 풍부함**: 텍스트+아이콘만 있으면 이슈 — 최소 Hero 배경 그라디언트, App Preview 목업, Feature 이미지 중 2개 이상 시각 요소가 있어야 함
     - **App Preview 목업**: 가능하면 Playwright로 앱 페이지 스크린샷을 캡처 후 랜딩의 App Preview 섹션에 활용
   - **"Notion/Linear 수준 대비 부족한 점"을 구체적으로 리스트업하라**

4. **발견된 이슈를 코드에서 수정하라**:
   - 리스트업한 이슈를 우선순위 순으로 수정
   - 수정 후 해당 페이지를 재스크린샷 → Read로 재분석
   - 최대 2회 반복 (총 스크린샷: 초기 + 수정 후 최대 2라운드)

5. `prototypes/references/`의 레퍼런스 스크린샷과 현재 프로토타입 스크린샷을 비교하라:
   - 레퍼런스 대비 명백히 부족한 시각 요소가 있으면 추가 수정

> **CHECKPOINT**: 모든 스크린샷이 정상 UI를 표시하고, 3개 프로토타입이 시각적으로 차별화되어 있으며, 시각 분석에서 치명적 이슈가 없는지 확인하라.

---

## 최종 출력

1. 사용자에게 안내:
   "브라우저에서 3가지 프로토타입을 확인하세요:
    - http://localhost:3000/a — Interface A ({컨셉명}): {페이지 목록}
    - http://localhost:3000/b — Interface B ({컨셉명}): {페이지 목록}
    - http://localhost:3000/c — Interface C ({컨셉명}): {페이지 목록}
   확인 후 선택해주세요."

2. 3가지 프로토타입을 표로 요약:
   | 프로토타입 | 진입 URL | 컨셉 | 팔레트 | 페이지 구성 | 장점 | 단점 |
   사용자에게 선택을 요청하고, 선택 후:
   - 개발 서버 종료
   - "선택 완료. 다음 단계: /setup-versions {a|b|c} 를 실행하세요."

최종 디렉토리 구조:
```
prototypes/
├── research.md               ← Phase 1 (3개 팔레트 + 랜딩페이지 패턴 포함)
├── concepts.md               ← Phase 2 (컨셉 + 랜딩 구성 + 애니메이션 방향)
├── references/
│   ├── ref-{app1}.png
│   ├── ref-{app2}.png
│   └── ref-{landing-ref}.png  ← 랜딩 레퍼런스 스크린샷
├── _app/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx          ← /a, /b, /c 링크만 있는 간단한 인덱스
│   │   ├── a/
│   │   │   ├── page.tsx        ← 랜딩페이지 (Hero + CTA → /a/app)
│   │   │   ├── app/page.tsx    ← 앱 기능 페이지
│   │   │   └── {route}/page.tsx
│   │   ├── b/
│   │   │   ├── page.tsx        ← 랜딩페이지
│   │   │   ├── app/page.tsx
│   │   │   └── {route}/page.tsx
│   │   └── c/
│   │       ├── page.tsx        ← 랜딩페이지
│   │       ├── app/page.tsx
│   │       └── {route}/page.tsx
│   ├── components/ui/
│   └── lib/utils.ts
└── interface-{a,b,c}/
    └── README.md
```
