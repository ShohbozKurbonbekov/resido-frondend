import { Route, Routes } from "react-router-dom";
import BlogDetail from "./BlogDetail";
import BlogLists from "./BlogLists";

export default function BlogsPage() {
  return (
    <>
      <Routes>
        <Route path={`/:blogId`} element={<BlogDetail />} />

        <Route path={`/`} element={<BlogLists />} />
      </Routes>
    </>
  );
}
