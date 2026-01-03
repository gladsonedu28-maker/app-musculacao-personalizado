import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Verificar se as credenciais do Supabase estão configuradas
export const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== '' && supabaseAnonKey !== ''

// Criar cliente apenas se configurado
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any // Mock client para evitar erros

// Tipos para o banco de dados
export type Profile = {
  id: string
  user_id: string
  name: string
  age: number
  gender: string
  body_type: string
  goal: string
  plan_type: 'free' | 'basic' | 'premium' | 'elite'
  created_at: string
  updated_at: string
}

export type Workout = {
  id: string
  user_id: string
  name: string
  exercises: Exercise[]
  completed: boolean
  date: string
  duration: number
  calories_burned: number
  created_at: string
}

export type Exercise = {
  name: string
  sets: number
  reps: string
  rest: string
  equipment: string
  muscle_group: string
}

export type NutritionPlan = {
  id: string
  user_id: string
  goal: string
  daily_calories: number
  protein: number
  carbs: number
  fats: number
  meals: Meal[]
  created_at: string
}

export type Meal = {
  name: string
  time: string
  calories: number
  protein: number
  carbs: number
  fats: number
  foods: string[]
}

// Funções auxiliares para o Supabase
export const profileService = {
  async getProfile(userId: string) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase não configurado')
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error) throw error
    return data as Profile
  },

  async createProfile(profile: Omit<Profile, 'id' | 'created_at' | 'updated_at'>) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase não configurado')
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single()
    
    if (error) throw error
    return data as Profile
  },

  async updateProfile(userId: string, updates: Partial<Profile>) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase não configurado')
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data as Profile
  }
}

export const workoutService = {
  async getWorkouts(userId: string) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase não configurado')
    }
    
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Workout[]
  },

  async createWorkout(workout: Omit<Workout, 'id' | 'created_at'>) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase não configurado')
    }
    
    const { data, error } = await supabase
      .from('workouts')
      .insert(workout)
      .select()
      .single()
    
    if (error) throw error
    return data as Workout
  },

  async updateWorkout(workoutId: string, updates: Partial<Workout>) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase não configurado')
    }
    
    const { data, error } = await supabase
      .from('workouts')
      .update(updates)
      .eq('id', workoutId)
      .select()
      .single()
    
    if (error) throw error
    return data as Workout
  }
}

export const nutritionService = {
  async getNutritionPlan(userId: string) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase não configurado')
    }
    
    const { data, error } = await supabase
      .from('nutrition_plans')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error) throw error
    return data as NutritionPlan
  },

  async createNutritionPlan(plan: Omit<NutritionPlan, 'id' | 'created_at'>) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase não configurado')
    }
    
    const { data, error } = await supabase
      .from('nutrition_plans')
      .insert(plan)
      .select()
      .single()
    
    if (error) throw error
    return data as NutritionPlan
  }
}
