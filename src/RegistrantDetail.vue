<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>{{registrant.fullName}}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <dl>
        <dt>
          EMail
        </dt>
        <dd>
          {{registrant.email}} <a :href="`mailto:${registrant.email}`" class="icon"><v-icon class="blue--text text--darken-2">mail</v-icon></a>
        </dd>
        <dt>
          Mobile Phone
        </dt>
        <dd>
          {{registrant.mobilePhone}}
        </dd>
        <dt>
          Dates
        </dt>
        <dd>
          <span class="pr-4">{{registrant.arrivalDate}}</span><span>{{registrant.departureDate}}</span>
        </dd>
        <dt>
          Status
        </dt>
        <dd>
          <v-icon :class="getIconClass(registrant.registrationStatusIsContacted)">call_made</v-icon>
          <v-icon :class="getIconClass(registrant.registrationStatusIsConfirmed)">event_available</v-icon>
          <v-icon :class="getIconClass(false)">attach_money</v-icon>
        </dd>
        <dt>
          Registration Type
        </dt>
        <dd>
          <v-icon :class="getIconClass(registrant.isGCF)">star</v-icon>
          {{registrant.fullRegistrationType}}
        </dd>
        <dt>
          Rooming Preference / Dietary Restrictions
        </dt>
        <dd>
          <v-icon :class="getIconClass(registrant.roomingPreference)">{{getRoomingPreferenceIcon(registrant.roomingPreference)}}</v-icon> /
          {{registrant.dietaryRestrictions}}
        </dd>
        <dt>
          Organization Name
        </dt>
        <dd>
          {{registrant.organizationName}}
        </dd>
        <dt>
          Job Title
        </dt>
        <dd>
          {{registrant.organizationJobTitle}}
        </dd>
        <dt>
          Country - State
        </dt>
        <dd>
          {{registrant.country}} - {{registrant.state}}
        </dd>
      </dl>
      <dt>
        Preferred Language
      </dt>
      <dd>
        {{registrant.lang.toUpperCase()}}
      </dd>
    </v-card-text>
  </v-card>
</template>
<script>
  export default {
    data() {
      return {
        showRegistrationForm: true,
        isRegistrationTypeOtherDisabled: true,
      };
    },
    props: {
      registrant: {
        type: Object,
        default: () => {
          return {
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
            isGCF: false
          };
        },
      },
    },
    methods: {
      getIconClass(value) {
        return (value) ? 'green--text text--darken-2' : 'grey--text text--lighten-2';
      },
      getRoomingPreferenceIcon(value) {
        return (value === 'nonSmoking') ? 'smoke_free' : 'smoking_rooms';
      },
    },
  };
</script>
<style>
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
