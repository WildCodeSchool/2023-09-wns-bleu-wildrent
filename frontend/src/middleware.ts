import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export interface Payload {
  userId: number;
  role: string;
}
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || '';
export default async function middleware(request: NextRequest) {
  const { cookies } = request;
  const token = cookies.get('token');

  return await checkToken(token?.value, request);
}

export async function verify(token: string): Promise<Payload> {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_PRIVATE_KEY));

  return payload as unknown as Payload;
}
async function checkToken(token: string | undefined, request: NextRequest) {
  let response: NextResponse<unknown>;
  if (!token) {
    if (request.nextUrl.pathname.startsWith('/admin')) {
      response = NextResponse.redirect(new URL('/', request.url));
    } else {
      response = NextResponse.next();
    }
    return response;
  }
  try {
    const payload = await verify(token);

    if (payload?.userId && payload?.role) {
      response = NextResponse.next();

      //vérifier si la route commence par admin, et que le payload.role n'est pas admin, je redirige
      if (request.nextUrl.pathname.startsWith('/admin') && payload.role !== 'ADMIN') {
        response = NextResponse.redirect(new URL('/400', request.url), {
          status: 400,
        });
      }
      return response;
    }
  } catch (err) {
    console.error('Verification failed', err);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
