import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'
import Vue, { createApp } from 'vue'

import App from './App.vue'
import router from './router/index'
import store from './store'
import { FontAwesomeIcon } from './plugins/font-awesome'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

new Vue({ render: h => h(App) }).$mount('#app')

createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
