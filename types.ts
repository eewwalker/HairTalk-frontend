import NextAuth, {DefaultSession} from "next-auth";
import {JWT} from "next-auth/jwt";

export interface User {
  id: number;
  username: string;
  password: string;
  location: string | null;
  access_token?: string;
}
export interface Question {
  id: number;
  user_id: number;
  content: string;
  created_at: Date;
  answers: number;

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
//Extend the NextAuth Session and User types
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      id: number;
      username: string;
      location: string | null;
    } & DefaultSession['user'];
  }
  interface User {
    id: number;
    username: string;
    password: string;
    location: string | null;
    access_token?: string;
  }
}
//Extend NextAuth JWT interface
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    userId?: number | string;
    username?: string;
    location?: string | null;
  }
}

