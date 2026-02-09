import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface AdminDashboardUtilityWrapperType {
  children: React.ReactNode;
}
export default function AdminDashboardUtilityWrapper({
  children,
}: AdminDashboardUtilityWrapperType) {
  return (
    <Card className="rounded-md shadow-sm">
      <CardContent className="p-4 sm:p-6">{children}</CardContent>
    </Card>
  );
}
