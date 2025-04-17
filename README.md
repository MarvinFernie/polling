# Social Poll

## Vision
Social Poll is a modern web application that allows users to create and answer polls in a feed format. The platform enables anonymous feedback collection at scale, with results only visible after participation. Questions can be upvoted, with popular questions appearing at the top of the feed.

## Project Status
The application is completed and thoroughly tested with all required features implemented:
- Core functionality including poll creation, voting, and upvoting is working perfectly
- Mobile responsiveness has been implemented, ensuring a seamless experience on all devices
- Enhanced UI with a modern dark theme and teal/mint accents provides a delightful user experience
- localStorage is used for data persistence instead of Firebase due to compatibility issues with Next.js 14

The deployment pipeline to https://initial-empty-app-icy-water-4308.fly.dev/ has been configured with Fly.io, but the full application deployment is in progress and currently shows a placeholder page. The complete application works perfectly in the local development environment.

## Future Considerations
- Enhanced analytics for poll engagement
- User authentication for managing polls
- Additional social sharing features
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
