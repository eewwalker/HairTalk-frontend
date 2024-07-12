export interface User {
  id: number;
  username: string;
  password: string;
  location: string | null;
}
export interface Question {
  id: number;
  userId: number;
  content: string;
  created_at: Date;

}
export interface Overlay {
  onClose: () => void;
}

export interface Resp {
  message: string;
}

export interface Token {
  access_token: string;
  userId: number;
}

export interface AuthContextType {
  user: User | null;
  login: (username:string, password:string) => Promise<void>;
  logout: () => void;
}