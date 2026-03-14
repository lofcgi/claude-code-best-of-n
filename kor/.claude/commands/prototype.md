---
description: 레퍼런스 기반 3가지 UI 프로토타입 생성 — 구조 차별화 + 이미지 퍼스트 + 구체적 콘텐츠
allowed-tools: [Read, Write, Bash, Glob, Grep, "mcp:firecrawl:*", "mcp:context7:*", "mcp:21st-dev-magic:*", "mcp:design-inspiration:*", "mcp:playwright:*", "mcp:unsplash:*"]
---

analysis/prd.md를 읽고 3가지 UI 인터페이스 프로토타입을 생성하세요.

## 핵심 철학

**"AI가 만든 양산형"을 탈피하는 4가지 축:**
1. **레퍼런스 기반 생성** — 프로 사이트의 섹션 구조(composition)를 추출하여 따라감
2. **이미지 퍼스트** — 프로 사이트 시각적 풍부함의 60%는 이미지에서 옴. 텍스트+아이콘만의 섹션 금지
3. **구체적 콘텐츠** — 둥근 숫자/클리셰 카피 금지, 구체적 수치 + 브랜드 고유 표현
4. **비주얼 밀도** — 단일 레이어 배경/보수적 타이포/기본 버튼은 AI slop 지표.
   반드시 `prototype-references/visual-architecture.md`와
   `prototype-references/aesthetics-guide.md`를 따를 것.

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
      - Unsplash: `search_photos` 호출 (query: "test") — 없으면 권장으로 처리
      → 각 호출이 에러 없이 응답하면 ✅, 에러 발생 시 ❌

   c) 결과를 표로 출력:
      | MCP 서버 | 환경변수 | 테스트 호출 | 최종 | 필수 | 용도 |
      |----------|----------|-----------|------|------|------|
      | Firecrawl | ✅/❌ | ✅/❌ | ✅/❌ | **필수** | 경쟁 앱 UI + 레퍼런스 블루프린트 추출 |
      | Design Inspiration | ✅/❌ | ✅/❌ | ✅/❌ | **필수** | 디자인 레퍼런스 리서치 |
      | 21st-dev Magic | ✅/❌ | ✅/❌ | ✅/❌ | **필수** | UI 컴포넌트 생성/폴리싱 |
      | Context7 | N/A | ✅/❌ | ✅/❌ | **필수** | 최신 프레임워크 문서 참조 |
      | Unsplash | ✅/❌ | ✅/❌ | ✅/❌ | **권장** | 고품질 이미지 큐레이션 |

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

2. **권장 플러그인 확인** — `frontend-design` 플러그인이 설치되어 있으면 Phase 4 코드 생성 품질이 크게 향상됨:
   ```bash
   claude plugin list 2>/dev/null | grep -q "frontend-design" && echo "✅ frontend-design 플러그인 설치됨" || echo "⚠️ 미설치 — 권장: /plugin marketplace add anthropics/claude-code && /plugin install frontend-design@claude-code-plugins"
   ```
   - 설치 시: 대담한 미학, 차별화된 타이포/팔레트, 비대칭 레이아웃, 고품질 애니메이션이 자동 적용됨
   - 미설치 시: 스킬의 지시사항만으로도 동작하지만, 플러그인이 있으면 기본 품질 보장이 더 강력함
   - **⚠️ 미설치여도 중단하지 않음** — 권장 사항일 뿐 필수는 아님

3. analysis/prd.md, analysis/requirements.json 파일 존재 확인
   → 없으면 "먼저 /analyze를 실행하세요" 안내 후 중단

---

## Phase 1: 리서치 (출력물: `prototypes/research.md`)

### ⚠️ 컨텍스트 관리 규칙 (필수 — 위반 시 컨텍스트 폭발)
- MCP 호출은 **최대 2개씩** 병렬 실행 (3개 이상 동시 호출 금지)
- 각 MCP 응답을 받으면 **즉시** `prototypes/research.md` 해당 섹션에 핵심만 요약 기록
- 기록 완료 후 다음 MCP 호출 배치로 넘어감 (응답을 컨텍스트에 쌓아두지 않음)
- `firecrawl_scrape` 시 `formats: ["markdown"]`만 사용 (`"branding"` 포맷 제거 — 응답 크기 절반 감소)
- `onlyMainContent: true` 필수 적용
- 21st-dev, Unsplash 응답도 필요한 URL/이름만 추출하여 즉시 파일에 기록

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

6. **🆕 Firecrawl로 추가 프리미엄 레퍼런스 스크랩** (경쟁 앱 외):
   - `https://stripe.com/` — 벤토 그리드, 실제 제품 목업, 깊이감
   - `https://perso.ai/` — AI 서비스 랜딩 벤치마크
   - `https://height.app/` — SVG wave 히어로 배경
   - WebSearch로 최신 어워드 수상 랜딩 페이지 1-2개 추가 탐색
   - 발견한 비주얼 기법을 research.md §4 (디자인 레퍼런스)에 기록

7. **Firecrawl로 프리미엄 컴포넌트 갤러리 스크랩**:
   - `https://ui.aceternity.com/components` 스크랩 → 프리미엄 컴포넌트 이름 + 설명 목록 추출
   - `https://magicui.design/docs/components` 스크랩 → 애니메이션 컴포넌트 이름 + 설명 목록 추출
   - PRD 섹션별 프리미엄 컴포넌트 매핑을 research.md §7에 기록

8. **🆕🔑 레퍼런스 섹션 블루프린트 추출** (Phase 4의 핵심 입력):
   - Firecrawl로 PRD 도메인 최고 서비스 (perso.ai 또는 경쟁 1위) + 프리미엄 레퍼런스 1개를 스크랩
   - **전체 섹션 순서 목록 추출** (Hero → Trust → Features → ...)
   - **각 섹션의 레이아웃 패턴** (60/40 split, 3-col grid, full-width, bento 등)
   - **각 섹션의 콘텐츠 유형** (텍스트만, 이미지+텍스트, 인터랙티브, 통계 등)
   - research.md §9에 기록:
     ```
     ## 9. 레퍼런스 섹션 블루프린트
     Source: {URL}
     1. Hero: 60/40 split (텍스트 좌, 제품 이미지 우), trust badge 아래
     2. Trust Metrics: 4-col 통계 (구체적 숫자 + 라벨)
     3. Client Logos: 무한 마퀴 또는 그리드
     4. Feature Showcase: 이미지 캐러셀 + 설명
     5. Comparison Table: 경쟁사 대비 표
     6. Benefits Grid: 6-col 아이콘+숫자 카드
     7. Product Demo: 브라우저 프레임 안에 앱 스크린샷
     8. Testimonials: 사진 + 인용 + 이름/역할
     9. Workflow/Process: 단계별 비주얼
     10. FAQ: 아코디언
     ...최소 10개 섹션
     ```
   - **왜**: 이 블루프린트가 Phase 4에서 섹션 구조를 결정. 프로 사이트의 구조를 따라가면 AI 패턴 탈피.

9. **🆕🔑 섹션별 이미지 매핑** (이미지 전략 강화):
   - Unsplash MCP `search_photos`로 PRD 도메인 관련 키워드 검색 (4-5개 키워드)
   - UNSPLASH_ACCESS_KEY 없으면 Firecrawl로 Unsplash 검색 결과 페이지 스크랩
   - **각 섹션 유형에 맞는 이미지 활용 방식 지정**:
     ```
     ## 6. 큐레이션된 이미지 (섹션별 매핑)

     ### 이미지 활용 전략
     - Hero 배경: CSS 그라디언트 + 오버레이 (이미지 위에 gradient mask)
     - Hero 우측: BrowserMockup 안에 앱 페이지 스크린샷 (Phase 4.5에서 캡처)
     - Feature 카드: 각 카드에 관련 이미지 (텍스트+아이콘만 금지)
     - Trust 섹션: 실제 서비스 스크린샷 (CSS browser frame)
     - Testimonial: Unsplash 아바타 (40x40) + 이름 + 역할
     - Process Flow: 각 단계 옆에 단계별 스크린샷 or 아이콘 일러스트

     ### Concept A용
     - Hero 제품 이미지: [앱 페이지 Playwright 스크린샷 — Phase 4.5에서 캡처]
     - Feature 1: Unsplash URL — {도메인 관련}
     - Feature 2: Unsplash URL — {도메인 관련}
     - Feature 3: Unsplash URL — {도메인 관련}
     - Trust 배경: CSS gradient (팔레트에서)

     ### Concept B용 ...
     ### Concept C용 ...
     ```
   - **Unsplash 이미지 URL 형식**: `https://images.unsplash.com/photo-{id}?w={width}&h={height}&fit=crop&q=80`
   - UNSPLASH_ACCESS_KEY 없으면: picsum.photos와 CSS 그라디언트로 대체

10. **안티패턴 금지 목록 — research.md §8에 기록**:
    ```
    ## 8. 안티패턴 (금지 목록)
    - 대칭 3-column 동일 그리드 (→ BentoGrid 사용)
    - 중앙 정렬만의 레이아웃 (→ 비대칭 배치 사용)
    - 호버 효과 없는 플랫 카드 (→ Spotlight/Glare 효과)
    - 회색 플레이스홀더 박스 (→ CSS 목업 또는 그라디언트)
    - linear easing 애니메이션 (→ spring physics 사용)
    - 단일 레이어 배경 (→ 그라디언트 + 패턴 + 파티클 레이어링)
    - 균일한 섹션 높이 (→ 극적으로 변화: min-h-screen 히어로, 컴팩트 stats)
    - 둥근 숫자 (10,000, 100%) (→ 구체적 수치: 10,847, 98.5%)
    - 클리셰 카피 ("혁신적인", "차세대", "올인원") (→ 브랜드 고유 표현)
    - 텍스트+아이콘만의 Feature 카드 (→ 이미지 or CSS 비주얼 필수)
    - 5-6 섹션 구성 (→ 최소 8개 섹션)
    - Hero 배경이 단일 CSS gradient (→ 5레이어 필수)
    - text-4xl/text-5xl Hero 헤드라인 (→ text-6xl md:text-8xl font-black)
    - 기본 filled/ghost 버튼 (→ glow box-shadow 30px+ 필수)
    - py-24/py-32 섹션 패딩 (→ py-40 최소)
    - BrowserMockup 3D 없음 (→ perspective + tinted shadow 필수)
    - Inter/Roboto/Arial 폰트 (→ aesthetics-guide.md 참조)
    - Feature 카드 이미지 없음 (→ 이미지 or CSS 비주얼 필수)
    - 균등 분배 팔레트 (→ dominant + sharp accent)
    ```

11. **Playwright로 레퍼런스 앱 스크린샷을 캡처하고 저장하라**:
    - research.md의 디자인 레퍼런스 섹션에서 URL 2-3개를 선택하라
    - 각 URL에 대해 `browser_navigate` → `browser_take_screenshot` 수행
    - 스크린샷을 `prototypes/references/` 디렉토리에 저장하라 (파일명: `ref-{앱이름}.png`)
    - **Stripe, Perso.ai, Height.app 스크린샷도 캡처하라** (프리미엄 레퍼런스용)

12. **`prototypes/research.md` 파일을 아래 9개 섹션으로 구조화하여 작성하라**:
    ```markdown
    # Design Research

    ## 1. 색상 팔레트 (3가지 비주얼 아이덴티티)
    ### Palette A: {무드명}
    - Mode: dark/light
    - Primary: #hex — 용도
    - Accent: #hex — 용도
    - Surface: #hex — 배경
    - Text: #hex — 본문
    - Mood: 한 줄 설명

    ### Palette B: {무드명}
    (동일 구조)

    ### Palette C: {무드명}
    (동일 구조)

    ## 2. 추천 레이아웃 패턴
    ## 3. 핵심 컴포넌트 목록
    ## 4. 디자인 레퍼런스
    ## 5. 랜딩페이지 패턴

    ## 6. 큐레이션된 이미지 (섹션별 매핑)
    (위 9번의 이미지 활용 전략 + 컨셉별 매핑)

    ## 7. 프리미엄 컴포넌트 매핑
    ## 8. 안티패턴 (금지 목록)

    ## 9. 레퍼런스 섹션 블루프린트
    (위 8번의 섹션 구조 추출 결과)
    ```

> **CHECKPOINT**: `prototypes/research.md` 파일이 9개 섹션(§9 레퍼런스 블루프린트 포함)을 모두 포함하고, §6에 섹션별 이미지 매핑이 있고, `prototypes/references/` 에 스크린샷 2장 이상 존재하는지 확인하라.

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

### 2-B: 컨셉별 정의 (각 컨셉에 아래 항목 모두 포함)
1. **컨셉명**
2. **핵심 레이아웃 패턴**
3. **타겟 사용자**
4. **차별점**
5. **비주얼 아이덴티티**: research.md의 Palette A/B/C 중 하나 (각 컨셉은 반드시 다른 팔레트)
6. **페이지 구성**: 이 컨셉에 맞게 설계한 페이지 목록 + 각 라우트 경로 + 각 페이지의 역할
7. **비주얼 에셋 방향**: 이 컨셉에 적합한 시각 요소 설명
8. **랜딩페이지 구성**: Hero 섹션 스타일 + 주요 섹션 흐름 + CTA 문구/동작
9. **애니메이션 방향**: 이 컨셉에 적합한 전환/스크롤 애니메이션 스타일
10. **프리미엄 컴포넌트 선택** (반드시 research.md §7에서 선택):
    - Hero 기법: {AuroraBackground | HeroParallax | LampEffect | BackgroundBeams} — **3개 컨셉 모두 반드시 다른 Hero 기법 사용**
    - Feature 레이아웃: {BentoGrid | CardSpotlight Grid | GlareCard Row | MagicCard Grid} — **최소 1개 컨셉은 반드시 BentoGrid 사용**
    - Social Proof: {InfiniteMovingCards | AnimatedBeam | NumberTicker}
    - 배경 장식: {SparklesCore, DotPattern, Meteors, GridPattern} 중 1-2개
    - 텍스트 애니메이션: {TextGenerateEffect | TypingAnimation | BlurIn}
    - 네비게이션: {FloatingNavbar | FloatingDock}

### 2-C: 🆕🔑 섹션 구성 차별화 매트릭스 (필수)

**컨셉별 섹션 순서와 종류가 달라야 함.** 같은 5섹션을 색상만 바꿔서 3번 → 동질화. 구조 자체가 달라야 진짜 "다른 컨셉".

research.md §9의 레퍼런스 블루프린트를 기반으로, 각 컨셉의 섹션 구성을 차별화하여 정의:

```
## 차별화 매트릭스

| 요소 | Concept A | Concept B | Concept C |
|------|-----------|-----------|-----------|
| 섹션 수 | 10 | 8 | 9 |
| 2번째 섹션 | Trust Metrics | Product Demo | Client Logos |
| 3번째 섹션 | BentoGrid Features | Comparison Table | Video Showcase |
| Social Proof 위치 | 6번째 | 4번째 | 8번째 |
| Pricing 포함 | 아니오 | 예 | 아니오 |
| FAQ 포함 | 아니오 | 아니오 | 예 |
| 고유 섹션 | Comparison Table | Interactive Demo | Case Studies |
```

**규칙**:
- 각 컨셉 최소 8개 섹션
- 3개 컨셉 간 섹션 종류가 최소 2개 달라야 함
- 섹션 순서가 모두 달라야 함 (같은 순서 금지)

- 3가지 컨셉은 반드시 서로 다른 UX 패러다임을 대표해야 한다
- 3가지 컨셉은 반드시 서로 다른 비주얼 아이덴티티(팔레트)를 사용해야 한다
- **3가지 컨셉은 반드시 서로 다른 Hero 기법을 사용해야 한다 — 색상뿐 아니라 구조적 차별화**
- **🆕 3가지 컨셉은 반드시 서로 다른 섹션 구성을 가져야 한다**

> **CHECKPOINT**: `prototypes/concepts.md` 파일에 3개 컨셉이 각각 다른 Palette, 다른 Hero 기법, **다른 섹션 구성**을 배정받았는지, 차별화 매트릭스가 포함되었는지, 각 컨셉에 최소 8개 섹션이 정의되었는지 확인하라.

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
   npm install lucide-react framer-motion mini-svg-data-uri
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
       { protocol: 'https', hostname: 'illustrations.popsy.co' },
     ],
   },
   ```

e) **`components/premium/` 디렉토리 생성**:
   ```bash
   mkdir -p prototypes/_app/components/premium
   ```
   이 디렉토리에 Phase 4에서 Aceternity/Magic UI 컴포넌트 코드를 배치한다.

e2) **프리미엄 배경 효과 컴포넌트 생성**:
   `.claude/commands/prototype-references/premium-components.md`를 Read하여
   아래 컴포넌트를 `components/premium/`에 레퍼런스 코드를 그대로 복사하여 생성:
   - background-beams.tsx (SVG 빔 + pathLength)
   - lamp-effect.tsx (conic-gradient 확장)
   - aurora-background.tsx (3레이어 오로라)
   - meteors.tsx (유성 효과)
   - sparkles.tsx (부유 파티클)
   - gradient-text.tsx (gradient clip text)
   - floating-dock.tsx (하단 독 네비)
   **⛔ 단순화/생략 금지** — 레퍼런스 코드를 정확히 복사하라.

f) **`app/globals.css`에 프리미엄 유틸리티 CSS 추가** (기존 스타일 뒤에 append):
   ```css
   /* === Premium Visual Utilities === */

   /* Aurora 애니메이션 */
   @keyframes aurora {
     0%, 100% { background-position: 50% 50%, 50% 50%; }
     50% { background-position: 100% 50%, 0% 50%; }
   }
   .animate-aurora {
     animation: aurora 15s ease infinite;
     background-size: 300% 300%, 200% 200%;
   }

   /* Grain/Noise 텍스처 오버레이 */
   .bg-noise::after {
     content: "";
     position: absolute;
     inset: 0;
     background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
     opacity: 0.02;
     pointer-events: none;
     z-index: 1;
   }

   /* Grid 패턴 배경 */
   .bg-grid {
     background-image:
       linear-gradient(to right, hsl(var(--foreground) / 0.03) 1px, transparent 1px),
       linear-gradient(to bottom, hsl(var(--foreground) / 0.03) 1px, transparent 1px);
     background-size: 40px 40px;
   }

   /* Dot 패턴 배경 */
   .bg-dots {
     background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
     background-size: 24px 24px;
     opacity: 0.15;
   }

   /* 무한 마퀴 */
   @keyframes marquee {
     from { transform: translateX(0); }
     to { transform: translateX(-50%); }
   }
   .animate-marquee {
     animation: marquee 30s linear infinite;
   }

   /* Shimmer 스켈레톤 */
   @keyframes shimmer {
     from { background-position: -200% 0; }
     to { background-position: 200% 0; }
   }
   .animate-shimmer {
     background: linear-gradient(90deg, transparent 25%, hsl(var(--foreground) / 0.05) 50%, transparent 75%);
     background-size: 200% 100%;
     animation: shimmer 2s ease-in-out infinite;
   }

   /* Spotlight 커서 추적 glow */
   .card-spotlight {
     position: relative;
     overflow: hidden;
   }
   .card-spotlight::before {
     content: "";
     position: absolute;
     inset: 0;
     background: radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), hsl(var(--primary) / 0.06), transparent 40%);
     pointer-events: none;
     z-index: 1;
   }

   /* 버튼/카드 Glow 효과 */
   .glow {
     box-shadow: 0 0 20px -5px hsl(var(--primary) / 0.3);
   }
   .glow-hover:hover {
     box-shadow: 0 0 30px -5px hsl(var(--primary) / 0.5);
   }

   /* Primary Glow (CTA 버튼용 — 30px + 60px dual layer) */
   .glow-primary {
     box-shadow: 0 0 30px hsl(var(--primary) / 0.4), 0 0 60px hsl(var(--primary) / 0.2);
   }
   .glow-primary:hover {
     box-shadow: 0 0 40px hsl(var(--primary) / 0.5), 0 0 80px hsl(var(--primary) / 0.3);
   }

   /* Meteor 애니메이션 */
   @keyframes meteor {
     0% { transform: rotate(215deg) translateX(0); opacity: 1; }
     70% { opacity: 1; }
     100% { transform: rotate(215deg) translateX(-600px); opacity: 0; }
   }
   .animate-meteor {
     animation: meteor 3s linear infinite;
   }

   /* Gradient Text 애니메이션 */
   @keyframes gradient-x {
     0%, 100% { background-position: 0% 50%; }
     50% { background-position: 100% 50%; }
   }
   .animate-gradient-x {
     animation: gradient-x 3s ease infinite;
   }

   /* Sparkle Float 애니메이션 */
   @keyframes sparkle-float {
     0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
     50% { transform: translateY(-10px) scale(1.2); opacity: 1; }
   }
   .animate-sparkle-float {
     animation: sparkle-float 3s ease-in-out infinite;
   }
   ```

g) **`lib/utils.ts` 확장** — 기존 `cn()` 외에 유틸리티 함수 추가:
   ```typescript
   // cn() 함수 아래에 추가:
   export function generateNoisePattern(opacity: number = 0.02): string {
     return `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='${opacity}'/%3E%3C/svg%3E")`;
   }
   ```

h) **🆕 `lib/design-tokens.ts` 자동 생성** (research.md → 코드 상수):
   ```typescript
   // research.md의 팔레트 데이터로 자동 생성
   export const palettes = {
     a: {
       primary: "{Palette A Primary hex}",
       accent: "{Palette A Accent hex}",
       surface: "{Palette A Surface hex}",
       text: "{Palette A Text hex}",
       mode: "dark" | "light",
     },
     b: { /* Palette B */ },
     c: { /* Palette C */ },
   } as const;

   // research.md §6의 이미지 URL 매핑
   export const images = {
     a: {
       hero: "{Unsplash URL or placeholder}",
       features: ["{URL1}", "{URL2}", "{URL3}"],
       avatars: ["{URL1}", "{URL2}", "{URL3}"],
     },
     b: { /* ... */ },
     c: { /* ... */ },
   } as const;
   ```
   - **인라인 hex 금지** — 모든 페이지에서 이 파일을 import하여 사용

---

## Phase 4: 페이지 코드 생성 (🆕 근본 재설계 — Claude Code 직접 생성)

> **⛔ v0 제거. Claude Code가 직접 코드를 생성한다.**
> 레퍼런스 블루프린트 + 프리빌트 컴포넌트 + 디자인 토큰 조합으로 생성.
>
> **💡 `frontend-design` 플러그인이 설치되어 있으면** — 이 Phase에서 자동으로 활성화되어
> 대담한 미학 선택, 비대칭 구성, 고품질 타이포/모션을 기본 적용한다.
> 플러그인의 디자인 판단 + 이 스킬의 레퍼런스 블루프린트/카피 가이드라인이 결합되어 최상의 결과를 낸다.

### 생성 순서 (중요!)
1. **앱 페이지 먼저 생성** (app/{x}/app/page.tsx 등)
2. Phase 4.5에서 앱 페이지 스크린샷 캡처
3. **랜딩 페이지 생성** — BrowserMockup에 앱 스크린샷 삽입

### ⛔ 코드 생성 전 필수 참조 (협상 불가)
1. `.claude/commands/prototype-references/visual-architecture.md`를 Read하라
2. `.claude/commands/prototype-references/aesthetics-guide.md`를 Read하라
3. 해당 파일의 코드 패턴을 정확히 따르라

### Hero Visual Density Rules
- visual-architecture.md의 "Hero 5-Layer Architecture" 섹션을 정확히 구현
- 5개 레이어 미만의 Hero 절대 금지
- 각 컨셉이 다른 Layer 2 컴포넌트 사용 (A: BackgroundBeams, B: AuroraBackground, C: LampEffect)

### Typography Rules
- visual-architecture.md의 "Typography Hierarchy" 따름
- Hero headline: text-6xl md:text-8xl font-black (text-5xl 이하 금지)
- GradientText 필수 사용 — 핵심 키워드를 래핑

### CTA Rules
- visual-architecture.md의 "CTA Button Premium" 코드 패턴 따름
- 기본 filled 버튼 금지 — glow box-shadow 필수 (30px + 60px dual layer)

### BrowserMockup Rules
- visual-architecture.md의 "BrowserMockup Premium" 따름
- 3D perspective 또는 color-tinted shadow 필수 (플랫 mockup 금지)

### 사전 준비: Context7로 프리미엄 컴포넌트 코드 fetch

1. `resolve-library-id("aceternity-ui")` → `query-docs("{concepts.md 항목 10의 컴포넌트명}")`
2. `resolve-library-id("magic-ui")` → `query-docs("{concepts.md 항목 10의 컴포넌트명}")`
3. 추출한 컴포넌트 소스코드를 `components/premium/` 디렉토리에 저장:
   ```
   components/premium/
   ├── spotlight-card.tsx     — 마우스 추적 glow (모든 카드에 기본 적용)
   ├── multi-layer-hero.tsx   — 4레이어 Hero 배경
   ├── bento-grid.tsx         — 비대칭 그리드
   ├── browser-mockup.tsx     — CSS 브라우저 프레임 (핵심 — 앱 스크린샷 래핑)
   ├── infinite-marquee.tsx   — 심리스 마퀴
   ├── text-reveal.tsx        — 텍스트 애니메이션
   ├── number-ticker.tsx      — 카운트업
   └── floating-nav.tsx       — glass-morphism 네비게이션
   ```

### 앱 페이지 생성 규칙

research.md의 디자인 시스템 + concepts.md의 컨셉 정의를 기반으로 직접 코드를 작성:

- `design-tokens.ts`에서 colors/images 가져오기 (인라인 hex 금지)
- `components/premium/`에서 UI 컴포넌트 import
- `prototypes/references/`의 레퍼런스 스크린샷을 Read로 참조하여 비주얼 수준 맞춤
- 앱 페이지 프리미엄 요구사항:
  - Sidebar/Nav: glass-morphism (backdrop-blur-md, bg-white/5 또는 bg-black/20, 미묘한 1px border at 10% opacity)
  - Cards: 반드시 hover 효과 — border glow 또는 cursor-following spotlight
  - Empty states: CSS 추상 도형 일러스트 — 순수 텍스트만 금지
  - Micro-interactions: 버튼 press scale(0.97), input focus시 primary glow ring
  - 모든 애니메이션: spring physics `{ type: "spring", stiffness: 200, damping: 25 }` — linear 금지

### 랜딩 페이지 생성 규칙 (🆕 핵심 변경)

**research.md §9의 "레퍼런스 섹션 블루프린트"를 따라 섹션 구성.**
**concepts.md의 차별화 매트릭스에 정의된 컨셉별 차별화된 섹션 순서 적용.**

각 섹션 생성 시:
1. `design-tokens.ts`에서 colors/images 가져오기 (인라인 hex 금지)
2. `components/premium/`에서 UI 컴포넌트 import
3. **Unsplash 이미지 적극 활용 (텍스트+아이콘만의 섹션 금지)**
4. **구체적 수치 사용 (98.5%, 400K+, 10X 등 — 둥근 숫자 금지)**

### 카피 작성 가이드라인 (🆕)
- **헤드라인**: 2-4 단어, 브랜드 고유 표현 (클리셰 금지: "혁신적인", "차세대", "올인원")
- **서브텍스트**: 1문장, 15-20 단어, 구체적 수치 포함
- **Feature 이름**: 2-3 단어, 브랜드 용어 (일반 명사 금지)
- **CTA**: 동사 + 혜택 ("지금 더빙 시작" not "시작하기")

### 필수 섹션 (최소 8개)
1. FloatingNav (glass-morphism)
2. Hero (MultiLayerHero + BrowserMockup with 앱 스크린샷)
3. Trust Metrics (NumberTicker — 구체적 수치 4개)
4. Feature Showcase (BentoGrid + SpotlightCard + 이미지)
5. Product Demo / App Preview (BrowserMockup — 풀사이즈)
6. Social Proof (InfiniteMarquee 또는 TestimonialGrid)
7. Process Flow (3-5 스텝 + 단계별 비주얼)
8. Footer CTA
+ 컨셉별 추가 섹션 (Comparison, FAQ, Pricing, Case Study 등 — 차별화 매트릭스에 따라)

### 비주얼 에셋 필수 조건 (🆕)
- **페이지당 이미지(Unsplash/스크린샷) 최소 5개**
- **BrowserMockup 최소 1개** (앱 프리뷰)
- **텍스트+아이콘만의 Feature 카드 금지** (이미지 or CSS 비주얼 필수)
- **아바타 이미지 최소 3개** (testimonial)

### 랜딩 Visual Architecture (모든 섹션 공통 규칙, 협상 불가)
- 애니메이션: 반드시 spring physics `{ type: "spring", stiffness: 200, damping: 25 }` 사용. linear/ease-in-out 금지.
- 깊이: 모든 섹션에 최소 2개 비주얼 레이어 (배경 효과 + 콘텐츠).
- 비대칭: 최소 2개 섹션이 비중심, 비대칭 레이아웃.
- 호버: 모든 인터랙티브 요소에 transform 호버.
- 그레인: 모든 그라디언트 배경에 noise 오버레이 (opacity 0.015-0.03).
- 간격: 섹션 패딩 최소 py-40 (py-24/py-32 금지). Hero는 반드시 min-h-screen.
- 플로팅 네비게이션: glass-morphism (backdrop-blur-md, bg-white/5, border-white/10)

### 실행 절차

1. **앱 페이지 먼저 생성** (concepts.md 페이지 구성 참조):
   - app/a/app/page.tsx, app/b/app/page.tsx, app/c/app/page.tsx
   - 및 추가 앱 페이지들

2. **Phase 4.5 실행** (아래 참조) — 앱 스크린샷 캡처

3. **랜딩 페이지 생성** — BrowserMockup에 앱 스크린샷 삽입:
   - app/a/page.tsx, app/b/page.tsx, app/c/page.tsx
   - 차별화 매트릭스의 섹션 순서를 정확히 따를 것
   - research.md §9 블루프린트를 기반으로 하되, 컨셉별 변형 적용

4. **app/page.tsx** ← `/a`, `/b`, `/c` 링크만 있는 간단한 인덱스 (직접 작성)

> **CHECKPOINT**: 각 프로토타입의 모든 페이지 파일이 생성되었는지, 인라인 hex가 없고 design-tokens.ts를 참조하는지, 각 랜딩이 최소 8개 섹션을 포함하는지 확인하라.

---

## Phase 4.5: 앱 스크린샷 → 랜딩 주입 (🆕 신규)

> 이 Phase는 앱 페이지 생성 완료 후, 랜딩 페이지 생성 전에 실행.

1. **dev 서버 시작**:
   ```bash
   cd prototypes/_app && npm run dev &
   ```
   서버 시작까지 3초 대기

2. **Playwright로 각 앱 페이지 스크린샷**:
   - 뷰포트 스크린샷 (1280x800)
   - `browser_navigate` → `browser_take_screenshot`
   - 저장: `public/screenshots/{concept}-app.png`
   - 예: `public/screenshots/a-app.png`, `b-app.png`, `c-app.png`

3. **각 랜딩의 Hero/Feature 섹션에서 BrowserMockup 내부에 해당 스크린샷 표시**:
   ```tsx
   <BrowserMockup url="app.{projectname}.ai">
     <img src="/screenshots/a-app.png" alt="{Project Name} App" className="w-full" />
   </BrowserMockup>
   ```

4. **이것이 perso.ai처럼 "실제 제품을 보여주는" 느낌의 핵심**

5. dev 서버 종료 (빌드 검증에서 다시 시작하므로)

---

## Phase 5: 구조+콘텐츠+비주얼 체크리스트 검증 (🆕 재설계)

> **기존 21st-dev 중심 폴리싱을 체크리스트 기반 검증으로 대체.**
> 각 라운드에서 실패 항목을 코드에서 직접 수정.

### Round 1 — 구조 검증:
각 랜딩 페이지 코드를 Read로 읽고 확인:
- □ 섹션 수 ≥ 8?
- □ BrowserMockup에 실제 앱 스크린샷(`/screenshots/`) 표시?
- □ 인라인 hex color 0개? (design-tokens 참조만)
- □ 비대칭 레이아웃 최소 2개 섹션?
- □ 3개 랜딩의 섹션 순서가 차별화 매트릭스와 일치?

→ 실패 항목 있으면 코드 수정

### Round 2 — 비주얼 에셋 + 프리미엄 품질 검증:
- □ 이미지 5개+ 사용?
- □ 텍스트+아이콘만의 카드 0개?
- □ 아바타 이미지 3개+?
- □ CSS 그라디언트/패턴 배경 3개+ 섹션?
- □ BrowserMockup 최소 1개?
- □ Hero에 5개+ 시각 레이어? (base + effect + pattern + glow + particles)
- □ Hero 헤드라인 text-6xl md:text-8xl?
- □ GradientText 사용?
- □ CTA에 glow box-shadow?
- □ 모든 섹션 py-40+?
- □ BrowserMockup에 3D perspective 또는 tinted shadow?
- □ Font이 Inter/Roboto/Arial이 아닌지?

→ 실패 항목 있으면 이미지/비주얼 추가 + 코드 수정

### Round 3 — 콘텐츠 검증:
- □ 둥근 숫자(10,000, 100%) 대신 구체적 수치(10,847, 98.5%)?
- □ 헤드라인에 클리셰 없음? ("혁신적", "차세대", "올인원")
- □ CTA가 동사+혜택 형태?
- □ Feature 이름이 브랜드 고유 용어?

→ 실패 항목 있으면 카피 수정

### Round 4 — 차별화 검증:
- □ 3개 랜딩의 섹션 순서가 다름?
- □ 3개 랜딩의 섹션 종류가 최소 2개 다름?
- □ 컬러 팔레트 명확 구분?
- □ Hero 기법이 모두 다름?

→ 실패 항목 있으면 구조 재배치 또는 21st-dev refiner로 차별화

### 21st-dev 선택적 사용 (Round 4 실패 시에만)
- 차별화가 부족한 프로토타입에 대해 `21st_magic_component_refiner` 호출 (최대 3회)
- 구체적 재구성 지시와 함께 호출

> **CHECKPOINT**: 4개 라운드 모두 통과. 실패 항목 각 라운드당 0개.

---

## Phase 6: 빌드 검증 + 통합

1. `npm run build` 실행

2. **shadcn v4 호환성 주의사항** (빌드 에러 방지):
   - `DialogTrigger`/`DialogClose`: `asChild` 대신 `render={<Component />}` 사용
   - `Select onValueChange`: `string | null` 타입 — null 체크 필요
   - `Checkbox`: `@base-ui/react` 기반 — `checked` prop 대신 `defaultChecked` 확인

3. 에러 발생 시 코드를 직접 수정하라 (최대 3회)

4. **프리미엄 인프라 검증**:
   - `components/premium/` 디렉토리 존재 확인
   - `globals.css`에 프리미엄 keyframes (aurora, marquee, shimmer) 포함 확인
   - `lib/utils.ts`에 `generateNoisePattern` 함수 포함 확인
   - `lib/design-tokens.ts` 존재 확인

5. 각 프로토타입에 README.md 포함 (prototypes/interface-{a,b,c}/README.md):
   - 디자인 컨셉 설명
   - 스크린 구성 설명 (멀티페이지 구조 포함)
   - 사용된 프리미엄 컴포넌트
   - 섹션 구성 (차별화 매트릭스에서)
   - 장단점

> **CHECKPOINT**: `npm run build` 성공 AND 프리미엄 인프라 + design-tokens 확인. 빌드 실패 시 Phase 7로 진행하지 마라.

---

## Phase 7: 시각 검증 (Playwright) — 🆕 강화 스코어카드

1. 개발 서버를 시작하라:
   ```bash
   cd prototypes/_app && npm run dev &
   ```
   서버 시작까지 3초 대기

2. **각 프로토타입의 모든 페이지를 스크린샷하라**:
   - concepts.md의 페이지 구성을 참조하여 각 프로토타입의 모든 라우트를 스크린샷
   - Playwright `browser_navigate` → `browser_take_screenshot` 수행

3. **스크롤 기반 스크린샷** — 각 랜딩페이지에 대해:
   - 5개 스크롤 위치에서 스크린샷: 0%, 25%, 50%, 75%, 100%
   - Playwright `browser_evaluate`로 `window.scrollTo(0, document.body.scrollHeight * {pct})` 실행
   - 각 위치에서 `browser_take_screenshot`

4. **각 스크린샷을 Read로 분석하라** — Claude 멀티모달 비전:
   - 빈 페이지, 에러 메시지, 깨진 레이아웃 여부
   - spacing/alignment 이슈
   - 색상 대비(contrast) 문제
   - research.md의 디자인 시스템이 실제로 반영되었는지
   - **비주얼 차별화**: 3개 프로토타입이 서로 다른 색상/분위기인지
   - **비주얼 에셋**: 텍스트+아이콘만 있고 이미지/그라디언트/패턴이 없으면 이슈
   - **BrowserMockup**: 앱 스크린샷이 정상 표시되는지
   - **섹션 수**: 스크롤 스크린샷에서 8개+ 섹션이 보이는지
   - **랜딩과 앱 페이지 간 비주얼 일관성** (같은 팔레트)

5. **🆕 프리미엄 품질 스코어카드** (프로토타입별 평가, 결과 기록):

   ```
   ### 프리미엄 품질 스코어카드 — 프로토타입 {A/B/C}

   **구조 (전체 통과 필수)**
   [ ] Hero가 min-h-screen
   [ ] 섹션 수 ≥ 8
   [ ] 최소 1개 섹션이 비대칭/bento 레이아웃
   [ ] 섹션 간격 py-32 이상
   [ ] 플로팅/glass-morphism 네비게이션 존재
   [ ] BrowserMockup에 앱 스크린샷 표시

   **비주얼 깊이 (13개 중 10개 통과)**
   [ ] Hero에 레이어드 배경 (gradient + pattern + particles/decoration)
   [ ] 그라디언트 섹션에 grain/noise 텍스처 존재
   [ ] 카드 hover spotlight/glow 효과 작동
   [ ] 최소 1개 섹션에 parallax 또는 scroll-reveal 효과
   [ ] 배경 장식 요소 존재 (blobs, beams, dots, meteors)
   [ ] 이미지 5개+ 사용 (Unsplash/스크린샷)
   [ ] Hero에 5개+ 시각 레이어 (base + effect + pattern + glow + particles)
   [ ] Hero 헤드라인 72px+ (text-6xl md:text-8xl)
   [ ] GradientText로 핵심 키워드 강조
   [ ] CTA에 glow 효과 (box-shadow 30px+)
   [ ] 섹션 패딩 py-40+ (py-24/py-32 없음)
   [ ] BrowserMockup에 perspective/tinted shadow
   [ ] Font이 AI slop 기본값(Inter/Roboto)이 아님

   **콘텐츠 (4개 중 3개 통과)**
   [ ] 구체적 수치 사용 (둥근 숫자 없음)
   [ ] 헤드라인에 클리셰 없음
   [ ] CTA가 동사+혜택 형태
   [ ] Feature 이름이 브랜드 고유 용어

   **애니메이션 (4개 중 3개 통과)**
   [ ] Hero 헤드라인에 텍스트 애니메이션
   [ ] Feature 카드에 스크롤 진입 애니메이션 (translate+fade)
   [ ] Stats에 count-up 애니메이션
   [ ] 상시 ambient 애니메이션 최소 1개 (particles, aurora, floating shapes, marquee)

   **차별화 (전체 통과 필수)**
   [ ] 3개 프로토타입 Hero 기법이 모두 다름
   [ ] 3개 프로토타입 Feature 레이아웃이 모두 다름
   [ ] 3개 프로토타입 섹션 구성이 모두 다름
   [ ] 배경 패턴 공유 없음
   [ ] 색상 팔레트 명확히 구분 (다른 hue family)
   ```

   **실패 항목 2개 초과시**: 타겟 수정 라운드 — 구체적 실패 항목 코드 수정 → 재스크린샷 → 재평가. 최대 2회 반복.

6. **발견된 이슈를 코드에서 수정하라**:
   - 스코어카드 실패 항목 우선, 그 다음 비주얼 이슈
   - 수정 후 해당 페이지를 재스크린샷 → Read로 재분석
   - 최대 2회 반복

7. **`prototypes/references/`의 레퍼런스 스크린샷과 비교**:
   - Stripe/Vercel/Linear 레퍼런스 대비 명백히 부족한 시각 요소가 있으면 추가 수정

> **CHECKPOINT**: 모든 스크린샷이 정상 UI를 표시하고, 프리미엄 품질 스코어카드가 3개 프로토타입 모두 통과 (최대 2개 실패 허용), 3개 프로토타입이 시각적+구조적으로 차별화되어 있으며, BrowserMockup에 앱 스크린샷이 정상 표시되는지 확인하라.

---

## 최종 출력

1. 사용자에게 안내:
   "브라우저에서 3가지 프로토타입을 확인하세요:
    - http://localhost:3000/a — Interface A ({컨셉명}): {페이지 목록}
    - http://localhost:3000/b — Interface B ({컨셉명}): {페이지 목록}
    - http://localhost:3000/c — Interface C ({컨셉명}): {페이지 목록}
   확인 후 선택해주세요."

2. 3가지 프로토타입을 표로 요약:
   | 프로토타입 | 진입 URL | 컨셉 | 팔레트 | Hero 기법 | Feature 레이아웃 | 섹션 수 | 고유 섹션 | 장점 | 단점 |
   사용자에게 선택을 요청하고, 선택 후:
   - 개발 서버 종료
   - "선택 완료. 다음 단계: /setup-versions {a|b|c} 를 실행하세요."

최종 디렉토리 구조:
```
prototypes/
├── research.md               ← Phase 1 (9개 섹션: §9 레퍼런스 블루프린트 포함)
├── concepts.md               ← Phase 2 (컨셉 + 차별화 매트릭스 + 프리미엄 컴포넌트 선택)
├── references/
│   ├── ref-{app1}.png
│   ├── ref-{app2}.png
│   ├── ref-{stripe}.png
│   └── ref-{landing-ref}.png
├── _app/
│   ├── app/
│   │   ├── globals.css        ← 프리미엄 유틸리티 CSS 포함
│   │   ├── layout.tsx
│   │   ├── page.tsx          ← /a, /b, /c 링크
│   │   ├── a/
│   │   │   ├── page.tsx        ← 랜딩 (8+ 섹션, BrowserMockup + 앱 스크린샷)
│   │   │   ├── app/page.tsx    ← 앱 기능 페이지
│   │   │   └── {route}/page.tsx
│   │   ├── b/
│   │   │   ├── page.tsx        ← 랜딩 (다른 섹션 구성)
│   │   │   ├── app/page.tsx
│   │   │   └── {route}/page.tsx
│   │   └── c/
│   │       ├── page.tsx        ← 랜딩 (다른 섹션 구성)
│   │       ├── app/page.tsx
│   │       └── {route}/page.tsx
│   ├── components/
│   │   ├── ui/               ← shadcn/ui 컴포넌트
│   │   └── premium/          ← Aceternity/Magic UI 컴포넌트 코드
│   ├── lib/
│   │   ├── utils.ts          ← cn() + generateNoisePattern()
│   │   └── design-tokens.ts  ← 팔레트 + 이미지 URL 상수
│   └── public/
│       └── screenshots/      ← 앱 페이지 Playwright 스크린샷
│           ├── a-app.png
│           ├── b-app.png
│           └── c-app.png
└── interface-{a,b,c}/
    └── README.md
```
