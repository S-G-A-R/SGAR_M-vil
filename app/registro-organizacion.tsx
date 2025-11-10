import { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Checkbox from "expo-checkbox"; 
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

export default function RegistroOrganizacionScreen() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");

  const [notifProximidad, setNotifProximidad] = useState(false);
  const [notifRuta, setNotifRuta] = useState(false);
  const [notifReal, setNotifReal] = useState(true);

  const handleRegister = () => {
 
    if (!nombre || !correo || !telefono || !password) {
      Alert.alert(
        "Campos incompletos",
        "Por favor, completa todos los campos obligatorios."
      );
      return;
    }

  
    console.log("Datos:", {
      nombre,
      correo,
      telefono,
      password,
      notificaciones: { notifProximidad, notifRuta, notifReal },
    });

    Alert.alert("Éxito", "Organización registrada correctamente.");
    router.push("/login?rol=organización");
  };

  const handleCancel = () => {
    router.back(); 
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedText style={styles.title}>Datos Organización</ThemedText>

        <View style={styles.form}>
          <ThemedText style={styles.label}>Nombre de organización: *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ej: EcoCentro"
            value={nombre}
            onChangeText={setNombre}
          />

          <ThemedText style={styles.label}>Correo Electrónico: *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="ejemplo@correo.com"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <ThemedText style={styles.label}>Teléfono: *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ej: 7000-0000"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
          />

          <ThemedText style={styles.label}>Password: *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <ThemedText style={styles.label}>Rol: *</ThemedText>
          <TextInput
            style={[styles.input, styles.disabledInput]} 
            value="Organización"
            editable={false} 
          />

          <ThemedText style={styles.label}>Tipos de notificación: *</ThemedText>
          <View style={styles.checkboxWrapper}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                style={styles.checkbox}
                value={notifProximidad}
                onValueChange={setNotifProximidad}
                color={notifProximidad ? "#007bff" : undefined}
              />
              <ThemedText style={styles.checkboxLabel}>
                Notificación por proximidad
              </ThemedText>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                style={styles.checkbox}
                value={notifRuta}
                onValueChange={setNotifRuta}
                color={notifRuta ? "#007bff" : undefined}
              />
              <ThemedText style={styles.checkboxLabel}>
                Notificación al iniciar ruta
              </ThemedText>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                style={styles.checkbox}
                value={notifReal}
                onValueChange={setNotifReal}
                color={notifReal ? "#007bff" : undefined}
              />
              <ThemedText style={styles.checkboxLabel}>
                Notificación seguimiento en tiempo real
              </ThemedText>
            </View>
          </View>

        
          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.button, styles.registerButton]}
              onPress={handleRegister}
            >
              <ThemedText style={styles.buttonText}>Registrarse</ThemedText>
            </Pressable>
            
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <ThemedText style={styles.buttonText}>Cancelar</ThemedText>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", 
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30, 
  },
  title: {
    fontSize: 22, 
    fontWeight: "bold",
    marginBottom: 25,
    color: "#000",
    textAlign: "center",
  },
  form: {
    width: "100%",
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
    backgroundColor: "#fff",
  },
  disabledInput: {
    backgroundColor: "#f0f0f0",
    color: "#888", 
  },
  checkboxWrapper: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 15,
    color: "#000",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between", 
    marginTop: 20,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    flex: 1, 
    marginHorizontal: 5, 
  },
  registerButton: {
    backgroundColor: "#007bff", 
  },
  cancelButton: {
    backgroundColor: "#dc3545", 
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});