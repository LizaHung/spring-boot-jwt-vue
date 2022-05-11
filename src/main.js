import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueCroppie from 'vue-croppie';
import VueSignaturePad from 'vue-signature-pad';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './styles/main.scss'
import 'croppie/croppie.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCroppie);
Vue.use(VueSignaturePad);
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
