import { createStore } from 'vuex'
import { auth } from './auth.module'
import { carrito } from './carrito'

/* export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
}) */

const store = createStore({

  modules: {

    auth,
    carrito

  }

})

export default store
