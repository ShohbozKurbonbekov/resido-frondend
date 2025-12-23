import { useGlobals } from "@/app/hooks/useGlobals";
import { Route, Routes } from "react-router-dom";
import MainContentAgent from "./MainContentAgent";

export default function AgentDashboard() {
  const { authmember } = useGlobals();
  console.log(authmember);
  return (
    <>
      <>
        <MainContentAgent>
          <Routes>
            <Route index element={""} />
            <Route path={``} element={""}></Route>
            <Route path={``} element={""}></Route>
            <Route path={``} element={""}></Route>

            <Route path={""} element={""}></Route>

            <Route path={``} element={""}></Route>

            <Route path={``} element={""}></Route>
          </Routes>
        </MainContentAgent>
      </>
    </>
  );
}
