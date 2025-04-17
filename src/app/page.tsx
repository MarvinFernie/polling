import Link from 'next/link';
import SeedDatabase from '@/components/SeedDatabase';

export default function Home() {
  return (
    <div className="space-y-12 animate-fade-in">
      <header className="text-center space-y-5 py-6">
        <div className="inline-block mb-2 px-3 py-1 bg-accent-subtle rounded-full">
          <p className="text-sm font-medium text-accent-light">Modern Social Polling Platform</p>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
          Social Poll
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Create and answer polls in a sleek, social format
        </p>
      </header>

      {/* Seed Database Component */}
      <SeedDatabase />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="card group">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent-subtle mb-4 
                          transition-all duration-300 ease-in-out group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-white group-hover:text-accent-light transition-colors duration-300">
              Answer Polls
            </h2>
          </div>
          <p className="text-gray-300 mb-7">
            Join the conversation by answering polls. See what others think after you participate.
          </p>
          <div className="mt-auto">
            <Link href="/polls" className="btn-primary inline-flex items-center group-hover:translate-x-1 transition-transform duration-300">
              Browse Polls
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="card group">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent-subtle mb-4
                          transition-all duration-300 ease-in-out group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-white group-hover:text-accent-light transition-colors duration-300">
              Create a Poll
            </h2>
          </div>
          <p className="text-gray-300 mb-7">
            Have a question? Create a poll and collect anonymous feedback at scale.
          </p>
          <div className="mt-auto">
            <Link href="/polls/create" className="btn-primary inline-flex items-center group-hover:translate-x-1 transition-transform duration-300">
              Create Poll
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <section className="card backdrop-blur-sm bg-card/95 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-2xl font-semibold mb-6 text-white">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: 1,
              title: "Create or Find a Poll",
              description: "Browse existing polls or create your own question with custom answers"
            },
            {
              step: 2,
              title: "Submit Your Answer",
              description: "Select your response to participate in the conversation"
            },
            {
              step: 3,
              title: "View Results & Upvote",
              description: "See what others think and upvote polls you find interesting"
            }
          ].map((item, index) => (
            <div key={index} className="p-4 text-center group transform transition-all duration-300 hover:translate-y-[-5px]">
              <div className="relative">
                <div className="bg-accent-subtle text-accent-light w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold
                             transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-subtle">
                  {item.step}
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-24 h-24 bg-accent-light rounded-full opacity-0 
                              group-hover:opacity-10 blur-xl transition-all duration-500 pointer-events-none"></div>
              </div>
              <h3 className="text-lg font-medium mb-3 text-accent group-hover:text-accent-light transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      
      <div className="text-center">
        <Link href="/polls" className="btn-outline inline-flex items-center">
          <span>Explore All Polls</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
