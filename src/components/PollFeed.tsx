import { useEffect, useState } from 'react';
import { Poll } from '@/lib/types';
import { getPolls, hasUserVoted, hasUserUpvoted } from '@/lib/db';
import PollCard from './PollCard';

interface PollFeedProps {
  userId: string;
}

export default function PollFeed({ userId }: PollFeedProps) {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [votedMap, setVotedMap] = useState<Record<string, boolean>>({});
  const [upvotedMap, setUpvotedMap] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        // Fetch polls from the database
        const pollsData = await getPolls();
        setPolls(pollsData);
        
        // Check user's votes and upvotes for each poll
        const votePromises = pollsData.map(poll => hasUserVoted(userId, poll.id));
        const upvotePromises = pollsData.map(poll => hasUserUpvoted(userId, poll.id));
        
        const voteResults = await Promise.all(votePromises);
        const upvoteResults = await Promise.all(upvotePromises);
        
        // Create maps of which polls the user has voted on and upvoted
        const votedMapData: Record<string, boolean> = {};
        const upvotedMapData: Record<string, boolean> = {};
        
        pollsData.forEach((poll, index) => {
          votedMapData[poll.id] = voteResults[index];
          upvotedMapData[poll.id] = upvoteResults[index];
        });
        
        setVotedMap(votedMapData);
        setUpvotedMap(upvotedMapData);
      } catch (error) {
        console.error('Error fetching polls:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPolls();
  }, [userId]);
  
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-3 mb-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }
  
  if (polls.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-700 mb-2">No polls found</h3>
        <p className="text-gray-500">Be the first to create a poll!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {polls.map((poll) => (
        <PollCard 
          key={poll.id} 
          poll={poll} 
          userId={userId}
          initialVoted={votedMap[poll.id] || false}
          initialUpvoted={upvotedMap[poll.id] || false}
        />
      ))}
    </div>
  );
}
