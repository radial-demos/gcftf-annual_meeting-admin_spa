<template>
  <v-layout row justify-center>
    <v-dialog v-model="isActive" width=600 style="overflow: auto;">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>{{registrant.fullName}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div class="customInput-details"></div>
          <v-text-field
            label="Notes"
            v-model="notes"
            multi-line
          ></v-text-field>
          <div>
            <v-btn class="blue--text darken-1" @click.native="isActive = false">Close</v-btn>
            <v-btn class="blue--text darken-1" @click.native="update()">Save</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

  export default {
    data() {
      return {
        isActive: !!this.value,
        notes: '',
      };
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
      registrant: {
        type: Object,
      },
    },

    watch: {
      value(val) {
        this.isActive = !!val;
      },
      isActive(val) {
        this.$emit('input', val);
      },
      registrant(val) {
        this.notes = val.notes || '';
      },
    },

    methods: {
      update() {
        this.updateNotes({ uuid: this.registrant.uuid, notes: this.notes }, (err, resp) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(resp);
          this.registrant.notes = this.notes;
          this.isActive = false;
        });
        // console.log(this.notes);
      }
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
