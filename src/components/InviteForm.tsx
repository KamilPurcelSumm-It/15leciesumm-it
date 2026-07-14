"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Record<string, string[] | undefined>;

const initialFormState = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
};

export function InviteForm() {
  const t = useTranslations("invite");
  const tr = useTranslations("registration");
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function updateField<K extends keyof typeof initialFormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.status === 422) {
        const data = await response.json();
        setFieldErrors(data.fieldErrors ?? {});
        setErrorMessage(data.error ?? t("error_validation"));
        setStatus("error");
        return;
      }

      if (!response.ok) {
        setErrorMessage(t("error_server"));
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch (err) {
      setErrorMessage(t("error_network"));
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="bg-black px-6 py-16 md:px-16">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 text-center shadow-2xl md:p-12">
          <p className="mb-3 text-lg font-bold uppercase tracking-wide text-maroon">
            {t("success_title")}
          </p>
          <p className="text-sm leading-relaxed text-neutral-700">
            {t("success_text")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="rejestracja" className="bg-black px-6 py-16 md:px-16">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-6 shadow-2xl md:p-10">
        <div className="mb-8 text-center">
          <p className="mb-3 text-base font-bold uppercase tracking-wide text-maroon">
            {t("section_title")}
          </p>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-neutral-600">
            {t("description")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label={tr("field_first_name")}
              name="firstName"
              value={form.firstName}
              onChange={(value) => updateField("firstName", value)}
              error={fieldErrors.firstName?.[0]}
              required
            />
            <Field
              label={tr("field_last_name")}
              name="lastName"
              value={form.lastName}
              onChange={(value) => updateField("lastName", value)}
              error={fieldErrors.lastName?.[0]}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label={tr("field_company")}
              name="company"
              value={form.company}
              onChange={(value) => updateField("company", value)}
              error={fieldErrors.company?.[0]}
              required
            />
            <Field
              label={tr("field_email")}
              name="email"
              type="email"
              value={form.email}
              onChange={(value) => updateField("email", value)}
              error={fieldErrors.email?.[0]}
              required
            />
          </div>

          {status === "error" && errorMessage && (
            <p className="text-sm font-medium text-maroon">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-fit self-center rounded-full bg-maroon px-10 py-3 text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-60 sm:self-start"
          >
            {status === "submitting" ? t("submitting") : t("submit")}
          </button>
        </form>
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
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-xs font-bold uppercase tracking-wide text-black">
        {label}
        {required && " *"}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        className="w-full rounded-2xl border border-black/70 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-black focus:border-maroon"
        required={required}
      />
      {error && <p className="mt-1 text-xs text-maroon">{error}</p>}
    </div>
  );
}
