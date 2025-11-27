import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { API_NAV } from "@/constants/api";
import { Picker } from "@react-native-picker/picker";


interface Location {
  _id: string;
  location: {
    coordinates: [number, number];
    type: string;
  };
  descripcion: string;
  horaApertura: string;
  horaCierre: string;
}

export default function IndexScreen() {
  const router = useRouter();

  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedResiduo, setSelectedResiduo] = useState("");
  const [pickerVisible, setPickerVisible] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLoginOption = (rol: string) => {
    setMenuVisible(false);
    router.push(`/login/login?rol=${rol}`);
  };

  // -------------------- BUSCADOR -----------------------
  const handleSearch = () => {
    if (selectedOption === "TIPO_DE_RESIDUO" && selectedResiduo) {
      router.push(`/barra/list?residuo=${selectedResiduo}`);
    } else if (selectedOption === "MAPA" && searchText) {
      router.push(`/barra/mapa?busqueda=${searchText}`);
    } else if (selectedOption === "TODO") {
      router.push(`/barra/list?busqueda=${searchText}`);
    } else {
      alert(
        "Por favor seleccione un filtro o escriba algo en la barra de búsqueda."
      );
    }
  };
  // -------------------------------------------------------

  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch(`${API_NAV}/collection-locations/`);
        const data: Location[] = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLocations();
  }, []);

  return (
    <ScrollView style={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        {/* -------------------- HEADER -------------------- */}
        <ThemedView style={styles.header}>
          <Image
            source={require("@/assets/images/sgarlogo.jpg")}
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
                {["Ciudadano", "Asociado", "Operador"].map((rol) => (
                  <Pressable
                    key={rol}
                    style={styles.dropdownItem}
                    onPress={() => handleLoginOption(rol.toLowerCase())}
                  >
                    <ThemedText style={styles.dropdownText}>{rol}</ThemedText>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </ThemedView>

        {/* --------------------- BODY ---------------------- */}
        <ThemedView style={styles.body}>
          <Image
            source={require("@/assets/images/sgar.jpeg")}
            style={styles.bodyLogo}
            contentFit="cover"
          />

          <Text style={styles.welcomeText}>¡Bienvenido a S.G.A.R!</Text>

          <Text style={styles.descriptionText}>
            Optimiza la gestión de residuos y aprende a reciclar con nuestro
            juego interactivo.
          </Text>

          <TouchableOpacity
            style={styles.aboutButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.aboutText}>Acerca de nosotros</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.aboutButton, styles.gameButton]}
            onPress={() => router.push("/login/reciclarScreen")}
          >
            <Text style={[styles.aboutText, styles.gameButtonText]}>
              ♻️ Jugar a Reciclar
            </Text>
          </TouchableOpacity>

          {/* --------------------- BUSCADOR ---------------------- */}
          <View style={styles.searchRow}>
            <Text style={styles.searchInput}>Consulta ambiental</Text>

            <TouchableOpacity
              style={styles.searchIconButton}
              onPress={handleSearch}
            >
              <Text style={styles.searchIconText}>🔍</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.optionBox}
              onPress={() => {
                setSelectedOption("TODO");
                setPickerVisible(false);
              }}
            >
              <Text style={styles.optionText}>TODO</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionBox}
              onPress={() => {
                setSelectedOption("MAPA");
                setPickerVisible(false);
              }}
            >
              <Text style={styles.optionText}>MAPA</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionBox}
              onPress={() => {
                setSelectedOption("TIPO_DE_RESIDUO");
                setPickerVisible(!pickerVisible);
              }}
            >
              <Text style={styles.optionText}>TIPO DE RESIDUO</Text>
            </TouchableOpacity>
          </View>

          {pickerVisible && (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedResiduo}
                onValueChange={(itemValue) => setSelectedResiduo(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Seleccionar tipo de residuo" value="" />
                <Picker.Item label="Plástico" value="plastico" />
                <Picker.Item label="Vidrio" value="vidrio" />
                <Picker.Item label="Papel y cartón" value="papel" />
                <Picker.Item label="Orgánico" value="organico" />
                <Picker.Item label="Metales" value="metal" />
                <Picker.Item label="Electrónicos" value="electro" />
              </Picker>
            </View>
          )}
        </ThemedView>

        {/* ------------------------ MODAL ------------------------- */}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

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

  headerLogo: { width: 80, height: 40, resizeMode: "contain" },

  dropdownContainer: { position: "relative" },

  dropdownTrigger: { color: "#000", fontSize: 20 },

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
    minWidth: 180,
  },

  dropdownItem: { paddingVertical: 10, paddingHorizontal: 16 },

  dropdownText: { fontSize: 15, color: "#333" },

  body: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
  },

  bodyLogo: {
    width: 300,
    height: 200,
    marginTop: 35,
    marginBottom: 20,
    borderRadius: 10,
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 5,
  },

  descriptionText: {
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
    borderColor: "#eee",
    marginBottom: 10,
  },

  aboutText: { fontSize: 16, fontWeight: "500", color: "#67978d" },

  gameButton: { backgroundColor: "#2e7d32", marginBottom: 20 },

  gameButtonText: { color: "#fff", fontWeight: "600" },

  searchRow: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },

  searchInput: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    color: "#555",
  },

  searchIconButton: {
    marginLeft: 10,
    backgroundColor: "#2e7d32",
    padding: 10,
    borderRadius: 8,
  },

  searchIconText: { color: "#fff", fontSize: 20 },

  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 5,
  },

  optionBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    elevation: 2,
  },

  optionText: {
    textAlign: "center",
    fontSize: 14,
    color: "#444",
    fontWeight: "600",
  },

  pickerContainer: {
    width: "100%",
    marginTop: 10,
    borderRadius: 8,
    overflow: "hidden",
  },

  picker: { backgroundColor: "#fff" },

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

  modalContent: { fontSize: 20, textAlign: "center", color: "#444" },


  //esto era del diseño del mapa lo dejo por si acaso xd
  mapSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },

  mapTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },

  mapContainer: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },

  map: {
    width: "100%",
    height: 300,
  },

  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },

  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
