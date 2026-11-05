import { defineArrayMember, defineField, defineType } from 'sanity';

// Field-level translations: one document holds Spanish and English side by side.
const i18n = (name: string, title: string, rows = 1, required = true) =>
  defineField({
    name, title, type: 'object', options: { columns: 2 },
    fields: [
      defineField({ name: 'es', title: 'Español', type: rows > 1 ? 'text' : 'string', rows, validation: (r: { required: () => unknown }) => (required ? r.required() : r) } as never),
      defineField({ name: 'en', title: 'English', type: rows > 1 ? 'text' : 'string', rows } as never),
    ],
  });
const i18nList = (name: string, title: string) =>
  defineField({ name, title, type: 'object', fields: [
    defineField({ name: 'es', title: 'Español', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'en', title: 'English', type: 'array', of: [{ type: 'string' }] }),
  ] });
const image = (name = 'image', title = 'Imagen') =>
  defineField({ name, title, type: 'image', options: { hotspot: true }, fields: [i18n('alt', 'Texto alternativo (accesibilidad)')] });
const slug = (source = 'title.es') => defineField({ name: 'slug', title: 'URL (slug)', type: 'slug', options: { source }, validation: (r) => r.required() });
const order = defineField({ name: 'order', title: 'Orden', type: 'number' });

export const schemaTypes = [
  defineType({
    name: 'siteSettings', title: 'Ajustes del sitio', type: 'document',
    fields: [
      defineField({ name: 'name', title: 'Nombre comercial', type: 'string' }),
      defineField({ name: 'legalName', title: 'Razón social', type: 'string' }),
      defineField({ name: 'founded', title: 'Año de fundación', type: 'number' }),
      i18n('tagline', 'Lema'), i18n('description', 'Descripción (SEO)', 3),
      defineField({ name: 'phone', title: 'Teléfono', type: 'string' }),
      defineField({ name: 'email', title: 'Email', type: 'string', validation: (r) => r.email() }),
      defineField({ name: 'whatsapp', title: 'WhatsApp (solo dígitos, con código de país)', type: 'string', validation: (r) => r.regex(/^\d{8,15}$/) }),
      defineField({ name: 'address', title: 'Dirección', type: 'object', fields: [
        defineField({ name: 'street', type: 'string', title: 'Calle' }), defineField({ name: 'city', type: 'string', title: 'Ciudad' }), defineField({ name: 'country', type: 'string', title: 'País' }),
      ] }),
      i18n('hours', 'Horario'),
      defineField({ name: 'storeUrl', title: 'URL de la tienda online', type: 'url' }),
      defineField({ name: 'socials', title: 'Redes sociales', type: 'array', of: [defineArrayMember({ type: 'object', fields: [defineField({ name: 'label', type: 'string' }), defineField({ name: 'url', type: 'url' })] })] }),
      defineField({ name: 'offices', title: 'Oficinas', type: 'array', of: [defineArrayMember({ type: 'object', fields: [defineField({ name: 'city', type: 'string' }), defineField({ name: 'country', type: 'string' }), i18n('role', 'Función')], preview: { select: { title: 'city', subtitle: 'country' } } })] }),
      defineField({ name: 'stats', title: 'Cifras', type: 'array', of: [defineArrayMember({ type: 'object', fields: [defineField({ name: 'value', type: 'number' }), defineField({ name: 'prefix', type: 'string' }), defineField({ name: 'suffix', type: 'string' }), i18n('label', 'Etiqueta'), defineField({ name: 'source', type: 'string', title: 'Fuente del dato' })], preview: { select: { title: 'value', subtitle: 'label.es' } } })] }),
    ],
  }),
  defineType({ name: 'service', title: 'Servicios', type: 'document', fields: [slug(), order, defineField({ name: 'code', type: 'string', title: 'Código (ej. FDR-01)' }), i18n('title', 'Título'), i18n('summary', 'Resumen', 4), i18nList('scope', 'Alcance (lista)'), image()], preview: { select: { title: 'title.es', subtitle: 'code', media: 'image' } } }),
  defineType({ name: 'industry', title: 'Industrias', type: 'document', fields: [slug('name.es'), order, i18n('name', 'Nombre')], preview: { select: { title: 'name.es' } } }),
  defineType({
    name: 'project', title: 'Proyectos', type: 'document',
    fields: [
      slug(), order,
      defineField({ name: 'client', title: 'Cliente', type: 'string', validation: (r) => r.required() }),
      defineField({ name: 'country', title: 'País', type: 'string', options: { list: [{ title: 'Bolivia', value: 'BO' }, { title: 'Paraguay', value: 'PY' }, { title: 'Perú', value: 'PE' }, { title: 'Argentina', value: 'AR' }, { title: 'USA', value: 'US' }] } }),
      i18n('place', 'Ubicación'),
      defineField({ name: 'industry', title: 'Industria', type: 'reference', to: [{ type: 'industry' }] }),
      defineField({ name: 'services', title: 'Servicios', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }] }),
      i18n('title', 'Título'), i18n('about', 'Sobre la planta', 4, false), i18n('scope', 'Alcance ISOTEK', 3),
      defineField({ name: 'images', title: 'Imágenes', type: 'array', of: [defineArrayMember({ type: 'image', options: { hotspot: true }, fields: [i18n('alt', 'Texto alternativo')] })] }),
      defineField({ name: 'featured', title: 'Destacado en inicio', type: 'boolean' }),
    ],
    preview: { select: { title: 'title.es', subtitle: 'client', media: 'images.0' } },
  }),
  defineType({
    name: 'product', title: 'Productos', type: 'document',
    fields: [
      slug(), order,
      defineField({ name: 'line', title: 'Línea', type: 'string', options: { list: ['PROTOS', 'ISOTEK'] } }),
      i18n('title', 'Título'), i18n('summary', 'Resumen', 3), i18nList('features', 'Características'),
      defineField({ name: 'specs', title: 'Modelos / especificaciones', type: 'array', of: [defineArrayMember({ type: 'object', fields: [defineField({ name: 'model', type: 'string', title: 'Modelo' }), i18n('description', 'Descripción')], preview: { select: { title: 'model', subtitle: 'description.es' } } })] }),
      defineField({ name: 'standards', title: 'Normas', type: 'array', of: [{ type: 'string' }] }),
      defineField({ name: 'images', title: 'Imágenes', type: 'array', of: [defineArrayMember({ type: 'image', options: { hotspot: true }, fields: [i18n('alt', 'Texto alternativo')] })] }),
      defineField({ name: 'model3d', title: 'Modelo 3D (URL)', type: 'url' }),
    ],
    preview: { select: { title: 'title.es', subtitle: 'line', media: 'images.0' } },
  }),
  defineType({ name: 'brand', title: 'Marcas', type: 'document', fields: [order, defineField({ name: 'name', type: 'string', title: 'Nombre' }), i18n('category', 'Categoría'), defineField({ name: 'url', type: 'url', title: 'Sitio web' })], preview: { select: { title: 'name', subtitle: 'category.es' } } }),
  defineType({ name: 'teamMember', title: 'Equipo', type: 'document', fields: [order, defineField({ name: 'name', type: 'string', title: 'Nombre' }), i18n('role', 'Cargo'), defineField({ name: 'region', type: 'string', title: 'Región' }), defineField({ name: 'email', type: 'string', title: 'Email' }), defineField({ name: 'whatsapp', type: 'string', title: 'WhatsApp (solo dígitos)' })], preview: { select: { title: 'name', subtitle: 'role.es' } } }),
  defineType({
    name: 'post', title: 'Novedades', type: 'document',
    fields: [slug(), defineField({ name: 'date', type: 'date', title: 'Fecha' }), i18n('title', 'Título'), i18nList('body', 'Párrafos'),
      defineField({ name: 'images', title: 'Imágenes', type: 'array', of: [defineArrayMember({ type: 'image', options: { hotspot: true }, fields: [i18n('alt', 'Texto alternativo')] })] }),
      defineField({ name: 'videoUrl', type: 'url', title: 'Video (URL)' })],
    orderings: [{ title: 'Fecha', name: 'date', by: [{ field: 'date', direction: 'desc' }] }],
    preview: { select: { title: 'title.es', subtitle: 'date', media: 'images.0' } },
  }),
  defineType({ name: 'faq', title: 'Preguntas frecuentes', type: 'document', fields: [order, i18n('question', 'Pregunta'), i18n('answer', 'Respuesta', 4)], preview: { select: { title: 'question.es' } } }),
  defineType({ name: 'certification', title: 'Certificaciones', type: 'document', fields: [order, defineField({ name: 'name', type: 'string', title: 'Norma' }), defineField({ name: 'issuer', type: 'string', title: 'Emisor' }), defineField({ name: 'reference', type: 'string', title: 'Referencia' }), i18n('description', 'Descripción', 3), image()], preview: { select: { title: 'name', subtitle: 'issuer' } } }),
];
