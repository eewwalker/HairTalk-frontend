import {User, Question} from '@/types';

/** USER */

//Create new user in DB => return User || error
export async function createNewUser(name:string, location:string):Promise<User> {
  const resp = await fetch(`${process.env.BACKEND_API_URL}/users`, {next:{revalidate: 0}});
  if (!resp.ok) {
    throw new Error("Failed to create new user");
  }
  return resp.json();

}


/** QUESTION  */

//Get all questions from DB => return [Question, Question..] || error
export async function fetchQuestions(): Promise<Question[]> {
  const resp = await fetch(`${process.env.BACKEND_API_URL}/questions`, {next: {revalidate: 100}});
  if (!resp.ok) {
    throw new Error("Failed to fetch questions");
  }
  return resp.json();
}

//Create new question in DB => return Question || error
export async function createNewQuestion(userId:number, content:string, createdAt:Date):Promise<Question> {
  const resp = await fetch(`${process.env.BACKEND_API_URL}/questions`, {next:{revalidate: 0}});
  if (!resp.ok) {
    throw new Error("Failed to create new question");
  }
  return resp.json();
}