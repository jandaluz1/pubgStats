const axios = require('axios');
const { pubgToken } = require('../config.json');

const pubg = axios.create({
  baseURL: 'https://api.pubg.com/shards/pc-na',
  headers: {
    Authorization: `Bearer ${pubgToken}`,
    Accept: 'application/json'
  },
  timeout: 3000
});

module.exports = pubg;
