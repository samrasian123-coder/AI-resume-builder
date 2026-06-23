# AI Resume Builder

A modern, production-ready AI Resume Builder web application with a premium user experience.

## Features
- **AI-Powered**: Generate professional summaries, rewrite experience, and suggest skills.
- **Modern UI**: Built with Next.js 15, Tailwind CSS, and ShadCN UI for a sleek, responsive design.
- **Live Preview**: See your resume update in real-time as you type.
- **Export Options**: Export to PDF, DOCX, or share via a unique link.
- **Secure Authentication**: Email/Password and Google Login via Supabase.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: ShadCN UI
- **Database & Auth**: Supabase
- **AI Integration**: OpenAI API

## Local Setup

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, or pnpm
- Supabase Project
- OpenAI API Key

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```
3. Fill in the `.env.local` file with your Supabase and OpenAI credentials.
4. Run the development server:
   ```bash
   npm run dev
   ```

## Database Setup
Execute the SQL script located in `supabase/schema.sql` in your Supabase SQL editor to create the necessary tables, Row Level Security (RLS) policies, and triggers.
