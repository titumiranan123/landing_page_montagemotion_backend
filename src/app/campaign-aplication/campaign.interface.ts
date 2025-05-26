export interface ICampaign {
  id?: string;
  name: string;
  email: string;
  phone: string;
  ovc: string;
  message: string;
  //  step 2
  selectedinfuencers: string[];
  // step3
  budget: string;
  project_brief: string;
  // 4 th step
  is_read?: boolean;
  is_marked?: boolean;
  is_rejected?: boolean;
  is_sent?: boolean;
  rejected_message?: string;
  created_at?: Date;
  updated_at?: Date;
}
