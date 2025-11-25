import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { loginCiudadano } from '../services/AuthService';

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string) {
    setError(null);
    const result = await loginCiudadano({ email, password });
    if (result) {
      setToken(result);
      await SecureStore.setItemAsync('token', result);
    } else {
      setError('Credenciales inválidas');
    }
  }

  async function logout() {
    setToken(null);
    await SecureStore.deleteItemAsync('token');
  }

  return { token, error, login, logout };
}
