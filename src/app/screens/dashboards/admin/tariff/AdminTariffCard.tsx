import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, Pencil } from "lucide-react";
import type { TarrifOutputType } from "@/lib/type/pricing";
import React from "react";
import { customLetterCustomise } from "@/lib/utils";
import { TarrifStatus } from "@/lib/enums/pricing.enum";
import type { SetStateType } from "@/lib/type/common";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TARIFF_STATUS_ARR } from "@/app/data/mix";

interface AdminTariffCardType {
  tariff: TarrifOutputType;
  setTariffId: SetStateType<null | string>;
  onAdminStatusChange: (id: string, status: TarrifStatus) => Promise<void>;
}
const AdminTariffCard: React.FC<AdminTariffCardType> = React.memo(
  ({ tariff, setTariffId, onAdminStatusChange }) => {
    const tariffStatus = TARIFF_STATUS_ARR.filter(
      (obj) => tariff.status !== obj.name,
    );

    return (
      <Card className="flex flex-col  w-full max-w-md bg-white border border-slate-200 rounded-md shadow-sm hover:shadow-lg transition-shadow mx-auto">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between font-jostFont">
            <CardTitle className="text-lg font-semibold tracking-tight text-gray-700">
              {tariff.name}
            </CardTitle>
            <Badge
              variant={"default"}
              className={
                tariff.status === TarrifStatus.ACTIVE
                  ? "bg-emerald-600 text-white"
                  : tariff.status === TarrifStatus.ARCHIVE
                    ? "bg-slate-400 text-white"
                    : "bg-red-500 text-white"
              }
            >
              {tariff.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Price */}
          <div className="flex items-baseline gap-2 font-jostFont">
            <span className="text-3xl font-bold text-gray-700">
              {tariff.currency} {tariff.price}
            </span>
            <span className="text-sm text-muted-foreground capitalize">
              / {customLetterCustomise(tariff.billingCycle)}
            </span>
          </div>

          {/* Limits */}
          <div className="grid grid-cols-2 gap-1 text-sm font-jostFont">
            <div className="rounded-md border border-slate-200 p-2 text-center">
              <p className="font-medium">Agents</p>
              <p className="text-slate-600">{tariff.limits.agents}</p>
            </div>
            <div className="rounded-md border border-slate-200 p-2 text-center">
              <p className="font-medium">Properties</p>
              <p className="text-slate-600">{tariff.limits.properties}</p>
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-1 text-sm text-slate-600 font-jostFont">
            {tariff.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="flex-1 flex-col justify-end">
          <div className="flex flex-row justify-between gap-2 flex-wrap w-full">
            <Button
              variant="outline"
              size="sm"
              className="flex gap-2"
              onClick={() => setTariffId(tariff._id)}
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Button>

            <ButtonGroup>
              <Button
                disabled
                variant="outline"
                className="bg-white"
                onClick={() => {}}
              >
                Change status
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
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuGroup className="space-y-1">
                    {}
                    {tariffStatus.map((t) => {
                      const { Icon, label, name } = t;
                      return (
                        <DropdownMenuItem key={name} asChild>
                          <Button
                            onClick={() =>
                              onAdminStatusChange(tariff._id, name)
                            }
                            variant={"outline"}
                            className=" border hover:bg-green-200 delay-0 w-full flex items-center justify-start"
                          >
                            <Icon />
                            {label}
                          </Button>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </div>
        </CardFooter>
      </Card>
    );
  },
);

export default AdminTariffCard;
