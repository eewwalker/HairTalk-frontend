export interface User {
  id: number;
  name: string;
  location: string
}

export interface Question {
  id: number;
  userId: number;
  content: string;
  created_at: Date

}

export interface Overlay {
  onClose: () => void;
}