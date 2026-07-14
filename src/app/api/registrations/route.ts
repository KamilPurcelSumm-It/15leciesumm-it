import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { invitationSchema } from "@/lib/validation";

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

// POST /api/registrations creates a new generic invitation request
export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Nieprawidłowy format danych." },
      { status: 400 }
    );
  }

  const parsed = invitationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Formularz zawiera błędy.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const data = parsed.data;

  try {
    const created = await prisma.registration.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        company: data.company,
        email: data.email,
        accommodation: data.accommodation || null,
        parking: data.parking || null,
        mealClassic: data.mealClassic ?? false,
        mealVege: data.mealVege ?? false,
        dietaryNeeds: data.dietaryNeeds || null,
        imageConsent: data.imageConsent ?? "NO",
      },
    });

    return NextResponse.json({ id: created.id, guid: created.guid }, { status: 201 });
  } catch (err) {
    logApiError("POST /api/registrations", err, { body });
    return NextResponse.json(
      { error: "Nie udało się zapisać zgłoszenia. Spróbuj ponownie później." },
      { status: 500 }
    );
  }
}
