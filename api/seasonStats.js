const pubg = require('./pubg');
const { season } = require('../config.json');

const fetchSeasonStats = async (playerId, mode) => {
  try {
    const res = await pubg.get(
      `players/${playerId}/seasons/${process.env.SEASON || season}`
    );
    const stats = res.data.data.attributes.gameModeStats[mode];
    return {
      id: playerId,
      'k/d': (stats.kills / (stats.wins + stats.losses)).toFixed(2),
      wins: stats.wins,
      top10s: stats.top10s,
      losses: stats.losses,
      rankPoints: Math.floor(stats.rankPoints)
    };
  } catch (err) {
    throw err;
  }
};
module.exports = fetchSeasonStats;
