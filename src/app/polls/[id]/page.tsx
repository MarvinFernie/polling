'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { getPoll } from '@/lib/db';
import PollCard from '@/components/PollCard';
import { Poll } from '@/lib/types';

export default function PollPage() {
  const params = useParams();
  const pollId = params.id as string;
  
  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialVoted, setInitialVoted] = useState(false);
  const [initialUpvoted, setInitialUpvoted] = useState(false);
  
  useEffect(() => {
    const fetchPoll = async () => {
      try {
        // Fetch the poll data
        const pollData = await getPoll(pollId);
        
        if (!pollData) {
          notFound();
        }
        
        setPoll(pollData);
        
        // Check localStorage for votes and upvotes
        const voteKey = `poll_vote_${pollId}`;
        const upvoteKey = `poll_upvote_${pollId}`;
        
        setInitialVoted(!!localStorage.getItem(voteKey));
        setInitialUpvoted(!!localStorage.getItem(upvoteKey));
      } catch (error) {
        console.error('Error fetching poll:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPoll();
  }, [pollId]);
  
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <Link href="/polls" className="text-accent hover:text-accent-light font-medium">
            ← Back to Polls
          </Link>
          
          <h1 className="text-3xl font-bold text-accent-light">Poll</h1>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="card animate-pulse">
            <div className="h-5 bg-border rounded w-3/4 mb-4"></div>
            <div className="space-y-3 mb-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-12 bg-border rounded"></div>
              ))}
            </div>
            <div className="h-4 bg-border rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <Link 
            href="/polls" 
            className="flex items-center justify-center w-8 h-8 rounded-full bg-surface hover:bg-surface-light transition-colors duration-200 text-gray-400 hover:text-accent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-white">View Poll</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="badge-primary">
            <svg className="h-3 w-3 mr-1 inline" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            {initialVoted ? 'You voted' : 'Not voted yet'}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3 md:col-start-2">
          {poll && (
            <PollCard 
              poll={poll}
              initialVoted={initialVoted}
              initialUpvoted={initialUpvoted}
            />
          )}
        </div>
      </div>
      
      <div className="border-t border-border pt-6 mt-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            Want to get more responses? Share this poll with others!
          </p>
          <div className="flex items-center gap-3">
            <Link href="/polls" className="btn-outline py-2 px-4">
              View All Polls
            </Link>
            <Link href="/polls/create" className="btn-primary py-2 px-4 flex items-center">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create New Poll
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
