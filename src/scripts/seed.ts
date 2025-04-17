import '../lib/firebase';
import { seedSamplePolls } from '../lib/samplePolls';

async function main() {
  console.log('Seeding database with sample polls...');
  
  try {
    const success = await seedSamplePolls();
    
    if (success) {
      console.log('✅ Database seeded successfully');
    } else {
      console.error('❌ Failed to seed database');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

main();