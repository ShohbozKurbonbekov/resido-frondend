import { useGlobals } from "@/app/hooks/useGlobals";
import { Button } from "@/components/ui/button";
import { ErrorMessages } from "@/lib/config";
import { MemberType } from "@/lib/enums/agent.enum";
import { sweetFailureProvider } from "@/lib/sweetAlerts";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function AgentRegistration() {
  const { authmember } = useGlobals();
  const navigation = useNavigate();

  const handleClick = useCallback(() => {
    if (!authmember) {
      return sweetFailureProvider(ErrorMessages.error2, true, "/");
    }

    if (authmember.role !== MemberType.USER) {
      return sweetFailureProvider(
        "You are not eligible to apply for an agency",
        true,
        "/"
      );
    }

    navigation("/agencies/apply/agency-role");
  }, [authmember, navigation]);

  return (
    <section className="py-12 bg-blue-500 flex flex-row justify-center">
      <div className="container flex flex-row justify-between items-center flex-wrap gap-y-4">
        <div className="flex  flex-col font-jostFont text-slate-50">
          <h3 className="text-2xl leading-onePointEight capitalize font-bold">
            Want to register a real estate agency?
          </h3>
          <p className="text-slate-200 font-jostFont text-sm">
            We'll help you to grow your career and growth
          </p>
        </div>

        <div>
          <Button
            variant={"ghost"}
            onClick={handleClick}
            className={
              "py-3 px-7 text-darkBlue font-jostFont text-xs font-bold bg-slate-50 rounded-3xl shadow-[0_0_0.1rem_0.2rem_#fff3] cursor-pointer hover:scale-95 transition-all duration-200 ease-in-out hover:no-underline capitalize"
            }
          >
            apply now
          </Button>
        </div>
      </div>
    </section>
  );
}
