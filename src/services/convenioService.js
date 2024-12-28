import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const fetchConvenios = async () => {
  const response = await axios.get(`${BASE_URL}/convenios`);
  return response.data;
};

export const fetchConvenioId = async (id) => {
  try{
    const response = await axios.get(`${BASE_URL}/convenios/${id}`);
    const convenio = response.data[0];
    return convenio?.descripcion || 'no encontrado';
  } catch(error){
    throw new Error('No se pudo obtener la descripcion');
  }
};

export const fetchCantidadConvenios = async () => {
  const response = await axios.get(`${BASE_URL}/cantidad`);
  return response.data[0]["COUNT(*)"];
};

export const getConvenioPDF = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/convenios/${id}`);
    
    const convenio = response.data[0];
    //console.log(convenio?.pdf+" holaa");
    return convenio?.pdf || 'PDF no encontrado';
    
  } catch (error) {
    console.error('Error al obtener el PDF:', error);
    throw new Error('No se pudo obtener el PDF');
  }
};

export const buscarConvenios = async (criterio) => {
  const response = await axios.get(`${BASE_URL}/busqueda`, {
    params: { busqueda: criterio },
  });
  return response.data;
};
export default {
  fetchConvenios,
  fetchConvenioId,
  fetchCantidadConvenios,
  buscarConvenios,
  getConvenioPDF
};
