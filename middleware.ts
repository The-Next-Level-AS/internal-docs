import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const USERNAME = process.env.BASIC_AUTH_USERNAME,
  PASSWORD = process.env.BASIC_AUTH_PASSWORD;

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization'),
    base64Credentials = authHeader.split(' ')[1],
    credentials = Buffer.from(base64Credentials, 'base64').toString('ascii'),
    [username, password] = credentials.split(':');

  if (!authHeader)
    return new NextResponse(null, {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  if (username === USERNAME && password === PASSWORD)
    return NextResponse.next();
  
  return new NextResponse(null, {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
  });
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};
