import { Question, Resp, Token, User } from '@/types';

/** USER */

//Create new user in DB => return 	"message": "User:username registered" || error
export async function createNewUser(username: string, password: string, location: string): Promise<Resp> {
  try {
    const resp = await fetch(`${process.env.BACKEND_API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        location
      }),
      next: { revalidate: 0 },
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.message || "Failed to create new user");
    }
    return resp.json();

  } catch (error) {
    console.error('Error creating new user:', error);
    throw error;
  }

}

//Login user => return 	user || error
export async function logInUser(username: string, password: string): Promise<User> {
  try {
    const resp = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      }),
      credentials: 'include',
      next: { revalidate: 0 }
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.message || "Failed to successfully logged in");
    }
    const data = await resp.json();
    const user: User = {
      id: data.user.id,
      username: data.user.username,
      password: '',
      location: data.user.location,
      access_token: data.access_token
    }
    return user;

  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }

}

//Get user from DB => return User | null
export async function getUser(userId:number):Promise<User | null> {
  try{
    const resp = await fetch(`${process.env.BACKEND_API_URL}/users/${userId}`, {
      method: 'GET',
      credentials: 'include',
    });
    if(!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.message || "Failed to successfully fetch user");
    }
    const user: User = await resp.json();
    return user;

  }catch(error) {
    console.error('Error fetching user:', error);
    return null;
  }
}


/** QUESTION  */

//Get all questions from DB => return [Question, Question..] || error
export async function fetchQuestions(): Promise<Question[]> {
  try {
    const resp = await fetch(`${process.env.BACKEND_API_URL}/questions`, {
      next: { revalidate: 100 }
    });
    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.message || "Failed to fetch questions");
    }
    return resp.json();

  } catch (error) {
    console.log('Failed fetching questions');
    throw error;
  }
}

//Create new question in DB => return Question || error
export async function createNewQuestion(userId: number, content: string, createdAt: Date): Promise<Question> {
  try {
    const resp = await fetch(`${process.env.BACKEND_API_URL}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        content,
        createdAt
      }),
      next: { revalidate: 0 }
    });
    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.message || "Failed to create new question");
    }
    return resp.json();

  } catch (error) {
    console.error('Failed creating new question');
    throw error;
  }
}