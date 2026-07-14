import { z } from "zod";

// Wspólny schemat walidacji
export const registrationSchema = z.object({
  firstName: z.string().trim().min(1, "Podaj imię."),
  lastName: z.string().trim().min(1, "Podaj nazwisko."),
  company: z.string().trim().min(1, "Podaj nazwę firmy."),
  email: z.string().trim().min(1, "Podaj adres e-mail.").email("Podaj poprawny adres e-mail."),

  accommodation: z.string().trim().optional().or(z.literal("")),
  parking: z.string().trim().optional().or(z.literal("")),
  dietaryNeeds: z.string().trim().optional().or(z.literal("")),

  // Preferowane wyżywienie — checkboxy
  mealClassic: z.boolean().optional(),
  mealVege: z.boolean().optional(),

  imageConsent: z.enum(["YES", "NO"], {
    message: "Zaznacz, czy wyrażasz zgodę na wykorzystanie wizerunku.",
  }),
});

export const invitationSchema = registrationSchema.partial({
  accommodation: true,
  parking: true,
  dietaryNeeds: true,
  mealClassic: true,
  mealVege: true,
  imageConsent: true,
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
