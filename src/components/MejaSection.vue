<template>
  <div :class="$style.frameParent">

    <!-- HEADER -->
    <div :class="$style.reservasiNamarasaParent">
      <div :class="$style.reservasiNamarasa">RESERVASI NAMARASA</div>

      <div :class="$style.reservasiTempatMeja">
        Reservasi tempat meja di Namarasa
      </div>

      <div :class="$style.reservasiNamarasa">
        Pilih meja tempat anda reservasi di Namarasa
      </div>
    </div>

    <!-- PILIH MEJA -->
    <div :class="$style.frameWrapper">
      <div :class="$style.jumlahTamuParent">

        <div :class="$style.reservasiNamarasa">
          Jumlah Tamu: {{ reservasi.guests }}
        </div>

        <!-- SELECT MEJA -->
        <select
          :class="$style.pilihMejaSelect"
          v-model="mejaDipilih"
        >
          <option value="" disabled>Pilih Meja ...</option>
          <option value="Lily">Lily (10 Guest)</option>
          <option value="Anggrek">Anggrek (8 Guest)</option>
          <option value="Mawar">Mawar (6 Guest)</option>
          <option value="Melati">Melati (4 Guest)</option>
        </select>

      </div>
    </div>

    <!-- FOOTER -->
    <div :class="$style.denganMenekanTombolPesanMParent">
      <div :class="$style.denganMenekanTombol">
        Dengan menekan tombol “pesan menu” berarti anda menyatakan setuju dan siap
        bertanggung jawab atas reservasi yang telah dibuat
      </div>

      <div :class="$style.frameGroup">

        <!-- KEMBALI -->
        <div
          :class="$style.uilarrowLeftParent"
          @click="kembali"
        >
          <div :class="$style.reservasiNamarasa">Sebelumnya</div>
        </div>

        <!-- LANJUT -->
        <div
          :class="$style.uilarrowLeftParent"
          @click="keMenu"
        >
          <div :class="$style.reservasiNamarasa">Pesan Menu</div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useReservasiStore } from '../stores/reservasi'

const route = useRoute()
const router = useRouter()
const reservasi = useReservasiStore()

const mejaDipilih = ref('')

/* 🔒 Proteksi: tidak boleh lompat halaman */
onMounted(() => {
  if (!reservasi.firstName || !reservasi.dateTime) {
    const returnTo = typeof route.query.returnTo === 'string' ? route.query.returnTo : ''
    router.push({
      path: '/reservasi',
      query: returnTo ? { returnTo } : {},
    })
  }
})

const keMenu = () => {
  if (!mejaDipilih.value) {
    alert('Silakan pilih meja terlebih dahulu')
    return
  }

  // ✅ SIMPAN MEJA KE PINIA
  reservasi.setMeja(mejaDipilih.value)

  const returnTo = typeof route.query.returnTo === 'string' ? route.query.returnTo : ''
  router.push(returnTo || '/menu')
}

const kembali = () => {
  const returnTo = typeof route.query.returnTo === 'string' ? route.query.returnTo : ''
  router.push({
    path: '/reservasi',
    query: returnTo ? { returnTo } : {},
  })
}
</script>

<style module>
.frameParent {
  width: 100%;
  max-width: 960px;
  margin: 60px auto;
  border-radius: 20px;
  background-color: #775a36;
  display: flex;
  flex-direction: column;
  padding: 40px 32px;
  gap: 24px;
  color: #fff;
}

/* HEADER */
.reservasiNamarasaParent {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.reservasiNamarasa {
  font-size: 14px;
}

.reservasiTempatMeja {
  font-size: 42px;
  font-weight: 800;
  line-height: 1.2;
}

/* PILIH MEJA */
.frameWrapper {
  width: 100%;
}

.jumlahTamuParent {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pilihMejaSelect {
  width: 100%;
  border-radius: 6px;
  background-color: #fff;
  border: 1px solid #fff;
  padding: 10px 12px;
  font-size: 14px;
  cursor: pointer;
  color: #000;
}

/* FOOTER */
.denganMenekanTombolPesanMParent {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}

.denganMenekanTombol {
  font-weight: 500;
}

.frameGroup {
  display: flex;
  gap: 12px;
}

.uilarrowLeftParent {
  width: 160px;
  border-radius: 6px;
  border: 1px solid #fff;
  padding: 10px;
  text-align: center;
  cursor: pointer;
}

@media (max-width: 768px) {
  .frameParent {
    margin: 40px 16px;
    padding: 28px 20px;
  }

  .reservasiTempatMeja {
    font-size: 28px;
  }

  .frameGroup {
    flex-direction: column;
    width: 100%;
  }

  .uilarrowLeftParent {
    width: 100%;
  }
}
</style>
