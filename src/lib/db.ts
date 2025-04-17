import { db } from './firebase';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  increment,
  limit,
  serverTimestamp,
  DocumentReference,
  DocumentData,
  Timestamp,
  CollectionReference,
  Firestore,
} from 'firebase/firestore';
import { Poll, CreatePollData, PollOption, UserVote, UserUpvote } from './types';

// Ensure Firestore is initialized
if (!db) {
  throw new Error('Firestore is not initialized');
}

// Collection references
const pollsCollection = collection(db as Firestore, 'polls');
const userVotesCollection = collection(db as Firestore, 'userVotes');
const userUpvotesCollection = collection(db as Firestore, 'userUpvotes');

/**
 * Create a new poll
 */
export async function createPoll(data: CreatePollData): Promise<string> {
  if (!db) throw new Error('Firestore is not initialized');
  // Convert options to PollOption objects
  const options: PollOption[] = data.options.map((text) => ({
    id: Math.random().toString(36).substring(2, 15),
    text,
    votes: 0,
  }));

  // Create new poll document
  const docRef = await addDoc(pollsCollection, {
    question: data.question,
    options,
    upvotes: 0,
    createdAt: Date.now(),
  });

  return docRef.id;
}

/**
 * Get a poll by ID
 */
export async function getPoll(id: string): Promise<Poll | null> {
  if (!db) throw new Error('Firestore is not initialized');
  const docRef = doc(db as Firestore, 'polls', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  const data = docSnap.data();
  return {
    id: docSnap.id,
    ...data,
  } as Poll;
}

/**
 * Get polls for the feed, sorted by upvotes
 */
export async function getPolls(maxResults: number = 20): Promise<Poll[]> {
  if (!db) throw new Error('Firestore is not initialized');
  try {
    console.log("Querying Firestore for polls...");
    
    // Make sure db is initialized
    if (!db) {
      console.error("Firestore db is not initialized");
      return [];
    }
    
    // Sort by upvotes only to avoid composite index requirement
    const q = query(
      pollsCollection, 
      orderBy('upvotes', 'desc'), 
      limit(maxResults)
    );
    
    const querySnapshot = await getDocs(q);
    console.log(`Found ${querySnapshot.docs.length} polls`);
    
    // Map docs to Poll objects with proper type safety
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        question: data.question || "",
        options: data.options || [],
        upvotes: data.upvotes || 0,
        createdAt: data.createdAt || Date.now(),
      } as Poll;
    });
  } catch (error) {
    console.error("Error getting polls:", error);
    return [];
  }
}

/**
 * Vote on a poll option
 */
export async function vote(
  userId: string,
  pollId: string,
  optionId: string
): Promise<boolean> {
  if (!db) throw new Error('Firestore is not initialized');
  if (!db) {
    console.error('Firebase DB not initialized');
    return false;
  }

  // Check if user has already voted on this poll
  const q = query(
    userVotesCollection,
    where('userId', '==', userId),
    where('pollId', '==', pollId)
  );
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // User has already voted
    return false;
  }

  // Get the poll document
  const pollRef = doc(db as Firestore, 'polls', pollId);
  const pollSnap = await getDoc(pollRef);

  if (!pollSnap.exists()) {
    return false;
  }

  const pollData = pollSnap.data() as Poll;
  const options = pollData.options;

  // Find the option and update its votes
  const optionIndex = options.findIndex((opt) => opt.id === optionId);
  if (optionIndex === -1) {
    return false;
  }

  // Update the option's vote count
  options[optionIndex].votes = options[optionIndex].votes + 1;

  // Update the poll document
  await updateDoc(pollRef, {
    options: options,
  });

  // Record the user's vote
  await addDoc(userVotesCollection, {
    userId,
    pollId,
    optionId,
    votedAt: Date.now(),
  });

  return true;
}

/**
 * Upvote a poll
 */
export async function upvotePoll(
  userId: string,
  pollId: string
): Promise<boolean> {
  if (!db) throw new Error('Firestore is not initialized');
  // Check if user has already upvoted this poll
  const q = query(
    userUpvotesCollection,
    where('userId', '==', userId),
    where('pollId', '==', pollId)
  );
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // User has already upvoted
    return false;
  }

  // Get the poll document
  const pollRef = doc(db as Firestore, 'polls', pollId);
  const pollSnap = await getDoc(pollRef);

  if (!pollSnap.exists()) {
    return false;
  }

  // Update the poll's upvote count
  await updateDoc(pollRef, {
    upvotes: increment(1),
  });

  // Record the user's upvote
  await addDoc(userUpvotesCollection, {
    userId,
    pollId,
    upvotedAt: Date.now(),
  });

  return true;
}

/**
 * Check if a user has voted on a poll
 */
export async function hasUserVoted(
  userId: string,
  pollId: string
): Promise<boolean> {
  const q = query(
    userVotesCollection,
    where('userId', '==', userId),
    where('pollId', '==', pollId)
  );
  const querySnapshot = await getDocs(q);

  return !querySnapshot.empty;
}

/**
 * Check if a user has upvoted a poll
 */
export async function hasUserUpvoted(
  userId: string,
  pollId: string
): Promise<boolean> {
  const q = query(
    userUpvotesCollection,
    where('userId', '==', userId),
    where('pollId', '==', pollId)
  );
  const querySnapshot = await getDocs(q);

  return !querySnapshot.empty;
}

/**
 * Get a user's vote for a poll
 */
export async function getUserVote(
  userId: string,
  pollId: string
): Promise<string | null> {
  const q = query(
    userVotesCollection,
    where('userId', '==', userId),
    where('pollId', '==', pollId)
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const vote = querySnapshot.docs[0].data() as UserVote;
  return vote.optionId;
}