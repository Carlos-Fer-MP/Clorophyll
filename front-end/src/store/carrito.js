
import http from '../http-common'
import axios from 'axios'
import DataService from '../services/DataService'

export const carrito = {

  namespace: true,
  actions: {

    getProductos ({ commit }) {
      var url = 'http://localhost:8081/productos'

      http.get(url).then((response) => {
        DataService.get()
        commit('setProductos', response.data)
      }).catch((error) => {
        console.log(error)
      })
    },

    getDetalles ({ commit }, _id) {
      const url = 'http://localhost:8081/productos'

      axios.get(url, { params: { id: _id } }).then((response) => {
        commit('setProducto', response.data[0])
      }).catch((error) => {
        console.log(error)
      })
    },

    addCarrito ({ commit, getters }, payload) {
      var carro = getters.carro

      carro.push(payload)

      commit('setCarrito', carro)
    },
    eliminaCarrito ({ commit, getters }, _id) {
      const carro = []

      if (_id) {
        for (let i = 0; i < getters.carro.length; i++) {
          const element = getters.carro[i]

          if (element._id !== _id) {
            carro.push(element)
          }
        }
      }
      commit('setCarrito', carro)
    }
  },
  getters: {

    productos (state) {
      return state.productos
    },
    carrito (state) {
      return state.carrito
    }

  },
  mutations: {

    setProductos (state, val) {
      state.productos = val
    },
    setProducto (state, val) {
      state.producto = val
    },
    setDescarga (state, val) {
      state.uploadingData = val
    },
    setCarrito (state, val) {
      state.Carrito = val
    }
  }
}
