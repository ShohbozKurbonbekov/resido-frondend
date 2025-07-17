import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Quote } from "lucide-react";

export default function PreviewCard() {
  return (
    <Card
      className="shadow-none  flex flex-col 
    items-center"
    >
      <CardHeader>
        <div className="max-w-[80px] max-h-[80px] relative">
          <img src="/img/user-3.jpg" className="rounded-full" alt="" />
          <span className="absolute right-0 bottom-0 h-7 w-7 rounded-full bg-blue-700 flex items-center justify-center">
            <Quote className="h-3 w-3 text-slate-50 origin-center rotate-180" />
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-7">
        <p className="leading-[1.3] text-sm font-jostFont text-slate-400 text-center">
          Cicero famously orated against his political opponent Lucius Sergius
          Catilina. Occasionally the first Oration against Catiline is taken
          specimens.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col ">
        <h5 className="font-jostFont text-lg text-darkBlue font-bold">
          Adam Williams
        </h5>
        <p className="font-loraFont text-sm text-darkBlue">CEO of Microsoft</p>
      </CardFooter>
    </Card>
  );
}
