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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.profile-image {
  width: 50px;
  border-radius: 100% !important;
}
.page-container {
  padding-top: 81px;
}
.btn {
  border-radius: 0%;
  font-weight: bold;
  background: teal;
  border: teal;
}
.btn:hover {
  background: #00b4b4;
}
input {
  border-radius: 0%;
}
.btn:focus {
  background: teal;
}
</style>
