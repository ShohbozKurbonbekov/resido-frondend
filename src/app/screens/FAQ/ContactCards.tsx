import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { TeamMemberType } from "@/lib/type/about-us";
import { findContactMemberRole } from "@/lib/utils";
import {
  Headset,
  MessagesSquare,
  ShoppingBasket,
  type LucideIcon,
} from "lucide-react";
import { memo } from "react";

interface ContactCardsType {
  teamMembers: TeamMemberType[];
}

// Config for each contact card
const contactOptions: {
  role: string;
  title: string;
  Icon: LucideIcon;
}[] = [
  { role: "sales agent", title: "Contact Sales", Icon: ShoppingBasket },
  { role: "support agent", title: "Contact Support", Icon: Headset },
  { role: "community agent", title: "Start with Chat", Icon: MessagesSquare },
];

const ContactCards = memo(function ContactCards({
  teamMembers,
}: ContactCardsType) {
  console.log("contact component rerenders here");
  return (
    <div className="container grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-items-center ">
      {contactOptions.map(({ title, role, Icon }) => {
        const member = findContactMemberRole(teamMembers, role);
        return (
          <Card
            key={role}
            className="flex flex-col items-center justify-center w-full h-auto py-5 border-0"
          >
            <CardHeader className="text-center">
              <Icon className="w-[54px] h-[54px] stroke-blue-700" />
            </CardHeader>
            <CardContent className="w-full flex flex-col space-y-1 justify-center items-center pb-2">
              <h3 className="text-xl font-bold text-darkBlue capitalize font-jostFont ">
                {title}
              </h3>
              <p className="text-base text-slate-400 font-jostFont">
                {member?.socialLinks?.linkedin ?? "N/A"}
              </p>
            </CardContent>
            <CardFooter>
              <p className="text-base text-slate-500 font-jostFont">
                {member?.phone ?? "N/A"}
              </p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
});

export default ContactCards;
