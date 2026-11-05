# 02 — Brand identity (as found)

Extracted from computed CSS (four minified Elementor stylesheets on the home page) and the downloaded logo files.

## Logo
- Wordmark "isotek" in heavy geometric sans, the "S" replaced by a **red angular double-chevron glyph** (reads as an S and as two interlocking conductors). Sub-line "INNOVATIVE SOLUTIONS" boxed, plus "LATAM".
- Files available: `Isotek-latam-logo-02-web.png` (266×100), `Isotek-latam-logo-negro-02-web.png` (250×150, black), `Isotek-latam-logo-blanco-web.png` (white), `Isotek-favicon.png` (72×72, red S on black). **No vector master was found.**
- Sister mark: **PROTOS** (red open-frame icon + heavy black wordmark) — `Protos.jpg`, `Protos-02.jpg`.

## Colour (Elementor global tokens)
| Token | Value | Use found |
|---|---|---|
| primary | `#222222` | headings, nav background |
| d14bd50 | `#181818` | dark surfaces |
| a7dae1a | `#E41E18` | **logo red**, CTAs |
| dd994a9 | `#FF0000` | secondary red |
| accent / f7868a4 | `#FFC815` | theme accent (yellow) |
| text | `#7B7B7B` | body text (fails AA on white at small sizes: 4.2:1) |
| bcac49c / b99e051 | `#FBFBFB` / `#E1E1E1` | light surfaces, borders |
The minified CSS also carries dozens of unrelated plugin colours (`#00CEA6`, `#2575FC`…) from ElementsKit widgets — noise, not brand.

## Typography
- Headings: **Roboto Condensed** (56 declarations), Roboto, Roboto Slab.
- Body: **Source Sans Pro**.
- One stray `Bricolage Grotesque` @font-face (plugin).
- **Icon fonts loaded: ~15** (Font Awesome 4 + 5 Free + 5 Brands, Material Design Icons, Line Awesome ×2, LineIcons, Linearicons, Elusive, themify, ElegantIcons, simple-line-icons, eicons, elementskit, WooCommerce, VideoJS). Major weight and render-blocking cost.

## Imagery style
- **Strong:** real site/factory photography — long rows of white MCC/switchgear line-ups (Alicorp, Emapa, Soboce, CBN), busbar trunking with red insulators, ethanol plant aerials and columns, engineers in hard hats on site. Products shot on seamless white with red accents (insulators, busbar supports, copper bars).
- **Weak:** many photos have the Isotek logo stamped top-left and the client's logo bottom-right; several are WhatsApp-compressed (≈1000 px); the home hero is a generic night refinery image (not Isotek's work); one Envato stock photo ("female-engineer…6KRPP9P") is used on the home page.
- Event photos are framed as social posts with baked-in headlines and `#YoSoyFinergy2024` bars.

## Voice
- Formal *usted* in Spanish, technical, standards-led ("bajo norma IEC 61439-1/5", "trazabilidad", "comisionado").
- Recurring phrases: **"llave en mano"**, **"un solo proveedor"**, **"de principio a fin"**, **"sin sorpresas"**, "respaldo real", "fabricación propia", "ingenieros certificados".
- Newer hero copy is crisper and benefit-led: *"Equipos de primera, respaldo real"*, *"Ingeniería y montaje, un solo equipo"*, *"Tu planta, siempre operando"* (switches to *tú*).
- Inconsistencies: tú/usted mixing; "Ethanol"/"Etanol"; some lorem ipsum ("Fusce tellus leo…") remains in a hidden "Latest News" block.
