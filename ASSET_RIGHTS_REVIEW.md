# Asset rights review — approve before launch

All media were downloaded from isoteklatam.com (Isotek's own website). Full list with source URLs: `assets/manifest.json` (179 files, 93 flagged). Only the files below are **used on the new site**; please approve each group.

## 1. Photos showing client sites, equipment or client logos

Client logos are stamped into the corners of most project photos (e.g. Alicorp, CBN, CRE, Emapa/Véneta, Sofía, Soboce). Naming the clients and showing their plants is already done on the current site, but please confirm each client is still happy to be referenced.

| Used as | Files (site/public/media/projects/) | Client |
|---|---|---|
| Home hero, CCM service, project | `alicorp-1.jpg`, `alicorp-2.jpg` | Alicorp |
| Electrical service, projects | `cbn-busbar-1/2.jpg`, `cbn-mt-1/2.jpg` | CBN (AmBev) |
| Project | `cre-1/2.jpg` | CRE |
| Project | `emapa-1/2.jpg` | EMAPA / Grupo Véneta |
| Project | `soboce-1/2/3.jpg` | Soboce |
| Project | `gladymar-1/2.jpg` | Gladymar |
| Project | `sofia-1/2.jpg` | Sofía (shows a Philips logo too) |
| EPC service, project | `alcoenergy-1.jpg` (aerial) | Alcoenergy |
| Projects | `alcogreen-1`, `cervepar-1`, `cremer-1`, `ypfb-1`, `bovinsa-1`, `finning-1`, `cargill-1` | Alcogreen, Cervepar/AB InBev, Cremer Oleo, YPFB, Bovinsa, Finning/CAT, Cargill |

## 2. Photos with identifiable people

Staff consent is needed for public use.

| Files | Who |
|---|---|
| `company/field-team.jpg`, `company/warehouse.jpg`, `company/site-work.jpg` | Isotek field and warehouse staff |
| `projects/cervepar-1.jpg`, `cremer-1.jpg`, `alcogreen-1.jpg` | Isotek engineers on client sites |
| `news/finergy-*.jpg`, `news/seminar-*.jpg`, `news/pilares.jpg` | Staff, speakers (incl. Endress+Hauser's Aurelio Vaca) and seminar attendees |

## 3. Third-party trademarks

- **Brand names** (Endress+Hauser, Siemens, Rockwell Automation/CUBIC, ABB, Schneider, WAGO, SICK, etc.) appear **as text only** on the new site; no partner logos are used. Please confirm Isotek's partner agreements allow naming each brand, especially the "exclusive representative" (E+H) and "exclusive official partner" (CUBIC) claims.
- `news/rockwell.jpg` and `news/finergy-eh.jpg` show the Rockwell Automation and Endress+Hauser logos (from Isotek's own announcements).
- The certificate images (`certs/*.jpg`) show the TÜV Rheinland mark; publishing them is normal, but confirm the certificate is current.
- The WhatsApp icon is used only to label WhatsApp links, which Meta's brand guidelines permit.

## 4. Not used (and why)

- `female-engineer-check-and-control-automation-robot-6KRPP9P.jpg`: Envato stock photo from the old home page. It is not Isotek's work, so it was removed.
- Partner logo files (`ABB.jpg`, `Siemens.jpg`, etc.) and flag images: these are third-party marks or decoration; the text list is used instead.
- Social-style creatives with baked-in text (`WhatsApp-Image-2026-09-10…`, `…09-11…`): text in images is not accessible or translatable.
- Videos (`Isotek-Feria-…-2024.mp4`, 20 MB; `WhatsApp-Video-…mp4`): kept in `assets/raw` but not embedded, to protect performance. They can be added through the CMS as links.

## 5. Fonts

Archivo, Source Sans 3 and JetBrains Mono are all under the SIL Open Font License 1.1, which allows commercial web use. They are self-hosted at build time through `next/font`.
