# Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Configure Environment Variables**
   
   Copy the example environment file:
   ```bash
   cp apps/intella-web/.env.example apps/intella-web/.env
   ```
   
   Edit `apps/intella-web/.env` and add:
   - `MIELTO_API_KEY`: Your Mielto API key (get it from [Mielto Dashboard](https://dashboard.mielto.com))
   - `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`: At least one AI provider key is required

3. **Run Development Server**
   ```bash
   pnpm dev
   ```

4. **Access the Application**
   - Main Assistant: http://localhost:3000/assistant
   - Admin Panel: http://localhost:3000/admin

## Mielto Setup

1. Sign up for a Mielto account at https://mielto.com
2. Get your API key from the dashboard
3. Create knowledge collections as needed
4. Use collection IDs in the admin panel to organize knowledge

## AI Provider Setup

### OpenAI
1. Get an API key from https://platform.openai.com/api-keys
2. Add to `.env`: `OPENAI_API_KEY=sk-...`

### Anthropic (Claude)
1. Get an API key from https://console.anthropic.com/
2. Add to `.env`: `ANTHROPIC_API_KEY=sk-ant-...`

## Knowledge Base Management

1. Go to `/admin` in your browser
2. Select the "Knowledge Base" tab
3. Enter a Collection ID (e.g., "company-docs", "hr-policies")
4. Add knowledge items with titles and content
5. The AI assistant will automatically search these collections when answering questions

## Memory Management

- Memories are automatically created during conversations when important information is discussed
- View and search memories in the Admin panel under the "Memories" tab
- Memories are user-specific and stored in Mielto

## Extending Actions

To add integrations with other applications:

1. Edit `apps/intella-web/lib/actions.ts`
2. Add your application integration following the pattern:
   ```typescript
   'your-app': {
     name: 'Your App',
     actions: {
       'your-action': {
         validate: (params) => { /* validation logic */ },
         execute: async (params) => { /* implementation */ },
       },
     },
   },
   ```
3. Update the `/api/actions` route to use your new integrations

## Production Deployment

1. Set all environment variables in your hosting platform
2. Build the application: `pnpm build`
3. Deploy to Vercel, Netlify, or your preferred platform
4. Ensure Mielto API is accessible from your production environment

## Troubleshooting

### "AI provider not configured" error
- Make sure at least one of `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` is set
- Check that the API key is valid and has credits

### "Mielto API error"
- Verify your `MIELTO_API_KEY` is correct
- Check that the Mielto API URL is accessible
- Review the Mielto API documentation for endpoint changes

### TypeScript errors
- Run `pnpm install` to ensure all dependencies are installed
- Check that Node.js version is 18+

