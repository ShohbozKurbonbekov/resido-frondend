export interface Agent {
  agentImage: string;
  agentName: string;
  agentMemberYear: number;
  agentPhone: string;
  agentLocation: string;
  agentPosition: string;
  agentCountry: string;
  agentCity: string;
  agentContacts: AgentSocialContacts;
  agentProperties?: number;
  agentDescription?: string;
  agentRating?: number;
  agentReviews?: number;
}

export interface AgentInquery {}

export interface AgentSocialContacts {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  email: string;
  skype?: string;
}
