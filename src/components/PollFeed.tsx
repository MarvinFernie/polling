'use client';

import { useEffect, useState } from 'react';
import { Poll } from '@/lib/types';
import { getPolls } from '@/lib/db';
import PollCard from './PollCard';
import { useUser } from './UserProvider';

export default function PollFeed() {
  const { userId } = useUser();
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [votedMap, setVotedMap] = useState<Record<string, boolean>>({});
  const [upvotedMap, setUpvotedMap] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        console.log("Fetching polls...");
        // Fetch polls from the database
        const pollsData = await getPolls();
        console.log("Polls fetched:", pollsData);
        
        if (pollsData.length === 0) {
          console.log("No polls found in database. Check if seeding was successful.");
        }
        
        setPolls(pollsData);

        // Check localStorage for votes and upvotes
        if (userId) {
          const votedMapData: Record<string, boolean> = {};
          const upvotedMapData: Record<string, boolean> = {};
          
          pollsData.forEach((poll) => {
            // Check if user has voted on this poll in localStorage
            const voteKey = `poll_vote_${poll.id}`;
            const upvoteKey = `poll_upvote_${poll.id}`;
            
            votedMapData[poll.id] = !!localStorage.getItem(voteKey);
            upvotedMapData[poll.id] = !!localStorage.getItem(upvoteKey);
          });
          
          setVotedMap(votedMapData);
          setUpvotedMap(upvotedMapData);
        }
      } catch (error) {
        console.error('Error fetching polls:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPolls();
    
    // Re-fetch polls every 5 seconds during development to check for updates
    const intervalId = setInterval(fetchPolls, 5000);
    
    return () => clearInterval(intervalId);
  }, [userId]);
  
  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card animate-pulse overflow-hidden">
            <div className="flex justify-between mb-6">
              <div className="h-6 bg-surface-light rounded-lg w-2/3"></div>
              <div className="h-8 w-16 bg-surface-light rounded-full"></div>
            </div>
            <div className="space-y-4 mb-6">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-16 bg-surface rounded-xl border border-border"></div>
              ))}
            </div>
            <div className="h-px bg-border w-full mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-surface-light rounded w-20"></div>
              <div className="h-10 bg-surface-light rounded-lg w-32"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (polls.length === 0) {
    return (
      <div className="card animate-fade-in overflow-hidden">
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-3">No polls found</h3>
          <p className="text-gray-300 max-w-md mx-auto mb-6">
            Polls have been seeded but aren't showing up yet. Try these steps:
          </p>
          
          <div className="bg-surface rounded-xl border border-border p-6 max-w-lg mx-auto mb-6">
            <ul className="text-left space-y-3 mb-0 text-gray-300">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-subtle flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-accent">1</span>
                </div>
                <span>Check the console for Firebase connection errors</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-subtle flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-accent">2</span>
                </div>
                <span>Return to the home page and try seeding the database again</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-subtle flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-accent">3</span>
                </div>
                <span>Verify that your Firebase configuration is correct</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-subtle flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-accent">4</span>
                </div>
                <span>Create a new poll to test the database connection</span>
              </li>
            </ul>
          </div>
          
          <div className="flex justify-center space-x-4">
            <a href="/" className="btn-primary inline-flex items-center">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Return to Home
            </a>
            <a href="/polls/create" className="btn-outline inline-flex items-center">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create Poll
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {polls.map((poll) => (
        <PollCard 
          key={poll.id} 
          poll={poll}
          initialVoted={votedMap[poll.id] || false}
          initialUpvoted={upvotedMap[poll.id] || false}
        />
      ))}
    </div>
  );
}
