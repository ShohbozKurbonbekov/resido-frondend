import { BookOpen, LayoutGrid } from "lucide-react";

interface MyBlogsHeaderType {
  title?: string;
  subtitle?: string;
}

export default function MyBlogsHeader({
  title = "My Blogs",
  subtitle = "Manage, edit, and organize all your published and draft blog posts.",
}: MyBlogsHeaderType) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white px-5 py-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-darkBlue/10">
          <BookOpen className="h-5 w-5 text-darkBlue" />
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-darkBlue sm:text-xl">
            {title}
          </h2>
          <p className="text-sm text-gray-600 sm:text-base">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <LayoutGrid className="h-4 w-4" />
        <span>
          Edit, delete, or update your blogs directly from this dashboard
        </span>
      </div>
    </div>
  );
}
