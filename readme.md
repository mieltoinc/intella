# Intella

AI assistant to search and act across applications for your entire workforce.

## Features

- **AI-Powered Chat Interface**: Natural language conversations with intelligent responses
- **Knowledge Base Management**: Store and search organizational knowledge using Mielto
- **Memory Management**: Persistent memory across conversations using Mielto
- **Cross-Application Actions**: Framework for acting across different applications
- **Context-Aware Responses**: AI responses enhanced with relevant knowledge and memories

## Tech Stack

- **Next.js 14**: React framework with App Router
- **Vercel AI SDK**: Unified API for AI model interactions
- **AI Elements**: Pre-built UI components for AI applications
- **Mielto**: Knowledge base and memory infrastructure
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Modern styling

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm 10.15.1+

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
cp apps/intella-app/.env.example apps/intella-app/.env
```

Edit `apps/intella-app/.env` and add your API keys:
- `MIELTO_API_KEY`: Your Mielto API key (required)

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building

Build for production:

```bash
pnpm build
```

Start production server:

```bash
pnpm start
```

## Mielto Integration

Intella uses Mielto for:
- **Knowledge Collections**: Organize and search organizational knowledge
- **Personal Memories**: Store and retrieve user-specific context
- **Context Injection**: Automatically enhance AI responses with relevant information

See [Mielto Documentation](https://docs.mielto.com/) for more details.

## License

MIT
