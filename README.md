# Aero Trip

A flight search application built with Next.js and Python.

## Project Structure

This project is structured as a monorepo with both frontend and backend components:

- `src/` - Next.js frontend application
- `api/` - Python Flask backend API

## Local Development

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+

### Setup

1. Install frontend dependencies:
   ```bash
   npm install
   ```

2. Install Python dependencies:
   ```bash
   pip install -r api/requirements.txt
   ```

3. Start the development servers:

   For the frontend:
   ```bash
   npm run dev
   ```

   For the backend (in a separate terminal):
   ```bash
   python api/index.py
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

This project is configured for easy deployment to Vercel as a monorepo.

1. Push your code to a GitHub repository.

2. Connect your repository to Vercel:
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the project structure and configure the build settings

3. Deploy:
   - Vercel will automatically build and deploy your project
   - The frontend will be deployed to a production URL
   - The API will be deployed as serverless functions

## How It Works

- The frontend is a Next.js application that makes API calls to the backend
- The backend is a Python Flask API that proxies requests to Skyscanner
- In development, the frontend and backend run on separate ports
- In production, everything is deployed as a single application on Vercel

## Environment Variables

No environment variables are required for basic functionality, but you can add them in the Vercel dashboard if needed.

# Aero-Trip

Plan your next adventure with ease. Discover and book flights at the most affordable fares, tailored to your travel needs.
