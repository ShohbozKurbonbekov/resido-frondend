import { Route, Routes } from "react-router-dom";
import AdminAddTariff from "./AdminAddTariff";
import DashboardPostBlog from "@/app/components/blog/DashboardPostBlog";

export default function AdminFeaturesPage() {
  return (
    <Routes>
      <Route path={`/add/tariff-form`} element={<AdminAddTariff />}></Route>
      <Route
        path={`/post/blog`}
        element={
          <div className="container w-full py-20">
            <DashboardPostBlog />
          </div>
        }
      ></Route>
    </Routes>
  );
}
