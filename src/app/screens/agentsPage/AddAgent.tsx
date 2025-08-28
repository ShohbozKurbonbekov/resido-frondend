import AddAgentForm from "@/app/components/AddAgentForm";
import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import { useSearchParams } from "react-router-dom";

export default function AddAgent() {
  // Getting data from the Url query
  const [queries] = useSearchParams();
  const agencyName = queries.get("agencyName");
  //   const agencyId = queries.get("agencyId");

  return (
    <>
      <SectionIntroNoBackground
        title={`Add agent under ${agencyName} agency`}
        subtitle={"You can get enrolled as an agent here"}
      />
      <AddAgentForm qualityClasses="py-20 bg-sky-100" />
    </>
  );
}
