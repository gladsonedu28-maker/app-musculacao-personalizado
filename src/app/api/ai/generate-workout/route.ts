import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { goal, bodyType, age, gender, experience } = body

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API Key não configurada' },
        { status: 500 }
      )
    }

    const prompt = `Você é um personal trainer especializado. Crie um plano de treino detalhado para academia com as seguintes características:

Objetivo: ${goal}
Tipo de corpo: ${bodyType}
Idade: ${age} anos
Gênero: ${gender}
Nível de experiência: ${experience}

Retorne um JSON com a seguinte estrutura:
{
  "name": "Nome do Plano",
  "description": "Descrição breve",
  "duration": "Duração em semanas",
  "frequency": "Frequência semanal",
  "workouts": [
    {
      "day": "Dia da semana",
      "focus": "Grupo muscular",
      "exercises": [
        {
          "name": "Nome do exercício",
          "sets": 3,
          "reps": "8-12",
          "rest": "60s",
          "equipment": "Equipamento necessário",
          "muscle_group": "Grupo muscular trabalhado",
          "tips": "Dicas de execução"
        }
      ]
    }
  ]
}

Inclua exercícios específicos para academia com equipamentos reais (Leg Press, Supino, Hack Machine, etc.).`

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
            content: 'Você é um personal trainer especializado em musculação e treinos de academia. Sempre responda em JSON válido.'
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
    const workoutPlan = JSON.parse(data.choices[0].message.content)

    return NextResponse.json(workoutPlan)
  } catch (error) {
    console.error('Erro ao gerar treino:', error)
    return NextResponse.json(
      { error: 'Erro ao gerar plano de treino' },
      { status: 500 }
    )
  }
}
