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
  };

  const tituloRol =
    rol === "ciudadano"
      ? "Inicio de Sesión - Ciudadano"
      : rol === "operador"
      ? "Inicio de Sesión - Operador"
      : rol === "asociado"
      ? "Inicio de Sesión - Asociado"
      : rol === "organización"
      ? "Inicio de Sesión - Organización"
      : "Inicio de Sesión";

  
  let labelUsuario = "DUI *";
  let placeholderUsuario = "Ingresa tu número de DUI";
  let keyboardTypeUsuario: KeyboardTypeOptions = "numeric";

  
  if (rol === "operador" || rol === "asociado" || rol === "organización") {
    labelUsuario = "Correo Electrónico *";
    placeholderUsuario = "Ingresa tu correo electrónico";
    keyboardTypeUsuario = "email-address";
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
              <Pressable onPress={() => router.push("/registro")}>
                <ThemedText type="link"> Crear Perfil Ciudadano</ThemedText>
              </Pressable>
            </View>
          )}

          {rol === "asociado" && (
            <View style={styles.registerContainer}>
              <ThemedText style={styles.smallText}>
                ¿No tienes una cuenta?
              </ThemedText>
              <Pressable onPress={() => router.push("/registro-asociado")}>
                <ThemedText type="link"> Crear Perfil Asociado</ThemedText>
              </Pressable>
            </View>
          )}

          {rol === "organización" && (
            <View style={styles.registerContainer}>
              <ThemedText style={styles.smallText}>
                ¿No tienes una cuenta?
              </ThemedText>
              <Pressable onPress={() => router.push("/registro-organizacion")}>
                <ThemedText type="link"> Crear Perfil Organización</ThemedText>
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
  header: {
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 15,
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