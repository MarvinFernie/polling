import { cookies } from 'next/headers';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { notFound } from 'next/navigation';
import { getPoll, hasUserVoted, hasUserUpvoted } from '@/lib/db';
import PollCard from '@/components/PollCard';

interface PollPageProps {
  params: {
    id: string;
  };
}

export default async function PollPage({ params }: PollPageProps) {
  const pollId = params.id;
  
  // Get or create user ID from cookies
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value || uuidv4();
  
  // Set the cookie if it doesn't exist
  if (!cookieStore.get('userId')) {
    cookies().set('userId', userId, { 
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
    });
  }
  
  // Fetch the poll data
  const poll = await getPoll(pollId);
  
  if (!poll) {
    notFound();
  }
  
  // Check if the user has voted or upvoted
  const hasVoted = await hasUserVoted(userId, pollId);
  const hasUpvoted = await hasUserUpvoted(userId, pollId);
  
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Link href="/polls" className="text-primary-600 hover:text-primary-700 font-medium">
          ← Back to Polls
        </Link>
        
        <h1 className="text-3xl font-bold text-primary-700">Poll</h1>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <PollCard 
          poll={poll} 
          userId={userId}
          initialVoted={hasVoted}
          initialUpvoted={hasUpvoted}
        />
      </div>
      
      <div className="text-center pt-4">
        <Link href="/polls/create" className="btn-primary">
          Create Your Own Poll
        </Link>
      </div>
    </div>
  );
}
