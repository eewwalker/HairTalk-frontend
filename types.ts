import { DefaultSession, DefaultUser } from "next-auth";
import "next-auth"

// // Define the User interface
export interface User {
  id: string;
  username: string;
  password: string;
  location: string | null;
}

// Define the Question interface
export interface Question {
  id: number;
  title: string;
  userId: string;
  content: string;
  created_at: Date;
  answers: number;
  tags: string[] | [];
}

// Define the Overlay interface
export interface Overlay {
  onClose: () => void;
}

// Define the Resp interface
export interface Resp {
  message: string;
}

// Define the LoginSchema interface
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      location: string | null;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    username: string;
    location: string | null;
  }
}

// Extend the JWT interface
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    location: string | null;
  }
}

//Define Pagination Type
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  pages: number;
  currentPage: number;
}

//Define TagInput Type
  //Dispatch: Type for funcs that use state updates
export interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}