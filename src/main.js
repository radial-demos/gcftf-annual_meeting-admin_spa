import Vuetify from 'vuetify';
import Vue from 'vue';
import App from './App.vue';
import ListingVue from './pages/Listing.vue';
import RegistrantDetailVue from './RegistrantDetail.vue';
import TempVue from './Temp.vue';

Vue.use(Vuetify);

Vue.component('listing-page', ListingVue);
Vue.component('registrant-detail', RegistrantDetailVue);
Vue.component('temp', TempVue);

new Vue({
  el: '#app',
  render: h => h(App),
});
