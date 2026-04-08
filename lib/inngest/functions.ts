import { sendWelcomeEmail } from '@/lib/nodemailer'
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from './prompts'
import { inngest } from '@/lib/inngest/client'

export const sendSignUpEmail = inngest.createFunction(
  {
    id: 'sign-up-email',
    triggers: [{ event: 'app/user.created' }]
  },
  async ({ event, step }) => {
    const userProfile = `
- Country: ${event.data.country ?? 'N/A'}
- Investment goals: ${event.data.investmentGoals ?? 'N/A'}
- Risk tolerance: ${event.data.riskTolerance ?? 'N/A'}
- Preferred industry: ${event.data.preferredIndustry ?? 'N/A'}
    `.trim()

    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
      '{{userProfile}}',
      userProfile
    )

    const response = await step.ai.infer('generate-welcome-intro', {
      model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }),
      body: {
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ]
      }
    })

    await step.run('send-welcome-email', async () => {
      const part = response.candidates?.[0]?.content?.parts?.[0]

      const introText =
        (part && 'text' in part ? part.text : null) ||
        'Thanks for joining Signalist. You now have the tools to track markets and make smarter moves.'

      const { email, name } = event.data

      if (!email) {
        throw new Error('Missing email in event.data')
      }

      return sendWelcomeEmail({
        email,
        name,
        intro: introText
      })
    })

    return {
      success: true,
      message: 'Welcome email sent successfully.'
    }
  }
)
