import { NextRequest, NextResponse } from "next/server";
import { getCharacterData, UpstreamError } from "@/lib/aqw";
import { sanitizeCharacterName } from "@/lib/sanitize";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function getClientIdentifier(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() ?? "unknown";
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const identifier = getClientIdentifier(request);
  if (!checkRateLimit(identifier)) {
    return NextResponse.json(
      { error: "Muitas requisições. Tente novamente em instantes." },
      { status: 429 }
    );
  }

  const nome = sanitizeCharacterName(request.nextUrl.searchParams.get("nome"));
  if (!nome) {
    return NextResponse.json(
      { error: "Informe um nome de personagem válido (até 25 caracteres)." },
      { status: 400 }
    );
  }

  try {
    const character = await getCharacterData(nome);

    if (!character) {
      return NextResponse.json(
        { error: `Personagem "${nome}" não encontrado.` },
        { status: 404 }
      );
    }

    return NextResponse.json(character, {
      headers: { "Cache-Control": "private, max-age=30" },
    });
  } catch (error) {
    if (error instanceof UpstreamError) {
      return NextResponse.json(
        { error: "Servidores da AQW indisponíveis no momento." },
        { status: 502 }
      );
    }

    console.error("Erro inesperado ao buscar personagem:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar o personagem." },
      { status: 500 }
    );
  }
}
