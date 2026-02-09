import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CommonInput, SetStateType } from "@/lib/type/common";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

export interface StatusOption<Status extends string> {
  label: string;
  value: Status;
}

export default function AdminDashboardFilter<Status extends string>({
  filterInput,
  setFilterInput,
  statusOptions,
  setLoading,
  searchPlaceholder = "Search...",
}: {
  filterInput: CommonInput & {
    status?: Status;
    username?: string;
  };
  setLoading: SetStateType<boolean>;
  setFilterInput: SetStateType<
    CommonInput & {
      status?: Status;
      username?: string;
    }
  >;
  statusOptions: StatusOption<Status>[];
  searchPlaceholder?: string;
}) {
  const [inputValue, setInputValue] = useState<string>("");

  const onStatusChange = (status: string) => {
    const match = statusOptions.find((o) => o.value === status);
    if (match) {
      setFilterInput((prev) => ({ ...prev, status: match.value }));
    }
  };

  return (
    <div className="flex w-full flex-col gap-4  rounded-lg border border-slate-300 bg-white p-7  md:flex-row md:items-center">
      {/* Search */}
      <div className="relative w-full md:flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder={searchPlaceholder}
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setLoading(true);
              setFilterInput((prev) => ({
                ...prev,
                username: inputValue.trim(),
              }));
            }
          }}
          className="pl-9 focus-visible:ring-1 ring-slate-300 font-jostFont"
        />
      </div>

      {/* Status Select */}
      <div className="ml-auto md:w-56">
        <Select value={filterInput.status} onValueChange={onStatusChange}>
          <SelectTrigger className="flex gap-2">
            <Filter className="h-4 w-4 text-gray-400 font-jostFont" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>

          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="font-jostFont"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
