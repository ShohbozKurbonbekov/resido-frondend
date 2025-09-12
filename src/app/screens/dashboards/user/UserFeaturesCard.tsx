import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function UserFeaturesCard({ value }: { value: number }) {
  return (
    <Card className="shadow-none rounded-md bg-green-600 p-10">
      <CardContent className="flex flex-row items-start justify-between gap-3 p-0">
        <div className="flex flex-col">
          <h4 className="text-5xl font-bold tracking-wider text-white  leading-none font-jostFont capitalize">
            607
          </h4>
          <p className="text-lg  font-normal leading-tight capitalize font-jostFont text-white ">
            saved listing
          </p>
        </div>
        <div>
          <MapPin className="w-16 h-16 stroke-slate-100 fill-transparent" />
        </div>
      </CardContent>
    </Card>
  );
}
