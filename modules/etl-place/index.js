const extract = require("./extract");
const transform = require("./transform");
const load = require("./load");

async function place() {
  const data = await extract();

  const places = await transform(data);

  console.log("Total places: ", places.length);
  await load(places);
}

module.exports = {
  place,
};
