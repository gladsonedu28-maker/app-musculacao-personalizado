import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { muscleGroup, goal } = body

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API Key não configurada' },
        { status: 500 }
      )
    }

    const prompt = `Você é um personal trainer especializado. Forneça dicas detalhadas de treino para:

Grupo muscular: ${muscleGroup}
Objetivo: ${goal}

Retorne um JSON com a seguinte estrutura:
{
  "tips": [
    {
      "title": "Título da dica",
      "description": "Descrição detalhada",
      "importance": "high/medium/low"
    }
  ],
  "common_mistakes": ["Erros comuns a evitar"],
  "progression_tips": ["Como progredir no treino"],
  "recovery_tips": ["Dicas de recuperação"]
}

Seja específico e prático.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'Você é um personal trainer especializado. Sempre responda em JSON válido.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error('Erro na API da OpenAI')
    }

    const data = await response.json()
    const tips = JSON.parse(data.choices[0].message.content)

    return NextResponse.json(tips)
  } catch (error) {
    console.error('Erro ao gerar dicas:', error)
    return NextResponse.json(
      { error: 'Erro ao gerar dicas de treino' },
      { status: 500 }
    )
  }
}
