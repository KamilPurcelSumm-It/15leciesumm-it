import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function logApiError(context: string, error: unknown, extra: Record<string, unknown> = {}) {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  console.error(`[${context}]`, message, extra);
}

// GET /api/registrations lista
export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(registrations);
  } catch (err) {
    logApiError("GET /api/registrations", err);
    return NextResponse.json(
      { error: "Nie udało się pobrać listy rejestracji." },
      { status: 500 }
    );
  }
}

// POST /api/registrations nie używane
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: "Użyj /api/registrations/[guid] do rejestracji z kodem QR." },
    { status: 400 }
  );
}
