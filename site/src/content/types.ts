// Content model shared by the local seed, the Sanity schemas and the pages.
// Every translatable field is an `I18n` object so one document holds both languages.

export type Locale = 'es' | 'en';
export type I18n = Record<Locale, string>;
export type I18nList = Record<Locale, string[]>;

export type Img = { src: string; alt: I18n; width: number; height: number };

export type Stat = { value: number; prefix?: string; suffix?: string; label: I18n; source: string };

export type Office = { city: string; country: string; role: I18n };

export type SiteSettings = {
  name: string;
  legalName: string;
  founded: number;
  tagline: I18n;
  description: I18n;
  phone: string;
  email: string;
  whatsapp: string; // digits only, international format
  address: { street: string; city: string; country: string };
  hours: I18n;
  storeUrl: string;
  socials: { label: string; url: string }[];
  offices: Office[];
  stats: Stat[];
};

export type Service = {
  slug: string;
  code: string; // diagram label, e.g. FDR-01
  title: I18n;
  summary: I18n;
  scope: I18nList;
  image?: Img;
};

export type Industry = { slug: string; name: I18n };

export type Project = {
  slug: string;
  client: string;
  country: 'BO' | 'PY';
  place: I18n;
  industry: string; // Industry.slug
  services: string[]; // Service.slug
  title: I18n;
  about?: I18n;
  scope: I18n;
  images: Img[];
  featured?: boolean;
};

export type ProductSpec = { model: string; description: I18n };

export type Product = {
  slug: string;
  line: 'PROTOS' | 'ISOTEK';
  title: I18n;
  summary: I18n;
  features?: I18nList;
  specs?: ProductSpec[];
  standards?: string[];
  images: Img[];
  model3d?: string;
};

export type Brand = { name: string; category: I18n; url?: string };

export type TeamMember = { name: string; role: I18n; region: string; email?: string; whatsapp?: string };

export type Post = {
  slug: string;
  date: string; // ISO date; empty when unknown
  title: I18n;
  body: I18nList; // paragraphs
  images: Img[];
  videoUrl?: string;
};

export type Faq = { question: I18n; answer: I18n };

export type Certification = { name: string; issuer: string; reference?: string; description: I18n; image?: Img };
