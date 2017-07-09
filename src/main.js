import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import ListingVue from './pages/Listing.vue';
import RegistrantFormVue from './RegistrantForm.vue';

Vue.use(Vuetify)

Vue.component('listing-page', ListingVue);
Vue.component('registrant-form', RegistrantFormVue);

new Vue({
  el: '#app',
  render: h => h(App)
})
