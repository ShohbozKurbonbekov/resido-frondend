import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { SetStateType } from "@/lib/type/common";
import type { Message } from "@/lib/type/message";
import React from "react";

interface MemberMessageCardType {
  message: Message;
  setMainPageLoading: SetStateType<boolean>;
}
const MemberMessageCard: React.FC<MemberMessageCardType> = React.memo(
  ({ setMainPageLoading, message }) => {
    return (
      <Card>
        <CardHeader> header</CardHeader>
        <CardContent>Content</CardContent>
      </Card>
    );
  }
);

export default MemberMessageCard;
