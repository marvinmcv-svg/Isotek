import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

// Called by a Sanity webhook (see README): POST /api/revalidate?secret=…
export async function POST(req: Request) {
  const secret = new URL(req.url).searchParams.get('secret');
  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  revalidateTag('sanity', 'max');
  revalidatePath('/', 'layout');
  return NextResponse.json({ ok: true, revalidated: Date.now() });
}
