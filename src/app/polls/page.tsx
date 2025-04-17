import Link from 'next/link';
import PollFeed from '@/components/PollFeed';

export default function PollsPage() {
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">All Polls</h1>
          <p className="text-gray-300">Browse and vote on polls. The most popular polls appear at the top.</p>
        </div>
        <Link href="/polls/create" className="btn-primary flex items-center">
          <svg className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create Poll
        </Link>
      </div>
      
      <PollFeed />
    </div>
  );
}
