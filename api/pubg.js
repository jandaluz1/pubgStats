const axios = require('axios');
const { pubgToken } = require('../config.json');

const pubg = axios.create({
  baseURL: 'https://api.pubg.com/shards/steam',
  headers: {
    Authorization: `Bearer ${process.env.PUBGTOKEN || pubgToken}`,
    Accept: 'application/json'
  },
  timeout: 3000
});

module.exports = pubg;
