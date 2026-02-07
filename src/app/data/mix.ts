import { TarrifStatus } from "@/lib/enums/pricing.enum";
import {
  ArchiveRestore,
  Power,
  Trash2Icon,
  type LucideIcon,
} from "lucide-react";

export const TARIFF_STATUS_ARR: {
  name: TarrifStatus;
  Icon: LucideIcon;
  label: string;
}[] = [
  { name: TarrifStatus.ARCHIVE, Icon: ArchiveRestore, label: "Archive" },
  { name: TarrifStatus.ACTIVE, Icon: Power, label: "Activate" },
  { name: TarrifStatus.DELETED, Icon: Trash2Icon, label: "Delete" },
];
