export const getPlaces = async () => {
  const url = `.netlify/functions/places`;

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};
