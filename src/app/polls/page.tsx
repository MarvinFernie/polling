import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import PollFeed from '@/components/PollFeed';

export default function PollsPage() {
  // Get or create user ID from cookies
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value || uuidv4();
  
  // Set the cookie if it doesn't exist
  if (!cookieStore.get('userId')) {
    cookies().set('userId', userId, { 
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
    });
  }
  
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-primary-700">Polls</h1>
        <p className="text-gray-600">Browse and vote on polls. The most popular polls appear at the top.</p>
      </div>
      
      <PollFeed userId={userId} />
    </div>
  );
}
