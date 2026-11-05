import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact-schema';

// Best-effort in-memory rate limit (per server instance): 5 requests / 10 min / IP.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip)) return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }
  // Honeypot filled → pretend success, send nothing.
  if (body && typeof body === 'object' && 'website' in body && (body as { website?: string }).website) {
    return NextResponse.json({ ok: true });
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'validation', fields: parsed.error.issues.map((i) => i.path.join('.')) }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn('[contact] RESEND_API_KEY not set; enquiry not delivered');
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  const d = parsed.data;
  const rows = [['Nombre', d.name], ['Empresa', d.company], ['Email', d.email], ['Teléfono', d.phone], ['País', d.country], ['Motivo', d.topic], ['Idioma', d.locale]];
  const html = `<table>${rows.map(([k, v]) => `<tr><th align="left">${k}</th><td>${esc(v)}</td></tr>`).join('')}</table><p>${esc(d.message).replace(/\n/g, '<br>')}</p>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'web@isoteklatam.com',
      to: [process.env.CONTACT_TO_EMAIL || 'info@isoteklatam.com'],
      reply_to: d.email,
      subject: `Consulta web (${d.topic}) — ${d.name}${d.company ? ` · ${d.company}` : ''}`,
      html,
    }),
  });
  if (!res.ok) {
    console.error('[contact] Resend error', res.status, await res.text().catch(() => ''));
    return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
