import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { SetStateType } from "@/lib/type/common";
import { useCallback } from "react";

type AgencyPaymentSuccessModalTypes = {
  open: boolean;
  onOpenChange: SetStateType<boolean>;
};

export function AgencyPaymentSuccessModal({
  open,
  onOpenChange,
}: AgencyPaymentSuccessModalTypes) {
  const navigation = useNavigate();

  const handleGoToDashboard = useCallback(() => {
    onOpenChange(false);
    navigation("/dashboard", { replace: true });
  }, [navigation, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md font-jostFont">
        <DialogHeader className="text-center">
          <div className="flex justify-center gap-2 mb-4">
            <CreditCard className="h-10 w-10 text-green-600" />
            <Building2 className="h-10 w-10 text-green-600" />
          </div>

          <DialogTitle className="text-xl font-semibold">
            Payment Successful — Agency Activated
          </DialogTitle>

          <DialogDescription className="mt-2 text-sm text-muted-foreground">
            Your payment has been processed successfully. Your agency account is
            now active, and you have full access to agency features including
            property management, agent control, and listings.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6">
          <Button className="w-full" onClick={handleGoToDashboard}>
            Go to Agency Dashboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
