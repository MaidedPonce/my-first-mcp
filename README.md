This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## My First MCP Implementation

This project demonstrates a basic implementation of Model Context Protocol (MCP) using Next.js and the Vercel MCP adapter.

### Features

- **Weather Tool**: A simple tool that provides weather information for any city
- **MCP Integration**: Uses `@vercel/mcp-adapter` for seamless MCP implementation
- **Next.js App Router**: Built with the latest Next.js App Router pattern

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## MCP Endpoints

- `/mcp` - HTTP endpoint for MCP communication
- `/sse` - Server-Sent Events endpoint for streaming

## Learn More

To learn more about Next.js and MCP, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Model Context Protocol](https://modelcontextprotocol.io) - learn about MCP specification.
- [Vercel MCP Adapter](https://github.com/vercel/mcp-adapter) - MCP adapter for Vercel.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
