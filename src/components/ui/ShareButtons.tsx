'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  pollId: string;
  question: string;
}

export function ShareButtons({ pollId, question }: ShareButtonsProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Construct the full URL to the poll
  const pollUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/polls/${pollId}`
    : '';

  // Share on Twitter
  const shareOnTwitter = () => {
    const text = `Check out this poll: ${question}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(pollUrl)}`;
    window.open(url, '_blank');
  };

  // Share on Facebook
  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pollUrl)}`;
    window.open(url, '_blank');
  };

  // Copy link to clipboard
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pollUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="mt-4 flex flex-col items-start space-y-2">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Share this poll:</p>
      <div className="flex space-x-3">
        {/* Twitter button */}
        <button
          onClick={shareOnTwitter}
          className="p-2 rounded-full bg-[#1DA1F2] hover:bg-[#0d8fd9] transition-colors"
          aria-label="Share on Twitter"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill="white"
            viewBox="0 0 16 16"
          >
            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
          </svg>
        </button>
        
        {/* Facebook button */}
        <button
          onClick={shareOnFacebook}
          className="p-2 rounded-full bg-[#4267B2] hover:bg-[#365899] transition-colors"
          aria-label="Share on Facebook"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill="white"
            viewBox="0 0 16 16"
          >
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
          </svg>
        </button>
        
        {/* Copy link button */}
        <button
          onClick={copyLink}
          className="p-2 rounded-full bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors relative"
          aria-label="Copy link"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill="white"
            viewBox="0 0 16 16"
          >
            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
          </svg>
          
          {/* Success message popup */}
          {copySuccess && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Link copied!
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
