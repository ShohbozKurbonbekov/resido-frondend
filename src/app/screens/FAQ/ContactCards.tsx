import { OUR_MEMBERS } from "@/app/data/contactUs";
import { CONTACT_OPTIONS } from "@/app/data/faq";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { findContactMemberRole } from "@/lib/utils";

export default function ContactCards() {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-items-center ">
      {CONTACT_OPTIONS.map(({ title, memberRole, Icon }) => {
        const member = findContactMemberRole(OUR_MEMBERS, memberRole);
        return (
          <Card
            key={memberRole}
            className="flex flex-col items-center justify-center w-full h-auto py-5 border-0"
          >
            <CardHeader className="text-center">
              <Icon className="w-14 h-14 stroke-blue-700" />
            </CardHeader>
            <CardContent className="w-full flex flex-col space-y-1 justify-center items-center pb-2">
              <h3 className="text-xl font-bold text-darkBlue capitalize font-jostFont ">
                {title}
              </h3>
              <p className="text-base text-slate-400 font-jostFont truncate w-full text-center">
                {(member?.socialLinks?.linkedin ?? "").replace(
                  "https://",
                  ""
                ) ?? "N/A"}
              </p>
            </CardContent>
            <CardFooter>
              <p className="text-base text-slate-500 font-jostFont">
                {member?.phone ?? "no available"}
              </p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
