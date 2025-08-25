export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  contact_number: string;
  role: "admin" | "user";
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<User>;
  isLoading: boolean;
}
