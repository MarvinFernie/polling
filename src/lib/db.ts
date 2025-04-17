import { Poll, CreatePollData, PollOption, UserVote, UserUpvote } from './types';
import * as localStorage from './localStorage';

// Initialize localStorage with sample data
if (typeof window !== 'undefined') {
  localStorage.initializeLocalStorage();
}

// No collections needed with localStorage

/**
 * Create a new poll
 */
export async function createPoll(data: CreatePollData): Promise<string> {
  return localStorage.createPoll(data);
}

/**
 * Get a poll by ID
 */
export async function getPoll(id: string): Promise<Poll | null> {
  return localStorage.getPoll(id);
}

/**
 * Get polls for the feed, sorted by upvotes
 */
export async function getPolls(maxResults: number = 20): Promise<Poll[]> {
  return localStorage.getPolls(maxResults);
}

/**
 * Vote on a poll option
 */
export async function vote(
  userId: string,
  pollId: string,
  optionId: string
): Promise<boolean> {
  return localStorage.vote(userId, pollId, optionId);
}



/**
 * Upvote a poll
 */
export async function upvotePoll(
  userId: string,
  pollId: string
): Promise<boolean> {
  return localStorage.upvote(userId, pollId);
}

/**
 * Check if a user has voted on a poll
 */
export async function hasUserVoted(
  userId: string,
  pollId: string
): Promise<boolean> {
  const vote = await getUserVote(userId, pollId);
  return vote !== null;
}

/**
 * Check if a user has upvoted a poll
 */
export async function hasUserUpvoted(
  userId: string,
  pollId: string
): Promise<boolean> {
  return localStorage.hasUserUpvoted(userId, pollId);
}

/**
 * Get a user's vote for a poll
 */
export async function getUserVote(
  userId: string,
  pollId: string
): Promise<string | null> {
  return localStorage.getUserVote(userId, pollId);
}