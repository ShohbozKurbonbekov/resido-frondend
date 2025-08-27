import type { T } from "@/lib/type/common";

interface SomeInfoSectionProp {
  title: string;
  extraFeature?: React.ReactNode;
  data: T;
}

export default function SomeInfoSection({
  title,
  extraFeature,
  data,
}: SomeInfoSectionProp) {
  const infoList = [
    { key: "ceo", label: data.valName },
    { key: "email", label: data.valEmail },
    { key: "phone", label: data.valPhone },
    { key: "skype", label: data.valSkype },
    { key: "address", label: data.valAddress },
    { key: "city", label: data.valCity },
    { key: "country", label: data.valCountry },
    { key: "stab", label: data.valMemberyear },
  ];

  return (
    <div className="bg-white rounded-md  p-[15px_40px_40px] flex flex-col space-y-3 items-stretch">
      <div className="border-s-0 border-t-0 border-e-0 border-b-slate-200 border-2 pb-2 mb-4 h-auto flex flex-row items-center justify-between">
        <h4 className="text-base font-bold leading-[26px] text-darkBlue font-jostFont capitalize ">
          {title}
        </h4>
        {extraFeature}
      </div>

      <ul className="py-1 list-none grid grid-cols-2 items-start justify-items-start leading-[1.5]  gap-y-3 rounded-sm">
        {infoList.map(({ key, label }) => (
          <li className="flex flex-col">
            <strong className="text-darkBlue font-bold font-jostFont text-size_15 capitalize">
              {key}
            </strong>
            <span className="text-size_15 text-blue-500 font-light font-jostFont capitalize">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
