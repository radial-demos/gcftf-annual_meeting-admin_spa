<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title>Annual Meeting Registrants</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container>
        <listing-page></listing-page>
      </v-container>
    </main>
    <v-footer>
      <div>&copy; 2017 GCF Task Force</div>
    </v-footer>
  </v-app>
</template>

<script>
  const http = require('http');
  // const { URL } = require('url');

  const PORT = process.env.PORT;
  const HOSTNAME = process.env.HOSTNAME;
  const PATH = process.env.PATH;

  const REGISTRANT_INPUT_FIELDS = ['uuid',
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
    'lang'];

  const REGISTRANT_FIELDS = ['uuid',
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
    'notes',
    'isGCF',
    'isContacted',
    'isConfirmed',
    'isCompensated',
    'fullName',
    'fullRegistrationType',
    'countryAndState'];

  function GQL(portArg, hostnameArg, pathArg) {
    function encodeData(data) {
      let query = '';
      Object.keys(data).forEach((fieldName) => {
        const fieldValue = data[fieldName];
        if (typeof fieldValue === 'string') query += `${encodeURIComponent(fieldName)}%3A "${encodeURIComponent(fieldValue)}" `;
        else if (typeof fieldValue === 'boolean') query += `${fieldName}%3A ${fieldValue} `;
        else if (Array.isArray(fieldValue)) query += `${encodeURIComponent(fieldName)}%3A [${fieldValue.map(ele => `"${encodeURIComponent(ele)}"`).toString()}] `;
      });
      return query;
    }
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

    function callMutation(name, dataString, returnFields, callback) {
      const query = `${name}(${dataString})`;
      const selection = Array.isArray(returnFields) ? `{${returnFields.join(' ')}}` : '';
      const options = {
        method: 'POST',
        hostname: hostnameArg,
        path: `/${pathArg}?query=mutation {${query}${selection}}`,
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

    return { encodeData, callQuery, callMutation };
  }

  const api = GQL(PORT, HOSTNAME, PATH);

  export default {
    methods: {
      getRegistrants(cb) {
        api.callQuery('getRegistrants', REGISTRANT_FIELDS, (err, data) => {
          cb(err, data);
        });
      },
      deleteRegistrant(data, cb) {
        api.callMutation('deleteRegistrant', api.encodeData(data), null, (err, resp) => {
          if (err) return cb(err, resp);
          return cb(undefined, resp.data.deleteRegistrant);
        });
      },
      updateRegistrant(data, cb) {
        const inputData = {};
        Object.keys(data).forEach((key) => {
          if (!REGISTRANT_INPUT_FIELDS.includes(key)) return;
          inputData[key] = data[key];
        });
        api.callMutation('updateRegistrant', `registrant%3A {${api.encodeData(inputData)}}`, REGISTRANT_FIELDS, (err, resp) => {
          if (err) return cb(err, resp);
          return cb(undefined, resp.data.updateRegistrant);
        });
      },
      updateRegistrationStatusFlag(data, cb) {
        api.callMutation('updateRegistrationStatusFlag', api.encodeData(data), REGISTRANT_FIELDS, (err, resp) => {
          if (err) return cb(err, resp);
          return cb(undefined, resp.data.updateRegistrationStatusFlag);
        });
      },
      updateNotes(data, cb) {
        api.callMutation('updateNotes', api.encodeData(data), REGISTRANT_FIELDS, (err, resp) => {
          if (err) return cb(err, resp);
          return cb(undefined, resp.data.updateNotes);
        });
      },
      updateDietaryRestrictions(data, cb) {
        api.callMutation('updateDietaryRestrictions', api.encodeData(data), REGISTRANT_FIELDS, (err, resp) => {
          if (err) return cb(err, resp);
          return cb(undefined, resp.data.updateDietaryRestrictions);
        });
      },
      updateRoomingPreference(data, cb) {
        api.callMutation('updateRoomingPreference', api.encodeData(data), REGISTRANT_FIELDS, (err, resp) => {
          if (err) return cb(err, resp);
          return cb(undefined, resp.data.updateRoomingPreference);
        });
      },
    },
  };
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
