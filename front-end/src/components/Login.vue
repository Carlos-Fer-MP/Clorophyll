<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="username">Nombre de usuario</label>
          <Field name="username" type="text" class="form-control" />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <Field name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

export default {

  name: 'login',
  components: {

    Form,
    Field,
    ErrorMessage

  },
  data () {
    const schema = yup.object().shape({

      username: yup.string().required('El nombre de usuario es requerido'),
      password: yup.string().required('La contraseña es requerida')

    })
    return {

      loading: false,
      message: '',
      schema

    }
  },
  computed: {

    loggedIn () {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created () {
    if (this.loggedIn) {
      this.$router.push('/profile')
    }
  },
  methods: {

    handledLogin (user) {
      this.loading = true

      this.$store.dispatch('auth/login', user).then(

        () => {
          this.$router.push('/profile')
        },
        (error) => {
          this.loading = false
          this.message = (error.response && error.response.data && error.response.data.message) ||
                   error.message || error.toString()
        }
      )
    }
  }
}

</script>
<style scoped>
.form-control {
  border-radius: 0%;
  height: 50px;
}
.login-form-container {
  padding: 20px;
  box-shadow: 0px 2px 5px 2px #888888;
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
.btn:focus {
  background: teal;
}

</style>
