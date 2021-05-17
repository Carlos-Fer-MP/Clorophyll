import { createStore } from 'vuex'
import { auth } from './auth.module'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

 const store = createStore({

    modules: {

      auth,

    },

 }); 

 export default store;