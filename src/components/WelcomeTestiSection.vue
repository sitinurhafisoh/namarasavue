<template>
  <section id= "review" class="testimonial-section py-100">
    <div class="container">
      <div class="text-center mb-5">
        <p class="section-subtitle fw-bold text-uppercase mb-1">
          Mereka Udah Coba, Kamu Kapan??
        </p>
        <h1 class="section-title fw-bold mt-0">
          Testimoni Seru dari Pengunjung
        </h1>
        <p class="text-muted mx-auto mt-2" style="max-width: 600px;">
          Gak perlu mikir lama, nih bukti dari mereka yang udah ngerasain langsung ke-kece-an tempat ini!
        </p>
      </div>

      <swiper
        :modules="[Autoplay, Pagination]"
        :slides-per-view="1"
        :space-between="20"
        :loop="true"
        :autoplay="{ delay: 3000 }"
        :pagination="{ clickable: true }"
        :breakpoints="{
          '768': { slidesPerView: 2 },
          '1024': { slidesPerView: 3 }
        }"
        class="pb-5"
      >
        <swiper-slide v-for="(item, index) in testimonials" :key="index">
          <div class="card testimonial-card h-100 border-0 shadow-sm">
            <div class="card-body p-4">
              <div class="stars mb-2">⭐⭐⭐⭐⭐</div>
              <h5 class="fw-bold mb-3 card-heading">{{ item.title }}</h5>
              <p class="card-text text-muted mb-4 italic">
                "{{ item.comment }}"
              </p>
              <hr class="opacity-10" />
              <div class="d-flex align-items-center mt-3">
                <img :src="item.avatar" class="avatar-img me-3" alt="Avatar" />
                <div>
                  <p class="mb-0 fw-bold text-dark">{{ item.name }}</p>
                  <small class="text-muted">{{ item.role }}</small>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    title: "Tempat cozy, pelayanan ramah!",
    comment: "Bener-bener nyaman banget tempatnya! Staff-nya juga super ramah. Cocok banget buat nongkrong santai atau kerja sambil ngopi.",
    name: "Abraham Salim",
    role: "Pegawai Swasta, 27 tahun",
    avatar: "https://www.sibberhuuske.nl/wp-content/uploads/2016/10/default-avatar.png"
  },
  {
    title: "Makanannya juara banget!",
    comment: "Rasa makanannya nagih parah. Porsinya pas, harga juga ramah di kantong. Apalagi bihun kari ayamnya, enak banget!!!",
    name: "Nona Bintang Manise",
    role: "Food blogger, 30 tahun",
    avatar: "https://www.sibberhuuske.nl/wp-content/uploads/2016/10/default-avatar.png"
  },
  {
    title: "Pelayanannya super cepat",
    comment: "Baru duduk sebentar, pesanan udah dateng. Semua karyawan juga senyum terus, bikin suasana makin nyaman.",
    name: "Cahyadi Choi",
    role: "Atlet Badminton, 25 tahun",
    avatar: "https://www.sibberhuuske.nl/wp-content/uploads/2016/10/default-avatar.png"
  }
];
</script>

<style scoped>
.py-100 { padding: 100px 0; }

.testimonial-section {
  background-color: #f8f9fa; 
  padding: 100px 0;
}

.section-subtitle {
  color: #8B5E34;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.section-title {
  font-size: 2.5rem;
  color: #212529;
}
.testimonial-card {
  background-color: #ffffff;
  border-radius: 20px;
  transition: all 0.3s ease;
  border: none;
  
  
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.15); 
}

.testimonial-card:hover {
  transform: scale(1.02); 
  box-shadow: 0 0 35px rgba(0, 0, 0, 0.25); 
}

.testimonial-card .card-heading {
  color: #212529 !important; 
}

.testimonial-card .card-text {
  color: #6c757d !important; 
  font-style: italic;
}

.avatar-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #eee;
}


:deep(.swiper-pagination-bullet-active) {
  background: #8B5E34 !important;
}
</style>