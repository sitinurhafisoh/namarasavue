<template>
  <section id="menu" class="best-seller py-5">
    <div class="container text-center">
      <small class="section-subtitle">MENU ANDALAN KAMI</small>
      <h2 class="fw-bold mb-3">Best Sellers Menu</h2>
      <p class="text-muted mb-5 mx-auto description">
        Menu-menu hits yang sering banget di-order! Semua dibikinin sama chef
        yang udah jago banget pakai bahan premium pilihan
      </p>

      <div class="row g-4">
        <div
          class="col-md-4"
          v-for="(item, index) in bestSellers"
          :key="index"
        >
          <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
            <img
              :src="item.image"
              class="card-img-top"
              :alt="item.name"
            />
            <div class="card-body text-start p-4">
              <h5 class="fw-bold">{{ item.name }}</h5>
              <p class="card-text text-muted small">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <router-link
        to="/menu"
        class="btn btn-brown mt-5 px-5 py-2 fw-bold text-decoration-none"
      >
        Lihat Menu Lainnya
      </router-link>
    </div>
  </section>
</template>

<script setup>
import img22 from '../assets/menu/image22.png'
import img23 from '../assets/menu/image23.png'
import img24 from '../assets/menu/image24.png'

const bestSellers = [
  {
    name: 'Lontong Sayur Rendang',
    description:
      'Lontong lembut berpadu kuah sayur gurih dan rendang empuk yang kaya rempah, bikin sekali suap langsung terasa hangat dan nagih.',
    image: img22,
  },
  {
    name: 'Bihun Bebek',
    description:
      'Bihun lembut dengan irisan bebek empuk dan taburan bawang gurih yang aromanya langsung menggoda.',
    image: img23,
  },
  {
    name: 'Nasi Uduk Komplit',
    description:
      'Nasi uduk pulen dan harum santan disajikan lengkap dengan lauk pilihan yang bikin puas dari suapan pertama.',
    image: img24,
  },
]
</script>

<style scoped>
/* Background Section */
.best-seller {
  background-color: #ECECEC;
}

/* Subtitle */
.section-subtitle {
  display: inline-block;
  margin-bottom: 8px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1px;
  color: #8b5e34;
}

/* Description */
.description {
  max-width: 700px;
}

/* Button */
.btn-brown {
  background-color: #634819;
  color: white;
  border-radius: 8px;
}

.btn-brown:hover {
  background-color: #4d3813;
  color: white;
}

/* Card Image */
.card-img-top {
  height: 250px;
  object-fit: cover;
}

/* Radius */
.rounded-4 {
  border-radius: 1.25rem !important;
}
</style>
