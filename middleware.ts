import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware global:
 * - bloqueia métodos não esperados nas rotas de API;
 * - remove parâmetros de query fora da allowlist antes de a rota tratar
 *   a requisição (defesa em profundidade além da sanitização em `lib/sanitize.ts`);
 * - aplica cabeçalhos de segurança padrão.
 */

const API_ALLOWED_METHODS: Record<string, string[]> = {
  "/api/personagem": ["GET"],
};

const API_ALLOWED_PARAMS: Record<string, string[]> = {
  "/api/personagem": ["nome"],
};

export function middleware(request: NextRequest): NextResponse {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname.startsWith("/api/")) {
    const allowedMethods = API_ALLOWED_METHODS[pathname];
    if (allowedMethods && !allowedMethods.includes(request.method)) {
      return NextResponse.json({ error: "Método não permitido." }, { status: 405 });
    }

    const allowedParams = API_ALLOWED_PARAMS[pathname];
    if (allowedParams) {
      for (const key of Array.from(searchParams.keys())) {
        if (!allowedParams.includes(key)) {
          return NextResponse.json(
            { error: `Parâmetro não permitido: ${key}` },
            { status: 400 }
          );
        }
      }
    }
  }

  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
