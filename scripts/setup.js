const fs = require('fs');
const path = require('path');

// Path to your .env.local.example file
const exampleEnvPath = path.resolve(__dirname, '../.env.local.example');
// Path to your .env.local file
const envPath = path.resolve(__dirname, '../.env.local');

// Check if .env.local already exists
if (fs.existsSync(envPath)) {
  console.log('.env.local already exists, skipping creation.');
} else {
  // Copy the example file to .env.local
  try {
    fs.copyFileSync(exampleEnvPath, envPath);
    console.log('.env.local created from example.');
    console.log('Please edit it with your Firebase configuration before running the app.');
  } catch (error) {
    console.error('Error creating .env.local file:', error);
  }
}

console.log('\nSetup Guide:');
console.log('1. Create a new Firebase project at https://console.firebase.google.com/');
console.log('2. Enable Firestore database and Authentication');
console.log('3. Copy your Firebase config values to .env.local');
console.log('4. Run `npm install` to install dependencies');
console.log('5. Run `npm run dev` to start the development server');