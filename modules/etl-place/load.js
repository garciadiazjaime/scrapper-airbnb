const { savePlaces } = require("../support/dynamo-service");

const load = (places) => {
  return savePlaces(places);
};

module.exports = load;
