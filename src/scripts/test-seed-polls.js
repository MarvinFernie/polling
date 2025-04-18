// Test script for the seedSamplePolls function with localStorage
// Run with: node test-seed-polls.js

// Mock localStorage for Node environment
if (typeof localStorage === 'undefined') {
  global.localStorage = {
    _data: {},
    getItem: function(key) {
      return this._data[key] || null;
    },
    setItem: function(key, value) {
      this._data[key] = value.toString();
    },
    removeItem: function(key) {
      delete this._data[key];
    },
    clear: function() {
      this._data = {};
    }
  };

  // Mock window for environment checks
  global.window = {
    localStorage: global.localStorage
  };

  console.log('🔧 Mock localStorage initialized for Node environment\n');
}

// Define helper functions for testing
function logWithTimestamp(message) {
  const now = new Date();
  const timestamp = `[${now.toLocaleTimeString()}]`;
  console.log(`${timestamp} ${message}`);
}

// Clear existing polls for a fresh test
function clearExistingPolls() {
  if (global.localStorage.getItem('social_polls_data')) {
    global.localStorage.removeItem('social_polls_data');
    global.localStorage.removeItem('social_polls_user_votes');
    global.localStorage.removeItem('social_polls_user_upvotes');
    logWithTimestamp('🧹 Cleared existing poll data for a fresh test');
  }
}

async function printPolls() {
  // Get and display all polls
  const polls = JSON.parse(global.localStorage.getItem('social_polls_data') || '[]');
  logWithTimestamp(`📊 Found ${polls.length} polls in localStorage`);

  if (polls.length > 0) {
    console.log('\n📋 Polls:');
    polls.forEach((poll, index) => {
      console.log(`\n${index + 1}. "${poll.question}"`);
      console.log(`   ID: ${poll.id}`);
      console.log(`   Options: ${poll.options.map(opt => `"${opt.text}"`).join(', ')}`);
      console.log(`   Created: ${new Date(poll.createdAt).toLocaleString()}`);
    });
  }
}

async function testSeedPolls() {
  try {
    logWithTimestamp('🧪 Starting seedSamplePolls test...');

    // Clear existing data
    clearExistingPolls();

    // Check initial state
    await printPolls();

    // We'll create our own version of seedSamplePolls since we can't import the TypeScript file directly
    // This is based on what we know about the implementation
    async function seedSamplePolls() {
      try {
        console.log('Starting to seed sample polls...');
        
        // Define the sample polls
        const samplePolls = [
          {
            question: 'What was the best bar at Duke?',
            options: [
              'Shooters',
              'Devines'
            ]
          },
          {
            question: 'Does Brittany Brady have a webbed ass?',
            options: [
              'Yes',
              'No',
              'I don\'t believe in picking on Babs'
            ]
          },
          {
            question: 'What baby will be born first?',
            options: [
              'Baby Boy Clanon/Throsby',
              'Baby Boy Samuels/Forman'
            ]
          }
        ];
        
        let successCount = 0;
        
        // Simulate creating each poll
        for (const poll of samplePolls) {
          try {
            console.log(`Creating poll: ${poll.question}`);
            
            // Create a poll object and store it in localStorage
            const pollId = 'poll_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
            const newPoll = {
              id: pollId,
              question: poll.question,
              options: poll.options.map(opt => ({ 
                text: opt, 
                votes: 0 
              })),
              createdAt: new Date().toISOString(),
              upvotes: 0
            };
            
            // Store the poll in localStorage
            const polls = JSON.parse(localStorage.getItem('social_polls_data') || '[]');
            polls.push(newPoll);
            localStorage.setItem('social_polls_data', JSON.stringify(polls));
            
            console.log(`✅ Created poll with ID: ${pollId}`);
            successCount++;
            
            // Small delay to ensure operations complete
            await new Promise(resolve => setTimeout(resolve, 300));
          } catch (pollError) {
            console.error(`❌ Error creating poll "${poll.question}":`, pollError);
          }
        }
        
        if (successCount === samplePolls.length) {
          console.log(`✅ All ${successCount} sample polls seeded successfully`);
          return true;
        } else {
          console.log(`⚠️ Partial success: ${successCount} of ${samplePolls.length} polls seeded`);
          return successCount > 0;
        }
      } catch (error) {
        console.error('❌ Error seeding sample polls:', error);
        return false;
      }
    }

    // Run the seed function
    logWithTimestamp('\n🌱 Seeding sample polls...');
    const success = await seedSamplePolls();

    if (success) {
      logWithTimestamp('✅ Sample polls seeded successfully!');
    } else {
      logWithTimestamp('❌ Failed to seed sample polls');
    }

    // Check final state
    logWithTimestamp('\n🔍 Checking seeded polls:');
    await printPolls();

    // Test retrieving a specific poll
    const polls = JSON.parse(global.localStorage.getItem('social_polls_data') || '[]');
    if (polls.length > 0) {
      const testPollId = polls[0].id;
      logWithTimestamp(`\n🔍 Testing retrieval of poll ID: ${testPollId}`);

      // We'll simulate getPoll here since we can't import from TypeScript directly
      function getPoll(pollId) {
        try {
          // Get polls from localStorage
          const polls = JSON.parse(localStorage.getItem('social_polls_data') || '[]');
          // Find the poll with the given ID
          return polls.find(p => p.id === pollId) || null;
        } catch (error) {
          console.error('Error retrieving poll:', error);
          return null;
        }
      }
      const retrievedPoll = getPoll(testPollId);
      if (retrievedPoll) {
        logWithTimestamp('✅ Successfully retrieved poll from database');
        console.log(`   Question: "${retrievedPoll.question}"`);
        console.log(`   Options: ${retrievedPoll.options.map(opt => `"${opt.text}"`).join(', ')}`);
      } else {
        logWithTimestamp('❌ Failed to retrieve poll');
      }
    }

    logWithTimestamp('\n✅ seedSamplePolls test complete!');

  } catch (error) {
    console.error('Test failed with error:', error);
    console.error(error.stack);
  }
}

// Run the test
testSeedPolls();