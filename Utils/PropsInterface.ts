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
  userProfile: any; 
  updateUserProfile: (profileData: any) => void; 
}
export interface Image {
  id: string;
  filename: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  images: Image[];
  likes_count?: number;
  comments_count?: number;
}
export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "user" | "admin"; 
  status: "pending" | "active" | "banned"; 
  contact_number: string;
  created_at: string; 
  updated_at: string;
  avatar: string | null; 
}
