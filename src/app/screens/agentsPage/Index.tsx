import { Route, Routes } from "react-router-dom";
import ChooseAgent from "./ChooseAgent";
import AgentsList from "./Agents";
import AddAgent from "./AddAgent";
import AgentProperties from "./AgentProperties";

export default function AgentsPage() {
  return (
    <>
      <Routes>
        <Route path="/become-an-agent" element={<AddAgent />} />

        <Route path={`/:agentId`} element={<ChooseAgent />} />
        <Route path={`/:agentId/properties`} element={<AgentProperties />} />

        <Route path={`/`} element={<AgentsList />} />
      </Routes>
    </>
  );
}
