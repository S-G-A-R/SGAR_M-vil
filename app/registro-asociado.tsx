import { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  Platform, 
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker"; 

export default function RegistroAsociadoScreen() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [dui, setDui] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [foto, setFoto] = useState<string | null>(null); 
  const pickImage = async () => {
    
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permiso denegado",
        "Necesitas dar permiso para acceder a tus fotos."
      );
      return;
    }

    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], 
      quality: 0.5, 
      
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri); 
    }
  };
  
  const handleRegister = () => {
    if (
      !nombre ||
      !apellido ||
      !correo ||
      !telefono ||
      !dui ||
      !password ||
      !confirmar
    ) {
      Alert.alert(
        "Campos incompletos",
        "Por favor, completa todos los campos obligatorios (*)."
      );
      return;
    }

    if (password !== confirmar) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    console.log("Datos Asociado:", {
      nombre,
      apellido,
      correo,
      telefono,
      dui,
      password,
      foto, 
    });

    Alert.alert("Éxito", "Asociado registrado correctamente.");
    router.push("/login?rol=asociado");
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
        <Image
          source={require("@/assets/images/sgar.jpeg")}
          style={styles.logo}
          contentFit="contain"
        />
        <ThemedText style={styles.title}>Crear Perfil Asociado</ThemedText>

        <View style={styles.form}>
          <ThemedText style={styles.label}>Nombre *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu nombre"
            value={nombre}
            onChangeText={setNombre}
          />

          <ThemedText style={styles.label}>Apellido *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu apellido"
            value={apellido}
            onChangeText={setApellido}
          />

          <ThemedText style={styles.label}>Correo Electrónico *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="ejemplo@correo.com"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <ThemedText style={styles.label}>Teléfono *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ej: 7000-0000"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
            maxLength={9}
          />

          <ThemedText style={styles.label}>DUI *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ej: 00000000-0"
            value={dui}
            onChangeText={setDui}
            keyboardType="numeric"
            maxLength={10}
          />
          
        
          <ThemedText style={styles.label}>Foto de Perfil (Opcional)</ThemedText>
          
         
          {foto && (
            <Image source={{ uri: foto }} style={styles.previewImage} />
          )}

          <Pressable
            style={[styles.button, styles.imageButton]}
            onPress={pickImage}
          >
            <ThemedText style={styles.buttonText}>
              {foto ? "Cambiar Foto" : "Seleccionar Foto"}
            </ThemedText>
          </Pressable>
         


          <ThemedText style={styles.label}>Contraseña *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Crea una contraseña segura"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />

          <ThemedText style={styles.label}>Confirmar Contraseña *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Repite la contraseña"
            value={confirmar}
            onChangeText={setConfirmar}
            secureTextEntry
          />

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
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 100,
    marginBottom: 10,
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
    maxWidth: 400,
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
  
  imageButton: {
    backgroundColor: "#5bc0de", 
    marginBottom: 20, 
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 60, 
    alignSelf: "center",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#ccc",
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
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});