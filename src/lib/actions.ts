'use server';

import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

/**
 * Gets or creates a user ID from cookies
 * This is a server action that can be called from client or server components
 */
export async function getUserId(): Promise<string> {
  const cookieStore = cookies();
  const existingUserId = cookieStore.get('userId')?.value;
  
  // If we already have a userId, return it
  if (existingUserId) {
    return existingUserId;
  }
  
  // Generate a new userId
  const newUserId = uuidv4();
  
  // Set the cookie using the cookieStore instance
  cookieStore.set('userId', newUserId, { 
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    httpOnly: true,
    sameSite: 'strict',
    path: '/'
  });
  
  return newUserId;
}

/**
 * Sets a vote for a poll
 */
export async function submitVote(pollId: string, optionId: string): Promise<boolean> {
  const userId = await getUserId();
  
  try {
    // Import here to avoid issues with 'use server' directive
    const { vote } = await import('./db');
    return await vote(userId, pollId, optionId);
  } catch (error) {
    console.error('Error submitting vote:', error);
    return false;
  }
}

/**
 * Submits an upvote for a poll
 */
export async function submitUpvote(pollId: string): Promise<boolean> {
  const userId = await getUserId();
  
  try {
    // Import here to avoid issues with 'use server' directive
    const { upvotePoll } = await import('./db');
    return await upvotePoll(userId, pollId);
  } catch (error) {
    console.error('Error upvoting poll:', error);
    return false;
  }
}

/**
 * Creates a new poll
 */
export async function createNewPoll(question: string, options: string[]): Promise<string | null> {
  try {
    // Import here to avoid issues with 'use server' directive
    const { createPoll } = await import('./db');
    const pollId = await createPoll({ question, options });
    return pollId;
  } catch (error) {
    console.error('Error creating poll:', error);
    return null;
  }
}