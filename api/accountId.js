const pubg = require("./pubg");

const fetchUserId = async nickName => {
  try {
    console.log("API REQ FOR ID");
    const res = await pubg.get(`players?filter[playerNames]=${nickName}`);
    const id = res.data.data[0].id;
    return id;
  } catch (err) {
    throw err;
  }
};
module.exports = fetchUserId;
