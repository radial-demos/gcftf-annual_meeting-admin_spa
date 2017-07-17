<template>
    <v-dialog v-model="isActive" width=600 style="overflow: auto;">
      <v-card>
      <v-toolbar>
        <v-icon :class="getIconClass(registrant.isGCF)">star</v-icon>
        <v-toolbar-title>{{registrant.fullName}}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <label class="customInput-label">Registration Status</label>
        <div class="input-group__input">
          <v-icon :class="getIconClass(registrant.registrationStatusIsContacted)">call_made</v-icon>
          <v-icon :class="getIconClass(registrant.registrationStatusIsConfirmed)">event_available</v-icon>
          <v-icon :class="getIconClass(false)">attach_money</v-icon>
        </div>
        <div class="customInput-details"></div>
        <v-text-field
          label="Notes"
          v-model="registrant.notes"
          multi-line
        ></v-text-field>
        <v-select
          label="Registration Type"
          v-model="registrant.registrationType"
          :items="registrationTypes"
        ></v-select>
        <v-text-field
          label="Registration Type (Other)"
          v-model="registrant.registrationTypeOther"
        ></v-text-field>
        <v-text-field
          label="Email"
          v-model="registrant.email"
        ></v-text-field>
        <v-text-field
          label="Mobile Phone"
          v-model="registrant.mobilePhone"
        ></v-text-field>
        <v-text-field
          label="Email"
          v-model="registrant.email"
        ></v-text-field>
        <v-text-field
          label="Mobile Phone"
          v-model="registrant.mobilePhone"
        ></v-text-field>
        <v-select
          label="Prefix"
          v-model="registrant.namePrefix"
          :items="titles"
        ></v-select>
        <v-text-field
          label="First Name"
          v-model="registrant.nameFirst"
        ></v-text-field>
        <v-text-field
          label="Last Name"
          v-model="registrant.nameLast"
        ></v-text-field>
        <v-text-field
          label="Country"
          v-model="registrant.country"
        ></v-text-field>
        <v-text-field
          label="State"
          v-model="registrant.state"
        ></v-text-field>
        <v-text-field
          label="Organization Name"
          v-model="registrant.organizationName"
        ></v-text-field>
        <v-text-field
          label="Job Title"
          v-model="registrant.organizationJobTitle"
        ></v-text-field>
        <v-text-field
          label="Arrival Date"
          v-model="registrant.arrivalDate"
        ></v-text-field>
        <v-text-field
          label="Departure Date"
          v-model="registrant.departureDate"
        ></v-text-field>
        <v-text-field
          label="Dietary Restrictions"
          v-model="registrant.dietaryRestrictions"
        ></v-text-field>
        <label class="customInput-label">Rooming Preference</label>
        <v-container fluid style="padding-bottom:5px; padding-top:5px;">
          <v-layout row wrap class="dark--text">
            <v-flex xs3>
              <v-radio
                style="margin:0"
                label="Unspecified"
                v-model="registrant.roomingPreference"
                hide-details
                value=""
                dark
              ></v-radio>
            </v-flex>
            <v-flex xs3>
              <v-radio
                style="margin:0"
                label="Smoking"
                v-model="registrant.roomingPreference"
                hide-details
                value="smoking"
                dark
              ></v-radio>
            </v-flex>
            <v-flex xs3>
              <v-radio
                style="margin:0"
                label="Non Smoking"
                v-model="registrant.roomingPreference"
                value="nonSmoking"
                dark
              ></v-radio>
            </v-flex>
          </v-layout>
        </v-container>
        <v-text-field
          label="Preferred Language"
          v-model="registrant.lang"
        ></v-text-field>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  const registrantFields = {
    registrationType: '',
    registrationTypeOther: '',
    stateGCF: '',
    country: '',
    state: '',
    namePrefix: '',
    nameFirst: '',
    nameLast: '',
    fullName: '',
    email: '',
    mobilePhone: '',
    organizationName: '',
    organizationJobTitle: '',
    arrivalDate: '',
    departureDate: '',
    dietaryRestrictions: '',
    roomingPreference: '',
    lang: '',
    registrationStatusIsContacted: false,
    registrationStatusIsConfirmed: false,
    isGCF: false,
    notes: '',
  };

  export default {
    data() {
      return {
        isActive: !!this.value,
        showArrivalDateModal: false,
        showDepartureDateModal: false,
        titles: ['Mr', 'Mrs', 'Ms', 'Dr', 'Prof', 'Governor'],
        registrationTypes: [
          'GCF Delegate (2 funded by GCF)',
          'Governor',
          'GCF state or province government representative',
          'Non–Delegate State/Provincial Representative',
          'Academic Institution/University',
          'Civil Society/NGO',
          'Private Sector/Business',
          'Other'],
      };
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
      registrant: {
        type: Object,
        default: () => registrantFields,
      },
    },

    watch: {
      value(val) {
        this.isActive = !!val;
      },
      isActive(val) {
        this.$emit('input', val);
      },
    },

    methods: {
      getIconClass(value) {
        return (value) ? 'green--text text--darken-2' : 'grey--text text--lighten-2';
      },
    },
  };
</script>
<style>
  .dialog--active {
    overflow: auto;
  }
  .customInput-label {
    color: rgba(0,0,0,0.38);
    font-size: 13px;
  }
  .customInput-details {
    min-height: 10px;
    height: 10px;
  }
  dt {
    font-weight: bold;
    margin-bottom: 10px;
  }
  dd {
    font-weight: normal;
    margin-bottom: 10px;
    margin-left: 15px;
  }
  a.icon {
    text-decoration: none;
  }
</style>
