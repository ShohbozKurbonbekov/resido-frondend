import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Column, RowAction } from "@/lib/type/common";
import { MoreHorizontalIcon } from "lucide-react";

export default function AdminDashboardUtilityCard<
  Status extends string,
  T extends { id: string; status: Status },
>({
  columns,
  data,
  actions,
}: {
  columns: Column<T>[];
  data: T[];
  actions?: RowAction<T, Status>[];
}) {
  return (
    <div className="w-full overflow-x-auto rounded-md border font-jostFont">
      <Table className="min-w-[700px]">
        <TableHeader>
          <TableRow className="bg-muted/100 hover:bg-muted">
            {columns.map((col) => (
              <TableHead
                key={String(col.key)}
                className="font-semibold border border-l-0 border-t-0"
              >
                {col.header}
              </TableHead>
            ))}
            {actions && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} className="hover:bg-muted/60">
              {columns.map((col) => (
                <TableCell
                  key={String(col.key)}
                  className="border border-l-0 border-b-0"
                >
                  {col.render ? col.render(row) : String(row[col.key])}
                </TableCell>
              ))}
              {actions && (
                <TableCell>
                  <ButtonGroup className="w-full flex justify-end">
                    <Button disabled variant="outline" className="bg-white">
                      Actions
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label="More Options"
                        >
                          <MoreHorizontalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-20 mr-10">
                        <DropdownMenuGroup className="space-y-1">
                          {actions
                            .filter((a) => a.status !== row.status)
                            .map((action) => (
                              <DropdownMenuItem key={action.label} asChild>
                                <button
                                  key={action.label}
                                  className={`w-full border ${action.btnClasses}`}
                                  onClick={() => action.onClick?.(row)}
                                >
                                  {action.label}
                                </button>
                              </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </ButtonGroup>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
