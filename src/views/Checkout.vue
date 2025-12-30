<template>
  <div class="checkout-page">
    <Navbar />

    <section class="checkout-wrapper py-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-12 col-lg-7">
            <div class="card border-0 shadow-sm rounded-4 p-4">
              <h3 class="fw-bold mb-3">Keranjang</h3>

              <div v-if="cart.items.length === 0" class="text-muted">
                Keranjang masih kosong. Silakan pilih menu dulu.
              </div>

              <div v-else class="d-flex flex-column gap-3">
                <div
                  v-for="item in cart.items"
                  :key="item.id"
                  class="d-flex align-items-center gap-3 border rounded-4 p-3"
                >
                  <img :src="item.image" :alt="item.name" class="item-img" />

                  <div class="flex-grow-1">
                    <div class="fw-bold">{{ item.name }}</div>
                    <div class="small text-muted">{{ formatPrice(item.price) }}</div>
                  </div>

                  <div class="d-flex align-items-center gap-2">
                    <button type="button" class="qty-btn" @click="cart.decrementItem(item.id)">-</button>
                    <div class="qty-text">{{ item.qty }}</div>
                    <button type="button" class="qty-btn" @click="cart.addItem(item)">+</button>
                  </div>

                  <div class="text-end" style="min-width: 110px;">
                    <div class="fw-bold">{{ formatPrice(item.qty * item.price) }}</div>
                    <button type="button" class="btn btn-link p-0 small text-danger" @click="cart.removeItem(item.id)">
                      Hapus
                    </button>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-between align-items-center mt-4">
                <button type="button" class="btn btn-outline-secondary" @click="goMenu">Tambah Menu</button>
                <button type="button" class="btn btn-outline-danger" @click="cart.clear" :disabled="cart.items.length === 0">
                  Kosongkan Keranjang
                </button>
              </div>
            </div>
          </div>

          <div class="col-12 col-lg-5">
            <div class="card border-0 shadow-sm rounded-4 p-4">
              <h3 class="fw-bold mb-3">Ringkasan</h3>

              <div class="d-flex justify-content-between mb-2">
                <div class="text-muted">Total item</div>
                <div class="fw-bold">{{ cart.totalItems }}</div>
              </div>
              <div class="d-flex justify-content-between mb-3">
                <div class="text-muted">Total harga</div>
                <div class="fw-bold">{{ formatPrice(cart.totalPrice) }}</div>
              </div>

              <hr />

              <div class="mb-3">
                <div class="fw-bold mb-1">Data Reservasi</div>
                <div v-if="isReservationComplete" class="small text-muted">
                  {{ reservasi.firstName }} {{ reservasi.lastName }} — {{ reservasi.phone }}<br />
                  {{ reservasi.dateTime }} — {{ reservasi.guests }} tamu — Meja: {{ reservasi.meja }}
                </div>
                <div v-else class="small text-muted">
                  Data reservasi belum lengkap. Kamu perlu isi dulu sebelum checkout.
                </div>
              </div>

              <button
                type="button"
                class="btn btn-primary w-100 fw-bold"
                :disabled="cart.items.length === 0"
                @click="handleBooking"
              >
                Booking
              </button>

              <button
                v-if="!isReservationComplete"
                type="button"
                class="btn btn-outline-primary w-100 fw-bold mt-2"
                @click="goReservasi"
              >
                Isi Reservasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

import { useCartStore } from '../stores/cart'
import { useReservasiStore } from '../stores/reservasi'
import { useOrderStore } from '../stores/order'

const router = useRouter()
const route = useRoute()

const cart = useCartStore()
const reservasi = useReservasiStore()
const orderStore = useOrderStore()

const isReservationComplete = computed(() => {
  return Boolean(reservasi.firstName && reservasi.dateTime && reservasi.guests && reservasi.meja)
})

function formatPrice(value) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
}

function goMenu() {
  router.push('/menu')
}

function goReservasi() {
  router.push({ path: '/reservasi', query: { returnTo: route.fullPath } })
}

function buildBookingMessage(order) {
  const r = order.reservation
  const itemsText = order.items
    .map((i) => `- ${i.name} x${i.qty} (${formatPrice(i.price)}) = ${formatPrice(i.lineTotal)}`)
    .join('\n')

  return [
    `Booking Namarasa`,
    `Order ID: ${order.id}`,
    ``,
    `Data Reservasi:`,
    `${r.firstName} ${r.lastName}`,
    `HP: ${r.phone}`,
    `Email: ${r.email}`,
    `Tanggal/Jam: ${r.dateTime}`,
    `Tamu: ${r.guests}`,
    `Meja: ${r.meja}`,
    ``,
    `Pesanan:`,
    itemsText,
    ``,
    `Total: ${formatPrice(order.totalPrice)}`,
    ``,
    `Catatan: Pembayaran dilakukan setelah pesanan diterima.`,
  ].join('\n')
}

function handleBooking() {
  if (!isReservationComplete.value) {
    goReservasi()
    return
  }

  const order = orderStore.createOrder({
    cartItems: cart.items,
    reservation: reservasi,
    totalPrice: cart.totalPrice,
  })

  router.push('/payment')
}
</script>

<style scoped>
.checkout-wrapper {
  background: #f7f4ef;
  min-height: 70vh;
}

.item-img {
  width: 64px;
  height: 64px;
  border-radius: 10px;
  object-fit: cover;
}

.qty-btn {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background: #fff;
  font-weight: 800;
}

.qty-text {
  min-width: 18px;
  text-align: center;
  font-weight: 800;
}
</style>
