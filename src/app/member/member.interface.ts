export interface MemberProfile {
  name: string;
  role: "Team Member" | "Influencer";
  designation?: string; // for Team Member
  username?: string; // for Influencer
  photourl: string;
  bio?: string;
  location?: string;
  email?: string;
  phone?: string;

  // Influencer specific
  niche?: string;
  followers?: number;
  platforms?: string[]; // ["Instagram", "YouTube"]
  collaborationtype?: string[]; // ["Paid Promotion", "Affiliate Marketing"]
  engagementrate?: number;
  portfoliolinks?: string[];

  // Team Member specific
  skills?: string[];

  // Common social links
  sociallinks?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
  };
}
