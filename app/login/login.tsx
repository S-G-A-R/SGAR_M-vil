import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  KeyboardTypeOptions,
} from "react-native";
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const dynamicPadding = height * 0.16;


export default function LoginScreen() {
  const router = useRouter();
  const { rol } = useLocalSearchParams<{ rol?: string }>();

  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleLogin = () => {
    if (!usuario || !contrasena) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    alert(`Inicio de sesión como ${rol || "usuario"} correcto ✅`);

    // Redirección después del login
    setTimeout(() => {
      if (rol === "ciudadano") {
        router.push("/menu/menuCiudadano");
      } else if (rol === "operador") {
        router.push("/operador/menuOperador"); //cambiar ruta para operador
      } else if (rol === "asociado") {
        router.push("/asociado/menuAsociado"); //cambiar ruta para asociado
      } else if (rol === "organizacion") {
        router.push("/menu/menuCiudadano"); //cambiar ruta para organización
      } else if (rol === "administrador") {
        router.push("/menu/menuCiudadano"); //cambiar ruta para admin
      }
    }, 500);
  };

  const tituloRol =
    rol === "ciudadano"
      ? "Iniciar Sesión como Ciudadano"
      : rol === "operador"
      ? "Iniciar Sesión como Operador"
      : rol === "asociado"
      ? "Iniciar Sesión como Asociado"
      : rol === "organizacion"
      ? "Iniciar Sesión como Organizacion"
      : rol === "administrador"
      ? "Iniciar Sesión como Administrador"
      : "Iniciar Sesión";

  const labelUsuario = "Correo Electrónico *";
  const keyboardTypeUsuario: KeyboardTypeOptions = "email-address";
  
  let placeholderUsuario = "";
  if (rol === "ciudadano") {
    placeholderUsuario = "Ingrese su correo electrónico";
  } else {
    placeholderUsuario = "Ingrese su correo laboral";
  }
  
  return (
    <ThemedView style={styles.container}>
      <View style={styles.body}>
        <Image
          source={require("@/assets/images/sgar.jpeg")}
          style={styles.logo}
          contentFit="contain"
        />

        <ThemedText style={styles.title}>{tituloRol}</ThemedText>

        <View style={styles.form}>
          <ThemedText style={styles.label}>{labelUsuario}</ThemedText>
          <TextInput
            style={styles.input}
            placeholder={placeholderUsuario} 
            placeholderTextColor="#333"
            value={usuario}
            onChangeText={setUsuario}
            keyboardType={keyboardTypeUsuario}
            autoCapitalize="none"
          />

          <ThemedText style={styles.label}>Contraseña *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            placeholderTextColor="#333"
            secureTextEntry
            value={contrasena}
            onChangeText={setContrasena}
          />

          <Pressable style={styles.button} onPress={handleLogin}>
            <ThemedText style={styles.buttonText}>Aceptar</ThemedText>
          </Pressable>

          {rol === "ciudadano" && (
            <View style={styles.registerContainer}>
              <ThemedText style={styles.smallText}>
                ¿No tienes una cuenta?
              </ThemedText>
              <Pressable onPress={() => router.push("/login/registro")}>
                <ThemedText type="link"> Crear Perfil Ciudadano</ThemedText>
              </Pressable>
            </View>
          )}

          {rol === "asociado" && (
            <View style={styles.registerContainer}>
              <ThemedText style={styles.smallText}>
                ¿No tienes una cuenta?
              </ThemedText>
              <Pressable
                onPress={() => router.push("/login/registro-asociado")}
              >
                <ThemedText type="link"> Crear Perfil Asociado</ThemedText>
              </Pressable>
            </View>
          )}

          {rol === "organizacion" && (
            <View style={styles.registerContainer}>
              <ThemedText style={styles.smallText}>
                ¿No tienes una cuenta?
              </ThemedText>
              <Pressable
                onPress={() => router.push("/login/registro-organizacion")}
              >
                <ThemedText type="link"> Crear Perfil Organizacion</ThemedText>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
   
    
  },
  
  body: {
    flex: 1,
    justifyContent: "flex-start", 
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: dynamicPadding,
    
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 25,
    color: "#000",
  },
  form: {
    width: "100%",
    maxWidth: 380,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 5,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    fontSize: 15,
    color: "#000",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  registerContainer: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  smallText: {
    fontSize: 14,
    color: "#333",
  },
});