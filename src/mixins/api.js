const http = require('http');
// const { URL } = require('url');

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;
const PATH = process.env.PATH;

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
  'registrationStatusFlags',
  'notes',
  'isGCF',
  'isContacted',
  'isConfirmed',
  'isCompensated'];

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

  function callMutation(name, data, returnFields, callback) {
    let query = '';
    Object.keys(data).forEach((fieldName) => {
      const fieldValue = data[fieldName];
      if (typeof fieldValue === 'string') query += `${encodeURIComponent(fieldName)}%3A "${encodeURIComponent(fieldValue)}" `;
      else if (typeof fieldValue === 'boolean') query += `${fieldName}%3A ${fieldValue} `;
      else if (Array.isArray(fieldValue)) query += `${encodeURIComponent(fieldName)}%3A [${fieldValue.map(ele => `"${encodeURIComponent(ele)}"`).toString()}] `;
    });
    query = `${name}(${query})`;
    const options = {
      method: 'POST',
      hostname: hostnameArg,
      path: `/${pathArg}?query=mutation {${query}{${returnFields.join(' ')}}}`,
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

const api = GQL(PORT, HOSTNAME, PATH);

export default {
  methods: {
    updateRegistrationStatusFlags(data, cb) {
      api.callMutation('updateRegistrationStatusFlags', data, REGISTRANT_FIELDS, (err, resp) => {
        if (err) return cb(err, resp);
        return cb(undefined, resp);
      });
    },
  },
};
