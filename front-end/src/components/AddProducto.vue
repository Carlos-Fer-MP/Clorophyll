<template>

    <div class="submit-form">
     <div v-if="!submitted">
       <div class="form-group">
         <label for="item">item</label>
         <input

            type="text"
            class="form-control"
            id="item"
            required
            v-model="productos.item"
            name="item"

          />
        </div>
        <div class="from-group">
          <label for="precio"></label>
          <input

            class="form-control"
            id="precio"
            required
            v-model="producto.precio"
            name="precio"

          />
        </div>

        <button @click="saveProducto" class="btn btn-success">Enviar</button>

    </div>

    <div v-else>

      <h4>Se ha enviado Correctamente</h4>
      <button class="btn btn-success" @click="newProducto">Agregar</button>

    </div>
    <router-view></router-view>
  </div>

</template>
<script>

import DataService from '../services/DataService'

export default {

  name: 'add-producto',
  data () {
    return {

      producto: {

        _id: null,
        item: '',
        precio: ''

      },
      submited: false
    }
  },
  methods: {
    saveProduto () {
      var data = {

        item: this.producto.item,
        precio: this.producto.precio

      }
      DataService.create(data)
        .then(response => {
          this.producto._id = response.data._id
          console.log(response.data)
          this.submitted = true
        })
        .catch(e => {
          console.log(e)
        })
    },

    newProducto () {
      this.submitted = false
      this.producto = {}
    }

  }

}
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
