export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  contact_number: string;
  role: "admin" | "user";
}

export interface UserDetails {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  province: string | null;
  district: string | null;
  city: string | null;
  address: string | null;
  profile_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: User | null;
  userDetails: UserDetails | null;
  token: string | null;
  login: (email: string, password: string) => Promise<any>;
  isLoading: boolean;
  showDetailsModal: boolean;
  setShowDetailsModal: (show: boolean) => void;
 }