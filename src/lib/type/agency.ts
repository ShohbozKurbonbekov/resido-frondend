export interface agencyContactsType {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  email: string;
  skype?: string;
}
export interface Agency {
  agencyName: string;
  agencyAgentNumbers?: number;
  agencyImage: string;
  agencyLocation: string;
  agencyPropertyNumbers?: number;
  agencySocialContacts: agencyContactsType;
  agencyDescription?: string;
  agencyOwner: string;
  agencyPhone: string;
  agencyCountry: string;
  agencyCity: string;
  agencyMemberyear: number;
}

export interface AgencyInquery {}
