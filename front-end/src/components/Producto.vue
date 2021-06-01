<template>
  <div v-if="currentProducto" class="edit-form">
    <h4>Producto</h4>
    <form>
      <div class="form-group">
        <label for="title">Producto</label>
        <input type="text" class="form-control" id="title"
          v-model="currentProducto.item"
        />
      </div>
      <div class="form-group">
        <label for="description">Descripción</label>
        <input type="text" class="form-control" id="description"
          v-model="currentProducto.description"
        />
      </div>
    </form>
    <button class="badge badge-danger mr-2"
      @click="deleteProducto"
    >
      Eliminar
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateProducto"
    >
      Actualizar
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Seleccione el producto</p>
    <router-view></router-view>
  </div>
</template>
<script>

import DataService from '../services/DataService'

export default {

  name: 'productos',
  data () {
    return {

      currentProducto: null,
      message: ''

    }
  },
  methods: {

    getProducto (_id) {
      DataService.get(_id)
        .then(response => {
          this.currentProducto = response.data
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },
    /* updateProductoPedido() */
    updateProducto () {
      DataService.update(this.currentProducto._id, this.currentProducto)
        .then(response => {
          console.log(response.data)
          this.message = 'El producto fue actualizado con exito'
        })
        .catch(e => {
          console.log(e)
        })
    },
    deleteProducto () {
      DataService.delete(this.currentProducto._id)
        .then(response => {
          console.log(response.data)
          this.$router.push({ name: 'productos' })
        })
        .catch(e => {
          console.log(e)
        })
    }

  },
  mounted () {
    this.message = ''
    this.getProducto(this.$route.params._id)
  }

}

</script>
<style>

.edit-form {
  max-width: 300px;
  margin: auto;
}

</style>
