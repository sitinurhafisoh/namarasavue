import { defineStore } from 'pinia'

function loadCart() {
  try {
    const raw = localStorage.getItem('namarasa_cart_v1')
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveCart(items) {
  try {
    localStorage.setItem('namarasa_cart_v1', JSON.stringify(items))
  } catch {
  }
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: loadCart(),
  }),
  getters: {
    totalItems: (state) => state.items.reduce((sum, i) => sum + i.qty, 0),
    totalPrice: (state) => state.items.reduce((sum, i) => sum + i.qty * i.price, 0),
  },
  actions: {
    addItem(payload) {
      const existing = this.items.find((i) => i.id === payload.id)
      if (existing) {
        existing.qty += 1
      } else {
        this.items.push({
          id: payload.id,
          name: payload.name,
          price: payload.price,
          image: payload.image,
          qty: 1,
        })
      }
      saveCart(this.items)
    },
    decrementItem(id) {
      const idx = this.items.findIndex((i) => i.id === id)
      if (idx === -1) return
      const item = this.items[idx]
      item.qty -= 1
      if (item.qty <= 0) this.items.splice(idx, 1)
      saveCart(this.items)
    },
    removeItem(id) {
      this.items = this.items.filter((i) => i.id !== id)
      saveCart(this.items)
    },
    clear() {
      this.items = []
      saveCart(this.items)
    },
  },
})
