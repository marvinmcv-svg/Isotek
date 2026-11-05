// Local seed content. Every fact is traced to isoteklatam.com (crawled 2026-11-05);
// see research/01-brand-profile.md. Spanish copy is the brand's own (lightly edited for
// consistency); English is a translation pending client review (MISSING_CONTENT.md).
import dims from './media-dims.json';
import type {
  Brand, Certification, Faq, I18n, Img, Industry, Post, Product, Project, Service, SiteSettings, TeamMember,
} from './types';

const D = dims as unknown as Record<string, [number, number]>;

export function img(src: string, es: string, en: string): Img {
  const d = D[src];
  if (!d) throw new Error(`Unknown media: ${src}`);
  return { src, alt: { es, en }, width: d[0], height: d[1] };
}

function gallery(prefix: string, es: string, en: string): Img[] {
  return Object.keys(D)
    .filter((k) => k.startsWith(prefix))
    .sort((a, b) => Number(a.match(/-(\d+)\.\w+$/)?.[1]) - Number(b.match(/-(\d+)\.\w+$/)?.[1]))
    .map((k, i) => img(k, `${es} — imagen ${i + 1}`, `${en} — image ${i + 1}`));
}

const t = (es: string, en: string): I18n => ({ es, en });

export const settings: SiteSettings = {
  name: 'ISOTEK LATAM',
  legalName: 'ISOTEK Innovative Solutions SRL',
  founded: 2015,
  tagline: t('Un solo proveedor. De la ingeniería a la puesta en marcha.', 'One supplier. From engineering to commissioning.'),
  description: t(
    'Empresa de ingeniería y soluciones industriales con sede en Bolivia: proyectos EPC llave en mano, tableros y CCM de fabricación propia, instrumentación y calibración, automatización y mantenimiento de plantas.',
    'Industrial engineering company headquartered in Bolivia: turnkey EPC projects, in-house manufactured switchboards and MCCs, instrumentation and calibration, automation and plant maintenance.',
  ),
  phone: '+591 3 3112470',
  email: 'info@isoteklatam.com',
  whatsapp: '59169224248',
  address: { street: 'Barrio 23 de Junio, Avenida San Juan, entre calles 4 y 5', city: 'Santa Cruz de la Sierra', country: 'Bolivia' },
  hours: t('Lunes a viernes, 8:00 – 17:30', 'Monday to Friday, 8:00 am – 5:30 pm'),
  storeUrl: 'https://nfjd3h-uk.myshopify.com/',
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/isoteksrl/' },
    { label: 'Facebook', url: 'https://www.facebook.com/Isotek-SRL-1613752488923126/' },
    { label: 'Instagram', url: 'https://www.instagram.com/isotek.bo/' },
  ],
  offices: [
    { city: 'Santa Cruz', country: 'Bolivia', role: t('Casa matriz', 'Headquarters') },
    { city: 'Cochabamba', country: 'Bolivia', role: t('Ventas y servicios', 'Sales and services') },
    { city: 'La Paz', country: 'Bolivia', role: t('Ventas y servicios', 'Sales and services') },
    { city: 'Asunción', country: 'Paraguay', role: t('Ventas y servicios', 'Sales and services') },
    { city: 'Lima', country: 'Perú', role: t('Ventas', 'Sales') },
    { city: 'Miami', country: 'USA', role: t('Almacén', 'Warehouse') },
  ],
  stats: [
    { value: 200, prefix: '+', label: t('proyectos ejecutados', 'projects delivered'), source: '/quienes-somos' },
    { value: 100, prefix: '+', label: t('colaboradores', 'people'), source: '/quienes-somos' },
    { value: 45, prefix: '+', label: t('ingenieros de servicios', 'service engineers'), source: '/quienes-somos' },
    { value: 5, label: t('países con operaciones', 'countries with operations'), source: 'home' },
  ],
};

export const services: Service[] = [
  {
    slug: 'epc', code: 'FDR-01',
    title: t('Proyectos EPC llave en mano', 'Turnkey EPC projects'),
    summary: t(
      'Un solo proveedor para todo su proyecto de planta: ingeniería, procura y construcción, de principio a fin, con un solo responsable.',
      'One supplier for your whole plant project: engineering, procurement and construction, start to finish, with a single point of responsibility.',
    ),
    scope: {
      es: ['Ingeniería básica y de detalle', 'Procura de equipos y materiales con marcas certificadas', 'Fabricación propia de tableros y estructuras metalmecánicas', 'Montaje electromecánico en obra', 'Puesta en marcha y comisionamiento', 'Gestión integral del proyecto, con ingenieros propios'],
      en: ['Basic and detailed engineering', 'Procurement of equipment and materials from certified brands', 'In-house fabrication of switchboards and metal structures', 'Electromechanical installation on site', 'Start-up and commissioning', 'End-to-end project management by our own engineers'],
    },
    image: img('/media/projects/alcoenergy-1.jpg', 'Vista aérea de la planta de etanol de Alcoenergy en Coronel Oviedo, Paraguay', 'Aerial view of the Alcoenergy ethanol plant in Coronel Oviedo, Paraguay'),
  },
  {
    slug: 'electricas-bt-mt', code: 'FDR-02',
    title: t('Soluciones eléctricas en baja y media tensión', 'Low- and medium-voltage electrical solutions'),
    summary: t(
      'Ingenieros certificados en distintas marcas para soluciones eléctricas seguras, confiables y normadas, desde la sala eléctrica hasta la calidad de energía.',
      'Engineers certified across leading brands for safe, reliable, standards-compliant electrical solutions — from the electrical room to power quality.',
    ),
    scope: {
      es: ['Montaje integral de salas de control y salas eléctricas', 'Integración de equipos de potencia: Siemens, Schneider Electric, Rockwell Automation – CUBIC, WAGO y ABB', 'Tableros de distribución y CCM de fabricación propia bajo IEC 61439-1/5', 'Protección y maniobra en baja y media tensión', 'Calidad de energía con bancos de capacitores', 'Respaldo energético con sistemas UPS', 'Celdas de media tensión'],
      en: ['Complete installation of control rooms and electrical rooms', 'Power equipment integration: Siemens, Schneider Electric, Rockwell Automation – CUBIC, WAGO and ABB', 'Distribution boards and MCCs built in-house to IEC 61439-1/5', 'LV and MV protection and switching', 'Power quality with capacitor banks', 'Backup power with UPS systems', 'Medium-voltage switchgear cells'],
    },
    image: img('/media/projects/cbn-busbar-1.jpg', 'Ducto barras con soportes rojos instalado por ISOTEK en la planta de CBN, Santa Cruz', 'Busbar trunking with red supports installed by ISOTEK at the CBN plant, Santa Cruz'),
  },
  {
    slug: 'ccm', code: 'FDR-03',
    title: t('Centros de Control de Motores (CCM)', 'Motor Control Centres (MCC)'),
    summary: t(
      'Diseñamos y fabricamos CCM certificados bajo IEC 61439-1/5 en dos líneas, con la trazabilidad y el respaldo que exige cada auditoría.',
      'We design and build MCCs certified to IEC 61439-1/5 in two product lines, with the traceability and backing every audit demands.',
    ),
    scope: {
      es: ['CCM CUBIC — envolvente europea, ensamblado en Bolivia por ingenieros certificados en fábrica CUBIC (Rockwell Automation); opción Arc-Shield resistente a arco interno', 'CCM PROTOS — envolvente boliviana, líneas CNC y soldadura láser, proceso certificado ISO 9001:2015, segmentación tipo 3b', 'Componentes a elección: Siemens, ABB, Schneider, Eaton, Allen-Bradley o Hyundai'],
      en: ['CUBIC MCC — European enclosure, assembled in Bolivia by CUBIC-factory-certified engineers (Rockwell Automation); Arc-Shield internal-arc option', 'PROTOS MCC — Bolivian enclosure, CNC lines and laser welding, ISO 9001:2015-certified process, form 3b segregation', 'Components of your choice: Siemens, ABB, Schneider, Eaton, Allen-Bradley or Hyundai'],
    },
    image: img('/media/projects/alicorp-1.jpg', 'Línea de Centros de Control de Motores fabricada por ISOTEK para Alicorp', 'Motor Control Centre line-up built by ISOTEK for Alicorp'),
  },
  {
    slug: 'instrumentacion', code: 'FDR-04',
    title: t('Instrumentación y calibración', 'Instrumentation and calibration'),
    summary: t(
      'El único laboratorio en Bolivia certificado por Endress+Hauser Suiza. Con banco de patrones suizos y trazabilidad directa hasta fábrica, emitimos certificados de calibración con estándar europeo, sin salir del país.',
      'The only laboratory in Bolivia certified by Endress+Hauser Switzerland. With Swiss reference standards and traceability straight to the factory, we issue European-standard calibration certificates without leaving the country.',
    ),
    scope: {
      es: ['Diagnóstico y reparación de instrumentos de medición Endress+Hauser', 'Calibración de caudalímetros E+H y otras marcas', 'Calibración de sensores de temperatura', 'Calibración de sensores de presión', 'Proyectos de instrumentación: instalación mecánica y puesta en marcha'],
      en: ['Diagnosis and repair of Endress+Hauser measuring instruments', 'Calibration of E+H and other flowmeters', 'Temperature sensor calibration', 'Pressure sensor calibration', 'Instrumentation projects: mechanical installation and start-up'],
    },
    image: img('/media/projects/cremer-1.jpg', 'Ingeniero de ISOTEK trabajando en instrumentación de proceso en planta', 'ISOTEK engineer working on process instrumentation at a plant'),
  },
  {
    slug: 'control-automatico', code: 'FDR-05',
    title: t('Sistemas de control automático', 'Automatic control systems'),
    summary: t(
      'Ingeniería y equipamiento para integración y programación de sistemas de control, con especialistas certificados en las principales marcas del mercado.',
      'Engineering and equipment for control system integration and programming, with specialists certified in the leading brands.',
    ),
    scope: {
      es: ['Programación y arquitecturas de control Allen-Bradley (Rockwell Automation)', 'Programación y arquitecturas de control Siemens', 'Parametrización y puesta en marcha de plantas'],
      en: ['Allen-Bradley (Rockwell Automation) control programming and architectures', 'Siemens control programming and architectures', 'Plant parametrisation and start-up'],
    },
    image: img('/media/projects/alcogreen-1.jpg', 'Puesta en marcha de planta de etanol en Paraguay', 'Ethanol plant start-up in Paraguay'),
  },
  {
    slug: 'soluciones-especificas', code: 'FDR-06',
    title: t('Soluciones industriales a medida', 'Custom industrial solutions'),
    summary: t(
      'Desarrollamos soluciones industriales a medida, con ingeniería propia adaptada a las necesidades específicas de cada proceso.',
      'We develop custom industrial solutions, with our own engineering tailored to the specific needs of each process.',
    ),
    scope: {
      es: ['Solución CIP para la industria de Alimentos & Bebidas', 'Skids completos para Petróleo & Gas', 'Sistemas de medición para Petróleo & Gas y Etanol', 'Control de inventarios para tanques de almacenamiento', 'Subestaciones eléctricas completas', 'Diseño, procura e instalación de transformadores de media tensión', 'Tableros generales de baja tensión (TGBT)', 'Bancos de capacitores', 'Tendidos de cable en plantas industriales', 'Diseño, procura e instalación de válvulas, motores y bombas'],
      en: ['CIP systems for Food & Beverage', 'Complete skids for Oil & Gas', 'Metering systems for Oil & Gas and Ethanol', 'Inventory control for storage tanks', 'Complete electrical substations', 'Design, procurement and installation of MV transformers', 'Main LV distribution boards (MLVDB)', 'Capacitor banks', 'Cable laying in industrial plants', 'Design, procurement and installation of valves, motors and pumps'],
    },
    image: img('/media/projects/ypfb-1.jpg', 'Centro de Control de Motores para la planta de biodiésel de YPFB en Senkata', 'Motor Control Centre for the YPFB biodiesel plant in Senkata'),
  },
  {
    slug: 'operacion-mantenimiento', code: 'FDR-07',
    title: t('Operación y mantenimiento de plantas', 'Plant operation and maintenance'),
    summary: t(
      'Programas de O&M ejecutados por ingenieros certificados, para que su planta opere sin sorpresas. Mantenemos contratos activos de mantenimiento eléctrico en plantas de YPFB Andina y YPFB Chaco en Bolivia.',
      'O&M programmes delivered by certified engineers so your plant runs without surprises. We hold active electrical maintenance contracts at YPFB Andina and YPFB Chaco plants in Bolivia.',
    ),
    scope: {
      es: ['Mantenimiento eléctrico de plantas en operación', 'Montaje y puesta en marcha de plantas de etanol en Paraguay', 'Soporte técnico y transferencia de conocimiento al equipo del cliente'],
      en: ['Electrical maintenance of operating plants', 'Installation and start-up of ethanol plants in Paraguay', 'Technical support and knowledge transfer to the client’s team'],
    },
    image: img('/media/company/site-work.jpg', 'Técnicos de ISOTEK realizando mantenimiento en planta', 'ISOTEK technicians carrying out maintenance at a plant'),
  },
  {
    slug: 'metalmecanica', code: 'FDR-08',
    title: t('Montajes industriales metalmecánicos', 'Industrial metalwork and installation'),
    summary: t(
      'Fabricación y montaje de estructuras y equipos metalmecánicos, con equipo propio de soldadores e instaladores certificados.',
      'Fabrication and installation of metal structures and equipment, with our own team of certified welders and installers.',
    ),
    scope: {
      es: ['Dos líneas de producción metalmecánica con tecnología CNC', 'Tableros metálicos, bandejas portacables y piezas especiales marca PROTOS', 'Montaje mecánico, eléctrico y complementario en obra'],
      en: ['Two CNC metal-fabrication production lines', 'PROTOS metal enclosures, cable trays and special parts', 'Mechanical, electrical and ancillary installation on site'],
    },
    image: img('/media/projects/cbn-busbar-2.jpg', 'Montaje de ducto barras en planta industrial', 'Busbar trunking installation in an industrial plant'),
  },
];

export const industries: Industry[] = [
  { slug: 'petroleo-gas', name: t('Petróleo & Gas', 'Oil & Gas') },
  { slug: 'alimentos-bebidas', name: t('Alimentos & Bebidas', 'Food & Beverage') },
  { slug: 'mineria', name: t('Minería', 'Mining') },
  { slug: 'aguas', name: t('Aguas y aguas residuales', 'Water & Wastewater') },
  { slug: 'energia', name: t('Energía', 'Energy') },
  { slug: 'construccion', name: t('Construcción', 'Construction') },
  { slug: 'litio', name: t('Litio', 'Lithium') },
  { slug: 'etanol', name: t('Etanol', 'Ethanol') },
  { slug: 'cemento', name: t('Cemento', 'Cement') },
  { slug: 'agroindustria', name: t('Agroindustria', 'Agribusiness') },
];

const P = '/media/projects/';
export const projects: Project[] = [
  {
    slug: 'centro-de-control-de-motores-inteligente', client: 'Alicorp', country: 'BO', place: t('Bolivia', 'Bolivia'),
    industry: 'alimentos-bebidas', services: ['ccm'], featured: true,
    title: t('Centro de Control de Motores inteligente', 'Intelligent Motor Control Centre'),
    scope: t('Centro de Control de Motores (CCM) inteligente.', 'Intelligent Motor Control Centre (MCC).'),
    images: [img(P + 'alicorp-1.jpg', 'Línea de CCM inteligente para Alicorp', 'Intelligent MCC line-up for Alicorp'), img(P + 'alicorp-2.jpg', 'CCM de Alicorp con puertas abiertas mostrando los arrancadores', 'Alicorp MCC with doors open showing the starters')],
  },
  {
    slug: 'proyectos-de-tableros-electricos-y-ducto', client: 'CBN (AmBev)', country: 'BO', place: t('Santa Cruz, Bolivia', 'Santa Cruz, Bolivia'),
    industry: 'alimentos-bebidas', services: ['electricas-bt-mt', 'metalmecanica'], featured: true,
    title: t('Tableros eléctricos y ducto barras', 'Switchboards and busbar trunking'),
    scope: t('Proyectos de tableros eléctricos y ducto barras. Fabricados e instalados por ISOTEK.', 'Switchboard and busbar trunking projects. Manufactured and installed by ISOTEK.'),
    images: [img(P + 'cbn-busbar-1.jpg', 'Ducto barras instalado en la planta de CBN', 'Busbar trunking installed at the CBN plant'), img(P + 'cbn-busbar-2.jpg', 'Tableros eléctricos y ducto barras en CBN', 'Switchboards and busbar trunking at CBN')],
  },
  {
    slug: 'alcoenergy-montaje-mecanico-electrico', client: 'Alcoenergy Paraguay', country: 'PY', place: t('Coronel Oviedo, Caaguazú, Paraguay', 'Coronel Oviedo, Caaguazú, Paraguay'),
    industry: 'etanol', services: ['epc', 'metalmecanica', 'electricas-bt-mt'], featured: true,
    title: t('Montaje mecánico, eléctrico y complementarios — planta de etanol', 'Mechanical, electrical and ancillary installation — ethanol plant'),
    about: t('Planta de etanol 100% a base de maíz, con una inversión que supera los USD 50 millones. Además del etanol para el mercado nacional, produce aceite de maíz para biodiésel y burlanda para alimentación animal.', 'A 100% corn-based ethanol plant, an investment of more than USD 50 million. Besides ethanol for the domestic market, it produces corn oil for biodiesel and distillers’ grains for animal feed.'),
    scope: t('Montaje mecánico, eléctrico y complementarios. Planta de etanol de 100 m³/día.', 'Mechanical, electrical and ancillary installation. 100 m³/day ethanol plant.'),
    images: [img(P + 'alcoenergy-1.jpg', 'Vista aérea de la planta de etanol de Alcoenergy', 'Aerial view of the Alcoenergy ethanol plant')],
  },
  {
    slug: 'motores-electricos-controlados-por-nuestros-ccm', client: 'EMAPA / Grupo Véneta', country: 'BO', place: t('Centro de acopio Caracollo, Oruro, Bolivia', 'Caracollo collection centre, Oruro, Bolivia'),
    industry: 'agroindustria', services: ['ccm'], featured: true,
    title: t('110 motores controlados por CCM de fabricación propia', '110 motors controlled by in-house MCCs'),
    scope: t('110 motores eléctricos controlados por nuestros CCM.', '110 electric motors controlled by our MCCs.'),
    images: [img(P + 'emapa-1.jpg', 'CCM fabricados por ISOTEK para EMAPA en Caracollo', 'MCCs built by ISOTEK for EMAPA in Caracollo'), img(P + 'emapa-2.jpg', 'Detalle de los CCM de EMAPA con puertas abiertas', 'Detail of the EMAPA MCCs with doors open')],
  },
  {
    slug: 'ypfb-senkata-ccm-planta-biodiesel', client: 'YPFB Refinación', country: 'BO', place: t('Senkata, El Alto, La Paz, Bolivia', 'Senkata, El Alto, La Paz, Bolivia'),
    industry: 'petroleo-gas', services: ['ccm'], featured: true,
    title: t('Fabricación y suministro de CCM — planta de biodiésel', 'MCC manufacture and supply — biodiesel plant'),
    about: t('Planta de biodiésel dentro del complejo de refinación de Senkata, uno de los centros industriales de procesamiento de hidrocarburos más importantes de Bolivia.', 'A biodiesel plant inside the Senkata refining complex, one of Bolivia’s most important hydrocarbon processing sites.'),
    scope: t('Fabricación y suministro de Centro de Control de Motores (CCM).', 'Manufacture and supply of a Motor Control Centre (MCC).'),
    images: [img(P + 'ypfb-1.jpg', 'CCM para la planta de biodiésel de YPFB en Senkata', 'MCC for the YPFB biodiesel plant in Senkata')],
  },
  {
    slug: 'cargill-tablero-distribucion-banco-capacitores', client: 'Cargill Bolivia S.A.', country: 'BO', place: t('Tres Cruces, Santa Cruz, Bolivia', 'Tres Cruces, Santa Cruz, Bolivia'),
    industry: 'agroindustria', services: ['electricas-bt-mt'], featured: true,
    title: t('Tablero de distribución y banco de capacitores — centro de acopio', 'Distribution board and capacitor bank — grain collection centre'),
    about: t('Cargill opera en Bolivia desde 1987 como empresa comercial, exportadora e importadora de alimentos, con su principal actividad en el acopio y comercialización de granos, especialmente soya, que compra a productores locales.', 'Cargill has operated in Bolivia since 1987 as a food trading, export and import company, mainly collecting and marketing grain — especially soy — bought from local growers.'),
    scope: t('Tablero de distribución y banco de capacitores para centro de acopio remoto.', 'Distribution board and capacitor bank for a remote collection centre.'),
    images: [img(P + 'cargill-1.jpg', 'Tablero de distribución y banco de capacitores para Cargill', 'Distribution board and capacitor bank for Cargill')],
  },
  {
    slug: 'san-matias-finning-tableros-control-energia', client: 'Finning Caterpillar', country: 'BO', place: t('San Matías, Santa Cruz, Bolivia', 'San Matías, Santa Cruz, Bolivia'),
    industry: 'energia', services: ['electricas-bt-mt'],
    title: t('Tableros de control de energía para turbogeneradores', 'Power control boards for turbo-generators'),
    about: t('Planta generadora de energía que abastece la operación de un cliente agroindustrial en la zona de San Matías, en la frontera con Brasil. Cliente directo: Finning Caterpillar, proveedor de los equipos de generación.', 'A power plant supplying an agro-industrial client’s operation near San Matías, on the border with Brazil. Direct client: Finning Caterpillar, supplier of the generating equipment.'),
    scope: t('Tableros de control de energía para turbogeneradores.', 'Power control boards for turbo-generators.'),
    images: [img(P + 'finning-1.jpg', 'Tableros de control de energía para turbogeneradores en San Matías', 'Power control boards for turbo-generators in San Matías')],
  },
  {
    slug: 'bovinsa-ccm-con-respaldo', client: 'Bovinsa', country: 'BO', place: t('Puerto Pailas, Santa Cruz, Bolivia', 'Puerto Pailas, Santa Cruz, Bolivia'),
    industry: 'alimentos-bebidas', services: ['ccm'],
    title: t('CCM con respaldo — centro de procesamiento de carne', 'MCC with backup — meat-processing plant'),
    about: t('Frigorífico de última tecnología, uno de los más modernos del país, con capacidad de faenado de 360 reses diarias en su primera etapa y meta de llegar a 1.000.', 'A state-of-the-art abattoir, one of the most modern in the country, processing 360 head of cattle a day in its first stage, with a target of 1,000.'),
    scope: t('CCM con respaldo para el centro de procesamiento de carne.', 'MCC with backup for the meat-processing plant.'),
    images: [img(P + 'bovinsa-1.jpg', 'CCM con respaldo para Bovinsa', 'MCC with backup for Bovinsa')],
  },
  {
    slug: 'alcogreen-parametrizacion-planta-etanol', client: 'Alcogreen', country: 'PY', place: t('Paraguay', 'Paraguay'),
    industry: 'etanol', services: ['control-automatico', 'instrumentacion'],
    title: t('Parametrización y puesta en marcha — planta de etanol', 'Parametrisation and start-up — ethanol plant'),
    about: t('Alcogreen opera una planta de producción de etanol, biocombustible que Paraguay mezcla en proporciones crecientes con la nafta como parte de su estrategia de soberanía energética.', 'Alcogreen runs an ethanol production plant; Paraguay blends ethanol into gasoline in growing proportions as part of its energy-sovereignty strategy.'),
    scope: t('Servicio de parametrización y puesta en marcha de la planta de producción de etanol.', 'Parametrisation and start-up of the ethanol production plant.'),
    images: [img(P + 'alcogreen-1.jpg', 'Ingeniero de ISOTEK en la planta de etanol de Alcogreen', 'ISOTEK engineer at the Alcogreen ethanol plant')],
  },
  {
    slug: 'cremer-oleo-mejora-de-procesos', client: 'Cremer Oleo Paraguay S.A.', country: 'PY', place: t('Villeta, Paraguay', 'Villeta, Paraguay'),
    industry: 'energia', services: ['instrumentacion'],
    title: t('Mejora de procesos y registro de fallos', 'Process improvement and fault logging'),
    about: t('Planta de biodiésel inaugurada en 2023 que produce combustible a partir de aceite de soja regional, con glicerina cruda como subproducto. Con certificaciones EPA e ISCC, exporta a mercados de Estados Unidos y Europa.', 'A biodiesel plant opened in 2023 that makes fuel from regional soybean oil, with crude glycerine as a by-product. EPA and ISCC certified, it exports to the US and Europe.'),
    scope: t('Servicio de mejora de procesos e instrumentación, con levantamiento y registro de fallos en campo.', 'Process and instrumentation improvement, with on-site fault survey and logging.'),
    images: [img(P + 'cremer-1.jpg', 'Trabajo de instrumentación en la planta de Cremer Oleo', 'Instrumentation work at the Cremer Oleo plant')],
  },
  {
    slug: 'cervepar-mejora-configuracion-procesos', client: 'Cervepar (AB InBev)', country: 'PY', place: t('Asunción, Paraguay', 'Asunción, Paraguay'),
    industry: 'alimentos-bebidas', services: ['instrumentacion'],
    title: t('Mejora y configuración de procesos de instrumentación', 'Instrumentation process improvement and configuration'),
    about: t('Cervepar es la cervecería líder del país, con más de 110 años de trayectoria y responsable de marcas como Pilsen. Forma parte del portafolio regional de AB InBev.', 'Cervepar is Paraguay’s leading brewery, with more than 110 years of history and brands such as Pilsen. It is part of AB InBev’s regional portfolio.'),
    scope: t('Servicio de mejora y configuración de procesos de instrumentación.', 'Improvement and configuration of instrumentation processes.'),
    images: [img(P + 'cervepar-1.jpg', 'Ingenieros de ISOTEK trabajando en instrumentación en Cervepar', 'ISOTEK engineers working on instrumentation at Cervepar')],
  },
  {
    slug: 'proyectos-electricos-de-media-tension', client: 'CBN (AmBev)', country: 'BO', place: t('Santa Cruz, Bolivia', 'Santa Cruz, Bolivia'),
    industry: 'alimentos-bebidas', services: ['electricas-bt-mt'],
    title: t('Proyectos eléctricos de media tensión', 'Medium-voltage electrical projects'),
    scope: t('Proyectos eléctricos de media tensión. Fabricados e instalados por ISOTEK.', 'Medium-voltage electrical projects. Manufactured and installed by ISOTEK.'),
    images: [img(P + 'cbn-mt-1.jpg', 'Proyecto de media tensión en la planta de CBN', 'Medium-voltage project at the CBN plant'), img(P + 'cbn-mt-2.jpg', 'Instalación de media tensión en CBN', 'Medium-voltage installation at CBN')],
  },
  {
    slug: 'tablero-distribucion-en-planta-de-cemento', client: 'Soboce S.A.', country: 'BO', place: t('Bolivia', 'Bolivia'),
    industry: 'cemento', services: ['electricas-bt-mt'],
    title: t('Tablero de distribución para planta de cemento', 'Distribution board for a cement plant'),
    scope: t('Ampliación Illimani LP12. Tablero de distribución para planta de cemento.', 'Illimani LP12 expansion. Distribution board for a cement plant.'),
    images: [img(P + 'soboce-1.jpg', 'Tablero de distribución para la ampliación Illimani de Soboce', 'Distribution board for the Soboce Illimani expansion'), img(P + 'soboce-2.jpg', 'Tableros de Soboce en fábrica', 'Soboce boards at the factory'), img(P + 'soboce-3.jpg', 'Detalle del tablero de Soboce', 'Detail of the Soboce board')],
  },
  {
    slug: 'tablero-de-distribucion-de-4-000-ampy-banco-de-capacitores', client: 'Gladymar S.A.', country: 'BO', place: t('Parque Industrial, Santa Cruz, Bolivia', 'Industrial Park, Santa Cruz, Bolivia'),
    industry: '', services: ['electricas-bt-mt'],
    title: t('Tablero de distribución de 4.000 A y banco de capacitores', '4,000 A distribution board and capacitor bank'),
    scope: t('Tablero de distribución de 4.000 A y banco de capacitores.', '4,000 A distribution board and capacitor bank.'),
    images: [img(P + 'gladymar-1.jpg', 'Tablero de distribución de 4.000 A para Gladymar', '4,000 A distribution board for Gladymar'), img(P + 'gladymar-2.jpg', 'Banco de capacitores para Gladymar', 'Capacitor bank for Gladymar')],
  },
  {
    slug: 'tablero-de-distribucion-ac-dc', client: 'CRE', country: 'BO', place: t('Bolivia', 'Bolivia'),
    industry: 'energia', services: ['electricas-bt-mt'],
    title: t('Tablero de distribución AC/DC', 'AC/DC distribution board'),
    scope: t('Tablero de distribución AC/DC.', 'AC/DC distribution board.'),
    images: [img(P + 'cre-1.jpg', 'Tablero de distribución AC/DC para CRE', 'AC/DC distribution board for CRE'), img(P + 'cre-2.jpg', 'Interior del tablero AC/DC de CRE', 'Inside the CRE AC/DC board')],
  },
  {
    slug: 'proyecto-de-iluminacion-en-deposito', client: 'Sofía', country: 'BO', place: t('Bolivia', 'Bolivia'),
    industry: 'alimentos-bebidas', services: ['electricas-bt-mt'],
    title: t('Iluminación de depósitos de almacenaje', 'Warehouse lighting'),
    scope: t('Iluminación de depósitos de almacenaje.', 'Lighting for storage warehouses.'),
    images: [img(P + 'sofia-1.jpg', 'Depósito de almacenaje iluminado por ISOTEK para Sofía', 'Storage warehouse lit by ISOTEK for Sofía'), img(P + 'sofia-2.jpg', 'Iluminación de nave de almacenaje de Sofía', 'Lighting in a Sofía storage hall')],
  },
];

const PR = '/media/products/';
export const products: Product[] = [
  {
    slug: 'tableros-autoportantes', line: 'PROTOS',
    title: t('Tableros autoportantes', 'Floor-standing enclosures'),
    summary: t('Tableros autoportantes PROTOS normados IEC 62208, con placa de montaje en acero galvanizado de 2 mm y grado de protección IP64.', 'PROTOS floor-standing enclosures to IEC 62208, with a 2 mm galvanised steel mounting plate and IP64 protection.'),
    features: {
      es: ['Placa de montaje en acero galvanizado de 2 mm de espesor', 'Placas laterales y trasera completamente desmontables', 'Sellos de poliuretano expandido para grado de protección IP64 (estanqueidad al polvo y protección contra salpicaduras)', 'Opción 1: kit fijo con puerta, laterales y trasero desmontables · Opción 2: kit 100% desmontable (según stock)'],
      en: ['2 mm galvanised steel mounting plate', 'Fully removable side and rear panels', 'Expanded polyurethane seals for IP64 protection (dust-tight, splash-proof)', 'Option 1: fixed kit with removable door, sides and rear · Option 2: 100% removable kit (subject to stock)'],
    },
    specs: [
      { model: 'ISO-AUTO-2-8-8', description: t('Autoportante 2000 × 800 × 800 mm + zócalo de 100 mm', 'Floor-standing 2000 × 800 × 800 mm + 100 mm plinth') },
      { model: 'ISO-AUTO-2-8-6', description: t('Autoportante 2000 × 800 × 600 mm + zócalo de 100 mm', 'Floor-standing 2000 × 800 × 600 mm + 100 mm plinth') },
    ],
    standards: ['IEC 62208'],
    images: gallery(PR + 'tableros-autoportantes-', 'Tablero autoportante PROTOS', 'PROTOS floor-standing enclosure'),
    model3d: 'https://sketchfab.com/models/5e33994d14b34619affc08e3b0714db9',
  },
  {
    slug: 'tableros-con-segmentacion', line: 'PROTOS',
    title: t('Tableros con segmentación', 'Segregated switchboards'),
    summary: t('Fabricamos tableros normados IEC 61439 para potencia, distribución, obras y redes públicas.', 'We build switchboards to IEC 61439 for power, distribution, construction sites and public networks.'),
    standards: ['IEC 61439-1', 'IEC 61439-2', 'IEC 61439-3', 'IEC 61439-4', 'IEC 61439-5'],
    specs: [
      { model: 'IEC 61439-2', description: t('Tableros / conjuntos de potencia', 'Power switchgear assemblies') },
      { model: 'IEC 61439-3', description: t('Tableros / conjuntos de distribución', 'Distribution boards') },
      { model: 'IEC 61439-4', description: t('Tableros / conjuntos de obras', 'Construction site assemblies') },
      { model: 'IEC 61439-5', description: t('Tableros / conjuntos para redes públicas', 'Assemblies for public networks') },
    ],
    images: gallery(PR + 'tableros-con-segmentacion-', 'Tablero con segmentación ISOTEK', 'ISOTEK segregated switchboard'),
    model3d: 'https://sketchfab.com/models/5e33994d14b34619affc08e3b0714db9',
  },
  {
    slug: 'tableros-de-sobreponer', line: 'PROTOS',
    title: t('Tableros de sobreponer', 'Wall-mounted enclosures'),
    summary: t('Gabinetes metálicos de sobreponer tipo NEMA, inoxidable e IEC, con grado de protección IP65.', 'Wall-mounted metal enclosures in NEMA, stainless and IEC types, rated IP65.'),
    features: { es: ['Tipo NEMA', 'Tipo inoxidable', 'Tipo IEC'], en: ['NEMA type', 'Stainless type', 'IEC type'] },
    specs: [
      { model: '1200 × 800 × 300', description: t('Gabinete metálico · IP65 · IEC', 'Metal enclosure · IP65 · IEC') },
      { model: '1000 × 600 × 250', description: t('Gabinete metálico · IP65 · IEC', 'Metal enclosure · IP65 · IEC') },
      { model: '800 × 600 × 300', description: t('Gabinete metálico · IP65 · IEC', 'Metal enclosure · IP65 · IEC') },
      { model: '600 × 600 × 250', description: t('Gabinete metálico · IP65 · IEC', 'Metal enclosure · IP65 · IEC') },
      { model: '500 × 400 × 210', description: t('Gabinete metálico · IP65 · IEC', 'Metal enclosure · IP65 · IEC') },
    ],
    images: gallery(PR + 'tableros-de-sobreponer-', 'Tablero de sobreponer', 'Wall-mounted enclosure'),
  },
  {
    slug: 'ducto-barras', line: 'ISOTEK',
    title: t('Ductobarra / blindobarra', 'Busbar trunking'),
    summary: t('Diseño, montaje y puesta en marcha de sistemas de ductobarras en función del diseño y las cargas, con soporte para barras de hasta 6.500 A.', 'Design, installation and start-up of busbar trunking systems sized to the design and loads, supporting bars up to 6,500 A.'),
    features: {
      es: ['Diseño, montaje y puesta en marcha de sistemas de ductobarras en función del diseño y las cargas', 'Servicio de cortado y doblado de barras con herramientas de última generación', 'Soporte para barras de hasta 6.500 A', 'Fabricación y montaje de soportes y aisladores para barras', 'Estructura de soporte y protección con escotillas de mantenimiento y tapas de inspección'],
      en: ['Design, installation and start-up of busbar trunking sized to the design and loads', 'Bar cutting and bending with state-of-the-art tooling', 'Support for bars up to 6,500 A', 'Fabrication and installation of bar supports and insulators', 'Support and protection structure with maintenance hatches and inspection covers'],
    },
    images: gallery(PR + 'ducto-barras-', 'Ducto barras ISOTEK', 'ISOTEK busbar trunking'),
  },
  {
    slug: 'porta-barras', line: 'PROTOS',
    title: t('Porta barras', 'Busbar supports'),
    summary: t('Portabarras trifásicos de hasta 6.500 A, en versiones de una vía, con neutro y de doble piso.', 'Three-phase busbar supports up to 6,500 A, in single-run, with-neutral and double-tier versions.'),
    specs: [
      { model: 'ISO6500-3F', description: t('Portabarras trifásico de hasta 6.500 A, hasta 3 fases', 'Three-phase support up to 6,500 A, up to 3 phases') },
      { model: 'ISO3500-3F-1V', description: t('Portabarras trifásico de hasta 3.500 A, 3 fases, barra 3″ × 3/8″, 1 vía', 'Three-phase support up to 3,500 A, 3 phases, 3″ × 3/8″ bar, single run') },
      { model: 'ISO6500-3F-1N', description: t('Portabarras trifásico de hasta 6.500 A, 3 fases + neutro', 'Three-phase support up to 6,500 A, 3 phases + neutral') },
      { model: 'ISO6500-2P-3F-1N', description: t('Portabarras trifásico de doble piso hasta 6.500 A, 3 fases + neutro', 'Double-tier three-phase support up to 6,500 A, 3 phases + neutral') },
    ],
    images: gallery(PR + 'porta-barras-', 'Porta barras', 'Busbar support'),
  },
  {
    slug: 'barras-de-cobre', line: 'PROTOS',
    title: t('Barras de cobre', 'Copper busbars'),
    summary: t('Barras de cobre ISOCOBRE de borde redondo, en secciones de 3/8″ a 30 × 10 mm.', 'ISOCOBRE round-edge copper busbars, from 3/8″ sections to 30 × 10 mm.'),
    specs: [
      { model: 'ISOCOBRE-3/8-2', description: t('Barra Cu 3/8″ × 2″ (10 × 50) 500 mm² — borde redondo', 'Cu bar 3/8″ × 2″ (10 × 50) 500 mm² — round edge') },
      { model: 'ISOCOBRE-3/8-3', description: t('Barra Cu 3/8″ × 3″ (10 × 75) 750 mm² — borde redondo', 'Cu bar 3/8″ × 3″ (10 × 75) 750 mm² — round edge') },
      { model: 'ISOCOBRE-3/8-4', description: t('Barra Cu 3/8″ × 4″ (10 × 100) 1000 mm² — borde redondo', 'Cu bar 3/8″ × 4″ (10 × 100) 1000 mm² — round edge') },
      { model: 'ISOCOBRE-3/4-3/16', description: t('Barra Cu 3/4″ × 3/16″, 249 A — borde redondo', 'Cu bar 3/4″ × 3/16″, 249 A — round edge') },
      { model: 'ISOCOBRE-3/8-1-1/2', description: t('Barra Cu 3/8″ × 1 1/2″, 650 A — borde redondo', 'Cu bar 3/8″ × 1 1/2″, 650 A — round edge') },
      { model: 'ISOCOBRE-30-10', description: t('Barra Cu 30 × 10 mm, 630 A — borde redondo', 'Cu bar 30 × 10 mm, 630 A — round edge') },
    ],
    images: gallery(PR + 'barras-de-cobre-', 'Barras de cobre', 'Copper busbars'),
  },
  {
    slug: 'aisladores-electricos', line: 'PROTOS',
    title: t('Aisladores eléctricos', 'Electrical insulators'),
    summary: t('Aisladores eléctricos para soporte de barras en tableros y ductobarras.', 'Electrical insulators for supporting bars in switchboards and busbar trunking.'),
    images: gallery(PR + 'aisladores-electricos-', 'Aisladores eléctricos', 'Electrical insulators'),
  },
  {
    slug: 'bandejas-porta-cables', line: 'PROTOS',
    title: t('Bandejas portacables', 'Cable trays'),
    summary: t('Bandejas para instalaciones eléctricas fabricadas en chapa de acero galvanizado estructural: cerradas IP65, perforadas cerradas y tipo escalerilla según IEC 61537.', 'Cable trays in structural galvanised steel sheet: closed IP65, perforated closed, and ladder type to IEC 61537.'),
    specs: [
      { model: 'ITK-BPC-CDA-ESPEC 3000×300×100', description: t('Bandeja portacable cerrada IP65', 'Closed cable tray IP65') },
      { model: 'ITK-BPC-CDA-CURV-VERT-INT 300×100', description: t('Curva vertical 90° interna, cerrada IP65', '90° internal vertical bend, closed IP65') },
      { model: 'ITK-BPC-CDA-CURV-VERT-EXT 300×100', description: t('Curva vertical 90° externa, cerrada IP65', '90° external vertical bend, closed IP65') },
      { model: 'ITK-BPC-CDA-CURV-HOR 300×100', description: t('Curva horizontal 90°, cerrada IP65', '90° horizontal bend, closed IP65') },
      { model: 'ITK-BPC-PERF-CDA-ESPEC 3000×300×100', description: t('Bandeja portacable perforada cerrada', 'Perforated closed cable tray') },
      { model: 'ITK-BPC-PERF-CDA-CURV-VERT-INT 300×100', description: t('Curva vertical 90° interna, perforada cerrada', '90° internal vertical bend, perforated closed') },
      { model: 'ITK-BPC-PERF-CDA-CURV-VERT-EXT 300×100', description: t('Curva vertical 90° externa, perforada cerrada', '90° external vertical bend, perforated closed') },
      { model: 'ITK-BPC-PERF-CDA-CURV-HOR 300×100', description: t('Curva horizontal 90°, perforada cerrada', '90° horizontal bend, perforated closed') },
      { model: 'Escalerilla', description: t('Secciones recta, curva, curva no ortogonal, curva vertical, tee y cruz — IEC 61537', 'Straight, bend, non-orthogonal bend, vertical bend, tee and cross sections — IEC 61537') },
    ],
    standards: ['IEC 61537'],
    images: gallery(PR + 'bandejas-porta-cables-', 'Bandeja portacables PROTOS', 'PROTOS cable tray'),
  },
  {
    slug: 'discos-de-aterramiento', line: 'ISOTEK',
    title: t('Discos de aterramiento', 'Earthing discs'),
    summary: t('Discos de aterramiento con guía de instalación, certificado y ficha técnica disponibles a solicitud.', 'Earthing discs, with installation guide, certificate and data sheet available on request.'),
    images: gallery(PR + 'discos-de-aterramiento-', 'Disco de aterramiento', 'Earthing disc'),
  },
  {
    slug: 'maquinas-aireadoras-de-aguas-servidas', line: 'PROTOS',
    title: t('Máquinas aireadoras de aguas servidas', 'Solar wastewater aerators'),
    summary: t('Aireadoras para lagunas de tratamiento, alimentadas al 100% por paneles solares, de 1 a 4 motores de 2,68 HP.', 'Aerators for treatment lagoons, 100% solar-powered, with 1 to 4 motors of 2.68 HP.'),
    specs: [
      { model: 'ISO-OXI-P1', description: t('1 motor de 2,68 HP al centro de la máquina · 6 paneles solares (100% del motor) a orillas de la laguna', '1 × 2.68 HP motor at the centre · 6 solar panels (100% of motor load) on the lagoon bank') },
      { model: 'ISO-OXI-P1-AUTO', description: t('1 motor de 2,68 HP · 6 paneles solares sobre la misma máquina · 100% autónoma, para cualquier laguna', '1 × 2.68 HP motor · 6 solar panels on the machine itself · fully autonomous, for any lagoon') },
      { model: 'ISO-OXI-P2', description: t('2 motores de 2,68 HP en la pasarela · emisión bidireccional de oxígeno · 12 paneles solares', '2 × 2.68 HP motors on the walkway · bi-directional oxygen emission · 12 solar panels') },
      { model: 'ISO-OXI-P4-MULTI', description: t('4 motores de 2,68 HP en las 4 esquinas · dispersión de oxígeno en 360° · 24 paneles solares', '4 × 2.68 HP motors at the 4 corners · 360° oxygen dispersion · 24 solar panels') },
      { model: 'ISO-OXI-P4-UNI', description: t('4 motores de 2,68 HP en la pasarela · emisión bidireccional · 24 paneles solares', '4 × 2.68 HP motors on the walkway · bi-directional emission · 24 solar panels') },
    ],
    images: gallery(PR + 'maquinas-aireadoras-de-aguas-servidas-', 'Máquina aireadora solar', 'Solar aerator'),
  },
];

export const brands: Brand[] = [
  { name: 'Endress+Hauser', category: t('Instrumentación de medición · representante exclusivo', 'Measurement instrumentation · exclusive representative'), url: 'https://www.endress.com' },
  { name: 'Rockwell Automation / CUBIC', category: t('Tableros modulares · partner oficial exclusivo CUBIC', 'Modular switchboards · exclusive official CUBIC partner'), url: 'https://www.rockwellautomation.com' },
  { name: 'Siemens', category: t('Ingeniería y equipos eléctricos · partner', 'Electrical engineering and equipment · partner'), url: 'https://www.siemens.com' },
  { name: 'Allen-Bradley', category: t('Control y automatización', 'Control and automation'), url: 'https://www.rockwellautomation.com/allen-bradley' },
  { name: 'ABB', category: t('Ingeniería y equipos eléctricos', 'Electrical engineering and equipment'), url: 'https://www.abb.com' },
  { name: 'Schneider Electric', category: t('Soluciones eléctricas y paneles', 'Electrical solutions and panels'), url: 'https://www.se.com' },
  { name: 'WAGO', category: t('Soluciones eléctricas y paneles modulares', 'Electrical solutions and modular panels'), url: 'https://www.wago.com' },
  { name: 'SICK', category: t('Sensores inteligentes', 'Intelligent sensors'), url: 'https://www.sick.com' },
  { name: 'Bühler', category: t('Soluciones industriales', 'Industrial solutions'), url: 'https://www.buhlergroup.com' },
  { name: 'TFV', category: t('Válvulas de proceso', 'Process valves') },
  { name: 'Alstom', category: t('Subestaciones / media tensión', 'Substations / medium voltage') },
  { name: 'Hitachi Energy', category: t('Transformadores / subestaciones', 'Transformers / substations'), url: 'https://www.hitachienergy.com' },
  { name: 'Hyundai', category: t('Subestaciones / media tensión', 'Substations / medium voltage') },
  { name: 'Eaton', category: t('Soluciones eléctricas', 'Electrical solutions'), url: 'https://www.eaton.com' },
  { name: 'Danfoss', category: t('Variadores de frecuencia', 'Variable-frequency drives'), url: 'https://www.danfoss.com' },
  { name: 'Grundfos', category: t('Bombas', 'Pumps'), url: 'https://www.grundfos.com' },
  { name: 'Circutor', category: t('Filtros eléctricos / bancos de capacitores', 'Electrical filters / capacitor banks'), url: 'https://circutor.com' },
  { name: 'Samson', category: t('Válvulas de control industrial', 'Industrial control valves'), url: 'https://www.samsongroup.com' },
  { name: 'Lacroix Sofrel', category: t('Telemetría', 'Telemetry') },
  { name: 'Brady', category: t('Sistemas de etiquetado e impresión', 'Labelling and printing systems'), url: 'https://www.brady.com' },
  { name: 'WEG', category: t('Motores y equipos eléctricos', 'Motors and electrical equipment'), url: 'https://www.weg.net' },
  { name: 'General Electric', category: t('Equipos eléctricos', 'Electrical equipment') },
  { name: 'Arruti', category: t('Media tensión', 'Medium voltage') },
  { name: 'Ametek', category: t('Instrumentación', 'Instrumentation') },
  { name: 'Acuity Brands / Holophane', category: t('Iluminación industrial', 'Industrial lighting') },
];

export const team: TeamMember[] = [
  { name: 'Juan Manuel Espejo', role: t('Gerente General', 'General Manager'), region: 'LATAM', email: 'juan.espejo@isoteklatam.com' },
  { name: 'Marcos Chávez', role: t('Gerente Comercial Regional Oriente', 'Regional Sales Manager, East'), region: 'Bolivia', email: 'marcos.chavez@isoteklatam.com', whatsapp: '59169192074' },
  { name: 'Reinhard Peña De Lillo', role: t('Gerente Comercial Regional Occidente', 'Regional Sales Manager, West'), region: 'Bolivia', email: 'reinhard.pena@isoteklatam.com', whatsapp: '59177656619' },
  { name: 'Wilmar Martínez', role: t('Gerente de Servicios', 'Services Manager'), region: 'LATAM', email: 'wilmar.martinez@isoteklatam.com', whatsapp: '59168920512' },
  { name: 'Ricardo Zurita', role: t('Gerente de Soluciones Eléctricas', 'Electrical Solutions Manager'), region: 'LATAM', email: 'ricardo.zurita@isoteklatam.com', whatsapp: '59167894023' },
  { name: 'Julio Montero', role: t('Gerente de Contratos EPC', 'EPC Contracts Manager'), region: 'LATAM', email: 'julio.montero@isoteklatam.com', whatsapp: '59177817517' },
  { name: 'Ali Mustafa', role: t('Gerente de Marcas', 'Brands Manager'), region: 'LATAM', email: 'ali.mustafa@isoteklatam.com', whatsapp: '59177313662' },
  { name: 'Samira Abuawad', role: t('Jefa de Ventas Internas', 'Inside Sales Lead'), region: 'LATAM', email: 'samira.abuawad@isoteklatam.com', whatsapp: '59169192093' },
  { name: 'José Carlos Villagómez', role: t('Jefe de Producción', 'Production Lead'), region: 'LATAM', email: 'jose.villagomez@isoteklatam.com', whatsapp: '59175696593' },
  { name: 'Irazema Justiniano', role: t('Jefa de Supply Chain', 'Supply Chain Lead'), region: 'LATAM', email: 'irazema@isoteklatam.com', whatsapp: '59162020073' },
  { name: 'Norma Córdova Jiménez', role: t('Gerente de Finanzas y Administración', 'Finance & Administration Manager'), region: 'LATAM', email: 'norma.jimenez@isoteklatam.com' },
];

const N = '/media/news/';
export const posts: Post[] = [
  {
    slug: 'con-un-2024-record-este-2025-arranca-isotek-latam', date: '2025-02-13',
    title: t('Con un 2024 récord, este 2025 arranca ISOTEK LATAM', 'After a record 2024, ISOTEK LATAM starts 2025'),
    body: {
      es: ['Nos expandimos a un ritmo espectacular, con oficinas y personal local en Perú, Argentina y Paraguay. Aterrizamos con nuestros productos, soluciones y servicios.', 'ISOTEK ahora es ISOTEK LATAM. Más grande, más cerca de sus clientes.'],
      en: ['We are expanding fast, with offices and local staff in Peru, Argentina and Paraguay — bringing our products, solutions and services with us.', 'ISOTEK is now ISOTEK LATAM. Bigger, and closer to our clients.'],
    },
    images: [img(N + 'latam-2025.jpg', 'Anuncio de ISOTEK LATAM 2025', 'ISOTEK LATAM 2025 announcement')],
    videoUrl: 'https://www.youtube.com/watch?v=LBk8khk_jhk',
  },
  {
    slug: 'finalizo-la-feria-internacional-de-energias-finergy', date: '2024-05-29',
    title: t('Finalizó la Feria Internacional de Energías Finergy', 'The Finergy International Energy Fair comes to a close'),
    body: {
      es: ['Así vivimos el último día de la Feria Internacional de Energías Finergy. Nuestro equipo fue un orgullo en el stand y durante las exposiciones, mostrando su profesionalismo al máximo.'],
      en: ['Here’s how we spent the last day of the Finergy International Energy Fair. Our team did us proud on the stand and in the talks, showing true professionalism throughout.'],
    },
    images: [img(N + 'finergy-close.jpg', 'Equipo de ISOTEK en la Feria Finergy 2024', 'The ISOTEK team at Finergy 2024')],
  },
  {
    slug: 'presentes-con-las-marcas-lideres-en-la-feria-internacional-de-energias-finergy-2024', date: '2024-05-23',
    title: t('Presentes con las marcas líderes en Finergy 2024', 'At Finergy 2024 with the leading brands'),
    body: {
      es: ['Nuestro stand se lució en la feria con las marcas exclusivas que ISOTEK maneja como distribuidor autorizado para Bolivia.', 'Durante el segundo día de la Feria Internacional de Energías Finergy 2024, nuestros jefes de departamento, Ali Mustafa y Wilmar Martínez, se destacaron por su dedicación y compromiso con los clientes.'],
      en: ['Our stand shone at the fair with the exclusive brands ISOTEK carries as an authorised distributor for Bolivia.', 'On the second day of the Finergy 2024 International Energy Fair, department heads Ali Mustafa and Wilmar Martínez stood out for their dedication to our clients.'],
    },
    images: [img(N + 'finergy-stand.jpg', 'Stand de ISOTEK en Finergy 2024', 'ISOTEK stand at Finergy 2024'), img(N + 'finergy-eh.jpg', 'Equipos Endress+Hauser en el stand de ISOTEK', 'Endress+Hauser equipment on the ISOTEK stand')],
  },
  {
    slug: 'asi-empezamos-con-todo-en-la-feria-internacional-de-energias-finergy-2024', date: '2024-05-22',
    title: t('Así empezamos en la Feria Internacional de Energías Finergy 2024', 'How we kicked off at Finergy 2024'),
    body: {
      es: ['La exposición de nuestro ingeniero Ricardo Zurita sobre el Sistema Modular CUBIC (Rockwell Automation) para distribución, control y Centros de Control de Motores fue todo un éxito.'],
      en: ['Our engineer Ricardo Zurita’s talk on the CUBIC Modular System (Rockwell Automation) for distribution, control and Motor Control Centres was a great success.'],
    },
    images: [img(N + 'finergy-talk.jpg', 'Equipo de ISOTEK en Finergy 2024', 'ISOTEK team at Finergy 2024'), img(N + 'finergy-cubic.jpg', 'Ricardo Zurita presentando el sistema CUBIC', 'Ricardo Zurita presenting the CUBIC system')],
  },
  {
    slug: 'volvemos-a-nuestra-raices-convenio-rockwell-isotek', date: '2024-03-28',
    title: t('Volvemos a nuestras raíces: convenio Rockwell – ISOTEK', 'Back to our roots: Rockwell – ISOTEK agreement'),
    body: {
      es: ['ISOTEK se enorgullece de anunciar un nuevo capítulo en su historia: el regreso a nuestras raíces como Partner Oficial Exclusivo para la línea CUBIC de Rockwell Automation.', 'Este acuerdo nos permite ofrecer a nuestros clientes una gama completa de tableros modulares CUBIC, reconocidos por su calidad, flexibilidad y facilidad de instalación: acceso a la tecnología de Rockwell Automation, soluciones a la medida y soporte técnico experto de nuestro equipo.'],
      en: ['ISOTEK is proud to announce a new chapter: a return to our roots as Exclusive Official Partner for Rockwell Automation’s CUBIC line.', 'The agreement lets us offer clients the full range of CUBIC modular switchboards, known for their quality, flexibility and ease of installation — with access to Rockwell Automation technology, tailored solutions and expert support from our team.'],
    },
    images: [img(N + 'rockwell.jpg', 'Convenio ISOTEK – Rockwell Automation', 'ISOTEK – Rockwell Automation agreement')],
  },
  {
    slug: 'reconocimiento-a-nuestros-colaboradores', date: '2024-03-26',
    title: t('Reconocimiento a nuestros colaboradores', 'Recognising our people'),
    body: {
      es: ['El 26 de marzo, el Directorio de ISOTEK realizó un acto de reconocimiento a los colaboradores que, con su dedicación y compromiso, contribuyeron al crecimiento de la empresa a lo largo de los años.', 'Los homenajeados fueron Hernán Aquiles Gutiérrez Rueda, Ruddy Pradel Macabapy, María Sosa Carvajal, Norma Córdova Jiménez, Ricardo Enrique Zurita Oropeza, Walter Miguel Cardona Mucarze y Wilmar Martínez Campos.'],
      en: ['On 26 March, ISOTEK’s Board held a ceremony to recognise the people whose dedication and commitment have driven the company’s growth over the years.', 'Those honoured were Hernán Aquiles Gutiérrez Rueda, Ruddy Pradel Macabapy, María Sosa Carvajal, Norma Córdova Jiménez, Ricardo Enrique Zurita Oropeza, Walter Miguel Cardona Mucarze and Wilmar Martínez Campos.'],
    },
    images: [img(N + 'pilares.jpg', 'Pilares Laborales ISOTEK 2024', 'ISOTEK Pillars of Work 2024')],
  },
  {
    slug: 'oficialmente-certificados-cumpliendo-con-estandares-internacionales-iso-90012015-iec-62208-y-iec-61439-1-5', date: '2023-09-18',
    title: t('Oficialmente certificados: ISO 9001:2015, IEC 62208 e IEC 61439-1/5', 'Officially certified: ISO 9001:2015, IEC 62208 and IEC 61439-1/5'),
    body: {
      es: ['Obtuvimos la certificación oficial bajo ISO 9001:2015, que refleja nuestro compromiso con la satisfacción del cliente y la mejora continua.', 'Además, cumplimos con las normas IEC 62208 e IEC 61439-1/5, que garantizan la seguridad, la confiabilidad y el rendimiento de nuestros tableros.'],
      en: ['We obtained official ISO 9001:2015 certification, reflecting our commitment to customer satisfaction and continuous improvement.', 'We also comply with IEC 62208 and IEC 61439-1/5, which ensure the safety, reliability and performance of our switchboards.'],
    },
    images: [img(N + 'certification.jpg', 'Certificación ISO 9001:2015 de ISOTEK', 'ISOTEK ISO 9001:2015 certification')],
  },
  {
    slug: 'seminario-de-petroleo-y-gas-con-expertos-en-tecnologia', date: '2023-07-13',
    title: t('Seminario de Petróleo y Gas con expertos en tecnología', 'Oil & Gas seminar with technology experts'),
    body: {
      es: ['En las oficinas de Torres Alas del Centro Empresarial Equipetrol se desarrolló el seminario de Petróleo & Gas organizado por Endress+Hauser e ISOTEK, con jefes de mantenimiento e ingeniería de empresas petroleras. Los asistentes aprendieron sobre medición de flujo en aplicaciones de transferencia de custodia y análisis avanzado en gas natural.', 'Participaron como expositores el Ing. Aurelio Vaca, Gerente de la industria de Petróleo & Gas de Endress+Hauser Suiza, y el Ing. Luiden Quezada, Jefe de Ventas Petróleo & Gas de ISOTEK. Asistieron aproximadamente 40 personas, la mitad de forma presencial y la otra mitad virtual.'],
      en: ['The Oil & Gas seminar, organised by Endress+Hauser and ISOTEK, took place at Torres Alas in the Equipetrol business centre, with maintenance and engineering heads from oil companies. Attendees learned about flow measurement in custody-transfer applications and advanced natural-gas analysis.', 'Speakers were Aurelio Vaca, Oil & Gas Industry Manager at Endress+Hauser Switzerland, and Luiden Quezada, ISOTEK’s Oil & Gas Sales Lead. About 40 people attended, half in person and half online.'],
    },
    images: [img(N + 'seminar-og.jpg', 'Seminario de Petróleo y Gas en ISOTEK', 'Oil & Gas seminar at ISOTEK')],
  },
  {
    slug: 'seminario-en-isotek-alimentos-y-bebidas', date: '2023-06-16',
    title: t('Seminario de Alimentos y Bebidas', 'Food & Beverage seminar'),
    body: {
      es: ['Se llevó a cabo con éxito el seminario para la industria de alimentos y bebidas, organizado por ISOTEK y Endress+Hauser: el primero de varios seminarios gratuitos que organiza la empresa.'],
      en: ['The Food & Beverage industry seminar, organised by ISOTEK and Endress+Hauser, was a success — the first of several free seminars the company runs.'],
    },
    images: [img(N + 'seminar-fb.jpg', 'Seminario de Alimentos y Bebidas en ISOTEK', 'Food & Beverage seminar at ISOTEK')],
  },
];

export const faqs: Faq[] = [
  { question: t('¿Qué tipos de proyectos industriales pueden manejar?', 'What kinds of industrial projects can you handle?'), answer: t('Proyectos EPC llave en mano completos: desde instalaciones eléctricas en media y baja tensión hasta automatización de procesos y control de instrumentación, incluyendo fabricación propia de tableros y CCM, para Petróleo & Gas, Minería, Alimentos & Bebidas, Energía, Construcción, Litio, Etanol, Cemento y Agroindustria.', 'Complete turnkey EPC projects: from medium- and low-voltage electrical installations to process automation and instrumentation, including in-house switchboards and MCCs, for Oil & Gas, Mining, Food & Beverage, Energy, Construction, Lithium, Ethanol, Cement and Agribusiness.') },
  { question: t('¿Qué ventaja tiene un equipo con más de 15 años de experiencia?', 'What does a team with 15+ years of experience bring?'), answer: t('Nuestro equipo acumula más de 15 años ejecutando proyectos de potencia eléctrica y mecatrónica en media y baja tensión, lo que nos permite anticipar riesgos, optimizar tiempos de ejecución y entregar soluciones probadas.', 'Our team has more than 15 years of experience delivering medium- and low-voltage power and mechatronics projects, so we anticipate risks, shorten delivery times and deliver proven solutions.') },
  { question: t('¿Cómo pueden ayudarnos a ahorrar en costos energéticos?', 'How can you help us cut energy costs?'), answer: t('Diseñamos soluciones de calidad de energía (bancos de capacitores, sistemas UPS, protección BT y MT) y fabricamos nuestros propios tableros bajo IEC 61439-1/5, lo que reduce pérdidas eléctricas y costos de mantenimiento frente a soluciones genéricas.', 'We design power-quality solutions (capacitor banks, UPS systems, LV and MV protection) and build our own switchboards to IEC 61439-1/5, reducing electrical losses and maintenance costs compared with generic solutions.') },
  { question: t('¿Qué servicios ofrecen en instrumentación?', 'What instrumentation services do you offer?'), answer: t('Somos Solution Provider de Endress+Hauser: diagnóstico y reparación de instrumentos, calibración de caudalímetros, sensores de temperatura y presión, y proyectos de instrumentación completos, desde la instalación mecánica hasta la puesta en marcha.', 'We are an Endress+Hauser Solution Provider: instrument diagnosis and repair, calibration of flowmeters and temperature and pressure sensors, and complete instrumentation projects from mechanical installation to start-up.') },
  { question: t('¿Cuáles son los pasos de un proyecto con ustedes?', 'What are the steps of a project with you?'), answer: t('Ingeniería básica y de detalle → procura de equipos con marcas certificadas → fabricación propia de tableros y estructuras metalmecánicas → montaje electromecánico en obra → puesta en marcha y comisionamiento, con gestión integral a cargo de nuestros propios ingenieros.', 'Basic and detailed engineering → procurement from certified brands → in-house fabrication of switchboards and metal structures → electromechanical installation on site → start-up and commissioning, all managed by our own engineers.') },
  { question: t('¿Cómo abordan la innovación?', 'How do you approach innovation?'), answer: t('Fabricamos en Bolivia con líneas CNC y soldadura láser bajo certificación ISO 9001:2015, y mantenemos alianzas con Siemens, Rockwell Automation (CUBIC), ABB y Allen-Bradley para integrar lo último en automatización y control.', 'We manufacture in Bolivia with CNC lines and laser welding under ISO 9001:2015, and partner with Siemens, Rockwell Automation (CUBIC), ABB and Allen-Bradley to bring the latest automation and control into our projects.') },
  { question: t('¿Cuál es su enfoque en seguridad?', 'What is your approach to safety?'), answer: t('Nuestras soluciones de media y baja tensión incluyen protección Arc-Shield resistente a arco interno, cumplimos normas IEC en cada diseño y nuestros ingenieros certificados siguen protocolos de seguridad en cada etapa de montaje y puesta en marcha.', 'Our MV and LV solutions include Arc-Shield internal-arc protection, every design complies with IEC standards, and our certified engineers follow safety protocols at every stage of installation and start-up.') },
  { question: t('¿Cómo seleccionan los equipos eléctricos?', 'How do you select electrical equipment?'), answer: t('Trabajamos con marcas certificadas según la necesidad del cliente —Siemens, ABB, Schneider, Eaton, Allen-Bradley, WAGO o Hyundai— y ofrecemos dos líneas de CCM (CUBIC de origen europeo o PROTOS de fabricación boliviana) para ajustarnos al presupuesto y estándar técnico requerido.', 'We work with certified brands to suit each client — Siemens, ABB, Schneider, Eaton, Allen-Bradley, WAGO or Hyundai — and offer two MCC lines (European-made CUBIC or Bolivian-made PROTOS) to match the budget and technical standard required.') },
  { question: t('¿Ofrecen capacitación después de la implementación?', 'Do you offer training after implementation?'), answer: t('Sí. Además de la puesta en marcha, brindamos soporte técnico y transferencia de conocimiento a los equipos del cliente para asegurar la correcta operación y mantenimiento de los sistemas instalados.', 'Yes. Beyond start-up, we provide technical support and knowledge transfer to the client’s teams so the installed systems are operated and maintained correctly.') },
  { question: t('¿Cómo empezamos a trabajar juntos?', 'How do we start working together?'), answer: t('Escríbanos desde el formulario de consulta o a info@isoteklatam.com; un representante evaluará su proyecto y le presentará una propuesta de ingeniería, procura y construcción a medida.', 'Write to us through the enquiry form or at info@isoteklatam.com; a representative will assess your project and present a tailored engineering, procurement and construction proposal.') },
];

export const certifications: Certification[] = [
  {
    name: 'ISO 9001:2015', issuer: 'TÜV Rheinland', reference: 'ID 9000029079',
    description: t('Sistema de gestión de calidad que respalda el diseño, la fabricación y el ensamble de nuestros tableros y CCM.', 'Quality management system covering the design, manufacture and assembly of our switchboards and MCCs.'),
    image: img('/media/certs/iso9001-certificate.jpg', 'Certificado ISO 9001:2015 de ISOTEK emitido por TÜV Rheinland', 'ISOTEK ISO 9001:2015 certificate issued by TÜV Rheinland'),
  },
  {
    name: 'IEC 61439-1/5', issuer: 'Declaración de conformidad',
    description: t('Conjuntos de aparamenta de baja tensión: tableros de potencia, distribución, obras y redes públicas.', 'Low-voltage switchgear assemblies: power, distribution, construction-site and public-network boards.'),
    image: img('/media/certs/iec-compliance.jpg', 'Declaración de conformidad IEC de ISOTEK', 'ISOTEK IEC declaration of conformity'),
  },
  {
    name: 'IEC 62208', issuer: 'Declaración de conformidad',
    description: t('Envolventes vacías para conjuntos de aparamenta: línea de tableros PROTOS.', 'Empty enclosures for switchgear assemblies: PROTOS enclosure line.'),
  },
  {
    name: 'IEC 61537', issuer: 'Declaración de conformidad PROTOS',
    description: t('Sistemas de bandejas y escalerillas portacables marca PROTOS.', 'PROTOS cable tray and cable ladder systems.'),
    image: img('/media/certs/iec-compliance-trays.jpg', 'Declaración de conformidad de bandejas portacables PROTOS', 'PROTOS cable tray declaration of conformity'),
  },
];
