import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary-700">Social Poll</h1>
        <p className="text-xl text-gray-600">
          Create and answer polls in a social format
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Answer Polls</h2>
          <p className="text-gray-600 mb-6">
            Join the conversation by answering polls. See what others think after you participate.
          </p>
          <Link href="/polls" className="btn-primary inline-block">
            Browse Polls
          </Link>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Create a Poll</h2>
          <p className="text-gray-600 mb-6">
            Have a question? Create a poll and collect anonymous feedback at scale.
          </p>
          <Link href="/polls/create" className="btn-primary inline-block">
            Create Poll
          </Link>
        </div>
      </div>

      <section className="card">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 text-center">
            <div className="bg-primary-100 text-primary-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
            <h3 className="text-lg font-medium mb-2">Create or Find a Poll</h3>
            <p className="text-gray-600">Browse existing polls or create your own question with custom answers</p>
          </div>
          <div className="p-4 text-center">
            <div className="bg-primary-100 text-primary-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
            <h3 className="text-lg font-medium mb-2">Submit Your Answer</h3>
            <p className="text-gray-600">Select your response to participate in the conversation</p>
          </div>
          <div className="p-4 text-center">
            <div className="bg-primary-100 text-primary-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
            <h3 className="text-lg font-medium mb-2">View Results & Upvote</h3>
            <p className="text-gray-600">See what others think and upvote polls you find interesting</p>
          </div>
        </div>
      </section>
    </div>
  );
}
