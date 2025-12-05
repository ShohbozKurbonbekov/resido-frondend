import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

const bgMap: Record<string, string> = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
  black: "bg-black",
};

interface UserFeaturesCardProps {
  values: {
    cardTitle: string;
    cardClasses: string;
    Icon: LucideIcon;
  };
}
export default function UserFeaturesCard({ values }: UserFeaturesCardProps) {
  const { cardClasses, cardTitle, Icon } = values;
  return (
    <Card
      className={`shadow-none rounded-md  p-10  ${bgMap[cardClasses]} hover:bg-opacity-60 transition-colors duration-300 ease-linear`}
    >
      <CardContent>
        <Link
          to={""}
          className="flex flex-row items-start justify-between gap-3 p-0"
        >
          <div className="flex flex-col">
            <h4 className="text-5xl font-bold tracking-wider text-white  leading-none font-jostFont capitalize">
              sure
            </h4>
            <p className="text-lg  font-normal leading-tight capitalize font-jostFont text-white ">
              {cardTitle}
            </p>
          </div>
          <div>
            {Icon && <Icon className={`w-16 h-16  stroke-yellow-300`} />}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
