import {User, Question} from '@/types';
import next from 'next';


export async function createNewUser(name:string, location:string):Promise<User> {
  const resp = await fetch(`${process.env.BACKEND_API_URL}/users`, {next:{revalidate: 0}});
  if (!resp.ok) {
    throw new Error("Failed to create new user");
  }
  return resp.json();

}

export async function fetchQuestions(): Promise<Question[]> {
  const resp = await fetch(`${process.env.BACKEND_API_URL}/questions`, {next: {revalidate: 100}});
  if (!resp.ok) {
    throw new Error("Failed to fetch questions");
  }
  return resp.json();
}