import ContactForm from "@/components/contact/contact";
import { getSeoMetadata } from "@/utils/getSeoMetadata";

export async function generateMetadata() {
  return getSeoMetadata("contact");
}

export default function ContactPage() {
  return (
    <main>
      <ContactForm />
    </main>
  );
}
