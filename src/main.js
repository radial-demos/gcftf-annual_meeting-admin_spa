import Vuetify from 'vuetify';
import Vue from 'vue';

import App from './App.vue';
import ListingVue from './pages/Listing.vue';
import NotesDialog from './NotesDialog.vue';
import RegistrantDetailVue from './RegistrantDetail.vue';
import API from './mixins/api';

Vue.use(Vuetify);

Vue.component('listing-page', ListingVue);
Vue.component('registrant-detail', RegistrantDetailVue);
Vue.component('notes-dialog', NotesDialog);

Vue.mixin(API);

new Vue({
  el: '#app',
  render: h => h(App),
});
