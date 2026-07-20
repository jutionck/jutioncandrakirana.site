import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

type WebhookPayload = {
  _type?: string;
  slug?: string;
};

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: 'Revalidation is not configured' },
      { status: 500 }
    );
  }

  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  const rawBody = await request.text();

  if (!signature) {
    return NextResponse.json({ message: 'Missing signature' }, { status: 401 });
  }

  const valid = await isValidSignature(rawBody, signature, secret).catch(
    () => false
  );

  if (!valid) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  }

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: 'Invalid JSON payload' }, { status: 400 });
  }

  const { _type, slug } = payload;
  if (!_type) {
    return NextResponse.json({ message: 'Missing _type in payload' }, { status: 400 });
  }

  // 'max' purges the tag immediately regardless of its configured cache life
  revalidateTag(_type, 'max');
  if (_type === 'post' && slug) {
    revalidateTag(`post:${slug}`, 'max');
  }

  return NextResponse.json({ revalidated: true, type: _type, now: Date.now() });
}
