import { create } from 'zustand'

interface User {
  id: string
  phone: string
  name: string | null
  email: string | null
  market: 'ZA' | 'DE'
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  setUser: (user: User | null, token: string | null) => void
  logout: () => void
  checkSession: () => void
}

const API_URL = import.meta.env.VITE_API_URL || '/api'

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('rt_token'),
  isLoading: true,

  setUser: (user, token) => {
    if (token) localStorage.setItem('rt_token', token)
    else localStorage.removeItem('rt_token')
    set({ user, token, isLoading: false })
  },

  logout: () => {
    localStorage.removeItem('rt_token')
    set({ user: null, token: null, isLoading: false })
    window.location.reload()
  },

  checkSession: async () => {
    const token = localStorage.getItem('rt_token')
    if (!token) {
      set({ isLoading: false })
      return
    }
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const user = await res.json()
        set({ user, token, isLoading: false })
      } else {
        localStorage.removeItem('rt_token')
        set({ user: null, token: null, isLoading: false })
      }
    } catch {
      set({ isLoading: false })
    }
  },
}))

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('rt_token')
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
