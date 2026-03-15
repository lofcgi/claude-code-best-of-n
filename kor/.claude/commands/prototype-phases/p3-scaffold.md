# Phase 3: 프로젝트 스캐폴딩

## a) 프로젝트 생성 (공식 문서 기준)
```bash
npx create-next-app@latest prototypes/_app --yes
```
`--yes`: TypeScript, Tailwind CSS, App Router, Turbopack 등 권장 기본값 자동 적용

## b) shadcn/ui + 의존성 설치
```bash
cd prototypes/_app
npx shadcn@latest init -t next
npx shadcn@latest add button input checkbox badge dropdown-menu select dialog avatar scroll-area separator table textarea card
npm install lucide-react framer-motion mini-svg-data-uri
```

## c) 🆕 폰트 설치
research.md의 팔레트 데이터와 reference-tokens.json에서 폰트를 확인하고, **Inter/Roboto/Arial이 아닌** 고유 폰트를 설치하라.

권장 폰트 (aesthetics-guide.md 참조):
- **Code/Tech**: JetBrains Mono, Fira Code, Space Grotesk
- **Editorial**: Playfair Display, Crimson Pro, Fraunces
- **Startup/Modern**: Clash Display, Satoshi, Cabinet Grotesk
- **Distinctive**: Bricolage Grotesque, Newsreader, General Sans

Google Fonts 사용 시 `next/font/google`로 import:
```typescript
// app/layout.tsx
import { Space_Grotesk, Crimson_Pro } from "next/font/google";

const headingFont = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });
const bodyFont = Crimson_Pro({ subsets: ["latin"], variable: "--font-body" });
```

## d) 공통 레이아웃 (app/layout.tsx)
- 다크 모드 기본 (dark class on html) 유지
- 공통 폰트, 메타데이터
- 라이트모드 프로토타입은 자체 페이지에서 `className="light"` wrapper를 사용하여 override

## e) next.config.ts에 외부 이미지 도메인 추가
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'picsum.photos' },
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'illustrations.popsy.co' },
  ],
},
```

## f) 디렉토리 구조 생성
```bash
mkdir -p prototypes/_app/components/premium
mkdir -p prototypes/_app/components/sections
```
- `components/premium/`: Phase 4에서 Aceternity/Magic UI 컴포넌트 코드 배치
- `components/sections/`: SectionWrapper 및 섹션 컴포넌트 배치

## g) 프리미엄 배경 효과 컴포넌트 생성
`.claude/commands/prototype-references/premium-components.md`를 Read하여
아래 컴포넌트를 `components/premium/`에 레퍼런스 코드를 그대로 복사하여 생성:
- background-beams.tsx
- lamp-effect.tsx
- aurora-background.tsx
- meteors.tsx
- sparkles.tsx
- gradient-text.tsx
- floating-dock.tsx
**⛔ 단순화/생략 금지** — 레퍼런스 코드를 정확히 복사하라.

## h) 🆕 SectionWrapper 컴포넌트 생성
`.claude/commands/prototype-references/section-templates.md`를 Read하여
SectionWrapper를 `components/sections/section-wrapper.tsx`에 생성.

모든 섹션에 최소 2레이어 배경을 강제하는 래퍼:
```tsx
<SectionWrapper palette={p} variant="gradient">
  {/* 자동: 베이스 + 그라디언트/패턴 + 노이즈 + scroll-reveal */}
  {children}
</SectionWrapper>
```

## i) globals.css 프리미엄 유틸리티 CSS 추가
기존 스타일 뒤에 append (aurora, grain, grid, dots, marquee, shimmer, spotlight, glow, meteor, gradient-x, sparkle-float keyframes 및 유틸리티 클래스).

## j) lib/utils.ts 확장
기존 `cn()` 외에 유틸리티 함수 추가:
```typescript
export function generateNoisePattern(opacity: number = 0.02): string {
  return `url("data:image/svg+xml,...")`;
}
```

## k) 🆕 lib/design-tokens.ts 자동 생성
research.md의 팔레트 데이터 + 이미지 URL 매핑으로 자동 생성:
```typescript
export const palettes = {
  a: { primary: "#hex", accent: "#hex", surface: "#hex", text: "#hex", mode: "dark" },
  b: { /* Palette B */ },
  c: { /* Palette C */ },
} as const;

export const images = {
  a: {
    hero: "{URL}",
    features: ["{URL1}", "{URL2}", "{URL3}", "{URL4}", "{URL5}"],
    backgrounds: ["{URL1}", "{URL2}", "{URL3}"],
    avatars: ["{URL1}", "{URL2}", "{URL3}", "{URL4}", "{URL5}"],
    productScreenshots: ["/screenshots/a-app.png", "/screenshots/a-history.png"],
  },
  b: { /* ... */ },
  c: { /* ... */ },
} as const;

export const typography = {
  headlineFont: "'Cabinet Grotesk', sans-serif",
  bodyFont: "'General Sans', sans-serif",
} as const;
```
- **인라인 hex 금지** — 모든 페이지에서 이 파일을 import하여 사용

## l) 사전 준비: Context7로 프리미엄 컴포넌트 코드 fetch
1. `resolve-library-id("aceternity-ui")` → `query-docs("{concepts.md 항목 10의 컴포넌트명}")`
2. `resolve-library-id("magic-ui")` → `query-docs("{concepts.md 항목 10의 컴포넌트명}")`
3. 추출한 컴포넌트 소스코드를 `components/premium/` 디렉토리에 저장

---

> **CHECKPOINT**: `prototypes/_app` 프로젝트가 생성되고, `components/premium/`에 7개 기본 컴포넌트 + Context7에서 가져온 추가 컴포넌트, `components/sections/section-wrapper.tsx`, `lib/design-tokens.ts`, globals.css 프리미엄 유틸리티, 커스텀 폰트 설정이 완료되었는지 확인하라.
