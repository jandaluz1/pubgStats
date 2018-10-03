const pubg = require('./pubg');

const fetchSeasonStats = async playerId => {
  try {
    console.log('API CALL TO FETCH STATS');
    const res = await pubg.get(
      `players/${playerId}/seasons/division.bro.official.2018-09`
    );
    const stats = res.data.data.attributes.gameModeStats['squad-fpp'];
    return {
      id: playerId,
      'k/d': (stats.kills / (stats.wins + stats.losses)).toFixed(2),
      wins: stats.wins,
      top10s: stats.top10s,
      losses: stats.losses
    };
  } catch (err) {
    throw err;
  }
};
module.exports = fetchSeasonStats;
