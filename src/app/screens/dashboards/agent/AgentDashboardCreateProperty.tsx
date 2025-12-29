import AgentCreatePropertyContent from "./AgentCreatePropertyContent";
import AgentCreatePropertyHeader from "./AgentCreatePropertyHeader";

export default function AgentDashboardCreateProperty() {
  return (
    <div className="lg:col-span-9">
      <div className="flex flex-col gap-y-5">
        <AgentCreatePropertyHeader />
        <AgentCreatePropertyContent />
      </div>
    </div>
  );
}
