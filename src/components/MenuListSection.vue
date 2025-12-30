<template>
  <section class="menu-section py-5">
    <div class="container">
      <div v-if="cartAdded" class="alert alert-success cart-toast" role="alert">
        Item berhasil ditambahkan ke keranjang.
      </div>
      <div class="row g-4">
        <div class="col-12 col-lg-3">
          <div class="menu-sidebar p-3 p-lg-4">
            <div class="menu-sidebar-title mb-3">Menu</div>
            <button type="button" class="menu-checkout-btn" @click="goCheckout">
              Keranjang ({{ cart.totalItems }})
            </button>
            <button
              v-for="cat in categories"
              :key="cat"
              type="button"
              class="menu-cat-btn"
              :class="{ active: activeCategory === cat }"
              @click="activeCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <div class="col-12 col-lg-9">
          <div class="row g-4">
            <div
              v-for="item in filteredItems"
              :key="item.id"
              class="col-12 col-sm-6 col-lg-4"
            >
              <div class="menu-card h-100">
                <div class="menu-card-img-wrap">
                  <img :src="item.image" class="menu-card-img" :alt="item.name" />
                </div>
                <div class="menu-card-body">
                  <div class="menu-card-name">{{ item.name }}</div>
                  <div class="menu-card-desc">{{ item.description }}</div>

                  <div class="menu-card-footer mt-auto">
                    <div class="menu-card-price">{{ formatPrice(item.price) }}</div>
                    <button type="button" class="menu-order-btn" @click="addToCart(item)">Tambah</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useReservasiStore } from '../stores/reservasi'

import rotiBakarKayaImg from '../assets/menu/roti bakar kaya.jpg'
import bakmiAyamKampungImg from '../assets/menu/bakmi ayam kampung.png'
import lontongSayurImg from '../assets/menu/lontong sayur spesial.png'
import pastryImg from '../assets/menu/pastry.jpg'
import pisangGorengImg from '../assets/menu/pisang goreng.jpg'
import cirengImg from '../assets/menu/Resep_Cireng_Bumbu_Rujak_Krispi.jpg'
import kopsuArenImg from '../assets/menu/kopsu aren.jpg'
import thaiTeaImg from '../assets/menu/thai tea.jpeg'
import vietnamDripImg from '../assets/menu/Kopitiam-Vietnam-Drip.jpg'

const categories = ['All', 'Food', 'Dessert', 'Drink']
const activeCategory = ref('All')
const router = useRouter()
const cart = useCartStore()
const reservasi = useReservasiStore()
const cartAdded = ref(false)
let cartAddedTimer = null

const items = ref([
  {
    id: 'food-1',
    category: 'Food',
    name: 'Bakmi Ayam Kampung',
    description: 'Bakmi dengan ayam kampung gurih, disajikan hangat.',
    price: 38000,
    image: bakmiAyamKampungImg,
  },
  {
    id: 'food-2',
    category: 'Food',
    name: 'Lontong Sayur Spesial',
    description: 'Lontong sayur dengan topping lengkap dan kuah santan.',
    price: 32000,
    image: lontongSayurImg,
  },
  {
    id: 'food-3',
    category: 'Food',
    name: 'Roti Bakar Kaya',
    description: 'Roti bakar lembut dengan kaya manis dan buttery.',
    price: 24000,
    image: rotiBakarKayaImg,
  },
  {
    id: 'dessert-1',
    category: 'Dessert',
    name: 'Pastry',
    description: 'Pastry renyah dengan isian manis, cocok untuk ngemil.',
    price: 22000,
    image: pastryImg,
  },
  {
    id: 'dessert-2',
    category: 'Dessert',
    name: 'Pisang Goreng',
    description: 'Pisang goreng crispy dengan rasa legit.',
    price: 18000,
    image: pisangGorengImg,
  },
  {
    id: 'dessert-3',
    category: 'Dessert',
    name: 'Cireng Bumbu Rujak',
    description: 'Cireng gurih dengan saus bumbu rujak pedas manis.',
    price: 20000,
    image: cirengImg,
  },
  {
    id: 'drink-1',
    category: 'Drink',
    name: 'Kopsu Aren',
    description: 'Kopi susu dengan gula aren yang creamy dan wangi.',
    price: 25000,
    image: kopsuArenImg,
  },
  {
    id: 'drink-2',
    category: 'Drink',
    name: 'Thai Tea',
    description: 'Thai tea dingin, manis dan segar.',
    price: 22000,
    image: thaiTeaImg,
  },
  {
    id: 'drink-3',
    category: 'Drink',
    name: 'Vietnam Drip',
    description: 'Kopi vietnam drip dengan karakter kuat dan pekat.',
    price: 28000,
    image: vietnamDripImg,
  },
])

const filteredItems = computed(() => {
  if (activeCategory.value === 'All') return items.value
  return items.value.filter((i) => i.category === activeCategory.value)
})

function formatPrice(value) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
}

function addToCart(item) {
  cart.addItem(item)

  cartAdded.value = true
  if (cartAddedTimer) clearTimeout(cartAddedTimer)
  cartAddedTimer = setTimeout(() => {
    cartAdded.value = false
    cartAddedTimer = null
  }, 2000)
}

function goCheckout() {
  const isReservationComplete = Boolean(reservasi.firstName && reservasi.dateTime && reservasi.guests && reservasi.meja)
  if (!isReservationComplete) {
    router.push({ path: '/reservasi', query: { returnTo: '/checkout' } })
    return
  }
  router.push('/checkout')
}
</script>

<style scoped>
.menu-section {
  background: #f7f4ef;
}

.cart-toast {
  position: sticky;
  top: 85px;
  z-index: 10;
}

.menu-sidebar {
  background: #7a5b2b;
  border-radius: 10px;
  color: #fff;
}

.menu-sidebar-title {
  font-weight: 700;
  font-size: 18px;
}

.menu-checkout-btn {
  width: 100%;
  border: 0;
  background: rgba(255, 255, 255, 0.22);
  color: #fff;
  font-weight: 800;
  font-size: 13px;
  padding: 10px 12px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.menu-checkout-btn:hover {
  background: rgba(255, 255, 255, 0.28);
}

.menu-cat-btn {
  width: 100%;
  text-align: left;
  border: 0;
  background: transparent;
  color: rgba(255, 255, 255, 0.9);
  padding: 10px 12px;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.2s ease, color 0.2s ease;
}

.menu-cat-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.menu-cat-btn.active {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}

.menu-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.menu-card-img-wrap {
  height: 150px;
  overflow: hidden;
}

.menu-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.menu-card-body {
  padding: 14px 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.menu-card-name {
  font-weight: 700;
  font-size: 14px;
  color: #2a2a2a;
}

.menu-card-desc {
  font-size: 12px;
  color: #6b6b6b;
  min-height: 34px;
}

.menu-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
}

.menu-card-price {
  font-weight: 800;
  color: #7a5b2b;
  font-size: 12px;
}

.menu-order-btn {
  border: 0;
  background: #7a5b2b;
  color: #fff;
  font-weight: 700;
  font-size: 12px;
  padding: 8px 14px;
  border-radius: 8px;
}

.menu-order-btn:hover {
  background: #634819;
}
</style>
