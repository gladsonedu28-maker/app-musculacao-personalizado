// Integração com OpenAI para gerar treinos e planos nutricionais personalizados

type WorkoutGenerationParams = {
  goal: string
  bodyType: string
  age: number
  gender: string
  experience: string
}

type NutritionGenerationParams = {
  goal: string
  age: number
  gender: string
  weight: number
  height: number
  activityLevel: string
}

export const aiService = {
  async generateWorkoutPlan(params: WorkoutGenerationParams) {
    try {
      const response = await fetch('/api/ai/generate-workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error('Erro ao gerar plano de treino')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Erro ao gerar treino com IA:', error)
      throw error
    }
  },

  async generateNutritionPlan(params: NutritionGenerationParams) {
    try {
      const response = await fetch('/api/ai/generate-nutrition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error('Erro ao gerar plano nutricional')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Erro ao gerar nutrição com IA:', error)
      throw error
    }
  },

  async generateWorkoutTips(muscleGroup: string, goal: string) {
    try {
      const response = await fetch('/api/ai/workout-tips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ muscleGroup, goal }),
      })

      if (!response.ok) {
        throw new Error('Erro ao gerar dicas de treino')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Erro ao gerar dicas com IA:', error)
      throw error
    }
  },

  async analyzeProgress(workoutHistory: any[], nutritionData: any) {
    try {
      const response = await fetch('/api/ai/analyze-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ workoutHistory, nutritionData }),
      })

      if (!response.ok) {
        throw new Error('Erro ao analisar progresso')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Erro ao analisar progresso com IA:', error)
      throw error
    }
  }
}
