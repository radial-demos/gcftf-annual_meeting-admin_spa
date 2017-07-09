<template>
  <div>
    <v-container class="elevation-1" fluid>
      <v-layout row wrap>
        <v-flex xs12 sm4 md4>
          <v-checkbox label="GCF"
            id="showGCF"
            @change="filterRegistrants()"
            v-model="filter.showGCF"
            hide-details></v-checkbox>
          <v-checkbox label="Non GCF"
            id="showNonGCF"
            @change="filterRegistrants()"
            v-model="filter.showNonGCF"
            hide-details></v-checkbox>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-checkbox label="Contacted"
            id="showContacted"
            @change="filterRegistrants()"
            v-model="filter.showContacted"
            hide-details></v-checkbox>
          <v-checkbox label="Not Contacted"
            id="showNonContacted"
            @change="filterRegistrants()"
            v-model="filter.showNonContacted"
            hide-details></v-checkbox>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-checkbox label="Confirmed"
            id="showConfirmed"
            @change="filterRegistrants()"
            v-model="filter.showConfirmed"
            hide-details></v-checkbox>
          <v-checkbox label="Not Confirmed"
            id="showNonConfirmed"
            @change="filterRegistrants()"
            v-model="filter.showNonConfirmed"
            hide-details></v-checkbox>
        </v-flex>
      </v-layout>
    </v-container>
    <v-data-table
      :items="filteredRegistrants"
      :headers="headers"
      :input="editRow"
      selected-key="uuid"
      hide-actions
      class="elevation-1">
      <template @click="editRow" slot="items" scope="props">
        <!-- <td>
          <v-checkbox
            primary
            hide-details
            v-model="props.selected"
          ></v-checkbox>
        </td> -->
        <td>{{ props.item.dateOfCreation }}</td>
        <!-- <td @click.stop="editRow(props.item)" style="cursor:pointer;">{{ props.item.fullName }}</td> -->
        <td @click.stop="editRow(props.item)"
          style="cursor:pointer;"
          class="blue--text">
            {{ props.item.fullName }}
        </td>
        <td>{{ props.item.fullRegistrationType }}</td>
        <td><v-icon v-if="props.item.isGCF" class="green--text">check</v-icon></td>
        <td><v-icon v-if="props.item.registrationStatusIsContacted" class="green--text">person_outline</v-icon></td>
        <td><v-icon v-if="props.item.registrationStatusIsConfirmed" class="green--text">person</v-icon></td>
        <td>{{ props.item.country }}</td>
        <td>{{ props.item.state }}</td>
      </template>
    </v-data-table>
    <v-layout row justify-center>
      <v-dialog v-model="showDetailDialog" width="600px">
        <v-card>
          <v-toolbar>
            <v-toolbar-title>{{activeRegistrant.fullName}}</v-toolbar-title>
          </v-toolbar>
          <v-list two-line>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Phone</v-list-tile-title>
                <v-list-tile-sub-title>{{activeRegistrant.mobilePhone}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Email</v-list-tile-title>
                <v-list-tile-sub-title>{{activeRegistrant.email}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-list subheader>
            <v-subheader>Status</v-subheader>
            <v-list-tile>
              <v-list-tile-action>
                <v-checkbox v-model="activeRegistrant.registrationStatusIsContacted"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Contacted</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                </v-list-tile-title>
                <v-checkbox v-model="activeRegistrant.registrationStatusIsConfirmed"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Confirmed</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-card-text>
              <v-spacer></v-spacer>
              <v-btn @click.native="showDetailDialog = false">Close</v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
  const http = require('http');

  const PORT = process.env.PORT;
  const HOSTNAME = process.env.HOSTNAME;
  const PATH = process.env.PATH;

  let registrants = [];

  const fields = ['uuid',
    'timeOfCreation',
    'registrationType',
    'registrationTypeOther',
    'stateGCF',
    'state',
    'country',
    'namePrefix',
    'nameFirst',
    'nameLast',
    'email',
    'mobilePhone',
    'organizationName',
    'organizationJobTitle',
    'arrivalDate',
    'departureDate',
    'dietaryRestrictions',
    'roomingPreference',
    'lang',
    'registrationStatusIsContacted',
    'registrationStatusIsConfirmed'];

  function GQL(portArg, hostnameArg, pathArg) {
    function callQuery(nameArg, fieldsArg, callback) {
      let rawData = '';

      let query = fieldsArg.join(' ');
      query = `${nameArg} {${query}}`;
      const options = {
        method: 'GET',
        hostname: hostnameArg,
        path: `/${pathArg}?query={${query}}`,
        port: portArg,
        headers: {
          'Content-Type': 'text/plain',
        },
      };
      const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => { rawData += chunk; });

        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            callback(null, parsedData);
          } catch (err) {
            callback(err);
          }
        });
      });
      req.on('error', (err) => {
        callback(err, null);
      });
      req.end();
    }

    function callMutation(name, data, callback) {
      let query = '';
      Object.keys(data).forEach((fieldName) => {
        const fieldValue = data[fieldName];
        if (typeof fieldValue === 'string') query += `${encodeURIComponent(fieldName)}: "${encodeURIComponent(fieldValue)}" `;
        else if (typeof fieldValue === 'boolean') query += `${fieldName}: ${fieldValue} `;
        else if (Array.isArray(fieldValue)) query += `${encodeURIComponent(fieldName)}: [${fieldValue.map(ele => `"${encodeURIComponent(ele)}"`).toString()}] `;
      });
      query = `${name}(${query})`;
      const options = {
        method: 'POST',
        hostname: hostnameArg,
        path: `/${pathArg}?query=mutation { ${query} }`,
        port: portArg,
        headers: {
          'Content-Type': 'text/plain',
        },
      };
      const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        let rawData = '';

        res.on('data', (chunk) => {
          rawData += chunk;
        });
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            callback(null, parsedData);
          } catch (err) {
            callback(err);
          }
        });
      });

      req.on('error', (err) => {
        callback(err);
      });

      req.end();
    }

    return { callQuery, callMutation };
  }

  function getFullName(item) {
    let fullName = `${item.nameLast}, ${item.nameFirst}`;
    if (item.namePrefix) fullName += ` (${item.namePrefix})`;
    return fullName;
  }

  function getFullRegistrationType(item) {
    const registrationType = item.registrationType.replace(/ \(.+\)/, '').trim();
    return registrationType + ((item.registrationTypeOther) ? ` (${item.registrationTypeOther})` : '');
  }

  function getDateOnly(dateAndTime) {
    return dateAndTime.substring(5, 10);
  }

  function getIsGCF(registrationType) {
    const test = registrationType.toLowerCase();
    return (test.startsWith('gcf delegate') || test.startsWith('governor'));
  }

  const api = GQL(PORT, HOSTNAME, PATH);

  export default {
    data() {
      return {
        filter: {
          showGCF: true,
          showNonGCF: true,
          showContacted: true,
          showNonContacted: true,
          showConfirmed: true,
          showNonConfirmed: true,
        },
        filteredRegistrants: [],
        activeRegistrant: {
          mobilePhone: '',
          email: '',
          registrationStatusIsContacted: false,
          registrationStatusIsConfirmed: false,
        },
        showDetailDialog: false,
        headers: [
          {
            text: 'Date',
            left: true,
            sortable: true,
            value: 'timeOfCreation',
          },
          {
            text: 'Name',
            left: true,
            sortable: true,
            value: 'fullName',
          },
          {
            text: 'Registration Type',
            left: true,
            sortable: true,
            value: 'registrationType',
          },
          {
            text: 'GCF',
            left: true,
            sortable: true,
            value: 'isGCF',
          },
          {
            text: 'Cont',
            left: true,
            sortable: true,
            value: 'registrationStatusIsContacted',
          },
          {
            text: 'Conf',
            left: true,
            sortable: true,
            value: 'registrationStatusIsConfirmed',
          },
          {
            text: 'Country',
            left: true,
            sortable: true,
            value: 'countryAndState',
          },
          {
            text: 'State',
            left: true,
            sortable: true,
            value: 'state',
          },
        ],
      };
    },
    watch: {
      'activeRegistrant.registrationStatusIsContacted': function registrationStatusIsContacted(arg) {
        if (!this.activeRegistrant.uuid) return;
        api.callMutation('updateRegistrationStatusFlag', { uuid: this.activeRegistrant.uuid, flag: 'contacted', value: arg }, (err, resp) => {
          if (err) return;
          this.filterRegistrants();
          // console.log(resp.data);
          // if (!data.data !! !data.data[functionName]) return;
        });
      },
      'activeRegistrant.registrationStatusIsConfirmed': function registrationStatusIsConfirmed(arg) {
        if (!this.activeRegistrant.uuid) return;
        api.callMutation('updateRegistrationStatusFlag', { uuid: this.activeRegistrant.uuid, flag: 'confirmed', value: arg }, (err, resp) => {
          if (err) return;
          this.filterRegistrants();
          // console.log(resp.data);
        });
      },
    },
    created() {
      registrants = [];
      api.callQuery('getRegistrants', fields, (err, data) => {
        if (data && data.data && data.data.getRegistrants) {
          registrants = data.data.getRegistrants.map((registrantArg) => {
            const registrant = Object.assign({}, registrantArg);
            registrant.nameFirst = registrant.nameFirst.trim();
            registrant.nameLast = registrant.nameLast.trim();
            registrant.fullName = getFullName(registrant);
            registrant.fullRegistrationType = getFullRegistrationType(registrant);
            registrant.isGCF = getIsGCF(registrant.registrationType);
            registrant.countryAndState = `${registrant.country.trim()} - ${registrant.state.trim()}`;
            registrant.dateOfCreation = getDateOnly(registrant.timeOfCreation);
            return registrant;
          });
        }
        this.filterRegistrants();
      });
    },
    methods: {
      editRow(item) {
        this.activeRegistrant = item;
        this.showDetailDialog = true;
      },
      filterRegistrants() {
        this.filteredRegistrants = registrants.filter((registrant) => {
          let pass = (
            (this.filter.showGCF && registrant.isGCF)
              ||
            (this.filter.showNonGCF && !registrant.isGCF));
          if (!pass) return false;
          pass = (
            (this.filter.showContacted && registrant.registrationStatusIsContacted) ||
            (this.filter.showNonContacted && !registrant.registrationStatusIsContacted)
          );
          if (!pass) return false;
          pass = (
            (this.filter.showConfirmed && registrant.registrationStatusIsConfirmed) ||
            (this.filter.showNonConfirmed && !registrant.registrationStatusIsConfirmed)
          );
          if (!pass) return false;
          return true;
        });
      },
    },
  };
</script>
