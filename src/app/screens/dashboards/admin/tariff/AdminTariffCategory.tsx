import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOrder } from "@/lib/enums/blog.enum";
import { TarrifStatus } from "@/lib/enums/pricing.enum";
import type { CommonInput, SetStateType } from "@/lib/type/common";
import { Plus } from "lucide-react";

const selectTriggerClasss =
  "w-full focus:ring-slate-200 border py-5 font-jostFont &>span]:line-clamp-4 text-sm md:base";
interface AdminTariffCategoryType {
  onStatusChange: (status: TarrifStatus) => void;
  onSort: (status: SortOrder) => void;
  setAdminTariffInput: SetStateType<
    CommonInput & { status?: TarrifStatus; sort?: SortOrder }
  >;
  adminTariffInput: CommonInput & { status?: TarrifStatus; sort?: SortOrder };
}
export default function AdminTariffCategory({
  adminTariffInput,
  onStatusChange,
  onSort,
}: AdminTariffCategoryType) {
  const { status, sort } = adminTariffInput;
  return (
    <div className="grid grid-cols-[2fr_5fr] md:grid-cols-1 gap-1 sm:gap-3 md:gap-5 rounded-md  bg-white">
      <div className="flex flex-col items-center justify-center border border-slate-200 rounded-md p-2 shrink-0">
        <Avatar className="mx-auto h-20 w-20">
          <AvatarImage src={"/img/tariff.png"} />
        </Avatar>
        <h4 className="text-tight text-sm md:text-lg capitalize text-gray-800 font-semibold text-center font-jostFont ">
          category
        </h4>
      </div>

      <div className="p-3 md:p-0 space-y-2 shrink">
        <Button className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-600 text-white truncate text-ellipsis w-full  text-sm md:base">
          <Plus className="h-4 w-4 " />
          Add Tariff Plan
        </Button>

        {/* Filters */}
        {sort && status && (
          <>
            {/* Status filter */}
            {status && (
              <Select
                value={status}
                onValueChange={(status) =>
                  onStatusChange(status as TarrifStatus)
                }
              >
                <SelectTrigger className={selectTriggerClasss}>
                  <SelectValue placeholder={"Select status"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TarrifStatus.ACTIVE}>Active</SelectItem>
                  <SelectItem value={TarrifStatus.ARCHIVE}>Archived</SelectItem>
                  <SelectItem value={TarrifStatus.DELETED}>Deleted</SelectItem>
                </SelectContent>
              </Select>
            )}

            {/* Sort filter */}
            {sort && (
              <Select
                value={sort}
                onValueChange={(sort) => onSort(sort as SortOrder)}
              >
                <SelectTrigger className={selectTriggerClasss}>
                  <SelectValue
                    className="capitalize"
                    placeholder={"By order"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={SortOrder.DESC}>Newest first</SelectItem>
                  <SelectItem value={SortOrder.ASC}>Oldest first</SelectItem>
                </SelectContent>
              </Select>
            )}
          </>
        )}
      </div>
    </div>
  );
}
