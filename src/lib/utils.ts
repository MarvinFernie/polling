import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a unique ID
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Formats a number of votes
 */
export function formatVotes(votes: number): string {
  if (votes === 0) return '0 votes';
  if (votes === 1) return '1 vote';
  return `${votes} votes`;
}

/**
 * Calculates the percentage of votes for an option
 */
export function calculatePercentage(votes: number, totalVotes: number): number {
  if (totalVotes === 0) return 0;
  return Math.round((votes / totalVotes) * 100);
}
