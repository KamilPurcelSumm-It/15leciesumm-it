import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registrationSchema } from "@/lib/validation";

// GET /api/registrations/[guid]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ guid: string }> }
) {
  const { guid } = await params;

  if (!guid) {
    return NextResponse.json(
      { error: "Brak identyfikatora rejestracji." },
      { status: 400 }
    );
  }

  try {
    const registration = await prisma.registration.findUnique({
      where: { guid },
    });

    if (!registration) {
      return NextResponse.json(
        { error: "Rejestracja nie znaleziona." },
        { status: 404 }
      );
    }

    return NextResponse.json(registration);
  } catch (err) {
    console.error("Błąd pobierania rejestracji:", err);
    return NextResponse.json(
      { error: "Nie udało się pobrać rejestracji." },
      { status: 500 }
    );
  }
}

// POST /api/registrations/[guid]aktualizacja
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ guid: string }> }
) {
  const { guid } = await params;

  if (!guid) {
    return NextResponse.json(
      { error: "Brak identyfikatora rejestracji." },
      { status: 400 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Nieprawidłowy format danych." },
      { status: 400 }
    );
  }

  const parsed = registrationSchema.safeParse(body);

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
    // Spróbuj znaleźć istniejącą rejestrację i zaktualizuj ją
    const existingRegistration = await prisma.registration.findUnique({
      where: { guid },
    });

    if (existingRegistration) {
      // Update istniejącej rejestracji
      const updated = await prisma.registration.update({
        where: { guid },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          company: data.company,
          email: data.email,
          accommodation: data.accommodation || null,
          parking: data.parking || null,
          dietaryNeeds: data.dietaryNeeds || null,
          imageConsent: data.imageConsent,
        },
      });

      return NextResponse.json({ id: updated.id, guid: updated.guid }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Rejestracja z tym kodem nie istnieje." },
        { status: 404 }
      );
    }
  } catch (err) {
    console.error("Błąd aktualizacji rejestracji:", err);
    return NextResponse.json(
      { error: "Nie udało się zapisać zgłoszenia. Spróbuj ponownie później." },
      { status: 500 }
    );
  }
}
