<template>
  <section class="reservation-wrapper py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10 col-xl-8">
          
          <div class="reservation-card shadow-lg p-4 p-md-5 rounded-4 text-white">
            
            <div class="mb-4">
              <p class="text-uppercase small fw-bold tracking-wider mb-2 opacity-75">Reservasi Namarasa</p>
              <h1 class="h2 fw-bold mb-2">Reservasi tempat meja di Namarasa</h1>
              <p class="small opacity-75">Isi form di bawah dengan benar untuk reservasi di Namarasa</p>
            </div>

            <form @submit.prevent="handleSubmit">
              <div class="row g-3">
                
                <div class="col-md-6 text-start">
                  <label class="form-label small fw-medium">Nama Depan</label>
                  <input 
                    v-model="formData.firstName"
                    type="text" 
                    class="form-control form-control-lg border-0 shadow-sm" 
                    placeholder="Masukkan nama depan anda" 
                    required
                  >
                </div>

                <div class="col-md-6 text-start">
                  <label class="form-label small fw-medium">Nama Belakang</label>
                  <input 
                    v-model="formData.lastName"
                    type="text" 
                    class="form-control form-control-lg border-0 shadow-sm" 
                    placeholder="Masukkan nama belakang anda" 
                    required
                  >
                </div>

                <div class="col-12 text-start">
                  <label class="form-label small fw-medium">Email</label>
                  <input 
                    v-model="formData.email"
                    type="email" 
                    class="form-control form-control-lg border-0 shadow-sm" 
                    placeholder="contoh : namarasa@gmail.com" 
                    required
                  >
                </div>

                <div class="col-md-6 text-start">
                  <label class="form-label small fw-medium">Nomor Telepon</label>
                  <input 
                    v-model="formData.phone"
                    type="tel" 
                    class="form-control form-control-lg border-0 shadow-sm" 
                    placeholder="Masukkan nomor telepon anda" 
                    required
                  >
                </div>

                <div class="col-md-6 text-start">
                  <label class="form-label small fw-medium">Tanggal Reservasi</label>
                  <input 
                    v-model="formData.date"
                    type="datetime-local" 
                    class="form-control form-control-lg border-0 shadow-sm" 
                    required
                  >
                  <div class="form-text text-white-50 mt-1 small italic">
                    Dimohon untuk memilih jam 17:00 - 23:00
                  </div>
                </div>

                <div class="col-12 text-start">
                  <label class="form-label small fw-medium">Jumlah Tamu</label>
                  <select 
                    v-model="formData.guests"
                    class="form-select form-select-lg border-0 shadow-sm" 
                    required
                  >
                    <option value="" disabled>Jumlah Tamu ...</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div class="col-12 text-center mt-5">
                  <p class="small opacity-75 mb-4 mx-auto" style="max-width: 500px;">
                    Tahap selanjutnya adalah memilih meja yang akan anda tempati harap konfirmasi data dan nomor telepon yang telah diisi
                  </p>
                  
                  <div class="d-grid d-sm-flex justify-content-center gap-3">
                    <button type="submit" class="btn btn-outline-light px-5 py-2 fw-bold">
                      Selanjutnya <span class="ms-1">→</span>
                    </button>
                
                  </div>
                </div>

              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useReservasiStore } from '../stores/reservasi'

// ✅ AKTIFKAN
const route = useRoute()
const router = useRouter()
const reservasiStore = useReservasiStore()

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  date: '',
  guests: ''
})

const handleSubmit = () => {
  // ✅ VALIDASI JAM 17 - 23
  const waktu = new Date(formData.date)
  const jam = waktu.getHours()

  if (jam < 17 || jam >= 23) {
    alert('Reservasi hanya tersedia pukul 17:00 - 23:00')
    return
  }

  reservasiStore.setReservasi(formData)
  const returnTo = typeof route.query.returnTo === 'string' ? route.query.returnTo : ''
  router.push({
    path: '/pilihmeja',
    query: returnTo ? { returnTo } : {},
  })
}
</script>

<style scoped>

.reservation-wrapper {
  background-color: #f5f5f5; 
  min-height: 100vh;
}

.reservation-card {
  background-color: #7a5c3d; 
  border: none;
}


.form-control, .form-select {
  border-radius: 6px;
  background-color: #ffffff;
  font-size: 14px;
}

.form-control::placeholder {
  color: #adb5bd;
  font-size: 0.9rem;
}

/* Hover effect pada tombol selanjutnya */
.btn-outline-light {
  border-width: 2px;
  transition: all 0.3s ease;
}

.btn-outline-light:hover {
  background-color: #ffffff;
  color: #7a5c3d !important;
}

.tracking-wider {
  letter-spacing: 0.05em;
}

.italic {
  font-style: italic;
}
</style>