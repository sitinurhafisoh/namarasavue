<template>
  <section class="hero" :style="heroStyle">
    <div class="overlay">
      <div class="content">
        <h1>Indonesian Food & Kopitiam</h1>
        <p>
          Menu Nusantara dan kopitiam dengan rasa yang nyaman
          dinikmati, nyaman di hati.
        </p>

        <div class="buttons">
          <router-link to="/reservasi" class="btn btn-primary">
            Reservasi
          </router-link>
          <router-link to="/menu" class="btn btn-outline">
            Lihat Menu
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import berandaImg from '../assets/galeri/Beranda.jpeg'


const heroStyle = {
  backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url(${berandaImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '8px',
  overflow: 'hidden',
  height: '420px'
}
</script>

<style scoped>
.overlay {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.content {
  max-width: 900px;
  padding: 40px;
  color: #fff;
  text-align: center;
}

.content h1 {
  font-family: 'Playfair Display', serif;
  font-size: 50px;
  font-weight: 600;
  line-height: 1.2;
}

.content p {
  font-size: 20px;
  font-family: Philosopher;
  line-height: 1.6;
  margin-bottom: 24px;
  opacity: 0.9;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 14px;
}

.btn {
  padding: 10px 22px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  transition: 0.3s;
}

.btn-primary {
  background-color: #f4a300;
  color: #fff;
}

.btn-primary:hover {
  background-color: #e09400;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #fff;
  color: #fff;
}

.btn-outline:hover {
  background-color: #fff;
  color: #000;
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    height: 360px;
  }

  .content h1 {
    font-size: 28px;
  }

  .content {
    padding: 24px;
  }

  .buttons {
    flex-direction: column;
  }
}
</style>
