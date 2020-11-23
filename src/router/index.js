import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import CreateWallet from '../components/CreateWallet.vue'
import OpenWallet from '../components/OpenWallet.vue'
import AccountBqlance from '../components/AccountBalance.vue'
import SendTransaction from '../components/SendTransaction.vue'
import Logout from '../components/Logout.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/CreateWallet',
    name: 'CreateWallet',
    component: CreateWallet
  },

  {
    path: '/OpenWallet',
    name: 'OpenWallet',
    component: OpenWallet
  },

  {
    path: '/AccountBalance',
    name: 'AccountBalance',
    component: AccountBqlance
  },

  {
    path: '/SendTransaction',
    name: 'SendTransaction',
    component: SendTransaction
  },

  {
    path: '/Logout',
    name: 'Logout',
    component: Logout
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
