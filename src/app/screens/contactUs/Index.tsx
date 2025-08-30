import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import type { contactDataType } from "@/lib/type/contact-us";
import MainContent from "./MainContent";

export const contactData: contactDataType = {
  phone1: "+82-10-1234-5678",
  phone2: "+82-10-1234-5678",
  email: "support@realestate.com",
  address: "123 Gangnam-daero, Seoul, South Korea",
};

export default function ContactUsPage() {
  return (
    <>
      <SectionIntroNoBackground
        title={"Contact us"}
        subtitle={"Leave a message for us, we will try to reach then"}
      />
      <MainContent contactData={contactData} />
    </>
  );
}
