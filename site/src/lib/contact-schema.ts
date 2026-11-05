import { z } from 'zod';

export const TOPICS = ['service', 'product', 'calibration', 'other'] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).optional().default(''),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).regex(/^[+\d\s().-]*$/).optional().default(''),
  country: z.string().trim().max(60).optional().default(''),
  topic: z.enum(TOPICS),
  message: z.string().trim().min(10).max(4000),
  consent: z.literal(true),
  website: z.string().max(0).optional().default(''), // honeypot: must stay empty
  locale: z.enum(['es', 'en']).default('es'),
});

export type ContactInput = z.infer<typeof contactSchema>;
