import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import OpenAI from 'openai'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env from the main project folder
dotenv.config({
  path: path.resolve(__dirname, '../.env')
})

const app = express()

// Real backend port
const PORT = process.env.PORT || 3001

if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is missing. Check your root .env file.')
  process.exit(1)
}

// Optional proxy support (helps with ECONNREFUSED on some networks)
const openAiConfig = {
  apiKey: process.env.OPENAI_API_KEY
}

if (process.env.HTTPS_PROXY) {
  try {
    const { HttpsProxyAgent } = await import('https-proxy-agent')
    openAiConfig.httpAgent = new HttpsProxyAgent(process.env.HTTPS_PROXY)
    console.log('Using HTTPS proxy:', process.env.HTTPS_PROXY)
  } catch (e) {
    console.warn('HTTPS_PROXY is set but https-proxy-agent is not installed. Run: npm i https-proxy-agent')
  }
}

const ai = new OpenAI(openAiConfig)

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ]
}))

app.use(express.json({ limit: '1mb' }))

const kennedyInstructions = `
You are Kennedy Dev's AI portfolio assistant.

PROFILE:
Full name: Ineza Nzeyimana Elie Kennedy.
Also known as: Kennedy Dev.
Title: Frontend Developer.
Location: Nyamagabe, Rwanda.
GitHub: https://github.com/codeman6699.

TECHNOLOGIES:
Vue.js, JavaScript, HTML5, CSS3, responsive design,
Lucide Vue Next, Git and GitHub.
Backend exposure (project-level): Express.js, MySQL.

PROJECTS:

1. Stream.store:
A movie and series platform project using Vue.js,
with Express.js and MySQL as the intended backend stack.
Its status is in development (not live yet).

2. Kitabi Sector:
A digital community information platform concept
focused on local institutions and community services.
Status: concept / in progress.

3. College de Bethel:
A school dashboard concept with school information,
dashboard navigation and a purple visual identity.
Status: concept / in progress.

BEHAVIOUR:
- Answer naturally and professionally.
- Understand follow-up questions using conversation history.
- Explain Kennedy's technologies and projects.
- Welcome potential clients and collaborators.
- Never invent qualifications, employment, experience,
  certificates, phone numbers or email addresses.
- Never claim projects are completed or live without verification.
- If information is unavailable, say so honestly.
- Direct contact enquiries to the portfolio contact section or GitHub.
- Politely redirect unrelated questions towards the portfolio.

COMMON QUESTIONS TO ANSWER WELL:
- "Who is Kennedy Dev?" -> Give the full name, title, location and GitHub.
- "What is his full name?" -> Ineza Nzeyimana Elie Kennedy.
- "What technologies does he use?" -> List the technologies above.
- "Tell me about Stream.store" -> Describe it and state it is in development.
- "Can I work with Kennedy?" -> Yes, invite them to the contact section or GitHub.
`

app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Kennedy AI server is running',
    port: PORT
  })
})

app.post('/api/ai/chat', async (req, res) => {
  try {
    const messages = req.body.messages

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: 'Please provide a conversation message.'
      })
    }

    const conversation = messages
      .filter(message =>
        ['user', 'assistant'].includes(message.role) &&
        typeof message.content === 'string'
      )
      .slice(-13)
      .map(message => ({
        role: message.role,
        content: message.content.slice(0, 4000)
      }))

    if (!conversation.some(message => message.role === 'user')) {
      return res.status(400).json({
        error: 'Please send a question first.'
      })
    }

    const result = await ai.responses.create({
      model: 'gpt-4.1-mini',
      instructions: kennedyInstructions,
      input: conversation,
      max_output_tokens: 500
    })

    res.json({
      reply: result.output_text
    })

  } catch (error) {
    console.error('AI assistant error:', error.message)
    // Print the underlying cause so the terminal shows the real problem
    console.error('Detailed cause:', error.cause?.cause ?? error.cause)

    // Helpful hints for the most common causes
    const causeCode = error.cause?.code || error.cause?.cause?.code
    if (causeCode === 'ECONNREFUSED') {
      console.error('Hint: connection refused. If you are behind a proxy, set HTTPS_PROXY in your .env')
    }
    if (causeCode === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' || causeCode === 'SELF_SIGNED_CERT_IN_CHAIN') {
      console.error('Hint: SSL certificate issue. Antivirus HTTPS scanning or a corporate proxy may be intercepting traffic.')
    }
    if (error.status === 401) {
      console.error('Hint: check that OPENAI_API_KEY is correct and active.')
    }

    res.status(500).json({
      error: 'The AI service is temporarily unavailable.'
    })
  }
})

app.listen(PORT, () => {
  console.log('-------------------------------------')
  console.log(' Kennedy Dev AI Backend')
  console.log(` Server: http://localhost:${PORT}`)
  console.log(` Health: http://localhost:${PORT}/api/health`)
  console.log(' Status: RUNNING')
  console.log('-------------------------------------')
})