export interface ICampaign {
  id?: string;
  email: string;
  phone: string;
  ovc: string;
  message: string;
  selectedinfuencers: string[];
  budget: string;
  project_brief: string;
  is_read: string;
  is_marked: string;
  is_rejected: boolean;
}
