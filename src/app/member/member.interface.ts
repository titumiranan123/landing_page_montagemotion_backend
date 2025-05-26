export interface MemberProfile {
  id?: string;
  name: string;
  role: "team_member" | "influencer";
  designation?: string;
  photourl: string;
  email?: string;
  phone?: string;
  bio?: string;
  position?: number;
  created_at?: string;
  updated_at?: string;
}
