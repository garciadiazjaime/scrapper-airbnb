const { getPlaces } = require("../../modules/support/dynamo-service");

exports.handler = async function (event, _context) {

  const results = await getPlaces();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(results)
  };
};
