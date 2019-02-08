const axios = require('axios');
// require('../keys');
const pubg = axios.create({
  baseURL: 'https://api.pubg.com/shards/steam',
  headers: {
    Authorization: `Bearer ${process.env.PUBGTOKEN}`,
    Accept: 'application/json'
  },
  timeout: 3000
});

module.exports = pubg;
