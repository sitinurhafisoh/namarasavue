
<template>
  <section id="tentang-kami" class="about-section py-5">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6 mb-4 mb-md-0">
          <div class="row g-3">
            <div class="col-7">
              <div class="image-border-blue h-100">
                <img
                  :src="nm1"
                  class="img-fluid rounded-4 h-100 object-fit-cover shadow"
                  alt="Makanan Namarasa"
                >
              </div>
            </div>
            <div class="col-5">
              <div class="d-flex flex-column h-100 g-3">
                <img
                  :src="nm2"
                  class="img-fluid rounded-4 mb-3 shadow"
                  alt="Interior Namarasa"
                >
                <img
                  :src="nm3"
                  class="img-fluid rounded-4 shadow"
                  alt="Pelayanan Namarasa"
                >
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 ps-md-5">
          <small class="section-subtitle fw-bold text-uppercase">CERITA KAMI</small>
          <h1 class="fw-bold section-title mt-2 mb-4">Tentang Namarasa</h1>

          <div class="about-content">
            <p class="text-muted mb-3">
              Namarasa hadir sebagai tempat makan yang mengutamakan kejujuran rasa yang 
              menghadirkan hidangan yang akrab, hangat, dan dibuat dengan perhatian pada 
              kualitas bahan serta keseimbangan bumbu.
            </p>

            <p class="text-muted mb-3">
              Setiap menu kami diolah dari resep yang sederhana namun penuh karakter, 
              terinspirasi dari cita rasa yang dekat dengan keseharian.
            </p>

            <p class="text-muted mb-0">
              Kami percaya makanan yang baik tidak perlu berlebihan, cukup diolah dengan 
              sepenuh hati agar setiap sajian terasa nyaman, mudah dinikmati, dan selalu 
              ingin dinikmati kembali bersama orang-orang terdekat.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import nm1 from '../assets/galeri/nm1.jpg'
import nm2 from '../assets/galeri/nm2.jpg'
import nm3 from '../assets/galeri/nm3.jpg'
</script>

<style scoped>
.about-section {
  background-color: #ECECEC;
}
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');
.section-subtitle {
  color: #8B5E34;
  letter-spacing: 1px;
  font-family: 'Plus Jakarta Sans';
  font-weight: 700; 
}

.section-title {
  font-size: 2.8rem;
  color: #1a1a1a;
}

.about-content p {
  line-height: 1.8;
  font-size: 1.05rem;
  text-align: justify;
}

.rounded-4 {
  border-radius: 1rem !important;
}

.object-fit-cover {
  object-fit: cover;
}
</style>