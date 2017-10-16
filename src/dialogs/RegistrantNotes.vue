<template>
  <v-layout row justify-center>
    <v-dialog v-model="showModal" persistent width=600 style="overflow: auto;">
      <v-card v-if="registrant">
        <v-toolbar class="indigo" dark>
          <v-toolbar-title>{{registrant.fullName}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div class="customInput-details"></div>
          <v-text-field
            label="Notes"
            v-model="notes"
            multi-line
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="close()">Cancel</v-btn>
          <v-btn primary @click.native="update(notes)">Save</v-btn>
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
        notes: '',
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
        this.notes = (val) ? val.notes || '' : '';
      },
      // registrant(val) {
      //   console.log(val);
      //   this.$emit('input', val);
      // },
    },
    methods: {
      update() {
        this.showModal = false;
        this.$emit('save', { uuid: this.registrant.uuid, notes: this.notes });
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
