# YouTube Transcript Generator

A modern web application for extracting transcripts from YouTube videos with admin panel and database integration.

## Features

- Extract transcripts from YouTube videos
- Admin panel for user and payment management
- Bulk transcript extraction from playlists and CSV
- API for developers
- Discord community integration
- Pricing plans and payment processing

## Database Setup

1. **Create a PostgreSQL database**
2. **Set environment variables** in `.env` file:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/youtube_transcript_db"
   ```
3. **Run database migrations**:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start backend API
npm run api

# Database commands
npx prisma migrate dev    # Create and apply migrations
npx prisma generate      # Generate Prisma client
npx prisma studio       # Open database browser
```

## Project Structure

```
├── src/
│   ├── pages/           # Route pages (Pricing, API, Bulk, Discord)
│   ├── pages/admin/     # Admin panel components
│   ├── api/            # API utilities
│   └── lib/            # Database and utilities
├── backend/            # Express API server
├── prisma/            # Database schema and migrations
└── public/            # Static assets
```

## Database Schema

- **Users**: User accounts with plans and credits
- **Transcripts**: Extracted video transcripts
- **Payments**: Payment history and subscriptions
- **AdminSettings**: Application configuration

## API Endpoints

- `GET /api/transcript?videoId=xxx` - Extract single transcript
- `POST /api/transcripts` - Bulk transcript extraction (requires API key)

## Admin Panel

Access at `/admin` for:
- User management
- Payment tracking
- System analytics
- Stripe integration

## Environment Variables

```env
DATABASE_URL="postgresql://..."
YOUTUBE_API_KEY="your_api_key"
NODE_ENV="development"
```