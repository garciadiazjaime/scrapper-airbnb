const fetch = require("node-fetch");
const payload = require("./payload.json");

const extract = async () => {
  const url =
    "https://www.airbnb.com/api/v3/StaysMapS2Search?operationName=StaysMapS2Search&locale=en&currency=MXN";

  const params = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      "x-airbnb-api-key": "d306zoyjsyarp7ifhu67rjxn52tv0t20",
      "x-csrf-without-token": 1,

      "x-airbnb-graphql-platform": "web",
      "x-airbnb-graphql-platform-client": "minimalist-niobe",
      "x-airbnb-prefetch": "true, true",
      "x-airbnb-supports-airlock-v2": "true",
      "x-client-version": "9c1ed638a527cf62138a2da4f816623426e5e217",
      "x-csrf-token":
        "V4$.airbnb.com$M3b5faiVdz4$DBjIsGCb7iSAB3ditsSe0xyVQB6yTrc8QLy7EiN3hJ8=",
      "x-niobe-short-circuited": "true",
    },
  };

  const response = await fetch(url, params);
  const data = await response.json();

  return data;
};

module.exports = extract;
