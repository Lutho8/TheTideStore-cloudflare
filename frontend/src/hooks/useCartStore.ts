import { create } from 'zustand'

export interface CartItem {
  id: string
  productId: string
  slug: string
  name: string
  variantId: string
  variantName: string
  price: number
  quantity: number
  imageUrl: string
  dosageMg?: number | null
  vialCount?: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void
}

const STORAGE_KEY = 'rt_cart'

function loadItems(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore parse errors
  }
  return []
}

function saveItems(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const useCartStore = create<CartState>((set, get) => ({
  items: loadItems(),
  isOpen: false,

  addItem: (item) => {
    const { items } = get()
    const existing = items.find((i) => i.id === item.id)
    let next: CartItem[]
    if (existing) {
      next = items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
      )
    } else {
      next = [...items, item]
    }
    saveItems(next)
    set({ items: next })
  },

  removeItem: (id) => {
    const next = get().items.filter((i) => i.id !== id)
    saveItems(next)
    set({ items: next })
  },

  updateQuantity: (id, qty) => {
    if (qty < 1) {
      get().removeItem(id)
      return
    }
    const next = get().items.map((i) =>
      i.id === id ? { ...i, quantity: qty } : i
    )
    saveItems(next)
    set({ items: next })
  },

  clearCart: () => {
    localStorage.removeItem(STORAGE_KEY)
    set({ items: [] })
  },

  get totalItems() {
    return get().items.reduce((sum, i) => sum + i.quantity, 0)
  },

  get subtotal() {
    return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  },

  openDrawer: () => set({ isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),
  toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
}))
