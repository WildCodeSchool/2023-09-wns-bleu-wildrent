import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify, importJWK } from 'jose';

export interface Payload {
  userId: number;
}
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || '';
console.log('JWT_PRIVATE_KEY', JWT_PRIVATE_KEY);
export default async function middleware(request: NextRequest) {
  const { cookies } = request;
  const token = cookies.get('token');

  return await checkToken(token?.value, request);
}

export async function verify(token: string): Promise<Payload> {
  const { payload } = await jwtVerify<Payload>(token, new TextEncoder().encode(JWT_PRIVATE_KEY));
  return payload;
}
async function checkToken(token: string | undefined, request: NextRequest) {
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    const payload = await verify(token);

    if (payload?.userId) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/auth/login', request.url));
  } catch (err) {
    console.error('Verification failed', err);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
