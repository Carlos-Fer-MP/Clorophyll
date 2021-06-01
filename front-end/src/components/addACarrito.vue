<template>
  <div class="row">
    <div class="col-3">
      <label class="sr-only" for="inlineFormInputName2">Cantidad</label>
      <input type="number" v-model="quantity" class="form-control mb-2 mr-sm-2" />
    </div>
    <button
      v-if="!isInCardProp"
      @click.stop="addCart({product, quantity})"
      type="button"
      class="btn btn-primary btn-lg btn-block col-9"
    >Agregar al Carrito</button>
    <button
      v-else
      @click.stop=" eliminaCarrito(producto._id)"
      type="button"
      class="btn btn-primary btn-lg btn-block col-9"
    >Eliminar del Carrito</button>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: ['product'],
  data () {
    return {
      isInCardProp: false,
      quantity: 1
    }
  },
  computed: {
    ...mapState('product', ['cart'])
  },
  methods: {
    ...mapActions(['addCarrito', ' eliminaCarrito']),
    isInCart (id) {
      for (let index = 0; index < this.cart.length; index++) {
        const element = this.cart[index]
        if (element.id === id) {
          return true
        }
      }
      return false
    }
  },
  watch: {
    product (val) {
      this.isInCardProp = this.isInCart(val.id)
    },
    cart () {
      this.isInCardProp = this.isInCart(this.product.id)
    },
    quantity (val) {
      if (val <= 0) {
        this.quantity = 1
      }
    }
  }
}
</script>
<style>
</style>
