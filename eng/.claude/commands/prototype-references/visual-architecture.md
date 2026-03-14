# Visual Architecture Rules (Non-negotiable)

All rules and code patterns in this file are **non-negotiable**.
You must Read this file before Phase 4 code generation and follow it exactly.

---

## Hero 5-Layer Architecture (Required for All Heroes)

Every landing page Hero section must have at least 5 visual layers.
Fewer than 5 layers is strictly prohibited.

```
Layer 1: Base surface color (palettes.x.surface)
Layer 2: Background effect component (<BackgroundBeams> | <LampEffect> | <AuroraBackground>)
Layer 3: Pattern overlay (bg-grid | bg-dots | bg-noise)
Layer 4: Radial glow (radial-gradient with primary color, 15-25% opacity)
Layer 5: Ambient particles (<Sparkles> | <Meteors>)
```

### Code Pattern (follow exactly):

```tsx
<section className="relative min-h-screen overflow-hidden" style={{ backgroundColor: p.surface }}>
  {/* Layer 2: Background effect — use a different component for each concept */}
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
  {/* Content — must be z-10 or higher */}
  <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
    {/* Hero content here */}
  </div>
</section>
```

### Layer 2 Component Distribution Per Concept:
- **Concept A**: `<BackgroundBeams>` — tech/modern feel
- **Concept B**: `<AuroraBackground>` — organic/soft feel
- **Concept C**: `<LampEffect>` — dramatic/focused feel

---

## Typography Hierarchy (Required)

### Hero Headline
- **Required**: `text-6xl md:text-8xl font-black tracking-tight`
- **Strictly prohibited**: text-4xl, text-5xl (too conservative)
- **Key keywords**: must be wrapped with `<GradientText>`

```tsx
<h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9]">
  Build with{" "}
  <GradientText from={p.primary} to={p.accent}>
    Confidence
  </GradientText>
</h1>
```

### Section Heading
- **Required**: `text-3xl md:text-5xl font-bold`
- **Strictly prohibited**: text-2xl, text-xl (too small)

```tsx
<h2 className="text-3xl md:text-5xl font-bold tracking-tight">
  Why teams choose <GradientText from={p.primary} to={p.accent}>us</GradientText>
</h2>
```

### Subtext
- **Required**: `text-lg md:text-xl text-muted-foreground max-w-2xl`

### Font Weight Extremes
- **Use**: weight 200 (thin/light subtext) vs weight 900 (black headlines)
- **Prohibited**: weight 400 vs 600 (too similar, weak hierarchy)

---

## CTA Button Premium (Required)

Basic filled/ghost buttons are prohibited. Must include glow box-shadow.

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

### CTA Rules:
- **Minimum size**: `px-10 py-4 text-base` (px-6 py-2 is too small)
- **Glow required**: `box-shadow: 0 0 30px ${primary}66, 0 0 60px ${primary}33`
- **Hover**: `scale(1.05)` + enhanced glow
- **whileTap**: `scale(0.97)` feedback
- **Secondary CTA**: ghost style + subtle border, glow not required

---

## BrowserMockup Premium (Required)

Must apply at least one of: 3D perspective transform or color-tinted shadow.

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

### Rules:
- **3D perspective**: `perspective(1200px) rotateY(-5deg) rotateX(2deg)` — depth
- **Color-tinted shadow**: primary color 25-40% opacity, 20-60px blur
- **Flat mockup prohibited** — simple border box without shadow is prohibited

---

## Section Spacing (Required)

- **All content sections**: `py-40` or more
- **Strictly prohibited**: `py-24`, `py-32` (too tight, causes conservative results)
- **Hero**: `min-h-screen` (no py needed)
- **Section separators**: gradient divider or sufficient transparent spacing

```tsx
{/* Correct section padding */}
<section className="relative py-40 overflow-hidden">
  <div className="container mx-auto px-4">
    {/* Section content */}
  </div>
</section>

{/* Optional: gradient divider between sections */}
<div
  className="h-px w-full"
  style={{
    background: `linear-gradient(90deg, transparent, ${p.primary}30, transparent)`,
  }}
/>
```

---

## Noise Texture (Required)

Apply the bg-noise class to all sections that have gradients.

```tsx
{/* position: relative required — ::after uses absolute positioning */}
<section className="relative bg-noise" style={{ background: `linear-gradient(...)` }}>
  {/* Content must be z-10+ to appear above noise */}
  <div className="relative z-10">...</div>
</section>
```

---

## Feature Card (Image Required)

Cards with only text + icons are strictly prohibited. Each Feature card must include a real image or CSS visual.

```tsx
<motion.div
  whileHover={{ scale: 1.02, borderColor: `${p.primary}40` }}
  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6"
  style={{
    boxShadow: `0 0 0 0 ${p.primary}00`,
  }}
>
  {/* Image or CSS visual — required */}
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

### Hover effects:
- **border glow**: `borderColor: ${p.primary}40`
- **scale**: `scale(1.02)`
- **image zoom**: `group-hover:scale-105`
