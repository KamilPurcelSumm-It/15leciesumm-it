"use client";

import { useParams } from "next/navigation";
import { Hero } from "@/components/Hero";
import { Agenda } from "@/components/Agenda";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Venue } from "@/components/Venue";
import { Footer } from "@/components/Footer";

export default function RegisterPage() {
  const params = useParams();
  const guid = params.guid as string;

  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Agenda />
      <RegistrationForm guid={guid} />
      <Venue />
      <Footer />
    </main>
  );
}
