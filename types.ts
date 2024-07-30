import { DefaultSession } from "next-auth";

// Define the User interface
export interface User {
  id: number;
  username: string;
  password: string;
  location: string | null;
  access_token?: string;
}

// Define the Question interface
export interface Question {
  id: number;
  user_id: number;
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

// Define the Token interface
export interface Token {
  access_token: string;
  userId: number;
}

// Define a custom UserSession interface that extends the DefaultSession
export interface UserSession {
  id: number;
  username: string;
  location: string | null;
  name?: string | null;
}

// Define a custom Session interface that extends the DefaultSession
export interface CustomSession extends DefaultSession {
  accessToken?: string;
  user: UserSession;
}

// Extend the NextAuth Session and User types
declare module "next-auth" {
  interface Session extends CustomSession {}
  interface User {
    id: number;
    username: string;
    password: string;
    location: string | null;
    access_token?: string;
  }
}

// Extend the NextAuth JWT interface
declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    userId?: number | string;
    username?: string;
    location?: string | null;
  }
}
