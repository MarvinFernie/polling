# Social Poll

A modern, interactive web application for creating and answering polls with real-time results, built with Next.js and Firebase.

## Vision
Social Poll is a modern web application that allows users to create and answer polls in a feed format. The platform enables anonymous feedback collection at scale, with results only visible after participation. Questions can be upvoted, with popular questions appearing at the top of the feed.

## Features
- Feed-based interface showing polls/questions
- Create polls with multiple answer options
- Answer polls anonymously
- View results after participation
- Upvote questions you find interesting
- Popular questions appear at the top based on upvotes
- Modern, responsive UI design

## Tech Stack
- **Frontend**: Next.js with TypeScript and React
- **Styling**: Tailwind CSS with custom components
- **Database**: Firebase Firestore
- **Deployment**: Ready for Vercel deployment

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd polling
```

2. Run the setup script to create your .env.local file:
```bash
npm run setup
```

3. Edit the .env.local file with your Firebase configuration:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

4. Install dependencies:
```bash
npm install
```

5. Run the development server:
```bash
npm run dev
```

6. (Optional) Seed the database with sample questions:
```bash
npm run seed
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Set up Authentication (optional for extended features)
4. Copy your Firebase config values to the .env.local file
5. Deploy Firestore security rules:
```bash
firebase deploy --only firestore:rules
```

## Deployment

The app is ready to be deployed to Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Set your environment variables in the Vercel dashboard
4. Deploy!

## License
MIT
