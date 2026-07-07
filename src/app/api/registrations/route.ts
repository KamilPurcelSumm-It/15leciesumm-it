import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/registrations lista
export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(registrations);
  } catch (err) {
    console.error("Błąd pobierania rejestracji:", err);
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
