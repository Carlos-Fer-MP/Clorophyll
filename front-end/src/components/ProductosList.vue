<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Busqueda por Nombre"
          v-model="item"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchItem"
          >
            Busqueda
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Lista de Productos</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(productos, index) in productos"
          :key="index"
          @click="setActiveProducto(productos, index)"
        >
          {{ productos.item }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllProductos">
        Eliminarlos a todos
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentProducto">
        <h4>Tutorial</h4>
        <div>
          <label><strong>Item:</strong></label> {{ currentProducto.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentProducto.description }}
        </div>
        <div>
          <label><strong>Precio:</strong></label> {{ currentProducto.precio}}
        </div>

        <router-link :to="'/productos/' + currentProducto.id" class="badge badge-warning">Editar</router-link>
      </div>
      <div v-else>
        <br />
        <p>Selecciona un Producto</p>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>

import DataService from '../services/DataService'

export default {

  name: 'lista-productos',
  data () {
    return {

      productos: [],
      currentProducto: null,
      currentIndex: -1,
      item: ''

    }
  },
  methods: {

    retrieveProductos () {
      DataService.getAll()
        .then(response => {
          this.productos = response.data
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },
    refreshList () {
      this.retrieveProductos()
      this.currentProducto = null
      this.currentIndex = -1
    },
    setActiveProducto (productos, index) {
      this.currentProducto = productos
      this.currentIndex = productos ? index : -1
    },
    removeAllProductos () {
      DataService.deleteAll()
        .then(response => {
          console.log(response.data)
          this.refreshList()
        })
        .catch(e => {
          console.log(e)
        })
    },
    searchItem () {
      DataService.findByItem(this.item)
        .then(response => {
          this.productos = response.data
          this.setActiveProducto(null)
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    }

  },
  mounted () {
    this.retrieveProductos()
  }

}

</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
