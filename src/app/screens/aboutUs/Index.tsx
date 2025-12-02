import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import AboutOurStory from "./AboutOurStory";
import MeetTeam from "./MeetTeam";
import MissionWork from "./MissionWork";

export default function AboutUsPage() {
  return (
    <>
      <SectionIntroNoBackground
        title="People First, Always."
        subtitle="Building trust through transparency, expertise, and continuous support."
      />
      <AboutOurStory />
      <MeetTeam
        title="meet our team"
        subtitle="professional & Dedicated team"
      />
      <MissionWork
        title="Our mission & work process"
        subtitle="We always try to provide the best services as we can"
      />
    </>
  );
}
