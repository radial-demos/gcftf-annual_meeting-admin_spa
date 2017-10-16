<template>
  <v-layout row justify-center>
    <v-dialog v-model="showModal" persistent width=600>
      <v-card v-if="registrant">
        <v-toolbar class="indigo" dark>
          <v-toolbar-title>{{registrant.fullName}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div class="customInput-details"></div>
          <v-text-field
            label="Dietary Restrictions"
            v-model="dietaryRestrictions"
            multi-line
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="close()">Cancel</v-btn>
          <v-btn primary @click.native="update(dietaryRestrictions)">Save</v-btn>
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
        dietaryRestrictions: '',
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
        this.dietaryRestrictions = (val) ? val.dietaryRestrictions || '' : '';
      },
      // registrant(val) {
      //   console.log(val);
      //   this.$emit('input', val);
      // },
    },
    methods: {
      update() {
        this.showModal = false;
        this.$emit('save', { uuid: this.registrant.uuid, dietaryRestrictions: this.dietaryRestrictions });
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
