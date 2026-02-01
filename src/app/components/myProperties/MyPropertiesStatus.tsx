import { useGlobals } from "@/app/hooks/useGlobals";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MemberType } from "@/lib/enums/agent.enum";
import { PropertyStatus } from "@/lib/enums/property.enum";

interface MyPropertiesStatusType {
  value?: PropertyStatus;
  onChange: (value: PropertyStatus) => void;
}

export default function MyPropertiesStatus({
  value,
  onChange,
}: MyPropertiesStatusType) {
  const { authmember } = useGlobals();
  return (
    <div className="py-3 px-5 border border-slate-200 rounded-md bg-white">
      <Select
        value={value ?? PropertyStatus.AVAILABLE}
        onValueChange={(val) => onChange(val as PropertyStatus)}
      >
        <SelectTrigger className="w-[220px] ml-auto text-xs md:text-sm text-gray-700 font-jostFont capitalize focus:ring-0 bg-white shadow-none border border-slate-200">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value={PropertyStatus.PENDING_APPROVAL}>
            Pending approval
          </SelectItem>

          <SelectItem value={PropertyStatus.AVAILABLE}>Available</SelectItem>

          <SelectItem value={PropertyStatus.RENTED}>Rented</SelectItem>

          <SelectItem value={PropertyStatus.SOLD}>Sold</SelectItem>

          <SelectItem value={PropertyStatus.ARCHIVED}>Archived</SelectItem>
          <SelectItem value={PropertyStatus.REJECTED}>Rejected</SelectItem>
          {authmember?.role === MemberType.AGENT && (
            <SelectItem value={PropertyStatus.DRAFT}>Draft</SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
