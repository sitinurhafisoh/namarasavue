<template>
  <section
    id="listmenu"
    class="hero"
    :style="{
      backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url(${listMenuImg})`
    }"
  >
    <div class="overlay">
      <div class="content">
        <h1>Our Menu</h1>
        <p>
          Freshly Made, Every Day
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import listMenuImg from '../assets/galeri/listmenu.png' 
</script>

<style scoped>
.hero {
  height: 420px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  overflow: hidden;
}

.overlay {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; 
  align-items: center;     
  text-align: center;
}

.content {
  max-width: 700px;
  padding: 40px;
  color: #fff;
}

.content h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 12px;
}

.content p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 24px;
  opacity: 0.9;
}
</style>
