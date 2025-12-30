<template>
  <footer id="kontak" class="main-footer-container">
    <div class="footer-dark-bg text-white py-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-5">
            <h5 class="fw-bold mb-4">
              Namarasa — Restoran Indonesia Dengan Citarasa Nusantara dan Kopitiam Terbaik di PIK!
            </h5>
            <p class="small opacity-75 footer-desc">
              Namarasa adalah kopitiam modern yang menyajikan ragam hidangan Nusantara autentik, 
              mulai dari makanan berat, camilan, hingga minuman spesial dengan cita rasa premium namun 
              harga terjangkau. Tempat kami selalu ramai pengunjung, jadi jangan lupa reservasi meja 
              sebelumnya ya!
            </p>
          </div>

          <div class="col-lg-3 col-md-6 ps-lg-5">
            <h5 class="fw-bold mb-4">Navigasi Cepat</h5>
            <ul class="list-unstyled">
              <li class="mb-2"><router-link to="/" class="footer-link">Beranda</router-link></li>
              <li class="mb-2"><router-link to="/#tentang-kami" class="footer-link">Tentang Kami</router-link></li>
              <li class="mb-2"><router-link to="/menu" class="footer-link">Menu</router-link></li>
              <li class="mb-2"><router-link to="/#review" class="footer-link">Review</router-link></li>
              <li class="mb-2"><router-link to="/#kontak" class="footer-link">Kontak Kami</router-link></li>
            </ul>
          </div>

          <div class="col-lg-4 col-md-6">
            <h5 class="fw-bold mb-4">Sosial Media</h5>
            <div class="d-flex flex-column gap-3">
              <a href="https://wa.me/6285171711401" target="_blank" class="d-flex align-items-center gap-3 footer-link">
                <div class="social-icon">
                  <i class="bi bi-whatsapp"></i>
                </div>
                <span>WhatsApp</span>
              </a>
              <a href="https://www.instagram.com/namarasa_pik/" target="_blank" class="d-flex align-items-center gap-3 footer-link">
                <div class="social-icon">
                  <i class="bi bi-instagram"></i>
                </div>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <hr class="border-light opacity-25 mt-5 mb-4">

        <div class="row">
          <div class="col text-start">
            <p class="small opacity-50 mb-0">
              Copyright ©2025 All Rights Reserved By Namarasa Restaurant.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.main-footer-container {
  /* Menjamin footer menempel ke bawah dan tidak ada margin luar */
  margin: 0;
  padding: 0;
  width: 100%;
}

.footer-dark-bg {
  background-color: #634819; /* Warna cokelat tua */
  width: 100%;
}

.opacity-75 { opacity: 0.75; }
.opacity-50 { opacity: 0.5; }

.footer-desc {
  line-height: 1.8;
  text-align: justify;
}

.footer-link {
  color: white;
  text-decoration: none;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.footer-link:hover {
  opacity: 1;
  text-decoration: underline;
  transform: translateX(5px);
}

.social-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}

ul li a {
  transition: all 0.3s ease;
  display: inline-block;
}
</style>