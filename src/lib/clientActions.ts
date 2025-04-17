'use client';

import { getUserId } from './actions';

/**
 * Client-side wrapper for the getUserId server action
 * This is needed when client components need to access the user ID
 */
export async function getClientUserId(): Promise<string> {
  return await getUserId();
}