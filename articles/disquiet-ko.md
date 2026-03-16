# claude-code-fast-proto — URL 하나로 프로토타입 → 풀스택 앱 → 배포까지

## 무엇을 만들었나

Claude Code 슬래시 커맨드 3개로 동작하는 자동화 파이프라인입니다.

1. `/prototype` — URL을 넣으면 Firecrawl로 스크래핑하고, 브랜딩을 추출하고, 프로토타입 2개를 만듭니다
2. `/implement` — 프로토타입을 풀스택 Next.js 앱으로 전환합니다
3. `/ship` — Vercel에 배포합니다

프롬프트 795줄이 에이전트의 행동을 프로그래밍합니다. MCP 서버 9개(Firecrawl, Playwright, 21st-dev 등)가 도구로 연결되어 있습니다.

## 어떻게 동작하는지

3-Phase 파이프라인:

| Phase | 하는 일 | MCP |
|-------|--------|-----|
| Explore & Plan | URL → Firecrawl 스크래핑 + 브랜딩 JSON → plan.md | Firecrawl, Design Inspiration |
| Generate | plan.md 기반 프로토타입 2개 (클론 + 변형) | 21st-dev, Context7 |
| Diff Loop | Playwright 스크린샷 → 레퍼런스 비교 → 수정 (최대 3회) | Playwright |

핵심은 "창의적으로 해봐" 대신 "레퍼런스 스크린샷 보고 따라해"입니다. 추상적 지시로는 매번 비슷한 결과가 나왔는데, 레퍼런스 클론 전략으로 바꾸니까 결과가 다양해졌습니다.

## 실제 결과

| v1: 네온 과적재 | v0 only: 디자인 OK, 코드 엉망 | v4: 레퍼런스 클론 |
|:---:|:---:|:---:|
| <img src="https://raw.githubusercontent.com/lofcgi/claude-code-fast-proto/main/_example2/images/v1-voxforge-hero.png" width="280" /> | <img src="https://raw.githubusercontent.com/lofcgi/claude-code-fast-proto/main/_example2/images/v0-only.png" width="280" /> | <img src="https://raw.githubusercontent.com/lofcgi/claude-code-fast-proto/main/_example2/images/final-a-hero.png" width="280" /> |

- URL 1개 입력 → 30분 → 33파일, ~3,570 LOC 풀스택 앱 배포
- AI 더빙 서비스 "VoiceBridge" 프로토타입을 실제로 만들었습니다

**배포 URL:**
- https://project-nine-nu-52.vercel.app/
- https://project-kimanlee.vercel.app/

> 두 사이트 모두 실제 API는 호출되지 않습니다. Dubbing 페이지의 Demo 버튼으로 전체 플로우를 체험할 수 있습니다.

## 만들면서 배운 것

1. **"창의적으로 해봐"는 양산형 결과를 만든다** — 레퍼런스 스크린샷 1장이 추상 규칙 100개보다 낫습니다
2. **컨텍스트 윈도우 관리가 아키텍처다** — 900줄 모놀리식 프롬프트는 뒤쪽 지시를 무시합니다. Phase별로 나누고 `/clear`로 컨텍스트를 리셋하면 품질이 올라갑니다
3. **셀프 수정 루프는 3회로 제한** — build → check → review → fix 루프. 3회 안에 못 고치면 사람이 봐야 합니다
4. **MCP 서버는 강력하지만 fragile** — API 키 만료, 서버 크래시, rate limit. 파이프라인 시작 전 검증 필수

## 링크

- **GitHub**: https://github.com/lofcgi/claude-code-fast-proto
- **배포 예시 1**: https://project-nine-nu-52.vercel.app/
- **배포 예시 2**: https://project-kimanlee.vercel.app/
- **라이선스**: MIT
- 한국어/영어 프롬프트 모두 포함
