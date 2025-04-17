import { createPoll } from './db';

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

export async function seedSamplePolls() {
  try {
    for (const poll of samplePolls) {
      await createPoll({
        question: poll.question,
        options: poll.options
      });
    }
    console.log('Sample polls seeded successfully');
    return true;
  } catch (error) {
    console.error('Error seeding sample polls:', error);
    return false;
  }
}