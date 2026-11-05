"""Build assets/processed + assets/manifest.json from assets/raw.

Usage: python3 -I scripts/process_media.py <media_index.json>
media_index.json = {source_url: {"pages": [...], "alt": "..."}} produced by the crawl.
"""
import json, os, sys, re
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW, OUT = os.path.join(ROOT, 'assets/raw'), os.path.join(ROOT, 'assets/processed')
index = json.load(open(sys.argv[1]))
by_file = {}
for url, meta in index.items():
    if '/wp-content/uploads/' in url:
        f = os.path.basename(re.sub(r'-\d+x\d+(\.[a-z]+)$', r'\1', url))
        by_file.setdefault(f, {'url': re.sub(r'-\d+x\d+(\.[a-z]+)$', r'\1', url), 'pages': set(), 'alt': meta['alt']})
        by_file[f]['pages'].update(p.replace('.html', '') for p in meta['pages'])

# Curated mapping: processed name -> raw file
MAP = {
  # projects
  'projects/alicorp-1': 'Alicorp-01A-Proyectos-Electricos.jpg', 'projects/alicorp-2': 'Alicorp-01B-Proyectos-Electricos.jpg',
  'projects/cbn-mt-1': 'CBN-01-Proyectos-Electricos.jpg', 'projects/cbn-mt-2': 'CBN-02-Proyectos-Electricos.jpg',
  'projects/cbn-busbar-1': 'CBN-02A-Proyectos-Electricos.jpg', 'projects/cbn-busbar-2': 'CBN-02B-Proyectos-Electricos.jpg',
  'projects/cre-1': 'CRE-01A-Proyectos-Electricos.jpg', 'projects/cre-2': 'CRE-01B-Proyectos-Electricos.jpg',
  'projects/emapa-1': 'Emapa-01-Proyectos-de-Automatizacion.jpg', 'projects/emapa-2': 'Emapa-02-Proyectos-de-Automatizacion.jpg',
  'projects/soboce-1': 'Soboce-01B-Proyectos-Electricos.jpg', 'projects/soboce-2': 'Soboce-01A-Proyectos-Electricos.jpg', 'projects/soboce-3': 'Soboce-01C-Proyectos-Electricos.jpg',
  'projects/gladymar-1': 'Gladymar-01A-Proyectos-Electricos.jpg', 'projects/gladymar-2': 'Gladymar-01B-Proyectos-Electricos.jpg',
  'projects/sofia-1': 'Sofia-01A-Iluminacion.jpg', 'projects/sofia-2': 'Sofia-01B-Iluminacion.jpg',
  'projects/alcoenergy-1': 'WhatsApp-Image-2026-09-22-at-08n.55.50.jpeg', 'projects/alcogreen-1': 'WhatsApp-Image-2026-09-22-at-08.55.49.jpeg',
  'projects/cervepar-1': 'WhatsApp-Image-2026-09-22-akt-08.55.50.jpeg', 'projects/cremer-1': 'WhatsApp-Image-2026-09-22-at-08.55.449.jpeg',
  'projects/ypfb-1': 'WhatsApp-Image-2026-09-22-at-08.55n.50.jpeg', 'projects/bovinsa-1': 'WhatsApp-Image-2026-09-22-at-08.5h5.51.jpeg',
  'projects/finning-1': 'WhatsApp-Image-2026-f09-22-at-09.44.02.jpeg', 'projects/cargill-1': 'g.jpeg',
  'site/planta-etanol': 'Planta-Etanol-02.jpg',
  'company/field-team': 'Isotek-QuienesSomos-06.jpg', 'company/warehouse': 'Isotek-QuienesSomos-09.jpg',
  'company/site-work': 'Isotek-QuienesSomos-07-qktka6jb889hpz7z7bxuzshsrr37owr6ci9na4s7ts.jpg',
  # certifications
  'certs/iso9001-certificate': 'ISOTEK-Certificado-ISO9001_2023-eng.jpg', 'certs/tuv-testmark': 'TR-Testmark_9000029079_ES_CMYK_with-QR-Code.jpg',
  'certs/iec-compliance': 'ISOTEK-Compliance-IEC-rev4.jpg', 'certs/iec-compliance-trays': 'ISOTEK-Compliance-IEC-Bandejas-PROTOS-rev4.jpg',
  # news
  'news/finergy-talk': '20240522-Finergy-01.jpg', 'news/finergy-cubic': '20240522-Finergy-03.jpg', 'news/finergy-stand': '20240523-Finergy-01.jpg',
  'news/finergy-eh': '20240523-Finergy-02.jpg', 'news/finergy-close': 'Isotek-Feria-Internacional-de-Energias-FInergy-2024_thumb1.jpg',
  'news/rockwell': 'Isotek-Rockwell-01.jpg', 'news/latam-2025': 'Isotek-comienza-2025.jpg', 'news/pilares': '20240326-PilaresLaborales-General-web.jpg',
  'news/certification': 'Certificacion-ISO90012015-20230918.jpg', 'news/seminar-og': 'Seminario-PetroleoyGas-20230713.jpg',
  'news/seminar-fb': 'Seminario-AlimentosyBebidas-20230616.jpg',
  # brand
  'brand/logo-white': 'Isotek-latam-logo-02-web.png', 'brand/logo-black': 'Isotek-latam-logo-blanco-web.png',
  'brand/favicon': 'Isotek-favicon.png', 'brand/protos': 'Protos.jpg',
}
PRODUCTS = ['aisladores-electricos', 'bandejas-porta-cables', 'barras-de-cobre', 'discos-de-aterramiento', 'ducto-barras',
            'maquinas-aireadoras-de-aguas-servidas', 'porta-barras', 'tableros-autoportantes', 'tableros-con-segmentacion', 'tableros-de-sobreponer']
for slug in PRODUCTS:
    files = sorted(f for f, m in by_file.items() if m['pages'] == {'producto__' + slug} and not f.endswith(('Ficha-Tecnica.jpg', 'Guia-Instalacion.jpg')))
    main = [f for f, m in by_file.items() if 'producto__' + slug in m['pages'] and 'principal' in f]
    for i, f in enumerate(main + files):
        MAP[f'products/{slug}-{i + 1}'] = f

os.makedirs(OUT, exist_ok=True)
used = {}
for name, raw in MAP.items():
    src = os.path.join(RAW, raw)
    if not os.path.exists(src):
        print('MISSING', raw); continue
    im = Image.open(src)
    dst = os.path.join(OUT, name + ('.png' if raw.endswith('.png') else '.jpg'))
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    if raw.endswith('.png'):
        im.convert('RGBA').save(dst, optimize=True)
    else:
        im = ImageOps.exif_transpose(im).convert('RGB')
        if im.width > 2000: im = im.resize((2000, round(im.height * 2000 / im.width)), Image.LANCZOS)
        im.save(dst, quality=84, optimize=True, progressive=True)
    used[raw] = os.path.relpath(dst, ROOT)

THIRD_PARTY = re.compile(r'(Endress|Rockwell-Automation|Schneider|ABB|Siemens|TFV|Alstom|Arruti|Weg|Wago|Brady|Lacroix|Grundfos|Hyundai|Acuity|Holophane|Eaton|General-Electric|Circutor|sick|buhler|samson|danfoss|CUBIC|Cubic|Hitachi|pi_04|descarga|Ametek|allen-bradley|bandera)', re.I)
manifest = []
for f in sorted(os.listdir(RAW)):
    p = os.path.join(RAW, f); meta = by_file.get(f, {'url': '', 'pages': set(), 'alt': ''})
    is_video = f.endswith('.mp4')
    try:
        w, h = Image.open(p).size; res = f'{w}x{h}'
    except Exception:
        w = 0; res = 'video' if is_video else 'unknown'
    ftype = 'video' if is_video else ('logo' if ('logo' in f.lower() or 'favicon' in f.lower() or THIRD_PARTY.search(f) or f.startswith('Protos')) else 'image')
    quality = 'hero' if w >= 1180 else 'section' if w >= 600 else 'thumbnail' if w else ('section' if is_video else 'unusable')
    third = bool(THIRD_PARTY.search(f))
    has_people = bool(re.search(r'Finergy|Pilares|Seminario|QuienesSomos|-03\.jpg$|WhatsApp-Image-2026-09-(10|22-at-08\.55\.(449|49))|akt', f))
    has_client_logo = bool(re.search(r'Proyectos|Iluminacion', f))
    m = re.search(r'(20\d{2})(\d{2})(\d{2})', f) or re.search(r'(20\d{2})-(\d{2})-(\d{2})', f)
    manifest.append({
        'file': f'assets/raw/{f}', 'source_url': meta['url'], 'platform': 'website (isoteklatam.com)',
        'date': f'{m.group(1)}-{m.group(2)}-{m.group(3)}' if m else '', 'type': ftype, 'resolution': res,
        'subject': meta['alt'] or re.sub(r'[-_]+', ' ', os.path.splitext(f)[0]),
        'quality': quality, 'rights_flag': third or has_people or has_client_logo,
        'rights_reason': ', '.join(r for r, c in [('third-party trademark', third), ('identifiable people', has_people), ('client logo/site in frame', has_client_logo)] if c),
        'suggested_use': used.get(f, 'not used on new site'),
        'found_on': sorted(meta['pages']),
    })
json.dump(manifest, open(os.path.join(ROOT, 'assets/manifest.json'), 'w'), indent=2, ensure_ascii=False)
print(len(used), 'processed;', len(manifest), 'in manifest;', sum(m['rights_flag'] for m in manifest), 'rights-flagged')
