import { Route, Routes } from "react-router-dom";
import ChooseAgent from "./ChooseAgent";
import AgentsList from "./Agents";

export default function AgentsPage() {
  return (
    <>
      <Routes>
        <Route path={`/:agentId`} element={<ChooseAgent />}></Route>

        <Route path={`/`} element={<AgentsList />}></Route>
      </Routes>
    </>
  );
}
