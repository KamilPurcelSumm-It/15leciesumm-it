import { Hero } from "@/components/Hero";
import { SpecialGuest } from "@/components/SpecialGuest";
import { InviteForm } from "@/components/InviteForm";
import { Agenda } from "@/components/Agenda";
import { Venue } from "@/components/Venue";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <SpecialGuest />
      <Agenda />
      <InviteForm />
      <Venue />
      <Footer />
    </main>
  );
}
