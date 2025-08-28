import { Route, Routes } from "react-router-dom";
import ChooseAgent from "./ChooseAgent";
import AgentsList from "./Agents";
import AddAgent from "./AddAgent";

export default function AgentsPage() {
  return (
    <>
      <Routes>
        <Route path="/become-an-agent" element={<AddAgent />} />

        <Route path={`/:agentId`} element={<ChooseAgent />} />

        <Route path={`/`} element={<AgentsList />} />
      </Routes>
    </>
  );
}
