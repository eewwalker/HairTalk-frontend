import { Question, Resp, User } from '@/types';

/** USER */

//Create new user in DB => return 	"message": "User:username registered" || error
export async function createNewUser(username: string, password: string, location: string): Promise<Resp> {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register`, {
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
export async function validateUserCredentials(username: string, password: string): Promise<User | null> {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      }),
    });

    if (!resp.ok) {
      console.log('resp:', resp);
      const errorData = await resp.json();
      throw new Error(errorData.message || "Failed to successfully logged in");
    }

    const data = await resp.json();
    console.log('data:', data);
    console.log('data.user:', data.user);
    return data.user;

  } catch (error) {
    console.error('Error logging in user:', error);
    return null;
  }

}

//Get user from DB => return User | null
export async function getUser(userId:number):Promise<User | null> {
  try{
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/${userId}`, {
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
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/questions`, {
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
export async function createNewQuestion(userId: number, title: string, content: string): Promise<Question> {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        title,
        content,
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