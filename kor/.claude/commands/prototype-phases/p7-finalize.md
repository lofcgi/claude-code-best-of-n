# Phase 7: 최종화 + 출력

Quality Gates를 모두 통과한 후 최종 마무리.

---

## 1. 최종 스크린샷

각 프로토타입의 모든 페이지를 스크린샷하여 최종 비주얼 확인:

1. **dev 서버 시작** (이미 실행 중이면 스킵):
   ```bash
   cd prototypes/_app && npm run dev &
   ```

2. **모든 페이지 스크린샷**:
   - concepts.md의 페이지 구성을 참조하여 각 프로토타입의 모든 라우트를 스크린샷
   - Playwright `browser_navigate` → `browser_take_screenshot`

3. **스크롤 기반 스크린샷** — 각 랜딩에 대해:
   - 5개 스크롤 위치: 0%, 25%, 50%, 75%, 100%
   - 각 위치에서 `browser_take_screenshot`

4. **각 스크린샷을 Read로 최종 분석**:
   - 빈 페이지, 에러 메시지, 깨진 레이아웃 없음
   - 3개 프로토타입이 시각적+구조적으로 차별화
   - BrowserMockup에 앱 스크린샷이 정상 표시

---

## 2. 레퍼런스 비교

`prototypes/references/`의 레퍼런스 스크린샷과 최종 비교:
- Stripe/Vercel/Linear 레퍼런스 대비 시각 품질 확인
- 명백히 부족한 요소가 있으면 마지막 수정 (최대 1회)

---

## 3. 최종 출력

1. 사용자에게 안내:
   ```
   브라우저에서 3가지 프로토타입을 확인하세요:
    - http://localhost:3000/a — Interface A ({컨셉명}): {페이지 목록}
    - http://localhost:3000/b — Interface B ({컨셉명}): {페이지 목록}
    - http://localhost:3000/c — Interface C ({컨셉명}): {페이지 목록}
   확인 후 선택해주세요.
   ```

2. 3가지 프로토타입을 표로 요약:
   | 프로토타입 | 진입 URL | 컨셉 | 팔레트 | Hero 기법 | Feature 레이아웃 | 섹션 수 | 고유 섹션 | 장점 | 단점 |

3. 사용자에게 선택을 요청하고, 선택 후:
   - 개발 서버 종료
   - "선택 완료. 다음 단계: /setup-versions {a|b|c} 를 실행하세요."

---

## 최종 디렉토리 구조

```
prototypes/
├── research.md               ← Phase 1 (9개 섹션 + reference-tokens.json)
├── concepts.md               ← Phase 2 (컨셉 + 차별화 매트릭스)
├── reference-tokens.json     ← Phase 1 (브랜딩 토큰)
├── ralph-loop-log.md         ← Phase 5 (Ralph Loop 결과)
├── quality-report.md         ← Phase 6 (Quality Gates 결과)
├── references/
│   ├── ref-{app1}.png
│   ├── ref-{app2}.png
│   ├── ref-{stripe}.png
│   └── ref-{perso}.png
├── _app/
│   ├── app/
│   │   ├── globals.css        ← 프리미엄 유틸리티 CSS
│   │   ├── layout.tsx         ← 커스텀 폰트
│   │   ├── page.tsx           ← /a, /b, /c 링크
│   │   ├── a/
│   │   │   ├── page.tsx       ← 랜딩 (8+ 섹션, import만)
│   │   │   ├── app/page.tsx
│   │   │   └── {route}/page.tsx
│   │   ├── b/ (동일 구조)
│   │   └── c/ (동일 구조)
│   ├── components/
│   │   ├── ui/                ← shadcn/ui
│   │   ├── premium/           ← Aceternity/Magic UI 컴포넌트
│   │   └── sections/          ← 섹션 컴포넌트 (SectionWrapper 포함)
│   ├── lib/
│   │   ├── utils.ts           ← cn() + generateNoisePattern()
│   │   └── design-tokens.ts   ← 팔레트 + 이미지 + 타이포그래피
│   └── public/
│       └── screenshots/       ← 앱 페이지 스크린샷
├── interface-{a,b,c}/
│   └── README.md
```
