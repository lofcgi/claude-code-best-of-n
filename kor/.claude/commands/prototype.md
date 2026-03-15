---
description: 레퍼런스 기반 3가지 UI 프로토타입 생성 — 구조 차별화 + 이미지 퍼스트 + 구체적 콘텐츠
allowed-tools: [Read, Write, Bash, Glob, Grep, "mcp:firecrawl:*", "mcp:context7:*", "mcp:21st-dev-magic:*", "mcp:design-inspiration:*", "mcp:playwright:*", "mcp:unsplash:*", "mcp:defuddle-fetch:*", "mcp:lighthouse-mcp:*"]
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

---

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
      - Defuddle: `defuddle_fetch` 테스트 호출 — 없으면 Firecrawl로 대체
      → 각 호출이 에러 없이 응답하면 ✅, 에러 발생 시 ❌

   c) 결과를 표로 출력:
      | MCP 서버 | 환경변수 | 테스트 호출 | 최종 | 필수 | 용도 |
      |----------|----------|-----------|------|------|------|
      | Firecrawl | ✅/❌ | ✅/❌ | ✅/❌ | **필수** | 경쟁 앱 UI + 브랜딩 토큰 추출 |
      | Design Inspiration | ✅/❌ | ✅/❌ | ✅/❌ | **필수** | 디자인 레퍼런스 리서치 |
      | 21st-dev Magic | ✅/❌ | ✅/❌ | ✅/❌ | **필수** | UI 컴포넌트 생성/폴리싱 |
      | Context7 | N/A | ✅/❌ | ✅/❌ | **필수** | 최신 프레임워크 문서 참조 |
      | Unsplash | ✅/❌ | ✅/❌ | ✅/❌ | **권장** | 고품질 이미지 큐레이션 |
      | Defuddle | N/A | ✅/❌ | ✅/❌ | **권장** | 깨끗한 콘텐츠 구조 추출 |
      | Lighthouse | N/A | ✅/❌ | ✅/❌ | **권장** | 접근성/성능 점수 검증 |

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
   - **⚠️ 미설치여도 중단하지 않음** — 권장 사항일 뿐 필수는 아님

3. analysis/prd.md, analysis/requirements.json 파일 존재 확인
   → 없으면 "먼저 /analyze를 실행하세요" 안내 후 중단

---

## 파이프라인 실행 (7 Phase)

각 Phase는 독립된 서브 스킬 파일에 상세 지시사항이 있다.
**반드시 순서대로 실행하고, 각 Phase의 CHECKPOINT를 통과한 후 다음으로 진행하라.**

### Phase 1: 3레이어 디자인 리서치
`.claude/commands/prototype-phases/p1-research.md`를 Read하고 실행하라.
- 3레이어 추출: 구조(Defuddle) + 브랜딩(Firecrawl branding) + 비주얼(Playwright)
- 이미지 큐레이션 확대: 컨셉당 8-10장
- 출력: `prototypes/research.md` (9개 섹션), `prototypes/reference-tokens.json`

### Phase 2: 컨셉 도출
`.claude/commands/prototype-phases/p2-concepts.md`를 Read하고 실행하라.
- 섹션 구성 차별화 매트릭스 포함
- 출력: `prototypes/concepts.md`

### Phase 3: 프로젝트 스캐폴딩
`.claude/commands/prototype-phases/p3-scaffold.md`를 Read하고 실행하라.
- 폰트 설치 + SectionWrapper + design-tokens.ts
- 출력: `prototypes/_app/` 프로젝트

### Phase 4: 섹션 단위 코드 생성
`.claude/commands/prototype-phases/p4-generate.md`를 Read하고 실행하라.
- **⛔ 페이지 파일 내 function 정의 금지 (export default만)**
- **⛔ 인라인 hex 금지 (design-tokens.ts에서 import)**
- **⛔ 인라인 컴포넌트 정의 금지 (components/에서 import만)**
- 레퍼런스 참조 필수: visual-architecture.md, aesthetics-guide.md, section-templates.md, copy-guide.md
- 출력: 섹션 컴포넌트 + 페이지 파일

### Phase 5: Ralph Loop (자율 비주얼 피드백)
`.claude/commands/prototype-phases/p5-ralph-loop.md`를 Read하고 실행하라.
- Generate → Screenshot → Evaluate → Fix 자율 루프 (최대 3회)
- 레퍼런스 비교: perso.ai 등과 비주얼 밀도 비교
- 출력: `prototypes/ralph-loop-log.md`

### Phase 6: Quality Gates
`.claude/commands/prototype-phases/p6-quality-gates.md`를 Read하고 실행하라.
- Gate 1: 정적 분석 (인라인 hex 0, 금지 폰트 0, 섹션 ≥ 8)
- Gate 2: 빌드 검증 (에러 0)
- Gate 3: 비주얼 스코어카드 (구조 전체 통과, 비주얼 10/13)
- Gate 4: Lighthouse (a11y ≥ 80)
- 출력: `prototypes/quality-report.md`

### Phase 7: 최종화 + 출력
`.claude/commands/prototype-phases/p7-finalize.md`를 Read하고 실행하라.
- 최종 스크린샷 + 레퍼런스 비교
- 사용자에게 3가지 프로토타입 표로 안내
- 선택 요청

---

## 핵심 규칙 요약 (모든 Phase 공통)

| 규칙 | 설명 |
|------|------|
| 인라인 hex 금지 | design-tokens.ts에서 import |
| 페이지 내 function 금지 | export default만, 나머지는 components/에서 import |
| 인라인 컴포넌트 금지 | components/premium/ 또는 components/sections/에서 import |
| SectionWrapper 필수 | 모든 섹션에 최소 2레이어 배경 |
| 이미지 필수 | Feature 카드에 텍스트+아이콘만 금지 |
| 구체적 수치 | 둥근 숫자 금지 (10,847 not 10,000) |
| Spring physics | linear easing 금지 |
| py-40 최소 | py-24/py-32 금지 |
| 8+ 섹션 | 각 랜딩 최소 8개 섹션 |
| Hero 5레이어 | 5개 미만 레이어 금지 |
| CTA glow | 기본 filled 버튼 금지, box-shadow 30px+ |
| 커스텀 폰트 | Inter/Roboto/Arial 금지 |
