import { supabase, isSupabaseConfigured } from './supabase'

export type UserRole = 'user' | 'admin'

export interface AuthUser {
  id: string
  email: string
  role: UserRole
  created_at: string
}

// Verificar se usuário está autenticado
export async function getCurrentUser() {
  // Modo demo: verificar localStorage
  if (!isSupabaseConfigured) {
    const demoUser = localStorage.getItem('demoUser')
    if (demoUser) {
      return JSON.parse(demoUser)
    }
    return null
  }

  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Verificar se usuário é admin
export async function isAdmin(userId: string): Promise<boolean> {
  if (!isSupabaseConfigured) {
    return false
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('user_id', userId)
    .single()
  
  if (error) return false
  return data?.role === 'admin'
}

// Fazer login
export async function signIn(email: string, password: string) {
  // Modo demo: salvar no localStorage
  if (!isSupabaseConfigured) {
    const demoUser = {
      id: 'demo-user-' + Date.now(),
      email,
      created_at: new Date().toISOString()
    }
    localStorage.setItem('demoUser', JSON.stringify(demoUser))
    return { user: demoUser }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) throw error
  return data
}

// Fazer cadastro
export async function signUp(email: string, password: string) {
  // Modo demo: salvar no localStorage
  if (!isSupabaseConfigured) {
    const demoUser = {
      id: 'demo-user-' + Date.now(),
      email,
      created_at: new Date().toISOString()
    }
    localStorage.setItem('demoUser', JSON.stringify(demoUser))
    return { user: demoUser }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  
  if (error) throw error
  return data
}

// Fazer logout
export async function signOut() {
  // Modo demo: limpar localStorage
  if (!isSupabaseConfigured) {
    localStorage.removeItem('demoUser')
    return
  }

  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Resetar senha
export async function resetPassword(email: string) {
  if (!isSupabaseConfigured) {
    throw new Error('Funcionalidade disponível apenas com Supabase configurado')
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email)
  if (error) throw error
}
