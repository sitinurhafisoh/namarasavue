<template>
  <div class="payment-page">
    <Navbar />

    <section class="payment-wrapper py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-8">
            <div class="card border-0 shadow-sm rounded-4 p-4 p-md-5">
              <h2 class="fw-bold mb-2">Status Pesanan</h2>
              <p class="text-muted mb-4">
                Setelah booking, detail reservasi & pesanan dikirim via WhatsApp/Email. Pembayaran dilakukan setelah pesanan diterima.
              </p>

              <div v-if="emailSent" class="alert alert-success mb-4" role="alert">
                Email berhasil dikirim.
              </div>

              <div v-if="!orderStore.hasOrder" class="text-muted">
                Belum ada pesanan. Silakan pilih menu dan lakukan booking terlebih dahulu.
              </div>

              <template v-else>
                <div class="mb-4">
                  <div class="fw-bold mb-2">Order</div>
                  <div class="small text-muted">
                    <div><span class="fw-bold">ID:</span> {{ orderStore.current.id }}</div>
                    <div><span class="fw-bold">Dibuat:</span> {{ orderStore.current.createdAt }}</div>
                    <div><span class="fw-bold">Diterima:</span> {{ orderStore.current.receivedAt || '-' }}</div>
                    <div><span class="fw-bold">Dibayar:</span> {{ orderStore.current.paidAt || '-' }}</div>
                  </div>
                </div>

                <div class="mb-4">
                  <div class="fw-bold mb-2">Data Reservasi</div>
                  <div class="small text-muted">
                    {{ orderStore.current.reservation.firstName }} {{ orderStore.current.reservation.lastName }} — {{ orderStore.current.reservation.phone }}<br />
                    {{ orderStore.current.reservation.dateTime }} — {{ orderStore.current.reservation.guests }} tamu — Meja: {{ orderStore.current.reservation.meja }}
                  </div>
                </div>

                <div class="mb-4">
                  <div class="fw-bold mb-2">Ringkasan Pesanan</div>
                  <div class="d-flex flex-column gap-2">
                    <div v-for="i in orderStore.current.items" :key="i.id" class="d-flex justify-content-between small">
                      <div class="text-muted">{{ i.name }} x{{ i.qty }}</div>
                      <div class="fw-bold">{{ formatPrice(i.lineTotal) }}</div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between mt-3">
                    <div class="text-muted">Total</div>
                    <div class="fw-bold">{{ formatPrice(orderStore.current.totalPrice) }}</div>
                  </div>
                </div>

                <div class="d-grid d-sm-flex gap-2">
                  <button type="button" class="btn btn-outline-secondary fw-bold" @click="backToCheckout">
                    Kembali
                  </button>
                  <button type="button" class="btn btn-outline-primary fw-bold" @click="resendEmail">
                    Kirim Email
                  </button>
                </div>

                <div class="d-grid d-sm-flex gap-2 mt-3">
                  <button
                    type="button"
                    class="btn btn-warning fw-bold"
                    @click="markReceived"
                    :disabled="Boolean(orderStore.current.receivedAt)"
                  >
                    Pesanan Diterima
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary fw-bold"
                    @click="openPayment"
                    :disabled="!orderStore.current.receivedAt || Boolean(orderStore.current.paidAt)"
                  >
                    Bayar
                  </button>
                </div>

                <div v-if="showPayment" class="border rounded-4 p-3 mt-3">
                  <div class="fw-bold mb-2">Pilih Metode Pembayaran</div>
                  <div class="d-flex flex-column gap-2">
                    <label class="payment-option">
                      <input type="radio" name="payMethod" value="transfer" v-model="selectedMethod" />
                      <span class="ms-2">Transfer Bank</span>
                    </label>
                    <label class="payment-option">
                      <input type="radio" name="payMethod" value="qris" v-model="selectedMethod" />
                      <span class="ms-2">QRIS</span>
                    </label>
                    <label class="payment-option">
                      <input type="radio" name="payMethod" value="ewallet" v-model="selectedMethod" />
                      <span class="ms-2">E-Wallet</span>
                    </label>
                    <label class="payment-option">
                      <input type="radio" name="payMethod" value="cash" v-model="selectedMethod" />
                      <span class="ms-2">Bayar di Tempat (Cash)</span>
                    </label>
                  </div>

                  <div class="d-grid d-sm-flex gap-2 mt-3">
                    <button type="button" class="btn btn-outline-secondary fw-bold" @click="closePayment">
                      Batal
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary fw-bold"
                      :disabled="!selectedMethod"
                      @click="confirmPayment"
                    >
                      Konfirmasi Pembayaran
                    </button>
                  </div>
                  <div class="small text-muted mt-2">
                    Ini hanya UI. Tidak ada integrasi payment gateway.
                  </div>
                </div>

                <div v-if="paid" class="alert alert-success mt-4 mb-0">
                  Pembayaran berhasil. Terima kasih!
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

import { useOrderStore } from '../stores/order'

const router = useRouter()

const orderStore = useOrderStore()

const paid = ref(false)
const showPayment = ref(false)
const selectedMethod = ref('')
const emailSent = ref(false)
let emailSentTimer = null

function formatPrice(value) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
}

function backToCheckout() {
  router.push('/checkout')
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

function resendEmail() {
  if (!orderStore.current) return
  emailSent.value = true
  if (emailSentTimer) clearTimeout(emailSentTimer)
  emailSentTimer = setTimeout(() => {
    emailSent.value = false
    emailSentTimer = null
  }, 2500)
}

function markReceived() {
  orderStore.markReceived()
}

function openPayment() {
  showPayment.value = true
}

function closePayment() {
  showPayment.value = false
  selectedMethod.value = ''
}

function confirmPayment() {
  if (!orderStore.current || !orderStore.current.receivedAt) return
  if (!selectedMethod.value) return
  orderStore.markPaid()
  paid.value = true
  closePayment()
}
</script>

<style scoped>
.payment-wrapper {
  background: #f7f4ef;
  min-height: 70vh;
}

.payment-option {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid #e7e7e7;
  border-radius: 12px;
}
</style>
