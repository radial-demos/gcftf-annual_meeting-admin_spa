<template>
  <v-layout row justify-center>
    <v-dialog v-model="showModal" scrollable persistent width=600>
      <v-card  v-if="registrant">
        <v-toolbar class="indigo" dark>
          <v-toolbar-title>{{registrant.fullName}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text style="height: 500px;">
          <label class="customInput-label">Registration Status</label>
          <div class="customInput-details"></div>
          <v-select
            label="Registration Type"
            v-model="rec.registrationType"
            :items="registrationTypes"
          ></v-select>
          <v-text-field
            label="Registration Type (Other)"
            v-model="rec.registrationTypeOther"
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="rec.email"
          ></v-text-field>
          <v-text-field
            label="Mobile Phone"
            v-model="rec.mobilePhone"
          ></v-text-field>
          <v-select
            label="Prefix"
            v-model="rec.namePrefix"
            :items="titles"
          ></v-select>
          <v-text-field
            label="First Name"
            v-model="rec.nameFirst"
          ></v-text-field>
          <v-text-field
            label="Last Name"
            v-model="rec.nameLast"
          ></v-text-field>
          <v-text-field
            label="Country"
            v-model="rec.country"
          ></v-text-field>
          <v-text-field
            label="State"
            v-model="rec.state"
          ></v-text-field>
          <v-text-field
            label="Organization Name"
            v-model="rec.organizationName"
          ></v-text-field>
          <v-text-field
            label="Job Title"
            v-model="rec.organizationJobTitle"
          ></v-text-field>
          <v-text-field
            label="Arrival Date"
            v-model="rec.arrivalDate"
          ></v-text-field>
          <v-text-field
            label="Departure Date"
            v-model="rec.departureDate"
          ></v-text-field>
          <v-text-field
            label="Dietary Restrictions"
            v-model="rec.dietaryRestrictions"
            multi-line
          ></v-text-field>
          <label class="customInput-label">Rooming Preference</label>
          <v-radio
            label="Unspecified"
            v-model="rec.roomingPreference"
            hide-details
            value=""
          ></v-radio>
          <v-radio
            label="Smoking"
            v-model="rec.roomingPreference"
            hide-details
            value="smoking"
          ></v-radio>
          <v-radio
            label="Non Smoking"
            v-model="rec.roomingPreference"
            value="nonSmoking"
          ></v-radio>
          <v-text-field
            label="Preferred Language"
            v-model="rec.lang"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
          <v-card-actions>
            <v-btn error @click.native="del()">Delete</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click.native="close()">Cancel</v-btn>
            <v-btn primary @click.native="update()">Save</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>

  export default {
    data() {
      return {
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
        registrant: null,
        rec: null,
        showModal: false,
      };
    },

    props: {
      value: {
        default: null,
        required: false,
      },
    },

    watch: {
      value(val) {
        this.registrant = val;
        this.rec = Object.assign({}, val);
        this.showModal = !!val;
        // this.dietaryRestrictions = (val) ? val.dietaryRestrictions || '' : '';
      },
    },

    methods: {
      update() {
        this.showModal = false;
        this.$emit('save', this.rec);
        this.$emit('input', null);
      },
      close() {
        this.showModal = false;
        this.$emit('input', null);
      },
      del() {
        this.showModal = false;
        this.$emit('del', this.rec);
        this.$emit('input', null);
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
