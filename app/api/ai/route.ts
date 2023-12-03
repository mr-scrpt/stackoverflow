import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  const { question } = await request.json()
  console.log(' =>>> OPENAI_API_KEY', process.env.OPENAI_API_KEY)

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a professional developer and provide clean and quality information', // provide quality info
          },
          {
            role: 'user',
            content: `Solve this question: ${question}`, // answer the question
          },
        ],
      }),
    })

    const responseDate = await response.json()
    const reply = responseDate.choices[0].message.content

    return NextResponse.json({ reply })
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}
