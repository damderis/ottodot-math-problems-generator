# Math Problem Generator - Developer Assessment Starter Kit

## Overview

This is a starter kit for building an AI-powered math problem generator application. The goal is to create a standalone prototype that uses AI to generate math word problems suitable for Primary 5 students, saves the problems and user submissions to a database, and provides personalized feedback.

## Tech Stack

- **Frontend Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **AI Integration**: Google Generative AI (Gemini)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd math-problem-generator
```

### 2. Create a Supabase Project

1. Go to [supabase](https://supabase.com) and create a free account
2. Create a new project
3. Go to Settings → API to find your:
   - Project URL (starts with `https://`)
   - Anon/Public Key

### 3. Set Up Database Tables

1. In your Supabase dashboard, go to SQL Editor
2. Copy and paste the contents of `database.sql`
3. Click "Run" to create the tables and policies

### 4. Get Google API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key for Gemini

### 5. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
2. Edit `.env.local` and add your actual keys:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://nbygfnexgxqhyykdiswc.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ieWdmbmV4Z3hxaHl5a2Rpc3djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3MTE1NTAsImV4cCI6MjA3NTI4NzU1MH0.fbtmLkstrvHFxFqdGC6OlEpVL9kbRBs6z0U8SQDfnB8
   GOOGLE_API_KEY=your_actual_google_api_key
   ```

### 6. Install Dependencies

```bash
npm install
```

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Your Task

### 1. Implement Frontend Logic (`app/page.tsx`)

Complete the TODO sections in the main page component:

- **generateProblem**: Call your API route to generate a new math problem
- **submitAnswer**: Submit the user's answer and get feedback

### 2. Create Backend API Route (`app/api/math-problem/route.ts`)

Create a new API route that handles:

#### POST /api/math-problem (Generate Problem)
- Use Google's Gemini AI to generate a math word problem
- The AI should return JSON with:
  ```json
  {
    "problem_text": "A bakery sold 45 cupcakes...",
    "final_answer": 15
  }
  ```
- Save the problem to `math_problem_sessions` table
- Return the problem and session ID to the frontend

#### POST /api/math-problem/submit (Submit Answer)
- Receive the session ID and user's answer
- Check if the answer is correct
- Use AI to generate personalized feedback based on:
  - The original problem
  - The correct answer
  - The user's answer
  - Whether they got it right or wrong
- Save the submission to `math_problem_submissions` table
- Return the feedback and correctness to the frontend

### 3. Requirements Checklist

- [x] AI generates appropriate Primary 5 level math problems
- [x] Problems and answers are saved to Supabase
- [x] User submissions are saved with feedback
- [x] AI generates helpful, personalized feedback
- [x] UI is clean and mobile-responsive
- [x] Error handling for API failures
- [x] Loading states during API calls

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Add your environment variables in Vercel's project settings
4. Deploy!

## Environment Variables

To run this application, you'll need to set up the following environment variables in your `.env.local` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google AI Configuration
GOOGLE_API_KEY=your_google_gemini_api_key
```

### Getting Your API Keys

1. **Supabase**: 
   - Go to [supabase.com](https://supabase.com) and create a project
   - Find your keys in Settings → API

2. **Google AI**: 
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key for Gemini

## Assessment Submission

When submitting your assessment, provide:

1. **GitHub Repository URL**: Make sure it's public
2. **Live Demo URL**: Your Vercel deployment
3. **Environment Setup**: Instructions for setting up the required API keys

## My Implementation Notes

### Complete Web Application Overview

This Math Adventure web application is a fully-featured, AI-powered educational tool designed specifically for Primary 5 students. The application has been completely refactored and enhanced with modern React patterns, comprehensive state management, and an engaging user interface.

### Architecture & Technical Implementation

#### **Frontend Architecture**
- **Framework**: Next.js 15 with App Router and TypeScript
- **Component Structure**: Modular, reusable components with clear separation of concerns
- **State Management**: Custom React hooks (`useMathGame`) for centralized game logic
- **Styling**: Tailwind CSS with custom gradient themes and responsive design
- **UI Components**: Radix UI primitives with custom styling for accessibility

#### **Backend Implementation**
- **API Routes**: RESTful API endpoints for problem generation and answer submission
- **AI Integration**: Google Gemini AI for intelligent problem generation and personalized feedback
- **Database**: Supabase PostgreSQL with real-time capabilities
- **Error Handling**: Comprehensive error handling with fallback mechanisms

#### **Key Features Implemented**

1. **AI-Powered Problem Generation**
   - Uses Google Gemini AI to generate age-appropriate Primary 5 math word problems
   - Diverse problem scenarios including space, nature, cooking, sports, and technology
   - Configurable difficulty levels (Easy/Medium/Hard)
   - Multiple problem types (addition, subtraction, multiplication, division)

2. **Intelligent Feedback System**
   - AI-generated personalized feedback for each student response
   - Encouraging language with emojis and age-appropriate tone
   - Step-by-step solution explanations for incorrect answers
   - Real-time feedback with visual celebrations

3. **Comprehensive User Experience**
   - **Game Flow**: Generate → Answer → Feedback → Repeat
   - **Progress Tracking**: Local storage for scores, streaks, and accuracy
   - **History Management**: View past problems and performance
   - **Statistics Dashboard**: Detailed analytics and progress tracking
   - **Responsive Design**: Optimized for desktop, tablet, and mobile devices

4. **Advanced UI/UX Features**
   - **Colorful Theme**: Gradient backgrounds and vibrant card designs
   - **Interactive Elements**: Hover effects, animations, and smooth transitions
   - **Loading States**: Engaging loading animations with contextual messages
   - **Error Handling**: User-friendly error messages with recovery options
   - **Accessibility**: Keyboard navigation and screen reader support

#### **Code Organization & Maintainability**

The application has been completely refactored for optimal maintainability:

- **Modular Components**: Each UI element is a separate, reusable component
- **Custom Hooks**: Centralized business logic in `useMathGame` hook
- **Type Safety**: Comprehensive TypeScript interfaces and type definitions
- **Utility Functions**: Separated localStorage operations and helper functions
- **Clean Architecture**: Clear separation between UI, business logic, and data layers


#### **Performance Optimizations**

- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component for optimized loading
- **Memory Management**: Efficient state updates and cleanup
- **Caching**: Local storage for offline score persistence


#### **Database Schema & Data Flow**

- **Sessions Table**: Stores generated problems with metadata
- **Submissions Table**: Tracks user answers and AI-generated feedback
- **Real-time Updates**: Live data synchronization with Supabase
- **Data Validation**: Type-safe data handling throughout the application

### Design Decisions & Challenges

1. **Component Refactoring**: Broke down the monolithic page component into smaller, focused components for better maintainability
2. **State Management**: Implemented custom hooks to centralize complex game logic
3. **Error Resilience**: Added fallback mechanisms for AI API failures
4. **User Experience**: Prioritized visual feedback and engagement for young learners
5. **Performance**: Optimized bundle size and loading times for better user experience

### Future Enhancements

The application is designed to be easily extensible with additional features such as:
- Multiplayer modes
- Teacher dashboard
- Advanced analytics
- Custom problem sets
- Integration with learning management systems

## Additional Features (Implemented)

The following optional features have been successfully implemented:

- [x] Difficulty levels (Easy/Medium/Hard)
- [x] Problem history view
- [x] Score tracking with accuracy percentage
- [x] Different problem types (addition, subtraction, multiplication, division)
- [x] Step-by-step solution explanations
- [x] Local storage for offline score tracking
- [x] Responsive tab navigation
- [x] Modern, colorful UI with gradient themes

---

Good luck with your assessment! 🎯