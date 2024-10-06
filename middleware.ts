import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const USERNAME = process.env.BASIC_AUTH_USERNAME,
  PASSWORD = process.env.BASIC_AUTH_PASSWORD;

export function middleware(request: NextRequest) {
  if (!request.headers.get('authorization')) {
    return new NextResponse(null, {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  }
  
  const authHeader = request.headers.get('authorization'),
    base64Credentials = authHeader.split(' ')[1],
    credentials = atob(base64Credentials),
    [username, password] = credentials.split(':');
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
