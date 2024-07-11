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
}