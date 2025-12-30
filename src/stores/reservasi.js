import { defineStore } from 'pinia'

function loadReservasi() {
  try {
    const raw = localStorage.getItem('namarasa_reservasi_v1')
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveReservasi(state) {
  try {
    localStorage.setItem('namarasa_reservasi_v1', JSON.stringify(state))
  } catch {
  }
}

export const useReservasiStore = defineStore('reservasi', {
  state: () => {
    const saved = loadReservasi()
    return {
      firstName: saved?.firstName ?? '',
      lastName: saved?.lastName ?? '',
      email: saved?.email ?? '',
      phone: saved?.phone ?? '',
      dateTime: saved?.dateTime ?? '',
      guests: saved?.guests ?? '',
      meja: saved?.meja ?? '',
    }
  },

  actions: {
    setReservasi(data) {
      this.firstName = data.firstName
      this.lastName = data.lastName
      this.email = data.email
      this.phone = data.phone
      this.dateTime = data.date
      this.guests = data.guests

      saveReservasi(this.$state)
    },

    setMeja(meja) {
      this.meja = meja

      saveReservasi(this.$state)
    },

    clear() {
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.phone = ''
      this.dateTime = ''
      this.guests = ''
      this.meja = ''
      saveReservasi(this.$state)
    }
  }
})