export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  verified: boolean;
}
export interface UserDynamicData {
  id: string;
  user_id: string;
  reset_password_token: string | null;
  reset_password_expire_at: Date | null;
  verification_token: string | null;
  verification_token_expires_at: Date | null;
  updated_at: Date;
}
export interface UserLoginHistory {
  id?: string;
  user_id: string;
  device: string | null;
  browser: string | null;
  ip_address: string;
  login_time: Date;
  location: string | null;
  is_successful: boolean;
}
