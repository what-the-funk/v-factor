const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-301680.oktapreview.com',
  token: '00YZnAs7cK4DsJVK0WirJAJvTL-nnmVGiNBekBjECw'
});

module.exports = client;