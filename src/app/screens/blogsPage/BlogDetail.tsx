import { useParams } from "react-router-dom";

export default function BlogDetail() {
  const { blogId } = useParams<{ blogId: string }>();
  console.log(blogId);
  return <div>Hello world</div>;
}
