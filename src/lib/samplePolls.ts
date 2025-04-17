import { createPoll } from './db';

// These are the exact 3 initial poll questions requested
export const samplePolls = [
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

/**
 * Seeds the database with the three initial sample poll questions
 */
export async function seedSamplePolls() {
  try {
    console.log('Starting to seed sample polls...');
    
    // Check if we can connect to Firestore first
    if (!await checkFirestoreConnection()) {
      console.error('❌ Cannot connect to Firestore. Check your Firebase configuration.');
      return false;
    }
    
    let successCount = 0;
    
    // Create each poll one at a time
    for (const poll of samplePolls) {
      try {
        console.log(`Creating poll: ${poll.question}`);
        
        const pollId = await createPoll({
          question: poll.question,
          options: poll.options
        });
        
        if (pollId) {
          console.log(`✅ Created poll with ID: ${pollId}`);
          successCount++;
        } else {
          console.error(`❌ Failed to create poll: ${poll.question}`);
        }
        
        // Small delay to ensure Firebase operations complete
        await new Promise(resolve => setTimeout(resolve, 1000));
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

/**
 * Check if we can connect to Firestore
 */
async function checkFirestoreConnection(): Promise<boolean> {
  try {
    // Import here to avoid circular dependencies
    const { db } = await import('./firebase');
    
    if (!db) {
      console.error('Firestore db is not initialized');
      return false;
    }
    
    // Try a simple query to see if we can connect
    const { collection, getDocs, query, limit } = await import('firebase/firestore');
    const pollsCollection = collection(db, 'polls');
    
    console.log('Testing Firestore connection...');
    const testQuery = query(pollsCollection, limit(1));
    await getDocs(testQuery);
    
    console.log('✅ Firestore connection successful');
    return true;
  } catch (error) {
    console.error('❌ Firestore connection test failed:', error);
    return false;
  }
}