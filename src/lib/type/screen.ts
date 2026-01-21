import type {
  ChosenProperty,
  CommonPropertyResults,
  FeaturedPropertyResults,
  MyProperties,
  Properties,
  RecentPropertyResult,
} from "./property";
import type {
  AgentDashboardOverviewType,
  AgentProperties,
  AgentsListPage,
  ChosenAgentPageType,
  FeaturedAgentsResult,
  FollowedAgentsType,
} from "./agent";
import type { Comment, Comments } from "./comment";
import type {
  AgenciesListPage,
  Agency,
  AgencySubscriptionInfoType,
  ChosenAgencyTargetItemsType,
} from "./agency";
import type {
  BlogsListPage,
  ChosenBlogComments,
  ChosenBlogType,
  SavedBlogsOutput,
} from "./blogs";
import type { User, UserDashboardOverviewType } from "./dashboard/user";
import type { MemberMessages } from "./message";
import type { PaymentTariffsType } from "./pricing";
// REACTT APP STATE
export interface AppRootState {
  homepage: HomePageState;
  propertiesPage: PropertiesPageState;
  agentsPage: AgentsPageState;
  agenciesPage: AgenciesPageState;
  blogsPage: BlogsPageState;
  contactUsPage: ContactUsPageState;
  userDashboardPage: UserDashboardPage;
  agentDashboardPage: AgentDashboardPage;
  agencyDashboardPage: AgencyDashboardPage;
  paymentTariffsPage: PaymentTariffsPage;
}

// HOMEPAGE
export interface HomePageState {
  recentPropertyForRent: RecentPropertyResult;
  featuredProperties: FeaturedPropertyResults;
  featuredAgents: FeaturedAgentsResult;
  latestComments: Comment[];
}

// PROPERTIES PAGE
export interface PropertiesPageState {
  properties: Properties;
  chosenProperty: ChosenProperty;
  chosenPropComments: Comments;
}

// AGENTS PAGE
export interface AgentsPageState {
  agentsListPage: AgentsListPage;
  chosenAgentPage: ChosenAgentPageType;
  chosenAgentProperties: AgentProperties;
  chosenAgentComments: Comments;
}

// AGENCIES PAGE
export interface AgenciesPageState {
  agenciesListPage: AgenciesListPage;
  chosenAgencyPage: Agency | null;
  chosenAgencyTargetItems: ChosenAgencyTargetItemsType;
}

// BLOGS PAGE
export interface BlogsPageState {
  blogsListPage: BlogsListPage;
  chosenBlogPage: ChosenBlogType;
  chosenBlogComments: ChosenBlogComments;
}

// CONTACT US PAGE
export interface ContactUsPageState {
  adminData: User | null;
}

export interface PaymentTariffsPage {
  tariffPlans: PaymentTariffsType;
}

////////////////////////////////////////////////////////////////
// DASHBOARD

// USER DASHBOARD PAGE
export interface UserDashboardPage {
  savedProperties: Properties;
  followedAgents: FollowedAgentsType;
  savedBlogs: SavedBlogsOutput;
  getUserComments: Comments;
  getMemberMessages: MemberMessages;
  userDashboardOverview: UserDashboardOverviewType;
}

// AGENT DASHBOARD PAGE
export interface AgentDashboardPage {
  agentMyBlogs: BlogsListPage;
  getAgentMessages: MemberMessages;
  myallReviews: Comments;
  agentMyProperties: CommonPropertyResults<MyProperties>;
  agentDashboardOverview: AgentDashboardOverviewType;
}

// AGENCY DASHBOARD PAGE
export interface AgencyDashboardPage {
  agencyMyBlogs: BlogsListPage;
  getAgencyMessages: MemberMessages;
  agencySubscriptionInfo: AgencySubscriptionInfoType;
}
