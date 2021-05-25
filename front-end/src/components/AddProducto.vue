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
          <label for="description">Description</label>
          <input

            class="form-control"
            id="description"
            required
            v-model="tutorial.description"
            name="description"

          />
        </div>

        <button @click="saveProducto" class="btn btn-success">Submit</button>

    </div>

    <div v-else>

      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newProducto">Add</button>

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
    /* Pensar */
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
