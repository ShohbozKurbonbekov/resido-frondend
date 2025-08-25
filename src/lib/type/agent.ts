export interface Agent {
  agentImage: string;
  agentName: string;
  agentProperties: number;
  agentLocation?: string;
  agentDescription?: string;
  agentContacts?: AgentSocialContacts;
  agentPhone: string;
  agentRating: number;
  agentReviews: number;
}

export interface AgentSocialContacts {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}
