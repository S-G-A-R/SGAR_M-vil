const API = "https://sgar-api-java.onrender.com/api";

const organizacionesService = {
  // Obtener todos los tipos de residuo
  async obtenerTiposResiduo() {
    const res = await fetch(`${API}/tipo-basura`);
    return await res.json();
  },

  // Obtener organizaciones por tipo de residuo
  async obtenerOrganizacionesPorTipo(idTipo: number) {
    const res = await fetch(`${API}/organizacion-tipo-basura/orgs/${idTipo}`);
    return await res.json();
  },

  // Obtener todas las organizaciones
  async obtenerOrganizaciones() {
    const res = await fetch(`${API}/organizacion`);
    return await res.json();
  },

  // Obtener detalles de una organización
  async obtenerDetallesOrganizacion(id: string) {
    const orgRes = await fetch(`${API}/organizacion/${id}`);
    const orgData = await orgRes.json();

    let ubicacion = null;
    try {
      const ubicRes = await fetch(`${API}/ubicacion/center/${id}`);
      ubicacion = await ubicRes.json();
    } catch (e) {
      console.warn("No se pudo obtener la ubicación:", e);
    }

    return { ...orgData, ubicacion };
  }
};

export default organizacionesService;
