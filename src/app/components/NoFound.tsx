import { SearchX } from "lucide-react";

type NoFoundProps = {
  title: string;
  borderColor?: string;
};

export default function NoFound({ title, borderColor = "none" }: NoFoundProps) {
  return (
    <div
      className="w-full border-2  flex flex-col py-20 items-center text-[#0c2339] "
      style={{ borderColor }}
    >
      <h4 className="font-bold italic text-3xl mb-2 capitalize">{title}</h4>
      <SearchX size="100px" />
    </div>
  );
}
