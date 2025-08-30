export interface TeamMemberType {
  id: string;
  memberName: string;
  memberRole: string; // e.g. CEO, CTO, Marketing
  photoUrl: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
  };
}
export interface CommonSectionType {
  title: string;
  subtitle: string;
  members?: TeamMemberType[] | undefined;
}
