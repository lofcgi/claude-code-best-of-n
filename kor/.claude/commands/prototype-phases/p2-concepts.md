# Phase 2: 컨셉 도출 (출력물: `prototypes/concepts.md`)

`prototypes/research.md`와 `analysis/prd.md`를 기반으로 3가지 인터페이스 컨셉을 정의하라.
**반드시 `prototypes/concepts.md` 파일에 아래 구조로 기록하라.**

---

## 2-A: 페이지 구조 설계 (PRD + 컨셉 기반)
- PRD의 기능 요구사항과 각 컨셉의 UX 방향을 종합하여 각 프로토타입에 필요한 페이지/뷰를 자유롭게 설계하라
- **페이지 구성은 컨셉마다 다를 수 있다** — 고정된 "메인+보조" 구조를 강제하지 마라
- 최소 3페이지, 최대 4페이지 (랜딩 + 앱 페이지 2-3개)
- **모든 컨셉이 랜딩페이지(`/{x}`)로 시작**하도록 강제:
  - `/{x}` = 랜딩페이지 (Hero + 기능 소개 + CTA)
  - `/{x}/app` 또는 `/{x}/dashboard` 등 = 실제 앱 기능 페이지들

---

## 2-B: 컨셉별 정의 (각 컨셉에 아래 항목 모두 포함)
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

---

## 2-C: 🔑 섹션 구성 차별화 매트릭스 (필수)

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

---

## 차별화 필수 조건
- 3가지 컨셉은 반드시 서로 다른 UX 패러다임을 대표해야 한다
- 3가지 컨셉은 반드시 서로 다른 비주얼 아이덴티티(팔레트)를 사용해야 한다
- **3가지 컨셉은 반드시 서로 다른 Hero 기법을 사용해야 한다 — 색상뿐 아니라 구조적 차별화**
- **3가지 컨셉은 반드시 서로 다른 섹션 구성을 가져야 한다**

---

> **CHECKPOINT**: `prototypes/concepts.md` 파일에 3개 컨셉이 각각 다른 Palette, 다른 Hero 기법, **다른 섹션 구성**을 배정받았는지, 차별화 매트릭스가 포함되었는지, 각 컨셉에 최소 8개 섹션이 정의되었는지 확인하라.
