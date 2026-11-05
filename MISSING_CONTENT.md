# Missing content — what ISOTEK LATAM needs to provide or confirm

Nothing on the new site was invented. Where content was missing, the site either omits the element or shows a clearly marked `[NEEDS CLIENT INPUT]` placeholder (currently only the privacy page). Items are ordered by impact.

## Must provide before launch

| # | Item | Why | Where it appears |
|---|---|---|---|
| 1 | **Privacy policy (legal text)** | Required for a contact form that collects personal data. The page currently shows only verifiable facts and a `[NEEDS CLIENT INPUT]` marker. | `/es/privacidad`, `/en/privacidad` |
| 2 | **Review of all English copy** | English is my translation of the Spanish site; technical terms (e.g. "form 3b segregation", "busbar trunking", "MLVDB") should be checked by an Isotek engineer. | All `/en` pages; `site/messages/en.json`; `en` fields in the CMS |
| 3 | **Logo in vector format** (SVG, AI, EPS or PDF) for ISOTEK LATAM and PROTOS | Only small PNGs exist (≤ 266 px wide). They look acceptable at header size but will not scale to large formats or Open Graph images. | Header, footer, social share images |
| 4 | **Sanity account / project** (free tier is enough) | Needed to switch on the admin portal. The site runs from local content until then. | `/studio` |
| 5 | **Email delivery key** (Resend, or tell us your preferred provider) and the inbox that should receive enquiries | Without it the form correctly says it could not send and offers email/WhatsApp instead. | `/contacto` |
| 6 | **Confirm the team list** | The current home page shows two conflicting lists. The new site uses the "LATAM" list (Juan Manuel Espejo, Marcos Chávez, Reinhard Peña De Lillo, Wilmar Martínez, Ricardo Zurita, Julio Montero, Ali Mustafa, Samira Abuawad, José Carlos Villagómez, Irazema Justiniano, Norma Córdova Jiménez). Please confirm names, titles, and that each person agrees to their email/WhatsApp being public. | `/empresa` |
| 7 | **Confirm the main WhatsApp number** | Taken from the site's WhatsApp widget ("Departamento Comercial", +591 69224248). | Floating button, CTAs, contact page |

## Strongly recommended

| # | Item | Why |
|---|---|---|
| 8 | **Testimonials or quotes from clients** (with written permission) | No testimonials exist publicly; they would strengthen the Projects and Home pages. |
| 9 | **Higher-resolution project photos** (originals from the camera/phone, not WhatsApp exports) | Most project images are 560–1,280 px wide WhatsApp copies with logos stamped in the corners. Clean originals would allow full-bleed use. |
| 10 | **Project details**: year, duration, numbers (kW/A, motors, panels), challenge and outcome for each case | Today each case has client, place and a one-line scope. |
| 11 | **Industry tags per project** | I tagged each project with an industry for the filter; these are **inferences** from public knowledge of each client (e.g. Alicorp → Food & Beverage, CRE → Energy). Gladymar is untagged. Please confirm. |
| 12 | **Brand categories** | The brands page on the old site shows category labels next to logos without names; the mapping to brand names was inferred from logo file names. Categories for Bühler, WEG, General Electric, Arruti and Ametek are my best reading. |
| 13 | **Calibration lab evidence** (certificate from Endress+Hauser Switzerland) | The claim "the only lab in Bolivia certified by E+H Switzerland" is the brand's own. A certificate image would make it verifiable on the page. |
| 14 | **Factory photos** (CNC lines, laser welding, assembly floor) | The "Made in Bolivia" story has no factory imagery yet; product shots stand in. |
| 15 | **Real photos of the people** in the LATAM team list (optional) | Photos exist only for the older list. The new design presents the team typographically, so this is optional. |
| 16 | **Instagram / Facebook data export** (last 12 months) | Instagram could not be analysed (login wall). An export lets us use top posts and recurring customer questions. |
| 17 | **Custom domain for the online store** (e.g. `tienda.isoteklatam.com`) | The store currently lives at `nfjd3h-uk.myshopify.com`, which looks untrustworthy to buyers. |
| 18 | **Holding company name** (optional) | "Respaldados por un holding con presencia en LATAM, USA y Asia" — naming it would add credibility. |
| 19 | **GA4 measurement ID** | The old site uses Google Site Kit (`GT-PJ4MLSCJ`); the new site has an analytics hook but no ID configured. |

## Content corrections made (please confirm)

- "15 años de trayectoria" (old home page) vs. "fundada en 2015" (about page): the new site says **"desde 2015"** for the company and keeps "más de 15 años de experiencia" only where it refers to the team (as the old FAQ does).
- Vision statement softened from "convirtiéndonos en un actor dominante que abarca todo el mercado boliviano… el más grande de Bolivia" to "ser reconocidos como el referente de soluciones industriales en Bolivia". The original can be restored in one line if preferred.
- Lorem ipsum ("Fusce tellus leo…") found in a hidden block of the old home page was not carried over.
- Home counters on the old site render "0" in the page source; the new site shows the real numbers from the About page.
