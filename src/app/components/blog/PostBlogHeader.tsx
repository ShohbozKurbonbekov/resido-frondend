import { FileText, PenLine } from "lucide-react";

interface PostBlogHeaderType {
  title?: string;
  subtitle?: string;
}
export default function PostBlogHeader({
  title = "Create Blog Post",
  subtitle = "Write and publish articles to share insights, updates, and expertise with your audience.",
}: PostBlogHeaderType) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white px-5 py-6 shadow-sm border">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-darkBlue/10">
          <PenLine className="h-5 w-5 text-darkBlue" />
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-darkBlue sm:text-xl">
            {title}
          </h2>
          <p className="text-sm text-gray-600 sm:text-base">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <FileText className="h-4 w-4" />
        <span>Content will be visible to users after publishing</span>
      </div>
    </div>
  );
}
