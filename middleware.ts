import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Rotas públicas que não precisam de autenticação
  const publicPaths = ['/login', '/signup']
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path))

  // Se for rota pública, permite acesso
  if (isPublicPath) {
    return NextResponse.next()
  }

  // Para rotas protegidas, verificar autenticação
  // Verifica tanto cookie do Supabase quanto localStorage (modo demo)
  const token = request.cookies.get('sb-access-token')
  
  // Se não tiver token e não for rota pública, redireciona para login
  // Nota: Em modo demo, a verificação será feita no cliente
  if (!token && !isPublicPath && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
