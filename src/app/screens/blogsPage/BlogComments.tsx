import NoFound from "@/app/components/NoFound";
import type { CommentType } from "@/lib/type/blogs";

interface BlogCommentsProp {
  comments: CommentType[];
}
export default function BlogComments({ comments }: BlogCommentsProp) {
  return (
    <div className="p-5 bg-white border-2 border-slate-200 rounded-md w-full">
      {comments?.length === 0 && <NoFound title={"No Comments yet"} />}
      {comments.length > 0 && (
        <>
          <h3 className="text-2xl text-darkBlue leading-7 mb-8 capitalize font-jostFont font-bold">
            {String(comments.length).padStart(
              comments.length === 0 ? 1 : 2,
              "0"
            )}{" "}
            comment{comments.length > 1 ? "s" : ""}
          </h3>
        </>
      )}
    </div>
  );
}
