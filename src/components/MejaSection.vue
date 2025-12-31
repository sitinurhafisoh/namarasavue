<template>
  <div :class="$style.pageWrapper">
    <div :class="$style.frameParent">

      
      <div :class="$style.reservasiNamarasaParent">
        <div :class="$style.smallText">RESERVASI NAMARASA</div>

        <div :class="$style.reservasiTempatMeja">
          Reservasi Tempat Meja
        </div>

        <div :class="$style.smallText">
          Pilih meja tempat anda reservasi di Namarasa
        </div>
      </div>

      
      <div :class="$style.frameWrapper">
        <div :class="$style.jumlahTamuParent">
          <div :class="$style.smallText">
            Jumlah Tamu: {{ reservasi.guests }}
          </div>

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

      
      <div :class="$style.footerSection">
        <div :class="$style.noteText">
          Dengan menekan tombol “Pesan Menu” berarti anda menyatakan setuju dan
          siap bertanggung jawab atas reservasi yang telah dibuat
        </div>

        <div :class="$style.buttonGroup">

          
          <div
            :class="[$style.buttonBase, $style.buttonBack]"
            @click="kembali"
          >
            <span :class="$style.arrow">←</span>
            <span>Sebelumnya</span>
          </div>

          
          <div
            :class="[$style.buttonBase, $style.buttonPrimary]"
            @click="keMenu"
          >
            <span>Pesan Menu</span>
            <span :class="$style.arrow">→</span>
          </div>

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

onMounted(() => {
  if (!reservasi.firstName || !reservasi.dateTime) {
    router.push('/reservasi')
  }
})

const keMenu = () => {
  if (!mejaDipilih.value) {
    alert('Silakan pilih meja terlebih dahulu')
    return
  }
  reservasi.setMeja(mejaDipilih.value)
  router.push('/menu')
}

const kembali = () => {
  router.push('/reservasi')
}
</script>

<style module>

.pageWrapper {
  min-height: 100vh;
  background-color: #ECECEC;
  display: flex;
  align-items: center;
  justify-content: center;
}


.frameParent {
  width: 100%;
  max-width: 960px;
  margin: 40px 16px;
  border-radius: 20px;
  background-color: #775a36;
  display: flex;
  flex-direction: column;
  padding: 40px 32px;
  gap: 28px;
  color: #fff;
}


.reservasiNamarasaParent {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.smallText {
  font-size: 14px;
  opacity: 0.9;
}

.reservasiTempatMeja {
  font-size: 40px;
  font-weight: 800;
  line-height: 1.2;
}

.jumlahTamuParent {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pilihMejaSelect {
  width: 100%;
  border-radius: 6px;
  background-color: #fff;
  border: none;
  padding: 12px;
  font-size: 14px;
  cursor: pointer;
}

.footerSection {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}

.noteText {
  font-size: 13px;
  opacity: 0.9;
}

.buttonGroup {
  display: flex;
  gap: 12px;
}

.buttonBase {
  width: 180px;
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
  border: 1px solid #fff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: 0.3s;
}

.buttonBack {
  background-color: #ff0000;
}

.buttonBack:hover {
  background-color: #cc0000;
}


.buttonPrimary {
  background-color: #337744;
}

.buttonPrimary:hover {
  background-color: #285f37;
}


.arrow {
  font-size: 16px;
  font-weight: bold;
}


@media (max-width: 768px) {
  .reservasiTempatMeja {
    font-size: 28px;
  }

  .buttonGroup {
    flex-direction: column;
    width: 100%;
  }

  .buttonBase {
    width: 100%;
  }
}
</style>


