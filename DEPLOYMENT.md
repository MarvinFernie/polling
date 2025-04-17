# Deployment Guide for Social Poll App

This guide explains how to deploy the Social Poll application to Vercel, which is the recommended platform for Next.js applications.

## Prerequisites

1. A GitHub account (already set up with repository at https://github.com/MarvinFernie/polling)
2. A Vercel account (can be created at https://vercel.com with GitHub authentication)
3. A Firebase project (already set up)

## Step 1: Set up Firebase for Production

1. Visit the [Firebase Console](https://console.firebase.google.com/)
2. If using a new Firebase project for production, ensure Firestore is enabled
3. Go to Project Settings > General
4. Add a web app if you haven't already
5. Copy the Firebase configuration values for the next step

## Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in with GitHub
2. Click "Add New..." > "Project"
3. Select the "polling" repository
4. In the configuration screen:
   - Framework Preset should be automatically set to Next.js
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

5. Under "Environment Variables", add the following:
   - NEXT_PUBLIC_FIREBASE_API_KEY=(your production Firebase API key)
   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=(your production Firebase auth domain)
   - NEXT_PUBLIC_FIREBASE_PROJECT_ID=(your production Firebase project ID)
   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=(your production Firebase storage bucket)
   - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=(your production Firebase messaging sender ID)
   - NEXT_PUBLIC_FIREBASE_APP_ID=(your production Firebase app ID)
   - NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=(your production Firebase measurement ID)

6. Click "Deploy"

## Step 3: Verify Deployment

1. Once deployment is complete, Vercel will provide a URL (usually in the format `https://polling-[username].vercel.app`)
2. Visit the URL to ensure the application is working correctly
3. Test all functionality:
   - Seeding the database
   - Creating new polls
   - Answering polls
   - Upvoting polls
   - Verify polls are sorted by popularity

## Step 4: Set up Custom Domain (Optional)

1. In the Vercel dashboard, go to the project settings
2. Navigate to "Domains"
3. Add your custom domain and follow the instructions to configure DNS

## Troubleshooting

If you encounter issues:

1. Check the Vercel deployment logs for errors
2. Verify Firebase security rules allow read/write operations
3. Ensure environment variables are correctly set in Vercel
4. Check browser console for client-side errors

## Continuous Deployment

Vercel automatically deploys changes when you push to the main branch of your GitHub repository. This ensures your application is always up to date with the latest code.
