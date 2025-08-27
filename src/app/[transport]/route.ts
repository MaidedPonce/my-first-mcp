import { createMcpHandler } from '@vercel/mcp-adapter'
import { z } from 'zod'

const handler = createMcpHandler(
  (server) => {
    server.tool(
      'fetch-weather', // titulo
      'Tool to fetch the weather of a city', // descripcion
      {
        city: z.string().describe('City name'), // parametros
      },
      async ({ city }) => {
        return {
          content: [
            {
              type: 'text',
              text: `The weather in ${city} is sunny with a high of 25°C and a low of 15°C.`,
            },
          ],
        }
      }
    )
  },
  {
    capabilities: {
      tools: {
        fetchWeather: {
          description: 'Tool to fetch the weather of a city',
          parameters: {
            city: {
              type: 'string',
              description: 'City name',
            },
          },
          required: ['city'],
        },
      },
    },
  },
  {
    redisUrl: process.env.REDIS_URL,
    sseEndpoint: '/sse',
    streamableHttpEndpoint: '/mcp',
    verboseLogs: true,
    maxDuration: 60,
  }
)

export { handler as GET, handler as POST }