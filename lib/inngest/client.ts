import { Inngest } from 'inngest'

export const inngest = new Inngest({
  id: 'signalist',
  isDev: true,
  ai: { gemini: { apiKey: process.env.GEMINI_API_KEY! } }
})
