import { CredencialesRequest } from '../dtos/CredencialesRequest';

import { API_BASE_URL } from '../constants/api';
const API_URL = API_BASE_URL + 'ApiSeguridad/api/user/login';

export async function loginCiudadano(credenciales: CredencialesRequest): Promise<string | null> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credenciales),
    });

    if (!response.ok) return null;

    let token = await response.text();
    token = token.replace(/"/g, ''); // Limpia comillas dobles si vienen

    return token;
  } catch (error) {
    return null;
  }
}
