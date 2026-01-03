import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { goal, age, gender, weight, height, activityLevel } = body

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API Key não configurada' },
        { status: 500 }
      )
    }

    const prompt = `Você é um nutricionista especializado. Crie um plano nutricional detalhado com as seguintes características:

Objetivo: ${goal}
Idade: ${age} anos
Gênero: ${gender}
Peso: ${weight} kg
Altura: ${height} cm
Nível de atividade: ${activityLevel}

Retorne um JSON com a seguinte estrutura:
{
  "daily_calories": 2500,
  "macros": {
    "protein": 150,
    "carbs": 300,
    "fats": 70
  },
  "meals": [
    {
      "name": "Café da Manhã",
      "time": "07:00",
      "calories": 500,
      "protein": 30,
      "carbs": 60,
      "fats": 15,
      "foods": [
        "3 ovos mexidos",
        "2 fatias de pão integral",
        "1 banana",
        "200ml de leite desnatado"
      ],
      "tips": "Dicas para a refeição"
    }
  ],
  "hydration": "Quantidade de água recomendada",
  "supplements": ["Suplementos recomendados"],
  "tips": ["Dicas gerais de nutrição"]
}

Crie um plano completo com 5-6 refeições diárias.`

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
            content: 'Você é um nutricionista especializado em nutrição esportiva. Sempre responda em JSON válido.'
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
    const nutritionPlan = JSON.parse(data.choices[0].message.content)

    return NextResponse.json(nutritionPlan)
  } catch (error) {
    console.error('Erro ao gerar plano nutricional:', error)
    return NextResponse.json(
      { error: 'Erro ao gerar plano nutricional' },
      { status: 500 }
    )
  }
}
