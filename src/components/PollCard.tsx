'use client';

import { useState, useEffect } from 'react';
import { Poll, PollOption } from '@/lib/types';
import { formatVotes, calculatePercentage } from '@/lib/utils';
import { useUser } from './UserProvider';

interface PollCardProps {
  poll: Poll;
  initialVoted?: boolean;
  initialUpvoted?: boolean;
}

export default function PollCard({
  poll,
  initialVoted = false,
  initialUpvoted = false,
}: PollCardProps) {
  const { userId } = useUser();
  const [hasVoted, setHasVoted] = useState(initialVoted);
  const [hasUpvoted, setHasUpvoted] = useState(initialUpvoted);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [pollData, setPollData] = useState<Poll>(poll);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Calculate total votes
  const totalVotes = pollData.options.reduce((sum, option) => sum + option.votes, 0);
  
  // Check if user has already voted on this poll (using localStorage)
  useEffect(() => {
    const checkVoteStatus = () => {
      // Check for vote in localStorage
      const voteKey = `poll_vote_${pollData.id}`;
      const upvoteKey = `poll_upvote_${pollData.id}`;
      
      if (localStorage.getItem(voteKey)) {
        setHasVoted(true);
      }
      
      if (localStorage.getItem(upvoteKey)) {
        setHasUpvoted(true);
      }
    };
    
    if (userId && !initialVoted && !initialUpvoted) {
      checkVoteStatus();
    }
  }, [userId, pollData.id, initialVoted, initialUpvoted]);

  const handleVote = async () => {
    if (!selectedOption || hasVoted || isSubmitting || !userId) return;
    
    setIsSubmitting(true);
    
    try {
      // We'll implement a direct Firestore call here instead of using server actions
      const { vote } = await import('@/lib/db');
      const success = await vote(userId, pollData.id, selectedOption);
      
      if (success) {
        // Save vote in localStorage
        localStorage.setItem(`poll_vote_${pollData.id}`, selectedOption);
        
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
    if (hasUpvoted || isSubmitting || !userId) return;
    
    setIsSubmitting(true);
    
    try {
      // Direct Firestore call instead of server action
      const { upvotePoll } = await import('@/lib/db');
      const success = await upvotePoll(userId, pollData.id);
      
      if (success) {
        // Save upvote in localStorage
        localStorage.setItem(`poll_upvote_${pollData.id}`, 'true');
        
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
    <div className="card overflow-hidden transform transition-all duration-300 hover:translate-y-[-2px] animate-fade-in">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-semibold text-white">{pollData.question}</h3>
        <button 
          onClick={handleUpvote}
          disabled={hasUpvoted || isSubmitting}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm transition-all duration-300 
            ${hasUpvoted 
              ? 'bg-accent-subtle text-accent-light border border-accent/30' 
              : 'hover:bg-accent-subtle/50 border border-transparent hover:border-accent/20 text-gray-400 hover:text-accent'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${hasUpvoted ? 'text-accent' : 'group-hover:translate-y-[-1px]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          <span>{pollData.upvotes}</span>
        </button>
      </div>
      
      <div className="space-y-3 mb-6">
        {pollData.options.map((option) => (
          <div key={option.id} className="space-y-2">
            {!hasVoted ? (
              // Display voting options if user hasn't voted yet
              <button
                onClick={() => setSelectedOption(option.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 
                ${selectedOption === option.id 
                  ? 'border-accent bg-accent-subtle shadow-subtle' 
                  : 'border-border bg-surface hover:border-border-light hover:bg-surface-light'}`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border ${selectedOption === option.id 
                    ? 'border-accent bg-accent' 
                    : 'border-border'} mr-3 flex items-center justify-center transition-all duration-300`}>
                    {selectedOption === option.id && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className={`${selectedOption === option.id ? 'text-accent-light' : 'text-gray-300'} transition-colors duration-300`}>
                    {option.text}
                  </span>
                </div>
              </button>
            ) : (
              // Display results if user has voted
              <div className="p-4 rounded-xl border border-border bg-surface">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-200">{option.text}</span>
                  <span className="text-accent font-medium">{calculatePercentage(option.votes, totalVotes)}%</span>
                </div>
                <div className="w-full bg-surface-light rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-3 rounded-full bg-gradient-to-r from-accent to-accent-light transition-all duration-1000 ease-out"
                    style={{ width: `${calculatePercentage(option.votes, totalVotes)}%` }}
                  ></div>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {option.votes} {option.votes === 1 ? 'vote' : 'votes'}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {!hasVoted && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-gray-400">{formatVotes(totalVotes)}</span>
          <button
            onClick={handleVote}
            disabled={!selectedOption || isSubmitting}
            className={`btn-primary w-full sm:w-auto flex items-center justify-center ${(!selectedOption || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Submit Vote
              </>
            )}
          </button>
        </div>
      )}
      
      {hasVoted && (
        <div className="flex items-center mt-4 pt-4 border-t border-border text-sm text-gray-400">
          <svg className="h-4 w-4 text-accent mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>
            You voted - {formatVotes(totalVotes)}
          </span>
        </div>
      )}
    </div>
  );
}
