// Poll Types
export interface Poll {
  id: string;
  question: string;
  createdAt: number; // Timestamp
  options: PollOption[];
  upvotes: number;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

// User Interaction Types
export interface UserVote {
  userId: string;
  pollId: string;
  optionId: string;
  votedAt: number; // Timestamp
}

export interface UserUpvote {
  userId: string;
  pollId: string;
  upvotedAt: number; // Timestamp
}

// Poll Creation Types
export interface CreatePollData {
  question: string;
  options: string[]; // Option text strings
}