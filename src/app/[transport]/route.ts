import { createMcpHandler } from '@vercel/mcp-adapter'
import { z } from 'zod'

const handler = createMcpHandler(
  async (server) => {
    server.tool(
      'fetch-weather', // titulo
      'Tool to fetch the weather of a city', // descripcion
      {
        city: z.string().describe('City name'), // parametros
      },
      async ({ city }) => {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
        )
        const data = await response.json()
        if (data.length === 0) {
          return {
            content: [
              {
                type: 'text',
                text: `No se encontraron datos para la ciudad: ${city}`,
              },
            ],
          }
        }
        const { latitude, longitude } = data.results[0]
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
        )
        const weatherData = await weatherResponse.json()
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(weatherData, null, 2),
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

export { handler as GET, handler as POST, handler as DELETE };

