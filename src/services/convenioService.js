import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const fetchConvenios = async () => {
  const response = await axios.get(`${BASE_URL}/convenios`);
  return response.data;
};

export const fetchCantidadConvenios = async () => {
  const response = await axios.get(`${BASE_URL}/cantidad`);
  return response.data[0]["COUNT(*)"];
};

export const buscarConvenios = async (criterio) => {
  const response = await axios.get(`${BASE_URL}/busqueda`, {
    params: { busqueda: criterio },
  });
  return response.data;
};
export default {
  fetchConvenios,
  fetchCantidadConvenios,
  buscarConvenios,
};
