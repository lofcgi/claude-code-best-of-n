# Claude Code 슬래시 커맨드로 URL 입력 → 풀스택 앱 배포까지 (오픈소스)

- Claude Code 슬래시 커맨드 3개(`/prototype`, `/implement`, `/ship`)로 URL → 분석 → 프로토타입 → 풀스택 앱 → 배포까지 자동화하는 파이프라인
- 프롬프트 795줄이 에이전트의 행동을 프로그래밍함. MCP 서버 9개(Firecrawl, Playwright, 21st-dev 등)를 도구로 사용
- 핵심 발견: "창의적으로 해봐" → AI 양산형 결과. "레퍼런스 스크린샷 보고 따라해" → 프로 수준 결과
- v1(모놀리식)→v4(3-Phase)까지 4번 리팩토링. 소프트웨어 아키텍처 리팩토링과 동일한 패턴
- 실제 결과: URL 1개 입력 → 30분 → 33파일/3,570 LOC 풀스택 앱 배포 완료
- 한국어/영어 프롬프트 전체 오픈소스 (MIT)

GitHub: https://github.com/lofcgi/claude-code-best-of-n
