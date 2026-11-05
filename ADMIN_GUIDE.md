# Admin guide — editing the ISOTEK LATAM website

This guide is for the person at ISOTEK who keeps the website up to date. No technical knowledge is needed.

## Logging in

1. Go to **isoteklatam.com/studio** (or click **Administración** at the bottom of any page).
2. Log in with the Google or email account that was invited to the Sanity project.
3. On the left you'll see the content types: **Ajustes del sitio**, **Servicios**, **Industrias**, **Proyectos**, **Productos**, **Marcas**, **Equipo**, **Novedades**, **Preguntas frecuentes**, **Certificaciones**.

## Two languages, one document

Every text field has two boxes side by side: **Español** and **English**. Spanish is required. If you leave English empty, the English site shows the Spanish text, so always fill both when you can.

## Adding a project (case study)

1. Click **Proyectos → + (Create)**.
2. Fill in **Título** (ES/EN). Then click **Generate** next to **URL (slug)**; it creates the web address from the Spanish title.
3. **Cliente**: client name exactly as it should appear (e.g. "Cargill Bolivia S.A.").
4. **País**, **Ubicación** (city/region), **Industria** and **Servicios** (choose from the lists).
5. **Sobre la planta** (optional) and **Alcance ISOTEK** (what Isotek did, in one or two sentences).
6. **Imágenes**: drag photos in. The first image is the cover. For each image, fill **Texto alternativo**: a short description of what the photo shows, e.g. "MCC line-up built by ISOTEK for Cargill". It's read aloud to blind visitors and helps Google.
7. Tick **Destacado en inicio** to show it on the home page (the first five featured projects by **Orden** are shown).
8. Click **Publish** (bottom right). The site updates within a minute.

**Photo tips:** use the original photo from the camera or phone (not a WhatsApp copy), landscape, at least 1600 px wide. Avoid photos with logos or text stamped on them.

## Editing or deleting

- **Edit:** open the item, change it, click **Publish**. Until you publish, changes are a private draft.
- **Unpublish** (hide without deleting): the **⋯** menu next to Publish → **Unpublish**.
- **Delete:** **⋯** → **Delete**. A project that is referenced elsewhere will warn you first.
- **Undo:** the clock icon (top right) shows the history; you can restore any earlier version.

## Adding news (Novedades)

**Novedades → + → Título**, **Fecha**, **Párrafos** (one box per paragraph), **Imágenes**, optional **Video (URL)** (YouTube or Facebook link). Publish.

## Changing phone, email, WhatsApp, address or offices

Open **Ajustes del sitio**. WhatsApp must be digits only, with the country code and no "+" or spaces (e.g. `59169224248`). Changes apply to the header, footer, contact page and WhatsApp buttons everywhere.

## Changing the numbers on the home page

**Ajustes del sitio → Cifras**: value (e.g. 200), prefix (`+`), label (ES/EN) and **Fuente del dato** (where the number comes from). Please only publish numbers you can back up.

## Order of items

Most types have an **Orden** field: lower numbers appear first.

## What you can't edit in the admin (ask your developer)

Navigation labels, button texts and page headlines live in the code (`site/messages/es.json` and `en.json`), as do the colours and layout.

## Contact form messages

Enquiries arrive by email at the address set by your developer (default `info@isoteklatam.com`), with the sender's address as "Reply-to", so you can simply hit Reply.
