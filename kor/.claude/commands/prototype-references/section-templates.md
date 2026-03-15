# Section Templates (섹션별 코드 템플릿 + 비주얼 밀도 요구사항)

모든 섹션은 SectionWrapper 또는 최소 2레이어 배경을 반드시 포함해야 한다.
텍스트+아이콘만의 섹션은 절대 금지.

---

## SectionWrapper (모든 섹션 공통)

모든 섹션에 최소 2레이어 배경을 강제하는 래퍼 컴포넌트.
`components/sections/section-wrapper.tsx`에 배치.

```tsx
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface SectionWrapperProps {
  palette: { primary: string; accent: string; surface: string; text: string; mode: string };
  variant?: "gradient" | "pattern" | "solid";
  className?: string;
  children: React.ReactNode;
  id?: string;
}

export function SectionWrapper({
  palette: p,
  variant = "gradient",
  className = "",
  children,
  id,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("relative py-40 overflow-hidden", className)}>
      {/* Layer 1: Base gradient */}
      {variant === "gradient" && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${p.surface}, ${p.surface}ee 50%, ${p.surface})`,
          }}
        />
      )}
      {variant === "pattern" && (
        <div className="absolute inset-0 bg-grid" style={{ backgroundColor: p.surface }} />
      )}
      {variant === "solid" && (
        <div className="absolute inset-0" style={{ backgroundColor: p.surface }} />
      )}

      {/* Layer 2: Radial accent glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${p.primary}15, transparent)`,
        }}
      />

      {/* Layer 3: Noise texture */}
      <div className="absolute inset-0 bg-noise" />

      {/* Layer 4: Scroll reveal content */}
      <motion.div
        className="relative z-10 container mx-auto px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
```

---

## 1. Feature BentoGrid

**비주얼 밀도 요구사항:**
- 2x2 대형 카드 (풀블리드 이미지) + 1x1 소형 카드
- SpotlightCard 호버 효과 필수
- 각 카드에 이미지 또는 CSS 비주얼 필수 (텍스트+아이콘만 금지)

```tsx
<SectionWrapper palette={p} variant="gradient">
  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-16">
    Built for <GradientText from={p.primary} to={p.accent}>Scale</GradientText>
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {/* 대형 카드 — 2x2 span */}
    <motion.div
      whileHover={{ scale: 1.02, borderColor: `${p.primary}40` }}
      className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8"
    >
      <div className="aspect-video rounded-lg overflow-hidden mb-6">
        <img
          src={images.features[0]}
          alt="Feature"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="text-2xl font-bold mb-3">{featureName}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>

    {/* 소형 카드 x2 */}
    {features.slice(1, 3).map((f, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.02, borderColor: `${p.primary}40` }}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-white/5 to-white/0">
          <img src={images.features[i + 1]} alt={f.name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-xl font-bold mb-2">{f.name}</h3>
        <p className="text-sm text-muted-foreground">{f.desc}</p>
      </motion.div>
    ))}
  </div>
</SectionWrapper>
```

---

## 2. Comparison Table

**비주얼 밀도 요구사항:**
- Glass-morphism 컨테이너 (backdrop-blur-md, bg-white/5, border-white/10)
- 그라디언트 헤더 (primary → accent)
- 체크마크/X 아이콘 + primary glow on 체크

```tsx
<SectionWrapper palette={p} variant="pattern">
  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-16">
    Why <GradientText from={p.primary} to={p.accent}>{brandName}</GradientText>
  </h2>
  <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
    {/* 그라디언트 헤더 */}
    <div
      className="grid grid-cols-4 gap-4 p-6 font-bold"
      style={{ background: `linear-gradient(135deg, ${p.primary}20, ${p.accent}10)` }}
    >
      <div>Feature</div>
      <div className="text-center">{brandName}</div>
      <div className="text-center text-muted-foreground">Competitor A</div>
      <div className="text-center text-muted-foreground">Competitor B</div>
    </div>
    {/* 행 — alternating bg */}
    {rows.map((row, i) => (
      <div key={i} className={`grid grid-cols-4 gap-4 p-6 ${i % 2 ? 'bg-white/[0.02]' : ''}`}>
        <div className="font-medium">{row.feature}</div>
        <div className="text-center">
          <Check className="mx-auto" style={{ color: p.primary, filter: `drop-shadow(0 0 4px ${p.primary}60)` }} />
        </div>
        <div className="text-center">{row.compA ? <Check className="mx-auto text-muted-foreground" /> : <X className="mx-auto text-muted-foreground/50" />}</div>
        <div className="text-center">{row.compB ? <Check className="mx-auto text-muted-foreground" /> : <X className="mx-auto text-muted-foreground/50" />}</div>
      </div>
    ))}
  </div>
</SectionWrapper>
```

---

## 3. Testimonial

**비주얼 밀도 요구사항:**
- 64px 아바타 이미지 (Unsplash)
- 인용문 + 이름/역할
- InfiniteMarquee 또는 3-column 그리드
- 카드에 subtle gradient border

```tsx
<SectionWrapper palette={p} variant="gradient">
  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-16">
    Loved by <GradientText from={p.primary} to={p.accent}>Teams</GradientText>
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {testimonials.map((t, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.02, y: -4 }}
        className="relative rounded-2xl border border-white/10 bg-white/5 p-8"
        style={{
          boxShadow: `0 0 0 0 ${p.primary}00`,
        }}
      >
        <div className="flex items-center gap-4 mb-6">
          <img
            src={images.avatars[i]}
            alt={t.name}
            className="w-16 h-16 rounded-full object-cover ring-2"
            style={{ ringColor: `${p.primary}40` }}
          />
          <div>
            <p className="font-bold">{t.name}</p>
            <p className="text-sm text-muted-foreground">{t.role}</p>
          </div>
        </div>
        <p className="text-muted-foreground italic leading-relaxed">"{t.quote}"</p>
      </motion.div>
    ))}
  </div>
</SectionWrapper>
```

**InfiniteMarquee 변형:**
```tsx
<div className="overflow-hidden py-8">
  <div className="flex animate-marquee gap-8">
    {[...testimonials, ...testimonials].map((t, i) => (
      <div key={i} className="min-w-[400px] rounded-2xl border border-white/10 bg-white/5 p-8">
        {/* 위와 동일한 카드 내용 */}
      </div>
    ))}
  </div>
</div>
```

---

## 4. Process Steps

**비주얼 밀도 요구사항:**
- 번호 + 아이콘 + **제품 스크린샷** (좌우 교대 배치)
- 번호에 primary glow
- 스크린샷은 BrowserMockup 또는 PhoneMockup 내부
- 연결선 (SVG path 또는 dashed border)

```tsx
<SectionWrapper palette={p} variant="gradient">
  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-20">
    How It <GradientText from={p.primary} to={p.accent}>Works</GradientText>
  </h2>
  <div className="max-w-5xl mx-auto space-y-24">
    {steps.map((step, i) => (
      <motion.div
        key={i}
        className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 ? 'md:flex-row-reverse' : ''}`}
        initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* 텍스트 측 */}
        <div className="flex-1">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl text-2xl font-black mb-6"
            style={{
              backgroundColor: `${p.primary}15`,
              color: p.primary,
              boxShadow: `0 0 20px ${p.primary}30`,
            }}
          >
            {i + 1}
          </div>
          <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{step.description}</p>
        </div>
        {/* 스크린샷 측 */}
        <div className="flex-1">
          <div
            className="rounded-2xl overflow-hidden border border-white/10"
            style={{ boxShadow: `0 20px 40px ${p.primary}20` }}
          >
            <img
              src={step.screenshot || images.productScreenshots[i]}
              alt={step.title}
              className="w-full"
            />
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</SectionWrapper>
```

---

## 5. Stats / Metrics

**비주얼 밀도 요구사항:**
- NumberTicker count-up 애니메이션
- 풀블리드 그라디언트 배경 (primary → surface)
- 장식 요소 (Sparkles, floating shapes)
- 구체적 수치 (10,847 not 10,000)

```tsx
<section
  className="relative py-40 overflow-hidden"
  style={{
    background: `linear-gradient(135deg, ${p.primary}15, ${p.surface}, ${p.accent}10)`,
  }}
>
  <div className="absolute inset-0 bg-noise" />
  <Sparkles count={10} primaryColor={p.primary} />

  <div className="relative z-10 container mx-auto px-4">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 }}
          className="space-y-2"
        >
          <div
            className="text-4xl md:text-6xl font-black tracking-tight"
            style={{ color: p.primary }}
          >
            <NumberTicker value={stat.value} />
            {stat.suffix}
          </div>
          <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

---

## 6. Client Logos / Trust Bar

**비주얼 밀도 요구사항:**
- InfiniteMarquee 또는 정적 로고 그리드
- 로고 grayscale → hover시 컬러
- 미묘한 separator line 위아래

```tsx
<SectionWrapper palette={p} variant="solid" className="py-24">
  {/* Separator top */}
  <div
    className="absolute top-0 left-0 right-0 h-px"
    style={{ background: `linear-gradient(90deg, transparent, ${p.primary}30, transparent)` }}
  />
  <p className="text-center text-sm text-muted-foreground mb-10 tracking-widest uppercase">
    Trusted by teams at
  </p>
  <div className="overflow-hidden">
    <div className="flex animate-marquee items-center gap-16">
      {[...logos, ...logos].map((logo, i) => (
        <img
          key={i}
          src={logo.src}
          alt={logo.name}
          className="h-8 opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
        />
      ))}
    </div>
  </div>
  {/* Separator bottom */}
  <div
    className="absolute bottom-0 left-0 right-0 h-px"
    style={{ background: `linear-gradient(90deg, transparent, ${p.primary}30, transparent)` }}
  />
</SectionWrapper>
```

---

## 7. FAQ Accordion

**비주얼 밀도 요구사항:**
- Glass-morphism 카드 래퍼
- 열기/닫기 애니메이션 (spring physics)
- primary 액센트 indicator

```tsx
<SectionWrapper palette={p} variant="pattern">
  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-16">
    Common <GradientText from={p.primary} to={p.accent}>Questions</GradientText>
  </h2>
  <div className="max-w-3xl mx-auto space-y-4">
    {faqs.map((faq, i) => (
      <motion.div
        key={i}
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
      >
        <button
          onClick={() => toggle(i)}
          className="w-full flex items-center justify-between p-6 text-left font-semibold"
        >
          {faq.question}
          <ChevronDown
            className="transition-transform duration-300"
            style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0)', color: p.primary }}
          />
        </button>
        <motion.div
          initial={false}
          animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="overflow-hidden"
        >
          <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{faq.answer}</p>
        </motion.div>
      </motion.div>
    ))}
  </div>
</SectionWrapper>
```

---

## 8. Pricing

**비주얼 밀도 요구사항:**
- 3 티어 카드 (가운데 카드 강조 — scale, glow border)
- 가격에 NumberTicker
- CTA에 glow box-shadow
- "Most Popular" 뱃지

```tsx
<SectionWrapper palette={p} variant="gradient">
  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-16">
    Simple <GradientText from={p.primary} to={p.accent}>Pricing</GradientText>
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
    {tiers.map((tier, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.02 }}
        className={cn(
          "relative rounded-2xl border p-8",
          i === 1
            ? "border-primary bg-white/10 scale-105 shadow-2xl"
            : "border-white/10 bg-white/5"
        )}
        style={i === 1 ? { boxShadow: `0 0 40px ${p.primary}30` } : {}}
      >
        {i === 1 && (
          <div
            className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
            style={{ backgroundColor: p.primary, color: p.mode === 'dark' ? '#000' : '#fff' }}
          >
            Most Popular
          </div>
        )}
        <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
        <div className="text-4xl font-black mb-6" style={{ color: p.primary }}>
          ${tier.price}<span className="text-base font-normal text-muted-foreground">/mo</span>
        </div>
        <ul className="space-y-3 mb-8">
          {tier.features.map((f, j) => (
            <li key={j} className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4" style={{ color: p.primary }} /> {f}
            </li>
          ))}
        </ul>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-full font-semibold cursor-pointer"
          style={i === 1 ? {
            backgroundColor: p.primary,
            color: p.mode === 'dark' ? '#000' : '#fff',
            boxShadow: `0 0 30px ${p.primary}66, 0 0 60px ${p.primary}33`,
          } : {
            border: `1px solid ${p.primary}40`,
            color: p.primary,
          }}
        >
          {tier.cta}
        </motion.button>
      </motion.div>
    ))}
  </div>
</SectionWrapper>
```

---

## 9. CTA / Footer CTA

**비주얼 밀도 요구사항:**
- 풀폭 그라디언트 배경
- 대형 헤드라인 (text-4xl md:text-6xl)
- Dual CTA 버튼 (Primary glow + Secondary ghost)
- 배경 장식 (Sparkles 또는 BackgroundBeams)

```tsx
<section
  className="relative py-40 overflow-hidden"
  style={{
    background: `linear-gradient(135deg, ${p.surface}, ${p.primary}10, ${p.surface})`,
  }}
>
  <div className="absolute inset-0 bg-noise" />
  <BackgroundBeams primaryColor={p.primary} />

  <div className="relative z-10 container mx-auto px-4 text-center">
    <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
      Ready to <GradientText from={p.primary} to={p.accent}>Get Started</GradientText>?
    </h2>
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
      Join 10,847 teams already building with {brandName}.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="px-10 py-4 text-base font-semibold rounded-full cursor-pointer"
        style={{
          backgroundColor: p.primary,
          color: p.mode === 'dark' ? '#000' : '#fff',
          boxShadow: `0 0 30px ${p.primary}66, 0 0 60px ${p.primary}33`,
        }}
      >
        Start Free Trial <ArrowRight className="ml-2 inline w-4 h-4" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="px-10 py-4 text-base font-semibold rounded-full cursor-pointer"
        style={{ border: `1px solid ${p.primary}40`, color: p.primary }}
      >
        Book a Demo
      </motion.button>
    </div>
  </div>
</section>
```

---

## 핵심 규칙 요약

1. **모든 섹션에 SectionWrapper 또는 최소 2레이어 배경**
2. **이미지 없는 Feature 카드 금지**
3. **모든 카드에 hover 효과 (scale + border glow)**
4. **Spring physics만 사용 (linear 금지)**
5. **구체적 수치 사용 (10,847 not 10,000)**
6. **py-40 최소 (py-24/py-32 금지)**
7. **페이지 파일 내 function 정의 금지 (export default만 허용)**
8. **모든 컴포넌트는 components/premium/ 또는 components/sections/에서 import**
