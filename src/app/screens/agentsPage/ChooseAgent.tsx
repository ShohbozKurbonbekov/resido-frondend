export default function ChooseAgent() {
  const { agentId } = useParams<{ agentId: string }>();
  console.log(agentId);

  if (!chosenAgent) return null;

  return (
    <>
      {/* // Section introduction */}
      <SectionIntroNoBackground
        title="Agent Detail"
        subtitle="Adam D. Okraar from Canada"
      />
      <SectionTopShortInfo
        shortInfo={{
          logo: chosenAgent.agentImage,
          name: chosenAgent.agentName,
          location: chosenAgent.agentLocation,
          description: chosenAgent.agentDescription,
          propertyNumber: chosenAgent.agentProperties,
          ...chosenAgent.agentContacts,
        }}
      />
      <AgentDetailMainContent
        featuredProperty={featuredProperty}
        agentProperties={agentProperties}
        agent={chosenAgent}
      />
    </>
  );
}
