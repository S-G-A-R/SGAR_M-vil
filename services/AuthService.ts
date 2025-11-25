import { CredencialesRequest } from '../dtos/CredencialesRequest';

const API_URL = 'https://gatewaysgar.onrender.com/ApiSeguridad/api/user/login';

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
