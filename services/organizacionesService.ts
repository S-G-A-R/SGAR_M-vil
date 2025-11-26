import { API_BASE_URL } from "@/constants/api";

const API_SEG = `${API_BASE_URL}ApiSeguridad/api`;
const API_NAV = `${API_BASE_URL}ApiNavegacion`;
const API_ADMI = `${API_BASE_URL}ApiAdmi/api`;

const organizacionesService = {
  // Api admin - tipos de residuo
  async obtenerTiposResiduo() {
    const res = await fetch(`${API_ADMI}/tipo-basura`);
    return await res.json();
  },
  // Api organizacion - organizaciones por tipo de residuo
  async obtenerOrganizacionesPorTipo(idTipo: number) {
    const res = await fetch(
      `${API_ADMI}/organizacion-tipo-basura/orgs/${idTipo}`
    );
  
    return await res.json();
  },

  // Api seguridad - todas las organizaciones
  async obtenerOrganizaciones() {
    const res = await fetch(`${API_SEG}/organization`);
    return await res.json();
  },

   // Api seguridad - detalles de una organizacion
  async obtenerDetallesOrganizacion(id: number) {
    //Datos base (Seguridad)
    const orgRes = await fetch(`${API_SEG}/organization/${id}`);
    const orgData = await orgRes.json();

    //Ubicación (Navegación)
    let ubicacion = null;
    try {
      const ubicRes = await fetch(
        `${API_NAV}/collection-centers/${id}`
      );
      ubicacion = await ubicRes.json();
    } catch (error) {
      console.warn("No se pudo obtener la ubicación:", error);
    }

    return {
      ...orgData,
      ubicacion,
    };
  },
};

export default organizacionesService;
