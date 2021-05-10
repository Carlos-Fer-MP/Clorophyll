<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentTutorial.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentTutorial.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentTutorial.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteTutorial"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateTutorial"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
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
          this.message = 'The tutorial was updated successfully!'
        })
        .catch(e => {
          console.log(e)
        })
    },
    deleteTutorial () {
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
