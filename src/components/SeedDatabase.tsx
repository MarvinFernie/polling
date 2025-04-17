'use client';

import { useState, useEffect } from 'react';
import { seedSamplePolls } from '@/lib/samplePolls';
import { getPolls } from '@/lib/db';

export default function SeedDatabase() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<'idle' | 'success' | 'error' | 'checking'>('idle');
  const [pollCount, setPollCount] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [showLogs, setShowLogs] = useState(false);
  
  // Check if polls exist on mount
  useEffect(() => {
    const checkPolls = async () => {
      try {
        setSeedStatus('checking');
        const polls = await getPolls();
        setPollCount(polls.length);
        
        // Update UI based on existing polls
        if (polls.length > 0) {
          setLogs(prev => [...prev, `Found ${polls.length} existing polls in database`]);
        } else {
          setLogs(prev => [...prev, 'No polls found in database']);
        }
        
        setSeedStatus('idle');
      } catch (error) {
        console.error('Error checking polls:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setLogs(prev => [...prev, `Error checking polls: ${errorMessage}`]);
        setSeedStatus('idle');
      }
    };
    
    checkPolls();
  }, []);
  
  const addLog = (message: string) => {
    setLogs(prev => [...prev, message]);
  };
  
  const handleSeed = async () => {
    setIsSeeding(true);
    setSeedStatus('checking');
    setLogs([]);
    
    try {
      addLog('Starting database seeding...');
      
      // Redirect console logs to our UI
      const originalConsoleLog = console.log;
      const originalConsoleError = console.error;
      
      console.log = (message, ...optionalParams) => {
        originalConsoleLog(message, ...optionalParams);
        if (typeof message === 'string') {
          addLog(message);
        } else {
          addLog(String(message));
        }
      };
      
      console.error = (message, ...optionalParams) => {
        originalConsoleError(message, ...optionalParams);
        if (typeof message === 'string') {
          addLog(`ERROR: ${message}`);
        } else {
          addLog(`ERROR: ${String(message)}`);
        }
      };
      
      // Seed the database
      const success = await seedSamplePolls();
      
      // Restore console functions
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
      
      // Update UI
      setSeedStatus(success ? 'success' : 'error');
      
      // Check poll count after seeding
      const polls = await getPolls();
      setPollCount(polls.length);
      addLog(`Final poll count: ${polls.length}`);
      
    } catch (error) {
      console.error('Error seeding database:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addLog(`Error seeding database: ${errorMessage}`);
      setSeedStatus('error');
    } finally {
      setIsSeeding(false);
      setShowLogs(true); // Automatically show logs if there was an error
    }
  };
  
  return (
    <div className="rounded-xl border border-border bg-card/90 p-6 mb-8 shadow-card backdrop-blur-sm transition-all duration-300 hover:shadow-elevated animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-subtle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white">Seed Database</h3>
            
            {pollCount > 0 && (
              <span className="badge-primary ml-2">
                {pollCount} polls found
              </span>
            )}
          </div>
          <p className="text-gray-300 text-sm">
            {pollCount > 0 
              ? `Populate the database with ${pollCount > 0 ? 'more' : ''} sample poll questions` 
              : 'Add the three sample poll questions to the database'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLogs(!showLogs)}
            className="text-sm text-accent hover:text-accent-light transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {showLogs ? 'Hide Details' : 'View Details'}
          </button>
          <button
            onClick={handleSeed}
            disabled={isSeeding || seedStatus === 'checking'}
            className={`btn-primary ${isSeeding || seedStatus === 'checking' ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSeeding ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Seeding...
              </span>
            ) : seedStatus === 'checking' ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Checking...
              </span>
            ) : 'Seed Database'}
          </button>
        </div>
      </div>
      
      {seedStatus === 'success' && (
        <div className="mt-4 py-3 px-4 bg-accent-subtle rounded-lg border border-accent/30 flex items-start gap-3 animate-fade-in">
          <svg className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="font-medium text-accent-light mb-1">Success!</h4>
            <p className="text-gray-300 text-sm">
              Sample polls successfully added to the database! Navigate to the Polls page to see them.
            </p>
          </div>
        </div>
      )}
      
      {seedStatus === 'error' && (
        <div className="mt-4 py-3 px-4 bg-error/10 rounded-lg border border-error/30 flex items-start gap-3 animate-fade-in">
          <svg className="h-5 w-5 text-error mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="font-medium text-error mb-1">Error</h4>
            <p className="text-gray-300 text-sm">
              Failed to add sample polls. Check the logs below or console for details.
            </p>
          </div>
        </div>
      )}
      
      {showLogs && logs.length > 0 && (
        <div className="mt-4 overflow-hidden animate-fade-in rounded-lg border border-border">
          <div className="flex items-center justify-between bg-surface px-4 py-2 border-b border-border">
            <span className="text-xs font-medium text-gray-300">Process Log</span>
            <span className="text-xs text-gray-400">{logs.length} entries</span>
          </div>
          <div className="bg-surface p-3 h-40 overflow-y-auto">
            <pre className="text-xs text-gray-300 font-mono space-y-1">
              {logs.map((log, i) => (
                <div key={i} className={`py-0.5 px-2 rounded ${
                  log.startsWith('ERROR') 
                    ? 'text-error bg-error/10' 
                    : log.includes('✅') 
                      ? 'text-accent bg-accent/5' 
                      : ''
                }`}>
                  {log}
                </div>
              ))}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}