import HeaderMenu from "@/components/HeaderMenu";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width, height } = Dimensions.get("window");


export default function MenuCiudadanoScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <HeaderMenu />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Menú Ciudadano</Text>

        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/menu/horarios")}
          >
            <MaterialIcons name="calendar-today" size={36} color="#000" />
            <Text style={styles.cardText}>Horarios y zonas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/barra/list")} 
          >
            <Ionicons name="notifications" size={34} color="#000" />
            <Text style={styles.cardText}>Notificaciones</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/menu/ubicacion")}
          >
            <MaterialCommunityIcons name="map-marker" size={34} color="#000" />
            <Text style={styles.cardText}>Ubicaciones</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/menu/horarios")} //Cambiar la ruta
          >
            <MaterialIcons name="videogame-asset" size={34} color="#000" />
            <Text style={styles.cardText}>SGAR Game</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/menu/publicidadProducto")} 
          >
            <MaterialCommunityIcons
              name="shopping-outline"
              size={36}
              color="#000"
            />
            <Text style={styles.cardText}>Espacio Publicitario</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/menu/formulario")} 
          >
            <MaterialCommunityIcons name="page-next" size={34} color="#000" />
            <Text style={styles.cardText}>Formularios</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/menu/radar")} 
          >
            <MaterialCommunityIcons
              name="map-marker-radius"
              size={34}
              color="#000"
            />
            <Text style={styles.cardText}>Radar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/menu/asistente")} 
          >
            <TouchableOpacity
              style={{ padding: 10, backgroundColor: "#eee", borderRadius: 10 }}
            >
              <Text style={{ fontSize: 32 }}>🦝</Text>
            </TouchableOpacity>
            <Text style={styles.cardText}>Asistente EcoSGAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 30,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 30,
    color: "#333",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
    paddingHorizontal: 10,
  },
  card: {
    width: width * 0.42,   // 42% del ancho de pantalla
    height: height * 0.17, // 17% de la altura de pantalla
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  cardText: {
    marginTop: 8,
    fontSize: 17,
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: 5,
  },

});