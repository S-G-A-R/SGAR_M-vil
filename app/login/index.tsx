import HeaderMenu from "@/components/HeaderMenu";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";

import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function IndexScreen() { 
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLoginOption = (rol: string) => {
    setMenuVisible(false);
    router.push(`/login/login?rol=${rol}`);
  };

  return (
    <ThemedView style={styles.container}>
      
      <ThemedView style={styles.header}>
        <Image
          source={require("@/assets/images/sgar.jpg")}
          style={styles.headerLogo} 
        />

        <View style={styles.dropdownContainer}>
          <Pressable onPress={() => setMenuVisible(!menuVisible)}>
            <ThemedText type="link" style={styles.dropdownTrigger}>
              Iniciar sesión ▾
            </ThemedText>
          </Pressable>

          {menuVisible && (
            <View style={styles.dropdownMenu}>
              {["Ciudadano", "Administrador", "Organizacion", "Asociado", "Operador"].map(
                (rol) => (
                  <Pressable
                    key={rol}
                    style={styles.dropdownItem}
                    onPress={() => handleLoginOption(rol.toLowerCase())}
                  >
                    <ThemedText style={styles.dropdownText}>{rol}</ThemedText>
                  </Pressable>
                )
              )}
            </View>
          )}
        </View>
      </ThemedView>

      
      <ThemedView style={styles.body}>
        <Image
          source={require("@/assets/images/sgar.jpeg")}
          style={styles.bodyLogo}
          contentFit="cover"
        />

        <Text style={styles.welcomeText}>¡Bienvenido a S.G.A.R!</Text>

        
        <Text style={styles.descriptionText}>
          Optimiza la gestión de residuos y aprende a reciclar con nuestro juego
          interactivo.
        </Text>

        <TouchableOpacity
          style={styles.aboutButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.aboutText}>Acerca de nosotros</Text>
        </TouchableOpacity>

        
        <TouchableOpacity
          style={[styles.aboutButton, styles.gameButton]} 
          onPress={() => router.push("/menu/menuCiudadano")}// Cambiar ruta al juego
        >
          <Text style={[styles.aboutText, styles.gameButtonText]}>
            ♻️ Jugar a Reciclar
          </Text>
        </TouchableOpacity>
      </ThemedView>

      
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>🌱 Sobre SGAR</Text>
            <Text style={styles.modalContent}>
              Sistema de Gestión de Aseo y Residuos. Sistema creado para
              optimizar los procesos de recolección de basura, limpieza y
              gestión de desechos en municipios y empresas de aseo.
            </Text>
          </View>
        </Pressable>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 30, 
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  headerLogo: { 
    width: 80,
    height: 40,
    resizeMode: "contain",
  },
  
  icon: {
    fontSize: 24,
    color: "#000",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  dropdownContainer: {
    position: "relative",
  },

  dropdownTrigger: {
    color: "#000",
    fontSize: 20,
  },
  dropdownMenu: {
    position: "absolute",
    top: 25,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    zIndex: 10,
    elevation: 3,
    minWidth: 160,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 15,
    color: "#333",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  bodyLogo: {
    width: 300,
    height: 200,
    marginBottom: 50,
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 5, // Menos espacio
  },
  descriptionText: { // <-- NUEVO ESTILO para descripción
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  aboutButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee'
  },
  aboutText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#67978d",
  },
  gameButton: { // <-- NUEVO ESTILO para botón de juego
    backgroundColor: "#2e7d32", // Verde reciclaje
    marginTop: 15,
  },
  gameButtonText: { // <-- NUEVO ESTILO para texto de juego
    color: "#fff",
    fontWeight: "600",
  },

  // ... (Estilos del Modal sin cambios)
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
    color: "#2e5d52",
  },
  modalContent: {
    fontSize: 20,
    textAlign: "center",
    color: "#444",
  },
  buttonWrapper: {}, // Estos estilos no se usaban
  button: {},
  buttonText: {},
});