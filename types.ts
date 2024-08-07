import { DefaultSession, DefaultUser } from "next-auth";

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
  user_id: string;
  content: string;
  created_at: Date;
  answers: number;
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

