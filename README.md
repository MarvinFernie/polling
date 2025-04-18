# Social Poll

## Vision
Social Poll is a modern web application that allows users to create and answer polls in a feed format. The platform enables anonymous feedback collection at scale, with results only visible after participation. Questions can be upvoted, with popular questions appearing at the top of the feed.

## Project Status
The application is completed and thoroughly tested with all required features implemented:
- Core functionality including poll creation, voting, and upvoting is working perfectly
- Mobile responsiveness has been implemented, ensuring a seamless experience on all devices
- Enhanced UI with a modern dark theme and teal/mint accents provides a delightful user experience
- localStorage is used for data persistence instead of Firebase due to compatibility issues with Next.js 14

The deployment pipeline to https://social-poll-app.fly.dev/ has been configured with Fly.io. The deployment configuration has been updated with proper environment variables and improved Docker setup to ensure the full application can be deployed successfully. The complete application works perfectly in the local development environment.

Recent testing (April 2025) confirmed that all functionality works as expected:
- Poll creation with multiple options functions correctly
- Voting on polls shows results and prevents duplicate votes
- Upvoting system works well and correctly sorts polls by popularity
- Sample polls are correctly seeded into the database

## Future Considerations
- Enhanced analytics for poll engagement
- User authentication for managing polls
- Social sharing functionality for polls
- User profile and username system
- Dark/light theme toggle
- Performance optimizations for large numbers of polls
- Security enhancements and input validation
- Potential migration back to Firebase if compatibility issues are resolved

## Requirements

### Core Features
- Feed-based interface showing polls/questions
- Anyone can create polls with questions and multiple answer options
- Anyone with the link can answer polls
- Poll results are only visible after participation
- Questions can be upvoted (one upvote per user per question)
- Popular questions appear at the top of the feed based on upvotes
- All answers and upvotes start at zero

### Technical Requirements
- Next.js for the frontend framework
- LocalStorage for data persistence (Firebase replaced due to compatibility issues)
- Modern, delightful UI inspired by Robinhood, Hinge, and Airbnb

### Sample Questions
1. What was the best bar at Duke?
   - Shooters
   - Devines

2. Does Brittany Brady have a webbed ass?
   - Yes
   - No
   - I don't believe in picking on Babs

3. What baby will be born first?
   - Baby Boy Clanon/Throsby
   - Baby Boy Samuels/Forman
