import { MessageSquareText } from "lucide-react";

interface UserCommentsHeaderType {
  title?: string;
  subtitle?: string;
}

export default function UserCommentsHeader({
  title = "Your Comments",
  subtitle = "Manage, edit, and review all comments you have written.",
}: UserCommentsHeaderType) {
  return (
    <div className="flex flex-col gap-3 bg-white rounded-md py-5 px-4 shadow-sm">
      <div className="flex items-center gap-2 font-bold text-darkBlue font-jostFont">
        <MessageSquareText className="w-5 h-5" />
        <h3 className="text-base sm:text-lg md:text-xl font-semibold capitalize">
          {title}
        </h3>
      </div>

      <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}
