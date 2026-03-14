# Visual Architecture Rules (협상 불가)

이 파일의 모든 규칙과 코드 패턴은 **협상 불가**다.
Phase 4 코드 생성 전에 반드시 이 파일을 Read하고 정확히 따르라.

---

## Hero 5-Layer Architecture (모든 Hero 필수)

모든 랜딩 페이지의 Hero 섹션은 반드시 5개 이상의 시각 레이어를 가져야 한다.
5개 미만의 레이어는 절대 금지.

```
Layer 1: Base surface color (palettes.x.surface)
Layer 2: Background effect component (<BackgroundBeams> | <LampEffect> | <AuroraBackground>)
Layer 3: Pattern overlay (bg-grid | bg-dots | bg-noise)
Layer 4: Radial glow (radial-gradient with primary color, 15-25% opacity)
Layer 5: Ambient particles (<Sparkles> | <Meteors>)
```

### 코드 패턴 (정확히 따르라):

```tsx
<section className="relative min-h-screen overflow-hidden" style={{ backgroundColor: p.surface }}>
  {/* Layer 2: Background effect — 각 컨셉마다 다른 컴포넌트 사용 */}
  <BackgroundBeams primaryColor={p.primary} />
  {/* Layer 3: Pattern overlay */}
  <div className="absolute inset-0 bg-grid" />
  {/* Layer 4: Radial glow */}
  <div
    className="absolute inset-0"
    style={{
      background: `radial-gradient(ellipse 80% 50% at 50% 20%, ${p.primary}25, transparent)`,
    }}
  />
  {/* Layer 5: Ambient particles */}
  <Sparkles count={15} primaryColor={p.primary} />
  {/* Content — 반드시 z-10 이상 */}
  <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
    {/* Hero content here */}
  </div>
</section>
```

### 각 컨셉의 Layer 2 컴포넌트 분배:
- **Concept A**: `<BackgroundBeams>` — 테크/모던 느낌
- **Concept B**: `<AuroraBackground>` — 유기적/소프트 느낌
- **Concept C**: `<LampEffect>` — 드라마틱/포커스 느낌

---

## Typography Hierarchy (필수)

### Hero Headline
- **필수**: `text-6xl md:text-8xl font-black tracking-tight`
- **절대 금지**: text-4xl, text-5xl (너무 보수적)
- **핵심 키워드**: 반드시 `<GradientText>` 래핑

```tsx
<h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9]">
  Build with{" "}
  <GradientText from={p.primary} to={p.accent}>
    Confidence
  </GradientText>
</h1>
```

### Section Heading
- **필수**: `text-3xl md:text-5xl font-bold`
- **절대 금지**: text-2xl, text-xl (너무 작음)

```tsx
<h2 className="text-3xl md:text-5xl font-bold tracking-tight">
  Why teams choose <GradientText from={p.primary} to={p.accent}>us</GradientText>
</h2>
```

### Subtext
- **필수**: `text-lg md:text-xl text-muted-foreground max-w-2xl`

### Font Weight 극단
- **사용**: weight 200 (thin/light subtext) vs weight 900 (black headlines)
- **금지**: weight 400 vs 600 (너무 비슷, 계층 구조 약함)

---

## CTA Button Premium (필수)

기본 filled/ghost 버튼 금지. 반드시 glow box-shadow를 포함하라.

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.97 }}
  className="px-10 py-4 text-base font-semibold rounded-full cursor-pointer"
  style={{
    backgroundColor: p.primary,
    color: p.mode === "dark" ? "#000" : "#fff",
    boxShadow: `0 0 30px ${p.primary}66, 0 0 60px ${p.primary}33`,
  }}
>
  Start Building Free <ArrowRight className="ml-2 inline w-4 h-4" />
</motion.button>
```

### CTA 규칙:
- **최소 크기**: `px-10 py-4 text-base` (px-6 py-2는 너무 작음)
- **glow 필수**: `box-shadow: 0 0 30px ${primary}66, 0 0 60px ${primary}33`
- **hover**: `scale(1.05)` + glow 강화
- **whileTap**: `scale(0.97)` 피드백
- **Secondary CTA**: ghost style + subtle border, glow 불필요

---

## BrowserMockup Premium (필수)

3D perspective transform 또는 color-tinted shadow 중 최소 하나 적용.

```tsx
<div
  className="relative mx-auto max-w-5xl"
  style={{
    transform: "perspective(1200px) rotateY(-5deg) rotateX(2deg)",
    boxShadow: `0 25px 60px ${p.primary}40`,
  }}
>
  <BrowserMockup url="app.example.com">
    <img
      src="/screenshots/a-app.png"
      alt="App Preview"
      className="w-full"
    />
  </BrowserMockup>
</div>
```

### 규칙:
- **3D perspective**: `perspective(1200px) rotateY(-5deg) rotateX(2deg)` — 입체감
- **Color-tinted shadow**: primary color 25-40% opacity, 20-60px blur
- **플랫 mockup 금지** — shadow 없는 단순 border 박스 금지

---

## Section Spacing (필수)

- **모든 콘텐츠 섹션**: `py-40` 이상
- **절대 금지**: `py-24`, `py-32` (너무 빡빡함, 보수적 결과 유발)
- **Hero**: `min-h-screen` (py 불필요)
- **섹션 간 구분**: gradient divider 또는 충분한 투명 여백

```tsx
{/* 올바른 섹션 패딩 */}
<section className="relative py-40 overflow-hidden">
  <div className="container mx-auto px-4">
    {/* Section content */}
  </div>
</section>

{/* 선택: 섹션 간 gradient divider */}
<div
  className="h-px w-full"
  style={{
    background: `linear-gradient(90deg, transparent, ${p.primary}30, transparent)`,
  }}
/>
```

---

## Noise Texture (필수)

Gradient가 있는 모든 섹션에 bg-noise 클래스를 적용하라.

```tsx
{/* position: relative 필수 — ::after가 absolute 포지셔닝 */}
<section className="relative bg-noise" style={{ background: `linear-gradient(...)` }}>
  {/* Content must be z-10+ to appear above noise */}
  <div className="relative z-10">...</div>
</section>
```

---

## Feature Card (이미지 필수)

텍스트+아이콘만의 카드 절대 금지. 각 Feature 카드에 실제 이미지 또는 CSS 비주얼을 반드시 포함하라.

```tsx
<motion.div
  whileHover={{ scale: 1.02, borderColor: `${p.primary}40` }}
  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6"
  style={{
    boxShadow: `0 0 0 0 ${p.primary}00`,
  }}
>
  {/* 이미지 또는 CSS 비주얼 — 필수 */}
  <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-white/5 to-white/0">
    <img
      src={featureImage}
      alt={featureTitle}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  </div>
  <h3 className="text-xl font-bold mb-2">{featureTitle}</h3>
  <p className="text-muted-foreground text-sm">{featureDescription}</p>
</motion.div>
```

### hover 효과:
- **border glow**: `borderColor: ${p.primary}40`
- **scale**: `scale(1.02)`
- **이미지 zoom**: `group-hover:scale-105`
