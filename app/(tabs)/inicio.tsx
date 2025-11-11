import HeaderMenu from "@/components/HeaderMenu";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";

import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function InicioScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLoginOption = (rol: string) => {
    setMenuVisible(false);
    router.push(`/login?rol=${rol}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>

        <Image
          source={require('@/assets/images/sgar.jpg')}
          style={styles.logo}
        />

        <View style={styles.dropdownContainer}>
          <Pressable onPress={() => setMenuVisible(!menuVisible)}>
            <ThemedText type="link" style={styles.dropdownTrigger}>
              Iniciar sesión ▾
            </ThemedText>
          </Pressable>

          {menuVisible && (
            <View style={styles.dropdownMenu}>
              {["Ciudadano", "Operador", "Asociado", "Organización"].map(
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

        <TouchableOpacity
          style={styles.aboutButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.aboutText}>Acerca de nosotros</Text>
        </TouchableOpacity>
      </ThemedView>

      {/* Modal "Acerca de nosotros" */}
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
    paddingTop: 50,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
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
    fontSize: 16,
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
    width: 200,
    height: 200,
    marginBottom: 40,
    borderRadius: 10,
  },
  buttonWrapper: {
    width: "90%",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#2e5d52',
  },
  modalContent: {
    fontSize: 15,
    textAlign: 'center',
    color: '#444',
  },
  aboutButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 3,
  },
  aboutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#67978d',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 25,
  },
});
