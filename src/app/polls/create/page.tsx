import Link from 'next/link';
import CreatePollForm from '@/components/CreatePollForm';

export default function CreatePollPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-primary-700">Create a Poll</h1>
        <p className="text-gray-600">Ask a question and create a poll for others to answer.</p>
      </div>
      
      <div className="card max-w-2xl mx-auto">
        <CreatePollForm />
      </div>
      
      <div className="text-center">
        <Link href="/polls" className="text-primary-600 hover:text-primary-700 font-medium">
          ← Back to Polls
        </Link>
      </div>
    </div>
  );
}
