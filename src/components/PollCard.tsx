import { useState } from 'react';
import { Poll, PollOption } from '@/lib/types';
import { formatVotes, calculatePercentage } from '@/lib/utils';
import { vote, upvotePoll, hasUserVoted, hasUserUpvoted } from '@/lib/db';

interface PollCardProps {
  poll: Poll;
  userId: string;
  initialVoted?: boolean;
  initialUpvoted?: boolean;
}

export default function PollCard({
  poll,
  userId,
  initialVoted = false,
  initialUpvoted = false,
}: PollCardProps) {
  const [hasVoted, setHasVoted] = useState(initialVoted);
  const [hasUpvoted, setHasUpvoted] = useState(initialUpvoted);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [pollData, setPollData] = useState<Poll>(poll);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Calculate total votes
  const totalVotes = pollData.options.reduce((sum, option) => sum + option.votes, 0);

  const handleVote = async () => {
    if (!selectedOption || hasVoted || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Submit vote to database
      const success = await vote(userId, pollData.id, selectedOption);
      
      if (success) {
        // Update local state to reflect the new vote
        setHasVoted(true);
        
        // Update the poll data with the new vote count
        setPollData(prev => {
          const updatedOptions = prev.options.map(option => {
            if (option.id === selectedOption) {
              return { ...option, votes: option.votes + 1 };
            }
            return option;
          });
          
          return { ...prev, options: updatedOptions };
        });
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpvote = async () => {
    if (hasUpvoted || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Submit upvote to database
      const success = await upvotePoll(userId, pollData.id);
      
      if (success) {
        // Update local state to reflect the new upvote
        setHasUpvoted(true);
        
        // Update the poll data with the new upvote count
        setPollData(prev => ({
          ...prev,
          upvotes: prev.upvotes + 1
        }));
      }
    } catch (error) {
      console.error('Error upvoting poll:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{pollData.question}</h3>
        <button 
          onClick={handleUpvote}
          disabled={hasUpvoted || isSubmitting}
          className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${hasUpvoted 
            ? 'bg-primary-100 text-primary-700' 
            : 'hover:bg-gray-100 text-gray-500 hover:text-primary-600'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          <span>{pollData.upvotes}</span>
        </button>
      </div>
      
      <div className="space-y-3 mb-4">
        {pollData.options.map((option) => (
          <div key={option.id} className="space-y-1">
            {!hasVoted ? (
              // Display voting options if user hasn't voted yet
              <button
                onClick={() => setSelectedOption(option.id)}
                className={`w-full text-left p-3 rounded-lg border ${selectedOption === option.id 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-300 hover:border-gray-400'}`}
              >
                {option.text}
              </button>
            ) : (
              // Display results if user has voted
              <div className="relative">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{option.text}</span>
                  <span className="text-gray-500">{calculatePercentage(option.votes, totalVotes)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary-600 h-2.5 rounded-full" 
                    style={{ width: `${calculatePercentage(option.votes, totalVotes)}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {!hasVoted && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{formatVotes(totalVotes)}</span>
          <button
            onClick={handleVote}
            disabled={!selectedOption || isSubmitting}
            className={`btn-primary ${(!selectedOption || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Vote'}
          </button>
        </div>
      )}
      
      {hasVoted && (
        <div className="text-sm text-gray-500">
          {formatVotes(totalVotes)}
        </div>
      )}
    </div>
  );
}
