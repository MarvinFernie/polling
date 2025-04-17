import { v4 as uuid } from 'uuid';
import { Poll, CreatePollData, PollOption, UserVote, UserUpvote } from './types';

// Constants for localStorage keys
const POLLS_STORAGE_KEY = 'social_polls_data';
const USER_VOTES_KEY = 'social_polls_user_votes';
const USER_UPVOTES_KEY = 'social_polls_user_upvotes';

// Helper function to initialize localStorage with sample data if empty
export function initializeLocalStorage() {
  if (typeof window === 'undefined') {
    return; // Skip during server-side rendering
  }
  
  const existingPolls = localStorage.getItem(POLLS_STORAGE_KEY);
  if (!existingPolls) {
    // Create sample polls
    const samplePolls: Poll[] = [
      {
        id: uuid(),
        question: 'What was the best bar at Duke?',
        options: [
          { id: uuid(), text: 'Shooters', votes: 0 },
          { id: uuid(), text: 'Devines', votes: 0 },
        ],
        upvotes: 0,
        createdAt: Date.now(),
      },
      {
        id: uuid(),
        question: 'Does Brittany Brady have a webbed ass?',
        options: [
          { id: uuid(), text: 'Yes', votes: 0 },
          { id: uuid(), text: 'No', votes: 0 },
          { id: uuid(), text: 'I don\'t believe in picking on Babs', votes: 0 },
        ],
        upvotes: 0,
        createdAt: Date.now() - 60000, // 1 minute ago
      },
      {
        id: uuid(),
        question: 'What baby will be born first?',
        options: [
          { id: uuid(), text: 'Baby Boy Clanon/Throsby', votes: 0 },
          { id: uuid(), text: 'Baby Boy Samuels/Forman', votes: 0 },
        ],
        upvotes: 0,
        createdAt: Date.now() - 120000, // 2 minutes ago
      },
    ];

    localStorage.setItem(POLLS_STORAGE_KEY, JSON.stringify(samplePolls));
    localStorage.setItem(USER_VOTES_KEY, JSON.stringify([]));
    localStorage.setItem(USER_UPVOTES_KEY, JSON.stringify([]));
  }
}

// Create a new poll
export async function createPoll(data: CreatePollData): Promise<string> {
  if (typeof window === 'undefined') {
    return ''; // Return empty string during server-side rendering
  }

  // Initialize localStorage if needed
  initializeLocalStorage();

  // Convert options to PollOption objects
  const options: PollOption[] = data.options.map((text) => ({
    id: uuid(),
    text,
    votes: 0,
  }));

  const newPoll: Poll = {
    id: uuid(),
    question: data.question,
    options,
    upvotes: 0,
    createdAt: Date.now(),
  };

  const pollsJSON = localStorage.getItem(POLLS_STORAGE_KEY) || '[]';
  const polls: Poll[] = JSON.parse(pollsJSON);
  
  polls.push(newPoll);
  localStorage.setItem(POLLS_STORAGE_KEY, JSON.stringify(polls));

  return newPoll.id;
}

// Get a poll by ID
export async function getPoll(id: string): Promise<Poll | null> {
  if (typeof window === 'undefined') {
    return null; // Return null during server-side rendering
  }

  // Initialize localStorage if needed
  initializeLocalStorage();

  const pollsJSON = localStorage.getItem(POLLS_STORAGE_KEY) || '[]';
  const polls: Poll[] = JSON.parse(pollsJSON);

  const poll = polls.find((p) => p.id === id);
  return poll || null;
}

// Get polls for the feed, sorted by upvotes
export async function getPolls(maxResults: number = 20): Promise<Poll[]> {
  if (typeof window === 'undefined') {
    return []; // Return empty array during server-side rendering
  }

  // Initialize localStorage if needed
  initializeLocalStorage();

  const pollsJSON = localStorage.getItem(POLLS_STORAGE_KEY) || '[]';
  const polls: Poll[] = JSON.parse(pollsJSON);

  // Sort by upvotes descending
  return polls
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, maxResults);
}

// Vote on a poll option
export async function vote(
  userId: string,
  pollId: string,
  optionId: string
): Promise<boolean> {
  if (typeof window === 'undefined') {
    return false; // Return false during server-side rendering
  }

  // Initialize localStorage if needed
  initializeLocalStorage();

  // Check if user has already voted on this poll
  const userVotesJSON = localStorage.getItem(USER_VOTES_KEY) || '[]';
  const userVotes: UserVote[] = JSON.parse(userVotesJSON);
  
  if (userVotes.some(vote => vote.userId === userId && vote.pollId === pollId)) {
    // User has already voted
    return false;
  }

  // Get all polls
  const pollsJSON = localStorage.getItem(POLLS_STORAGE_KEY) || '[]';
  const polls: Poll[] = JSON.parse(pollsJSON);

  // Find the poll
  const pollIndex = polls.findIndex((p) => p.id === pollId);
  if (pollIndex === -1) {
    return false;
  }

  // Find the option and increment its votes
  const optionIndex = polls[pollIndex].options.findIndex(opt => opt.id === optionId);
  if (optionIndex === -1) {
    return false;
  }

  // Update the vote count
  polls[pollIndex].options[optionIndex].votes += 1;
  localStorage.setItem(POLLS_STORAGE_KEY, JSON.stringify(polls));

  // Record the user's vote
  userVotes.push({
    userId,
    pollId,
    optionId,
    votedAt: Date.now(),
  });
  
  localStorage.setItem(USER_VOTES_KEY, JSON.stringify(userVotes));

  return true;
}

// Upvote a poll
export async function upvote(
  userId: string,
  pollId: string
): Promise<boolean> {
  if (typeof window === 'undefined') {
    return false; // Return false during server-side rendering
  }

  // Initialize localStorage if needed
  initializeLocalStorage();

  // Check if user has already upvoted this poll
  const userUpvotesJSON = localStorage.getItem(USER_UPVOTES_KEY) || '[]';
  const userUpvotes: UserUpvote[] = JSON.parse(userUpvotesJSON);
  
  if (userUpvotes.some(upvote => upvote.userId === userId && upvote.pollId === pollId)) {
    // User has already upvoted
    return false;
  }

  // Get all polls
  const pollsJSON = localStorage.getItem(POLLS_STORAGE_KEY) || '[]';
  const polls: Poll[] = JSON.parse(pollsJSON);

  // Find the poll
  const pollIndex = polls.findIndex((p) => p.id === pollId);
  if (pollIndex === -1) {
    return false;
  }

  // Increment upvotes
  polls[pollIndex].upvotes += 1;
  localStorage.setItem(POLLS_STORAGE_KEY, JSON.stringify(polls));

  // Record the user's upvote
  userUpvotes.push({
    userId,
    pollId,
    upvotedAt: Date.now(),
  });
  
  localStorage.setItem(USER_UPVOTES_KEY, JSON.stringify(userUpvotes));

  return true;
}

// Get a user's vote on a poll
export async function getUserVote(
  userId: string,
  pollId: string
): Promise<string | null> {
  if (typeof window === 'undefined') {
    return null; // Return null during server-side rendering
  }

  // Initialize localStorage if needed
  initializeLocalStorage();

  const userVotesJSON = localStorage.getItem(USER_VOTES_KEY) || '[]';
  const userVotes: UserVote[] = JSON.parse(userVotesJSON);
  
  const vote = userVotes.find(v => v.userId === userId && v.pollId === pollId);
  return vote ? vote.optionId : null;
}

// Check if a user has upvoted a poll
export async function hasUserUpvoted(
  userId: string,
  pollId: string
): Promise<boolean> {
  if (typeof window === 'undefined') {
    return false; // Return false during server-side rendering
  }

  // Initialize localStorage if needed
  initializeLocalStorage();

  const userUpvotesJSON = localStorage.getItem(USER_UPVOTES_KEY) || '[]';
  const userUpvotes: UserUpvote[] = JSON.parse(userUpvotesJSON);
  
  return userUpvotes.some(upvote => upvote.userId === userId && upvote.pollId === pollId);
}
