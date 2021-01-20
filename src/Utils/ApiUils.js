import axios from "axios";

axios.defaults.headers.common.Accept = "application/json";

const fetch = (endpoint) => {
  return axios
    .get(endpoint)
    .then((res) => res)
    .catch((err) => {
      console.error(
        "Error catch in Apiutils at fetch method. It will be thrown..."
      );
      alert("Api is not responding, try again...");
      throw err;
    });
};

export const getPoints = (user = "", apiKey = "", table = "") => {
  const query = `https://${user}.carto.com/api/v2/sql?api_key=${apiKey}&q=SELECT latitude, longitude FROM ${table}`;
  return fetch(query).then((res) => {
    console.log("Point rows: ", res.data.rows);
    const data = [];
    res.data.rows.forEach((point) => {
      data.push({ lat: point.latitude, lng: point.longitude });
    });
    return data;
  });
};

export const getPointsAPI = () => {
  const query = `http://localhost:5000/points`;
  return fetch(query).then((res) => {
    const data = [];
    res.data.rows.forEach((point) => {
      data.push({ lat: point.latitude, lng: point.longitude });
    });
    return data;
  });
};

export const getAddress = (apiKey = "", lat = "", long = "") => {
  const query = `https://open.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}&location=${lat}, ${long}&includeRoadMetadata=true&includeNearestIntersection=true`;
  return fetch(query).then((res) => {
    const address = `${res.data.results[0].locations[0].street}, ${res.data.results[0].locations[0].adminArea5}, ${res.data.results[0].locations[0].adminArea3}`;
    return address;
  });
};
