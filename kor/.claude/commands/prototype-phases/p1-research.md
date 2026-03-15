# Phase 1: 3레이어 디자인 리서치 (출력물: `prototypes/research.md`)

## 3레이어 추출 아키텍처

| 레이어 | 도구 | 추출 대상 | 출력 위치 |
|--------|------|----------|----------|
| 구조 | Defuddle MCP (`defuddle_fetch`) | 섹션 순서, 콘텐츠 타입, 계층 | `research.md §9` |
| 브랜딩 | Firecrawl `branding` 포맷 | 색상, 폰트, 스페이싱, 컴포넌트 패턴 | `reference-tokens.json` |
| 비주얼 | Playwright 스크린샷 | 시각적 벤치마크 | `references/*.png` |

---

## ⚠️ 컨텍스트 관리 규칙 (필수 — 위반 시 컨텍스트 폭발)
- MCP 호출은 **최대 2개씩** 병렬 실행 (3개 이상 동시 호출 금지)
- 각 MCP 응답을 받으면 **즉시** `prototypes/research.md` 해당 섹션에 핵심만 요약 기록
- 기록 완료 후 다음 MCP 호출 배치로 넘어감 (응답을 컨텍스트에 쌓아두지 않음)
- `onlyMainContent: true` 필수 적용
- 21st-dev, Unsplash 응답도 필요한 URL/이름만 추출하여 즉시 파일에 기록

---

## 실행 단계

### 1. PRD 읽기
analysis/prd.md와 analysis/requirements.json을 읽어라.

### 2. Design Inspiration MCP 검색
- PRD 도메인과 관련된 키워드 3-4개로 `collectui_search` 또는 `collectui_browse`를 호출하라
- UI 레이아웃, 색상 스킴, 타이포그래피, 인터랙션 패턴을 분석하라
- **다크모드와 라이트모드를 모두 포함하여 최소 3가지 서로 다른 비주얼 스타일을 검색하라**
- **반드시 결과를 `prototypes/research.md`에 기록하라**

### 3. 21st-dev Magic 컴포넌트 검색
- `component_inspiration`으로 핵심 컴포넌트 3-4종 검색
- **반드시 결과를 `prototypes/research.md`에 기록하라**

### 4. Firecrawl 경쟁 앱 스크랩 (2-3개)
- PRD에 언급된 경쟁 앱이나 유사 서비스의 URL을 `firecrawl_scrape`로 크롤링
- `formats: ["markdown"]`, `onlyMainContent: true`
- UI 레이아웃, 네비게이션 패턴, 브랜딩(색상, 폰트) 분석
- **3가지 서로 다른 팔레트 방향을 추출. 최소 하나는 근본적으로 다른 색상 계열(hue)**
- **반드시 결과를 `prototypes/research.md`에 기록하라**

### 5. 🆕 Firecrawl 브랜딩 토큰 추출
- 레퍼런스 사이트 1-2개를 `firecrawl_scrape`로 크롤링 (`formats: ["branding", "screenshot"]`)
- 추출 대상: 색상, 폰트, 스페이싱, 컴포넌트 패턴
- 결과를 `prototypes/reference-tokens.json`에 저장:
  ```json
  {
    "source": "{URL}",
    "colors": { "primary": "#hex", "accent": "#hex", "background": "#hex" },
    "fonts": { "heading": "FontName", "body": "FontName" },
    "spacing": { "sectionPadding": "value", "cardGap": "value" },
    "patterns": ["bento-grid", "glass-morphism", "etc"]
  }
  ```

### 6. Firecrawl 모던 랜딩페이지 레퍼런스 (2-3개)
- 최신 SaaS/앱 랜딩페이지 트렌드 조사 (perso.ai, linear.app, vercel.com, cal.com 등)
- 분석 포인트:
  - Hero 섹션 구성
  - 스크롤 애니메이션 패턴
  - 섹션 전환 방식
  - 신뢰 요소 배치
  - CTA 버튼 스타일 및 배치 전략

### 7. Firecrawl 추가 프리미엄 레퍼런스
- `https://stripe.com/` — 벤토 그리드, 실제 제품 목업, 깊이감
- `https://perso.ai/` — AI 서비스 랜딩 벤치마크
- `https://height.app/` — SVG wave 히어로 배경
- WebSearch로 최신 어워드 수상 랜딩 페이지 1-2개 추가 탐색
- 발견한 비주얼 기법을 research.md §4에 기록

### 8. Firecrawl 프리미엄 컴포넌트 갤러리
- `https://ui.aceternity.com/components` → 프리미엄 컴포넌트 이름 + 설명 목록
- `https://magicui.design/docs/components` → 애니메이션 컴포넌트 이름 + 설명 목록
- PRD 섹션별 프리미엄 컴포넌트 매핑을 research.md §7에 기록

### 9. 🆕 Defuddle MCP 구조 추출
- Defuddle MCP로 PRD 도메인 최고 서비스의 콘텐츠 구조를 추출
- **전체 섹션 순서 목록** (Hero → Trust → Features → ...)
- **각 섹션의 레이아웃 패턴** (60/40 split, 3-col grid, full-width, bento 등)
- **각 섹션의 콘텐츠 유형** (텍스트만, 이미지+텍스트, 인터랙티브, 통계 등)
- research.md §9에 기록:
  ```
  ## 9. 레퍼런스 섹션 블루프린트
  Source: {URL}
  1. Hero: 60/40 split (텍스트 좌, 제품 이미지 우), trust badge 아래
  2. Trust Metrics: 4-col 통계 (구체적 숫자 + 라벨)
  3. Client Logos: 무한 마퀴 또는 그리드
  ...최소 10개 섹션
  ```

### 10. 🆕🔑 이미지 큐레이션 확대 (8-10장/컨셉)
- Unsplash MCP `search_photos`로 PRD 도메인 관련 키워드 검색 (4-5개 키워드)
- **컨셉당 최소 8-10장**:
  - Feature 배경 이미지: 4장
  - 아바타 이미지: 5장
  - 장식/배경 이미지: 1-2장
- 각 섹션 유형에 맞는 이미지 활용 방식 지정:
  ```
  ## 6. 큐레이션된 이미지 (섹션별 매핑)

  ### 이미지 활용 전략
  - Hero 배경: CSS 그라디언트 + 오버레이
  - Hero 우측: BrowserMockup 안에 앱 스크린샷 (Phase 4.5에서 캡처)
  - Feature 카드: 각 카드에 관련 이미지 (텍스트+아이콘만 금지)
  - Trust 섹션: 실제 서비스 스크린샷 (CSS browser frame)
  - Testimonial: Unsplash 아바타 (64x64)
  - Process Flow: 각 단계 옆에 제품 스크린샷

  ### Concept A용 (8-10장)
  - Feature 1-4: {URL}
  - Avatar 1-5: {URL}
  - Background 1-2: {URL}
  - Product Screenshots: [Phase 4.5에서 캡처]

  ### Concept B용 ...
  ### Concept C용 ...
  ```

### 11. 안티패턴 금지 목록 기록
research.md §8에 안티패턴 목록을 기록하라 (기존과 동일).

### 12. Playwright 레퍼런스 스크린샷
- research.md의 디자인 레퍼런스에서 URL 2-3개 선택
- `browser_navigate` → `browser_take_screenshot`
- `prototypes/references/`에 저장 (파일명: `ref-{앱이름}.png`)
- **Stripe, Perso.ai 스크린샷도 캡처** (프리미엄 레퍼런스용)

### 13. research.md 최종 구조화
```markdown
# Design Research

## 1. 색상 팔레트 (3가지 비주얼 아이덴티티)
### Palette A: {무드명}
### Palette B: {무드명}
### Palette C: {무드명}

## 2. 추천 레이아웃 패턴
## 3. 핵심 컴포넌트 목록
## 4. 디자인 레퍼런스
## 5. 랜딩페이지 패턴

## 6. 큐레이션된 이미지 (섹션별 매핑) — 컨셉당 8-10장
## 7. 프리미엄 컴포넌트 매핑
## 8. 안티패턴 (금지 목록)
## 9. 레퍼런스 섹션 블루프린트 (Defuddle + Firecrawl)
```

---

> **CHECKPOINT**: `prototypes/research.md` 파일이 9개 섹션을 모두 포함하고, §6에 **컨셉당 8-10장** 이미지 매핑이 있고, §9에 Defuddle 기반 섹션 블루프린트가 있고, `prototypes/reference-tokens.json`이 생성되었고, `prototypes/references/`에 스크린샷 2장 이상 존재하는지 확인하라.
