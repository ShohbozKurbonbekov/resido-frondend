import type { SellerDataType } from "@/lib/type/common";
import { dateConverter } from "@/lib/utils";
import React, { useMemo } from "react";

// ------------------------------------ COMPONENT --------------------------------
interface KeyValuesType {
  key: string;
  value: string | number;
}
interface SellerInfoType {
  data: SellerDataType;
  title: string;
  extraFeature?: React.ReactNode;
}
const SellerInfo: React.FC<SellerInfoType> = React.memo(
  ({ data, title, extraFeature = null }) => {
    const infoList = useMemo(() => {
      const {
        role,
        address,
        currentStatus,
        name,
        isVerified,
        memberEmail,
        phone,
        yearOfExperience,
        rank,
        memberYear,
      } = data;

      const keyValues: KeyValuesType[] = [
        { key: "phone", value: phone || "N/A" },
        { key: "verified", value: isVerified ? "Yes" : "No" },
        { key: "email", value: memberEmail || "N/A" },
        { key: "experience", value: yearOfExperience || "N/A" },
        {
          key: "address",
          value: address || "N/A",
        },
      ];

      if (role === "agent") {
        const agentName = { key: "Agent name", value: name || "N/A" };
        const status = { key: "status", value: currentStatus || "N/A" };
        const agentRank = {
          key: "rank",
          value: rank ? rank.replace(/([a-z](?=[A-Z]))/g, "$1 ") : "N/A",
        };
        keyValues.push(agentName, status, agentRank);
      } else {
        const ceo = { key: "ceo", value: name || "N/A" };
        const yearMember = {
          key: "memberSince",
          value: memberYear ? dateConverter(memberYear, "Do MMMM YYYY") : "N/A",
        };

        const agencyRank = {
          key: "rank",
          value: rank ? rank : "N/A",
        };
        keyValues.push(ceo, agencyRank, yearMember);
      }
      return keyValues;
    }, [data]);

    return (
      <div className="bg-white rounded-md  p-[15px_40px_40px] flex flex-col space-y-3 items-stretch">
        <div className="border-s-0 border-t-0 border-e-0 border-b-slate-200 border-2 pb-2 mb-4 h-auto flex flex-row items-center justify-between">
          <h4 className="text-base font-bold leading-onePointEight text-darkBlue font-jostFont capitalize ">
            {title}
          </h4>
          {extraFeature}
        </div>

        <ul className="py-1 list-none grid grid-cols-2 items-start justify-items-start leading-normal  gap-y-3 rounded-sm">
          {infoList.map(({ key, value }) => (
            <li className="flex flex-col" key={value}>
              <strong className="text-darkBlue font-bold font-jostFont text-size_15 capitalize">
                {key}
              </strong>
              <span className="text-size_15 text-blue-500 font-light font-jostFont capitalize">
                {value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default SellerInfo;
