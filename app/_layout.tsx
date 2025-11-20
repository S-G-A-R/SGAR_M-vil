import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* //Carpeta login */}
        <Stack.Screen name="login/index" options={{ headerShown: false }} />
        <Stack.Screen name="login/login" options={{ headerShown: false }} />
        <Stack.Screen name="login/registro-asociado" options={{ headerShown: false }} />
        <Stack.Screen name="login/registro-organizacion" options={{ headerShown: false }} />
        <Stack.Screen name="login/registro" options={{ headerShown: false }} />
      
      {/* //Carpeta menu */}
        <Stack.Screen name="menu/menuCiudadano" options={{ headerShown: false }} />
        <Stack.Screen name="menu/formulario" options={{ headerShown: false }} />
        <Stack.Screen name="menu/asistente" options={{ headerShown: false }} />
        <Stack.Screen name="menu/ubicacion" options={{ headerShown: false }} />
        <Stack.Screen name="menu/horarios" options={{ headerShown: false }} />
        <Stack.Screen name="menu/puntos-recoleccion" options={{ headerShown: false }} />
        <Stack.Screen name="menu/radar" options={{ headerShown: false }} />
        <Stack.Screen name="menu/notificaciones" options={{ headerShown: false }} />
        <Stack.Screen name="menu/publicidadProducto" options={{ headerShown: false }} />
        <Stack.Screen name="menu/productoDetalle" options={{ headerShown: false }} />
        <Stack.Screen name="menu/perfil" options={{ headerShown: false }} />  

        {/* Carpeta operador */}
        <Stack.Screen name="operador/menuOperador" options={{ headerShown: false }} />
        <Stack.Screen name="operador/horariosYzonas" options={{ headerShown: false }} />
        <Stack.Screen name="operador/nuevoMantenimiento" options={{ headerShown: false }} />
        <Stack.Screen name="operador/ubicacionOperador" options={{ headerShown: false }} />

        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
