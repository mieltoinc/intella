import { supabase } from "./client";

import { Provider, User } from "@supabase/supabase-js";

export const supabaseHelper = {
    // Sign up with email and password
    signUp: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      return { data, error }
    },
  
    // Sign in with email and password
    signIn: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { data, error }
    },
  
    // Sign in with OAuth provider
    signInWithOAuth: async (provider: Provider) => {
      console.log(provider)
      console.log(window.location.origin, '/auth/callback')
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      return { data, error }
    },
  
    // Sign out
    signOut: async () => {
      const { error } = await supabase.auth.signOut()
      return { error }
    },
  
    // Reset password
    resetPassword: async (email: string) => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      return { data, error }
    },
  
    // Update password
    updatePassword: async (password: string) => {
      const { data, error } = await supabase.auth.updateUser({
        password
      })
      return { data, error }
    },
  
    // Exchange code for session
    exchangeCodeForSession: async (code: string) => {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      return { data, error }
    },
  
    // Get current user
    getCurrentUser: async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      return { user, error }
    },
  
    // Get session
    getSession: async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      return { session, error }
    },
  
    // Listen to auth changes
    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      return supabase.auth.onAuthStateChange(callback)
    }
  }


export const getProfileFromUser = (user: User) => {
let name = user.user_metadata?.name ?? user.user_metadata?.full_name ?? user.email;
let shortName = name.split(' ').map(n => n[0]).join('');
let avatarUrl = user.user_metadata?.avatar_url ?? user.user_metadata?.picture;
  return {
    id: user.id,
    name: name,
    shortName: shortName,
    email: user.email,
    avatar_url: avatarUrl,
  }
}