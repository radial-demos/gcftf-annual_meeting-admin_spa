import Vuetify from 'vuetify';
import Vue from 'vue';

import App from './App.vue';
import ListingVue from './pages/Listing.vue';
import RegistrantDetailDialog from './dialogs/RegistrantDetail.vue';
import RegistrantNotesDialog from './dialogs/RegistrantNotes.vue';
import RegistrantDietaryRestrictionsDialog from './dialogs/RegistrantDietaryRestrictions.vue';
import RegistrantRoomingPreferenceDialog from './dialogs/RegistrantRoomingPreference.vue';
import FilterPanel from './FilterPanel.vue';
import BtnMultistate from './BtnMultistate.vue';
import BtnGroupMultistate from './BtnGroupMultistate.vue';
// import API from './mixins/api';

Vue.use(Vuetify);

Vue.component('listing-page', ListingVue);
Vue.component('dialog-detail', RegistrantDetailDialog);
Vue.component('dialog-notes', RegistrantNotesDialog);
Vue.component('dialog-dietary-restrictions', RegistrantDietaryRestrictionsDialog);
Vue.component('dialog-rooming-preference', RegistrantRoomingPreferenceDialog);
Vue.component('filter-panel', FilterPanel);
Vue.component('btn-multistate', BtnMultistate);
Vue.component('btn-group-multistate', BtnGroupMultistate);

// Vue.mixin(API);

new Vue({
  el: '#app',
  render: h => h(App),
});
