const API_ADDRESS = process.env.REACT_APP_API_ADDR;

export const getAllData = async  () => {
  const res = await fetch(`${API_ADDRESS}/data`);
  const json = await res.json();
  return json;
}

export const getAircraftData = async (callsign) => {
  const res = await fetch(`${API_ADDRESS}/data/${callsign}`);
  const json = await res.json();
  return json;
}

export const getFIRData = async () => {
  let res = await fetch(
    "https://v4p4sz5ijk.execute-api.us-east-1.amazonaws.com/anbdata/airspaces/zones/fir-list?api_key=04775150-c03c-11e9-ba38-ab1794fa7a73&format=json"
  );
  const json = await res.json();
  return json;
}