---
description: v0, 디자인 레퍼런스, AI 컴포넌트를 활용한 3가지 UI 프로토타입 생성
allowed-tools: [Read, Write, Bash, Glob, Grep, "mcp:firecrawl:*", "mcp:context7:*", "mcp:v0:*", "mcp:21st-dev-magic:*", "mcp:design-inspiration:*"]
---

analysis/prd.md를 읽고 3가지 UI 인터페이스 프로토타입을 생성하세요.

## 수행 작업

1. analysis/prd.md와 analysis/requirements.json 읽기

1-1. **Design Inspiration MCP로 디자인 레퍼런스 리서치** (MCP 사용 가능 시):
   - PRD 도메인과 관련된 Dribbble, Behance, Awwwards 디자인 레퍼런스 검색
   - UI 레이아웃, 색상 스킴, 타이포그래피, 인터랙션 패턴 분석
   - 프로토타입 디자인에 참고
   → MCP 불가 시: 이 단계를 스킵하고 다음으로 진행. 사용자에게 "Design Inspiration MCP 미연결로 디자인 레퍼런스 리서치를 건너뜁니다" 안내.

1-2. **21st-dev Magic MCP로 UI 컴포넌트 탐색** (MCP 사용 가능 시):
   - 프로젝트에 적합한 UI 컴포넌트 패턴과 디자인 시스템 탐색
   - 프로토타입에 활용할 재사용 가능한 컴포넌트 아이디어 파악
   → MCP 불가 시: 이 단계를 스킵하고 다음으로 진행. 사용자에게 "21st-dev Magic MCP 미연결로 UI 컴포넌트 탐색을 건너뜁니다" 안내.

1-3. **Firecrawl로 경쟁 앱 UI 리서치** (MCP 사용 가능 시):
   - PRD에 언급된 경쟁 앱이나 유사 서비스의 URL을 Firecrawl로 크롤링
   - UI 레이아웃, 네비게이션 패턴, 주요 기능 배치를 분석
   - 프로토타입 디자인에 참고
   → MCP 불가 시: 이 단계를 스킵하고 다음으로 진행. 사용자에게 "Firecrawl 미연결로 경쟁 UI 리서치를 건너뜁니다" 안내.

2. 3가지 인터페이스 컨셉 결정:
   - Interface A: 미니멀 (원페이지, 핵심 기능에 집중)
   - Interface B: 대시보드 (SaaS 스타일, 사이드바+메인)
   - Interface C: 스튜디오 (전문 도구 느낌, 미디어 중심)

3. 각 컨셉별로 prototypes/interface-{a,b,c}/ 에 코드 생성:
   - v0 MCP를 사용하여 프로토타입 코드 생성 (가능한 경우)
   - Fallback: 직접 React + shadcn/ui 코드 작성
   - page.tsx (메인 페이지 레이아웃)
   - components/ (핵심 UI 컴포넌트)
   - 사용 기술: React + shadcn/ui + Tailwind CSS
   - 다크 모드 기본

4. 각 프로토타입에 README.md 포함:
   - 디자인 컨셉 설명
   - 스크린 구성 설명
   - 장단점

5. 3가지 프로토타입을 표로 요약:
   | 프로토타입 | 컨셉 | 장점 | 단점 |
   사용자에게 선택을 요청하고, 선택 후 안내:
   "선택 완료. 다음 단계: /setup-versions {a|b|c} 를 실행하세요."
