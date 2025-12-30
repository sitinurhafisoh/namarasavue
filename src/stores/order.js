import { defineStore } from 'pinia'

function loadOrder() {
  try {
    const raw = localStorage.getItem('namarasa_order_v1')
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveOrder(order) {
  try {
    localStorage.setItem('namarasa_order_v1', JSON.stringify(order))
  } catch {
  }
}

export const useOrderStore = defineStore('order', {
  state: () => ({
    current: loadOrder(),
  }),
  getters: {
    hasOrder: (state) => Boolean(state.current && state.current.id),
  },
  actions: {
    createOrder({ cartItems, reservation, totalPrice }) {
      const id = `NR-${Date.now()}`
      const createdAt = new Date().toISOString()

      this.current = {
        id,
        createdAt,
        reservation: {
          firstName: reservation.firstName,
          lastName: reservation.lastName,
          email: reservation.email,
          phone: reservation.phone,
          dateTime: reservation.dateTime,
          guests: reservation.guests,
          meja: reservation.meja,
        },
        items: cartItems.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          image: i.image,
          qty: i.qty,
          lineTotal: i.qty * i.price,
        })),
        totalPrice,
        receivedAt: null,
        paidAt: null,
      }

      saveOrder(this.current)
      return this.current
    },
    markReceived() {
      if (!this.current) return
      this.current.receivedAt = new Date().toISOString()
      saveOrder(this.current)
    },
    markPaid() {
      if (!this.current) return
      this.current.paidAt = new Date().toISOString()
      saveOrder(this.current)
    },
    clear() {
      this.current = null
      saveOrder(this.current)
    },
  },
})
