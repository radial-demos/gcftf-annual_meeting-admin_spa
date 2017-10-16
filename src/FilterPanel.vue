<template>
  <v-card>
    <btn-multistate :states="states" name="gcf" label="Gov/Delegate" @input="updateRegistrationTypeFilter"></btn-multistate>
    <div style="display: inline-block; width: 30px;"></div>
    <btn-group-multistate :buttons="buttons" @input="updateRegistrationStatusFilter"></btn-group-multistate>
    <v-card-text>
      Displaying: {{message}}.
    </v-card-text>
  </v-card>
</template>
<script>
  export default {
    data() {
      return {
        registrationTypeFilter: null,
        registrationStatusFilter: null,
        states: [
          { value: null, icon: 'indeterminate_check_box', class: '' },
          { value: true, icon: 'check_box', class: 'green--text text--darken-2' },
          { value: false, icon: 'check_box_outline_blank', class: 'grey--text text--lighten-1' },
        ],
        buttons: [
          {
            label: 'Contacted',
            name: 'contacted',
            states: [
              { value: null, icon: 'indeterminate_check_box', class: 'grey--text text--lighten-1' },
              { value: true, icon: 'call_made', class: 'green--text text--darken-2' },
              { value: false, icon: 'call_made', class: 'red--text text--lighten-4' },
            ],
          },
          {
            label: 'Confirmed',
            name: 'confirmed',
            states: [
              { value: null, icon: 'indeterminate_check_box', class: 'grey--text text--lighten-1' },
              { value: true, icon: 'event_available', class: 'green--text text--darken-2' },
              { value: false, icon: 'event_available', class: 'red--text text--lighten-4' },
            ],
          },
          {
            label: 'Compensated',
            name: 'compensated',
            states: [
              { value: null, icon: 'indeterminate_check_box', class: 'grey--text text--lighten-1' },
              { value: true, icon: 'attach_money', class: 'green--text text--darken-2' },
              { value: false, icon: 'attach_money', class: 'red--text text--lighten-4' },
            ],
          },
        ],
        isActive: !!this.value,
      };
    },
    props: {
      message: '',
    },
    methods: {
      emit() {
        const filters = {
          registrationType: this.registrationTypeFilter,
          registrationStatus: this.registrationStatusFilter,
        };
        this.$emit('input', filters);
      },
      updateRegistrationTypeFilter(arg) {
        this.registrationTypeFilter = arg;
        this.emit();
      },
      updateRegistrationStatusFilter(arg) {
        this.registrationStatusFilter = arg;
        this.emit();
      },
    },
  };
</script>
