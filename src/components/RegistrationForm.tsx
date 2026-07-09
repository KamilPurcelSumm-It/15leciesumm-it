"use client";

import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Status = "idle" | "loading" | "submitting" | "success" | "error";
type FieldErrors = Record<string, string[] | undefined>;

function logBrowserError(context: string, error: unknown, details: Record<string, unknown> = {}) {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  console.groupCollapsed(`Error: ${context}`);
  console.error(message, details);
  console.groupEnd();
}

const initialFormState = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  accommodation: "",
  parking: "",
  // meal preferences as checkboxes
  mealClassic: false,
  mealVege: false,

  dietaryNeeds: "",
  imageConsent: "" as "" | "YES" | "NO",
};

export function RegistrationForm({ guid }: { guid?: string }) {
  const t = useTranslations("registration");
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState<Status>(guid ? "loading" : "idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // Pobierz dane z API, jeśli jest GUID
  useEffect(() => {
    if (!guid) return;

    const fetchRegistration = async () => {
      try {
        setStatus("loading");
        const response = await fetch(`/api/registrations/${guid}`);

        if (response.ok) {
          const data = await response.json();
          setForm({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            company: data.company || "",
            email: data.email || "",
            accommodation: data.accommodation || "",
            parking: data.parking || "",
            mealClassic: data.mealClassic ?? false,
            mealVege: data.mealVege ?? false,
            dietaryNeeds: data.dietaryNeeds || "",
            imageConsent: data.imageConsent || ("" as "" | "YES" | "NO"),
          });
          setStatus("idle");
        } else {
          setErrorMessage(t("error_not_found"));
          setStatus("error");
        }
      } catch (err) {
        logBrowserError("fetchRegistration", err, { guid });
        setErrorMessage(t("error_network"));
        setStatus("error");
      }
    };

    fetchRegistration();
  }, [guid, t]);

  function updateField<K extends keyof typeof initialFormState>(
    key: K,
    value: (typeof initialFormState)[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);
    setFieldErrors({});

    const endpoint = guid ? `/api/registrations/${guid}` : "/api/registrations";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.status === 422) {
        const data = await response.json();
        logBrowserError("Registration submit validation error", data, { endpoint });
        setFieldErrors(data.fieldErrors ?? {});
        setErrorMessage(data.error ?? t("error_validation"));
        setStatus("error");
        return;
      }

      if (!response.ok) {
        const text = await response.text().catch(() => "");
        let data: unknown;
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
        }
        logBrowserError("Registration submit server error", data, {
          endpoint,
          status: response.status,
          statusText: response.statusText,
        });
        setErrorMessage(
          typeof data === "object" && data && "error" in data
            ? (data as { error?: string }).error ?? t("error_server")
            : t("error_server")
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      // Nie czyść formularza — pozwól użytkownikowi widzieć zapisane dane
    } catch (err) {
      logBrowserError("Registration submit request failed", err, { endpoint, form });
      setErrorMessage(t("error_network"));
      setStatus("error");
    }
  }

  if (status === "loading") {
    return (
      <section id="rejestracja" className="bg-black px-6 py-16 md:px-16">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 text-center shadow-2xl md:p-12">
          <p className="text-sm text-neutral-700">{t("loading") || "Ładowanie..."}</p>
        </div>
      </section>
    );
  }

  if (status === "success") {
    return (
      <section id="rejestracja" className="bg-black px-6 py-16 md:px-16">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 text-center shadow-2xl md:p-12">
          <p className="mb-2 text-lg font-bold uppercase tracking-wide text-maroon">
            {t("success_title")}
          </p>
          <p className="text-sm text-neutral-700">{t("success_text")}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="rejestracja" className="bg-black px-6 py-16 md:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 rounded-3xl bg-white p-6 shadow-2xl md:grid-cols-[1.3fr_1fr] md:p-10">
        <div>
          <h3 className="mb-6 text-base font-bold uppercase tracking-wide text-black">
            {t("section_title")}
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label={t("field_first_name")}
                name="firstName"
                value={form.firstName}
                onChange={(v) => updateField("firstName", v)}
                error={fieldErrors.firstName?.[0]}
                centered
                required
              />
              <Field
                label={t("field_last_name")}
                name="lastName"
                value={form.lastName}
                onChange={(v) => updateField("lastName", v)}
                error={fieldErrors.lastName?.[0]}
                centered
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label={t("field_company")}
                name="company"
                value={form.company}
                onChange={(v) => updateField("company", v)}
                error={fieldErrors.company?.[0]}
                centered
                required
              />
              <Field
                label={t("field_email")}
                name="email"
                type="email"
                value={form.email}
                onChange={(v) => updateField("email", v)}
                error={fieldErrors.email?.[0]}
                centered
                required
              />
            </div>

            <Field
              label={t("field_accommodation")}
              name="accommodation"
              value={form.accommodation}
              onChange={(v) => updateField("accommodation", v)}
            />

            <Field
              label={t("field_parking")}
              name="parking"
              value={form.parking}
              onChange={(v) => updateField("parking", v)}
            />

            <fieldset className="rounded-3xl border border-black/70 px-5 py-4">
              <legend className="px-1 text-xs leading-relaxed text-black">
                {t("field_meal_preference")}
              </legend>
              <div className="mt-2 flex flex-wrap gap-x-10 gap-y-2">
                <CheckboxOption
                  name="mealClassic"
                  checked={Boolean(form.mealClassic)}
                  onChange={(v) => updateField("mealClassic", v)}
                  label={t("meal_classic")}
                />
                <CheckboxOption
                  name="mealVege"
                  checked={Boolean(form.mealVege)}
                  onChange={(v) => updateField("mealVege", v)}
                  label={t("meal_vege")}
                />
              </div>
            </fieldset>

            <div>
              <p className="px-1 text-xs leading-relaxed text-black">{t("field_dietary")}</p>
              <textarea
                id="dietaryNeeds"
                name="dietaryNeeds"
                value={form.dietaryNeeds}
                onChange={(e) => updateField("dietaryNeeds", e.target.value)}
                placeholder={t("field_dietary")}
                className="w-full rounded-2xl border border-black/70 px-4 py-3 text-sm text-black outline-none placeholder:text-black focus:border-maroon"
                rows={3}
              />
              {fieldErrors.dietaryNeeds?.[0] && (
                <p className="mt-1 px-2 text-xs text-maroon">{fieldErrors.dietaryNeeds[0]}</p>
              )}
            </div>

            <fieldset className="rounded-3xl border border-black/70 px-5 py-4">
              <legend className="px-1 text-xs leading-relaxed text-black">
                {t("consent_text")}
              </legend>
              <div className="mt-2 flex flex-wrap gap-x-10 gap-y-2">
                <RadioOption
                  name="imageConsent"
                  value="YES"
                  label={t("consent_yes")}
                  checked={form.imageConsent === "YES"}
                  onChange={() => updateField("imageConsent", "YES")}
                />
                <RadioOption
                  name="imageConsent"
                  value="NO"
                  label={t("consent_no")}
                  checked={form.imageConsent === "NO"}
                  onChange={() => updateField("imageConsent", "NO")}
                />
              </div>
              {fieldErrors.imageConsent?.[0] && (
                <p className="mt-1 text-xs text-maroon">
                  {fieldErrors.imageConsent[0]}
                </p>
              )}
            </fieldset>

            {status === "error" && errorMessage && (
              <p className="text-sm font-medium text-maroon">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 w-fit self-center rounded-full bg-maroon px-10 py-3 text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-60 sm:self-start"
            >
              {status === "submitting" ? t("submitting") : t("submit")}
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-4">
            <div className="relative h-96 w-full overflow-hidden rounded-2xl md:h-[640px]">
            <Image
              src="/images/registration.jpg"
              alt="15-lecie summ-it"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              loading="eager"
              className="object-cover"
            />
          </div>
          <p className="text-sm font-bold leading-relaxed text-maroon">
            {t("closed_event")}
          </p>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  error,
  required = false,
  centered = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
  required?: boolean;
  centered?: boolean;
}) {
  return (
            <div>
              <p className="px-1 text-xs leading-relaxed text-black">
                {label}
                {required && " *"}
              </p>
              <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                placeholder={label}
                className={`w-full rounded-full border border-black/70 px-5 py-3 text-sm text-black outline-none placeholder:text-black focus:border-maroon ${
                  centered ? "text-center placeholder:text-center" : ""
                }`}
              />
              {error && <p className="mt-1 px-2 text-xs text-maroon">{error}</p>}
            </div>
  );
}

function RadioOption({
  name,
  value,
  label,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-black">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        required
        className="h-4 w-4 accent-[#ac2846]"
      />
      {label}
    </label>
  );
}

function CheckboxOption({
  name,
  checked,
  onChange,
  label,
}: {
  name?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-black">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border border-black/70 transition-all ${
          checked ? "border-maroon bg-maroon" : "bg-white"
        }`}
        aria-hidden="true"
      >
        {checked ? <span className="h-2.5 w-2.5 rounded-full bg-white" /> : null}
      </span>
      {label}
    </label>
  );
}
