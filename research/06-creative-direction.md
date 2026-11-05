# 06 — Creative direction

## Three concepts

### 1. Diagrama Unifilar (Single-Line) — **CHOSEN**
- **Core idea:** The site is drawn like the single-line diagram of an Isotek installation. One red busbar enters at the hero and runs down the page; each section is a "feeder" that branches off it. As you scroll, current flows and sections switch on.
- **Mood:** precise, confident, engineered; dark switch-room ink against warm steel paper.
- **Type & colour:** Archivo variable (condensed heavy display), Source Sans 3 body, JetBrains Mono labels; ink `#0E0F11`, paper `#F2F0EC`, signal red `#E41E18`, steel greys.
- **Signature interaction:** the busbar draws itself on scroll and "energises" each section — node lights up, label types in, photo opens like a breaker closing.
- **Why it fits:** Single-line diagrams are what Isotek designs and its clients approve. It literally visualises "un solo proveedor, de principio a fin".

### 2. Puesta en Marcha (Commissioning)
- **Core idea:** a cinematic commissioning sequence — checklist ticks, gauges reach range, a plant comes online; full-bleed video from site.
- **Mood:** dramatic, operational, filmic.
- **Type & colour:** ultra-condensed grotesk, amber status lights on black.
- **Signature interaction:** a "start-up" countdown that unlocks the page.
- **Why not:** depends on high-quality video Isotek doesn't yet have (current videos are phone/WhatsApp exports); a gate before content violates "nothing delays a visitor".

### 3. Laboratorio Suizo (Swiss Calibration)
- **Core idea:** metrology precision — calibration ticks, tolerance bands, Swiss-style grid; leads with the E+H-certified lab.
- **Mood:** clinical, minimal, quiet.
- **Type & colour:** neo-grotesk, white space, single red needle.
- **Signature interaction:** a measurement needle that settles exactly on target as numbers count in.
- **Why not:** elegant but it narrows the brand to one service line; EPC and fabrication are the bigger revenue story.

## Chosen concept: Diagrama Unifilar

### Positioning
- **Feeling:** *"These people engineer it properly, and they do the whole job."*
- **Message:** **Un solo proveedor. De la ingeniería a la puesta en marcha.** (EN: *One supplier. From engineering to commissioning.*)

### Design tokens
```
color.ink        #0E0F11   (switch-room black; text on paper, dark sections)
color.ink-2      #17191C   (raised dark surface)
color.steel-900  #2A2D31
color.steel-600  #5B6067   (secondary text on paper — 6.3:1 on paper)
color.steel-300  #B9BCC0   (hairlines on dark)
color.steel-150  #D9D7D2   (hairlines on paper)
color.paper      #F2F0EC   (main light surface)
color.white      #FFFFFF   (cards / product shots)
color.signal     #E41E18   (logo red — live circuit, primary CTA, focus)
color.signal-ink #B8140F   (red for small text on paper — 6.0:1)
color.copper     #C2703D   (rare, for PROTOS copper/product details only)

type.display  Archivo var, wdth 62–100, wght 700–900, tracking -0.02em, lh 0.9
type.body     Source Sans 3, 400/600, 17px/1.6 mobile, 18px/1.6 desktop
type.mono     JetBrains Mono 400/500, 12–13px, uppercase, tracking 0.08em
scale (fluid clamp): xs 12 · sm 14 · base 17–18 · lg 20–22 · xl 24–30 · 2xl 32–44 · 3xl 44–72 · 4xl 56–120 · hero 64–176

space (4-pt): 4 8 12 16 24 32 48 64 96 128 192
radius: 0 (default — engineered), 2px (inputs), 999px (status dots only)
shadow: none on paper; elevation via 1px hairlines. One "glow": 0 0 0 4px rgba(228,30,24,.18) for live nodes.
motion:
  ease.out    cubic-bezier(.16,1,.3,1)   (expo-out, default reveals)
  ease.inOut  cubic-bezier(.65,0,.35,1)  (line draws)
  ease.snap   cubic-bezier(.3,1.4,.5,1)  (breaker "click", nodes)
  dur.micro 160ms · dur.ui 280ms · dur.reveal 700ms · dur.draw 1200ms
```

### Typography
Archivo's width axis is the expressive device: headlines sit condensed (wdth 62–75) like equipment nameplates, and expand slightly on hover/focus for interactive titles. Source Sans 3 keeps continuity with the brand's existing body font. JetBrains Mono carries engineering metadata: `IEC 61439-1/5`, `4.000 A`, `SANTA CRUZ · BO`, `FDR-03`.

### Art direction
- **Heroes and section openers:** real installation photos only (Alicorp MCC line-up, CBN busbar trunking, ethanol plant aerial, Soboce boards). Crop to remove baked-in client logos where the composition allows (usually bottom-right) and the stamped Isotek logo (top-left).
- **Treatment:** slight desaturation (≈ -20%) and a shared cool shadow tone so mixed WhatsApp/camera sources feel like one set; never colour-wash with gradients. Red stays reserved for UI signal and real red hardware (insulators, busbar supports).
- **Products:** keep white seamless shots, placed on `white` cards with mono spec labels.
- **People:** field photos (engineers on site) for the "Empresa" story; team is typographic (no stock).
- **Sequencing:** wide (site) → mid (equipment line-up) → detail (busbar, terminals) → people. Alternate dark and paper sections to pace the scroll.

### Signature moment
**"Energizar"** — The home hero opens on a dark switch-room. A single-line diagram (incomer → main breaker → busbar → 4 feeders labelled *Ingeniería · Procura · Fabricación · Puesta en marcha*) draws itself in ~1.2 s. A red current pulse travels the busbar and each feeder node lights in turn; the headline "Un solo proveedor." sets in, condensed, and the real switchgear photo behind it fades up as the last node lights. Below the hero, the busbar continues as a thin red line down the left gutter of the page, with a node at each section that lights as the section enters view. Under `prefers-reduced-motion` the diagram renders fully drawn and lit, instantly.

### Motion language
- **Page transitions:** none blocking. A 2px red progress line along the top during route changes; content fades in 280 ms.
- **Scroll:** native scroll (no hijack). Busbar `stroke-dashoffset` mapped to scroll progress via GSAP ScrollTrigger (scrub: true). Section nodes snap on with `ease.snap`.
- **Reveals:** text lines rise 24px + fade, 700 ms `ease.out`, 60 ms stagger; images reveal via `clip-path: inset()` from a 2px horizontal line to full ("breaker closing"). Content is visible by default and only hidden after JS confirms it can animate, so failure never hides content.
- **Hover:** links underline draw left→right (280 ms); project cards: image scales 1.03, mono label turns red; buttons: red fill wipes from left.
- **Microinteractions:** language toggle slides a red "contact" between ES/EN like a selector switch; form fields show a live red node when focused and a check on valid; counters count once with tabular figures.
- **Cursor:** native. No custom cursor (accessibility, B2B audience).
