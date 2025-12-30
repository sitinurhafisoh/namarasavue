import { createRouter, createWebHistory } from 'vue-router'
import Beranda from '../views/Beranda.vue'
import MenuOrder from '../views/MenuOrder.vue'
import Reservasi from '../views/Reservasi.vue'
import Meja from '../views/Meja.vue'
import Checkout from '../views/Checkout.vue'
import Payment from '../views/Payment.vue'
const routes = [
  {
    path: '/',
    name: 'beranda',
    component: Beranda,
  },
  {
    path: '/menu',      
    name: 'menu',
    component: MenuOrder 
  },
    {
    path: '/reservasi',      
    name: 'reservasi',
    component: Reservasi    
  },
    {
    path: '/pilihmeja',      
    name: 'pilihmeja',
    component: Meja
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout,
  },
  {
    path: '/payment',
    name: 'payment',
    component: Payment,
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 90,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  },
})
