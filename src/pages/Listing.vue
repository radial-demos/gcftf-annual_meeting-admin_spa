<template>
  <div>
    <dialog-notes :value="notesDialogRegistrant" @input="value => { notesDialogRegistrant = value }" @save="updateNotes"></dialog-notes>
    <dialog-dietary-restrictions :value="dietaryRestrictionsDialogRegistrant" @input="value => { dietaryRestrictionsDialogRegistrant = value }" @save="updateDietaryRestrictions"></dialog-dietary-restrictions>
    <dialog-rooming-preference :value="roomingPreferenceDialogRegistrant" @input="value => { roomingPreferenceDialogRegistrant = value }" @save="updateRoomingPreference"></dialog-rooming-preference>
    <dialog-detail :value="detailDialogRegistrant" @input="value => { detailDialogRegistrant = value }" @save="updateDetail" @del="deleteRegistrant"></dialog-detail>
    <filter-panel :message="filterMessage" @input="updateFilterState"></filter-panel>
    <v-data-table
      :items="filteredRegistrants"
      :headers="headers"
      selected-key="uuid"
      hide-actions
      class="elevation-1">
      <template slot="items" scope="props">
        <!-- <td>
          <v-checkbox
            primary
            hide-details
            v-model="props.selected"
          ></v-checkbox>
        </td> -->
        <td>{{ getShortDate(props.item.timeOfCreation)}}</td>
        <td>{{ getShortDate(props.item.arrivalDate)}}</td>
        <td>{{ getShortDate(props.item.departureDate)}}</td>
        <td>{{ props.item.lang}}</td>
        <td @click.stop="openDetailDialog(props.item)"
          style="cursor:pointer;"
          class="blue--text"
          v-tooltip:right="{ html: `${props.item.organizationName}\n${props.item.organizationJobTitle}` }">
            {{ props.item.fullName }}
        </td>
        <td>
          <span v-if="props.item.isGCF" style="padding:2px;" class="green lighten-2">{{ props.item.fullRegistrationType }}</span>
          <span v-else>{{ props.item.fullRegistrationType }}</span>
        </td>
        <td>
          <v-btn style="margin:0;" small icon :class="getIconClass(props.item.isContacted)" @click.native.stop="toggleRegistrationStatus(props.item, 'isContacted')">
            <v-icon>call_made</v-icon>
          </v-btn>
          <v-btn style="margin:0;" small icon :class="getIconClass(props.item.isConfirmed)" @click.native.stop="toggleRegistrationStatus(props.item, 'isConfirmed')">
            <v-icon>event_available</v-icon>
          </v-btn>
          <v-btn style="margin:0;" small icon :class="getIconClass(props.item.isCompensated)" @click.native.stop="toggleRegistrationStatus(props.item, 'isCompensated')">
            <v-icon>attach_money</v-icon>
          </v-btn>
        </td>
        <td>{{ props.item.country }}</td>
        <td>{{ props.item.state }}</td>
        <td>
          <v-btn style="margin:0;"
            small
            icon
            @click.native.stop="openRoomingPreferenceDialog(props.item)">
            <iconRoomingPreference :value="props.item.roomingPreference"></iconRoomingPreference>
          </v-btn>
          <v-btn style="margin:0;"
            small
            icon
            v-tooltip:left="{ html: props.item.dietaryRestrictions, visible: !!props.item.dietaryRestrictions }"
            @click.native.stop="openDietaryRestrictionsDialog(props.item)">
            <v-icon :class="getIconClass(props.item.dietaryRestrictions)">local_dining</v-icon>
          </v-btn>
        </td>
        <td>
          <v-btn style="margin:0;" small icon @click.native.stop="openNotesDialog(props.item) || null" :class="getIconClass(props.item.notes)"
            v-tooltip:left="{ html: props.item.notes, visible: !!props.item.notes }">
            <v-icon>description</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  let registrants = [];

  export default {
    data() {
      return {
        filterState: null,
        filterMessage: '',
        registrantCount: 0,
        filteredRegistrants: [],
        detailDialogRegistrant: null,
        dietaryRestrictionsDialogRegistrant: null,
        roomingPreferenceDialogRegistrant: null,
        notesDialogRegistrant: null,
        headers: [
          {
            text: 'RegDate',
            align: 'left',
            sortable: true,
            value: 'timeOfCreation',
          },
          {
            text: 'ArrDate',
            align: 'left',
            sortable: true,
            value: 'arrivalDate',
          },
          {
            text: 'DepDate',
            align: 'left',
            sortable: true,
            value: 'departureDate',
          },
          {
            text: 'Lang',
            align: 'left',
            sortable: true,
            value: 'lang',
          },
          {
            text: 'Name',
            align: 'left',
            sortable: true,
            value: 'fullName',
          },
          {
            text: 'Registration Type',
            align: 'left',
            sortable: true,
            value: 'registrationType',
          },
          {
            text: 'Registration Status',
            align: 'left',
            sortable: false,
          },
          {
            text: 'Country',
            align: 'left',
            sortable: true,
            value: 'countryAndState',
          },
          {
            text: 'State',
            align: 'left',
            sortable: true,
            value: 'state',
          },
          {
            text: 'Rooming/Diet',
            align: 'left',
            sortable: false,
          },
          {
            text: 'Notes',
            align: 'left',
            sortable: false,
          },
        ],
      };
    },

    created() {
      this.refresh();
      this.updateFilterMessage();
    },
    methods: {
      refresh() {
        registrants = [];
        this.registrantCount = 0;
        this.$parent.getRegistrants((err, data) => {
          if (data && data.data && data.data.getRegistrants) {
            registrants = data.data.getRegistrants.map((registrantArg) => {
              const registrant = Object.assign({}, registrantArg);
              return registrant;
            });
            this.registrantCount = registrants.length;
          }
          this.filterRegistrants();
        });
      },
      getShortDate(dateAndTime) {
        return dateAndTime.substring(5, 10);
      },
      getIconClass(value) {
        const blankStyle = 'grey--text text--lighten-1';
        const trueStyle = 'green--text text--darken-2';
        const falseStyle = 'red--text text--lighten-4';
        if (value) return trueStyle;
        return (typeof value === 'boolean') ? falseStyle : blankStyle;
      },
      getRoomingPreferenceIcon(value) {
        return (value === 'nonSmoking') ? 'smoke_free' : 'smoking_rooms';
      },
      toggleRegistrationStatus(registrant, flag) {
        const value = !registrant[flag];
        this.$parent.updateRegistrationStatusFlag({ uuid: registrant.uuid, flag, value }, (err, resp) => {
          if (err) {
            console.log(err);
            return;
          }
          this.updateRegistrants(resp);
        });
      },
      openDetailDialog(item) {
        this.detailDialogRegistrant = item;
      },
      openNotesDialog(item) {
        this.notesDialogRegistrant = item;
      },
      openDietaryRestrictionsDialog(item) {
        this.dietaryRestrictionsDialogRegistrant = item;
      },
      openRoomingPreferenceDialog(item) {
        this.roomingPreferenceDialogRegistrant = item;
      },
      deleteRegistrant(obj) {
        this.$parent.deleteRegistrant({ uuid: obj.uuid }, (err, resp) => {
          if (err) {
            console.log(err);
            return;
          }
          this.refresh();
        });
      },
      updateDetail(obj) {
        this.$parent.updateRegistrant(obj, (err, resp) => {
          if (err) {
            console.log(err);
            return;
          }
          this.updateRegistrants(resp);
        });
      },
      updateNotes(obj) {
        this.$parent.updateNotes(obj, (err, resp) => {
          if (err) {
            console.log(err);
            return;
          }
          this.updateRegistrants(resp);
        });
      },
      updateDietaryRestrictions(obj) {
        this.$parent.updateDietaryRestrictions(obj, (err, resp) => {
          if (err) {
            console.log(err);
            return;
          }
          this.updateRegistrants(resp);
        });
      },
      updateRoomingPreference(obj) {
        this.$parent.updateRoomingPreference(obj, (err, resp) => {
          if (err) {
            console.log(err);
            return;
          }
          this.updateRegistrants(resp);
        });
      },
      updateRegistrants(registrant) {
        if (registrant) {
          const registrantIndex = registrants.findIndex(testRegistrant => (testRegistrant.uuid === registrant.uuid));
          if (registrantIndex === -1) return;
          registrants[registrantIndex] = registrant;
        }
        this.filterRegistrants();
      },
      filterRegistrants() {
        this.filteredRegistrants = registrants.filter((registrant) => {
          if (!this.filterState) return true;
          if (this.filterState.registrationType) {
            if (this.filterState.registrationType.gcf === false && registrant.isGCF) return false;
            if (this.filterState.registrationType.gcf === true && !registrant.isGCF) return false;
          }
          if (this.filterState.registrationStatus) {
            const isContacted = registrant.isContacted;
            const isConfirmed = registrant.isConfirmed;
            const isCompensated = registrant.isCompensated;
            if (this.filterState.registrationStatus.contacted === false && isContacted) return false;
            if (this.filterState.registrationStatus.contacted === true && !isContacted) return false;
            if (this.filterState.registrationStatus.confirmed === false && isConfirmed) return false;
            if (this.filterState.registrationStatus.confirmed === true && !isConfirmed) return false;
            if (this.filterState.registrationStatus.compensated === false && isCompensated) return false;
            if (this.filterState.registrationStatus.compensated === true && !isCompensated) return false;
          }
          return true;
        });
      },
      updateFilterMessage() {
        let registrationTypeClause = '';
        let registrationStatusClause = '';
        if (this.filterState) {
          if (this.filterState.registrationType && (this.filterState.registrationType.gcf === true || this.filterState.registrationType.gcf === false)) {
            registrationTypeClause = (this.filterState.registrationType.gcf) ? 'GCF governors/delegates' : 'NON GCF governors/delegates';
          }
          if (this.filterState.registrationStatus) {
            const statusList = ['Contacted', 'Confirmed', 'Compensated'];
            statusList.forEach((statusItem) => {
              const statusValue = this.filterState.registrationStatus[statusItem.toLowerCase()];
              if (statusValue === true) registrationStatusClause = `marked as ${statusItem}`;
              else if (statusValue === false) registrationStatusClause = `NOT marked as ${statusItem}`;
            });
          }
        }
        if (!registrationTypeClause && !registrationStatusClause) {
          this.filterMessage = 'All registrants';
        } else {
          this.filterMessage = (registrationTypeClause) ? `Only ${registrationTypeClause}` : 'Only registrants';
          if (registrationStatusClause) {
            this.filterMessage += ` ${registrationStatusClause}`;
          }
        }
      },
      updateFilterState(filterState) {
        this.filterState = filterState;
        this.updateFilterMessage();
        this.filterRegistrants();
      },
    },
    components: {
      iconRoomingPreference: {
        template: '<v-icon :class="iconClass">{{iconName}}</v-icon>',
        data() {
          return {
            iconClass: '',
            iconName: '',
          };
        },
        props: {
          value: null,
        },
        watch: {
          value(val) {
            this.updateIcon(val);
          },
        },
        created() {
          this.updateIcon(this.value);
        },
        methods: {
          updateIcon(val) {
            switch (val) {
              case 'smoking':
                this.iconName = 'smoking_rooms';
                this.iconClass = 'green--text text--darken-2';
                return;
              case 'nonSmoking':
                this.iconName = 'smoke_free';
                this.iconClass = 'red--text text--darken-2';
                return;
              default:
                this.iconClass = 'grey--text text--lighten-1';
                this.iconName = 'indeterminate_check_box';
            }
          },
        },
      },
    },
  };
</script>
