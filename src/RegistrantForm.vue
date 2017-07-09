<template>
  <div v-if="showRegistrationForm"> <!-- FORM -->
    <v-select
      :label="translate('lblRegistrationType') + '*'"
      @input="selectRegistrationType"
      :items="translate(registrationTypesDropdown)"
      item-text="name"
      item-value="value"
      id="registrationT"
    ></v-select>
    <v-text-field
      v-model="values.registrationTypeOther"
      :label="(isRegistrationTypeOtherDisabled) ? '' : translate('lblRegistrationTypeOther') + '*'"
      :hint="(isRegistrationTypeOtherDisabled) ? '' : translate('lblRegistrationTypeOther-hint')"
      :persistent-hint="!isRegistrationTypeOtherDisabled"
      :disabled="isRegistrationTypeOtherDisabled"
      id="registrationTypeOther"
    ></v-text-field>
    <v-select
      :label="translate('lblState') + ' (GCF)*'"
      @input="selectState"
      :items="statesDropdown"
      item-text="name"
      item-value="value"
      id="stateGCF"
    ></v-select>
    <v-text-field
      v-model="values.country"
      :label="translate('lblCountry') + '*'"
      id="country"
    ></v-text-field>
    <v-text-field
      v-model="values.state"
      :label="translate('lblState') + '*'"
      id="state"
    ></v-text-field>
    <v-select
      :label="translate('lblNamePrefix')"
      v-model="values.namePrefix"
      :items="titles"
      item-text="name"
      item-value="name"
      max-height="auto"
      dark
      id="namePrefix"
    ></v-select>
    <v-text-field
      v-model="values.nameFirst"
      :label="translate('lblNameFirst') + '*'"
      id="nameFirst"
    ></v-text-field>
    <v-text-field
      v-model="values.nameLast"
      :label="translate('lblNameLast') + '*'"
      id="nameLast"
    ></v-text-field>
    <v-text-field
      v-model="values.email"
      :label="translate('lblEmail') + '*'"
      id="email"
    ></v-text-field>
    <v-text-field
      v-model="values.mobilePhone"
      :label="translate('lblMobilePhone') + '*'"
      id="mobilePhone"
    ></v-text-field>
    <v-text-field
      v-model="values['organizationName']"
      :label="translate('lblOrganizationName') + '*'"
      id="organizationName"
    ></v-text-field>
    <v-text-field
      v-model="values['organizationJobTitle']"
      :label="translate('lblOrganizationJobTitle') + '*'"
      id="organizationJobTitle"
    ></v-text-field>
    <v-dialog
      persistent
      v-model="showArrivalDateModal"
      lazy
    >
      <v-text-field
        slot="activator"
        :label="translate('lblArrivalDate') + '*'"
        v-model="values.arrivalDate"
        readonly
        id="arrivalDate"
      ></v-text-field>
      <v-date-picker v-model="internalArrivalDate" scrollable no-title>
        <template scope="{ cancel, save }">
          <v-card-row actions>
            <v-btn flat primary @click.native="cancel()">{{translate('lblSave')}}</v-btn>
            <!-- <v-btn flat primary @click.native="save()">{{translate('lblSave')}}</v-btn> -->
          </v-card-row>
        </template>
      </v-date-picker>
    </v-dialog>
    <v-dialog
      persistent
      v-model="showDepartureDateModal"
      lazy
    >
      <v-text-field
        slot="activator"
        :label="translate('lblDepartureDate') + '*'"
        v-model="values.departureDate"
        readonly
        id="departureDate"
      ></v-text-field>
      <v-date-picker v-model="internalDepartureDate" scrollable  no-title>
        <template scope="{ cancel, save }">
          <v-card-row actions>
            <v-btn flat primary @click.native="cancel()">{{translate('lblSave')}}</v-btn>
            <!-- <v-btn flat primary @click.native="save()">{{translate('lblSave')}}</v-btn> -->
          </v-card-row>
        </template>
      </v-date-picker>
    </v-dialog>
    <v-text-field
      :label="translate('lblDietaryRestrictions')"
      v-model="values.dietaryRestrictions"
      id="dietaryRestrictions"
    ></v-text-field>
    <v-card class="elevation-0" style="background: none;">
      <label style="font-size: 16px;">{{translate('lblRoomingPreference')}}</label>
      <v-card-text>
        <v-radio
          :label="translate('optRoomingPreference-smoking')"
          v-model="values.roomingPreference"
          hide-details
          value="smoking"
          dark
        ></v-radio>
        <v-radio
          :label="translate('optRoomingPreference-nonSmoking')"
          v-model="values.roomingPreference"
          hide-details
          value="nonSmoking"
          dark
        ></v-radio>
      </v-card-text>
    </v-card>
    <v-btn
      :disabled="!showSubmitButton"
      block
      secondary
      light
      @click.native="submit"
    >
      {{translate('lblSubmit')}}
    </v-btn>
  </div><!-- FORM  -->
</template>
<script>
  const values = {
    registrationType: '',
    registrationTypeOther: '',
    stateGCF: '',
    country: '',
    state: '',
    namePrefix: '',
    nameFirst: '',
    nameLast: '',
    email: '',
    mobilePhone: '',
    organizationName: '',
    organizationJobTitle: '',
    arrivalDate: null,
    departureDate: null,
    dietaryRestrictions: '',
    roomingPreference: '',
    lang: '',
  };
  export default {
    data () {
      return {
        values,
        showRegistrationForm: true,
        isRegistrationTypeOtherDisabled: true,
      }
    },
    props: {
      value: {
        type: Object,
        default: function () {
          return {
            values
          };
        }
      },
    },
    methods: {
      translate: function(stringId, fallbackString, lang) {
        // return this.$parent.translate(stringId, fallbackString, lang);
        return 'FOO BAR';
      },
    },
  };
</script>
