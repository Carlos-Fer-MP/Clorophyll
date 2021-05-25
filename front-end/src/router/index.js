import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

const Profile = () => import('../components/Profile.vue')
const BoardUser = () => import('../components/BroadUser.vue')
const BoardAdmin = () => import('../components/BroadAdmin.vue')

/*
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(// webpackChunkName: "about" '../views/About.vue')
  }
]
*/
const routes = [

  {

    path: '/',
    name: 'home',
    component: Home

  },

  {

    path: '/home',
    component: Home

  },
  {

    path: '/login',
    component: Login

  },
  {

    path: '/register',
    component: Register

  },
  {

    path: '/profile',
    name: 'profile',
    component: Profile

  },
  {

    path: '/admin',
    name: 'admin',
    component: BoardAdmin

  },
  {

    path: '/user',
    name: 'user',
    component: BoardUser

  },
  {

    path: '/',
    alias: '/productos',
    name: 'productos',
    component: () => import('../components/ProductosList.vue')

  },
  {

    path: '/productos/:id',
    name: 'detalles-productos',
    component: () => import('../components/Producto.vue')

  },
  {
    path: '/añadir',
    name: 'añadir',
    component: () => import('../components/AddProducto.vue')

  }

]

const router = createRouter({

  history: createWebHashHistory(),
  routes

})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
