import { customTruncate } from "@/lib/config";
import { TarrifStatus } from "@/lib/enums/pricing.enum";
import type { AdminGetCommentsType } from "@/lib/type/comment";
import type { Column } from "@/lib/type/common";
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
////////////////////////////// Comments ///////////////////////
export const commentColumns: Column<AdminGetCommentsType>[] = [
  {
    key: "content",
    header: "Comment",
    render: (row) => customTruncate(row.content, 30),
  },
  { key: "author", header: "Author" },
  { key: "status", header: "Status" },
  {
    key: "date",
    header: "Date",
    render: (row) => new Date(row.date).toLocaleString(),
  },
];
