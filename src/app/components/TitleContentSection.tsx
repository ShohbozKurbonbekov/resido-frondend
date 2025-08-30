interface TitleContentSectionProp {
  sectionTitle: React.ReactNode;
  sectionContent: React.ReactNode;
  sectionClass: string;
}
export default function TitleContentSection({
  sectionTitle,
  sectionContent,
  sectionClass,
}: TitleContentSectionProp) {
  return (
    <section className={`${sectionClass}`}>
      {sectionTitle}
      {sectionContent}
    </section>
  );
}
