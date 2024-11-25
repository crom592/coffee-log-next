# Coffee Log Next

## Overview
Coffee Log Next is a modern, full-stack coffee logging application built with TypeScript, Next.js, and Prisma.

## Tech Stack
- Next.js 14
- TypeScript
- Prisma ORM
- PostgreSQL
- NextAuth.js
- Tailwind CSS

## Features
- Kakao OAuth Authentication
- Coffee Log Creation
- Community Posting
- User Profile Management

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- Kakao Developer Account

### Installation
1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   - Copy `.env.example` to `.env`
   - Fill in your credentials

4. Initialize database
   ```bash
   npx prisma migrate dev
   ```

5. Run the development server
   ```bash
   npm run dev
   ```

## Deployment
- Vercel recommended for seamless Next.js deployment
- Configure environment variables in deployment platform

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License
