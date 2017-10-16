<template>
  <v-layout row justify-center>
    <v-dialog v-model="showModal" persistent width=600>
      <v-card v-if="registrant">
        <v-toolbar class="indigo" dark>
          <v-toolbar-title>{{registrant.fullName}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <label class="customInput-label">Rooming Preference</label>
          <v-radio
            label="Unspecified"
            v-model="roomingPreference"
            hide-details
            value=""
          ></v-radio>
          <v-radio
            label="Smoking"
            v-model="roomingPreference"
            hide-details
            value="smoking"
          ></v-radio>
          <v-radio
            label="Non Smoking"
            v-model="roomingPreference"
            value="nonSmoking"
          ></v-radio>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="close()">Cancel</v-btn>
          <v-btn primary @click.native="update(roomingPreference)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        registrant: null,
        showModal: false,
        roomingPreference: '',
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
        this.showModal = !!val;
        this.roomingPreference = (val) ? val.roomingPreference || '' : '';
      },
      // registrant(val) {
      //   console.log(val);
      //   this.$emit('input', val);
      // },
    },
    methods: {
      update() {
        this.showModal = false;
        this.$emit('save', { uuid: this.registrant.uuid, roomingPreference: this.roomingPreference });
        this.$emit('input', null);
      },
      close() {
        this.showModal = false;
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
</style>
