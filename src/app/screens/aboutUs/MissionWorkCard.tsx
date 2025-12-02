import { Card, CardContent } from "@/components/ui/card";

interface MissionWorkCardProp {
  title: string;
  subtitle: string;
  logo: React.ReactNode;
}
export default function MissionWorkCard({
  title,
  subtitle,
  logo,
}: MissionWorkCardProp) {
  return (
    <Card className="shadow-[0_0_10px_3px_rgba(135,206,235,0.4)] border-0">
      <CardContent className="flex flex-row justify-start  gap-3 items-center py-5 px-7">
        {logo}
        <div className="h-auto flex-1 flex flex-col gap-1">
          <h4 className="text-xl font-semibold font-jostFont text-darkBlue capitalize leading-tight">
            {title}
          </h4>
          <p className="leading-onePointEight font-jostFont text-slate-400 font-light text-size_15">
            {subtitle}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
