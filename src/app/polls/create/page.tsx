import Link from 'next/link';
import CreatePollForm from '@/components/CreatePollForm';

export default function CreatePollPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/polls" className="text-gray-400 hover:text-accent transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </Link>
        <h1 className="text-3xl font-bold text-white">Create a Poll</h1>
      </div>
      
      <div className="rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 p-0.5 shadow-card backdrop-blur-sm max-w-2xl mx-auto">
        <div className="bg-card rounded-2xl p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-accent-subtle flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Create Poll</h2>
                <p className="text-gray-300 text-sm">Ask a question and create a poll for others to answer</p>
              </div>
            </div>
          </div>
          
          <CreatePollForm />
        </div>
      </div>
      
      <div className="text-center">
        <Link href="/polls" className="text-accent hover:text-accent-light font-medium transition-colors duration-200 inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          View all polls
        </Link>
      </div>
    </div>
  );
}
