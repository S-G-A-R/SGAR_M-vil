import HeaderMenu from "@/components/HeaderMenu";
import * as Location from "expo-location";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function UbicacionOperador() {
  const { width, height } = useWindowDimensions();
  const isSmall = height < 650; 
  const isTablet = width > 800; 

  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [watcher, setWatcher] = useState<Location.LocationSubscription | null>(null);

  const activarUbicacion = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permiso de ubicación denegado");
      return;
    }

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 2000,
        distanceInterval: 1,
      },
      (loc) => setLocation(loc.coords)
    );

    setWatcher(subscription);
  };

  const detenerUbicacion = () => {
    watcher?.remove();
    setWatcher(null);
    setLocation(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
      
      {/* ⭐ TU HEADER AQUÍ ⭐ */}
      <HeaderMenu />

      <View
        style={[
          styles.container,
          {
            paddingHorizontal: isTablet ? 40 : 16,
            paddingTop: isSmall ? 10 : 20,
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              fontSize: isTablet ? 30 : 22,
              marginBottom: isSmall ? 10 : 16,
            },
          ]}
        >
          Ubicación en tiempo real
        </Text>

        {!watcher ? (
          <TouchableOpacity
            style={[
              styles.button,
              { padding: isSmall ? 10 : 14, borderRadius: isTablet ? 20 : 14 },
            ]}
            onPress={activarUbicacion}
          >
            <Text style={[styles.buttonText, { fontSize: isTablet ? 20 : 16 }]}>
              Activar ubicación
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.button,
              styles.stopButton,
              { padding: isSmall ? 10 : 14, borderRadius: isTablet ? 20 : 14 },
            ]}
            onPress={detenerUbicacion}
          >
            <Text style={[styles.buttonText, { fontSize: isTablet ? 20 : 16 }]}>
              Dejar de compartir
            </Text>
          </TouchableOpacity>
        )}

        <View
          style={[
            styles.mapContainer,
            {
              height: isTablet ? height * 0.55 : height * 0.45,
              borderRadius: isTablet ? 20 : 16,
            },
          ]}
        >
          {location ? (
            <MapView
              style={styles.map}
              region={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker coordinate={location} title="Mi ubicación" />
            </MapView>
          ) : (
            <View style={styles.noLocation}>
              <Text style={{ color: "#555", fontSize: isTablet ? 20 : 15 }}>
                Ubicación no activada
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#2563eb",
    alignItems: "center",
    marginBottom: 12,
  },
  stopButton: {
    backgroundColor: "#dc2626",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  mapContainer: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#e5e7eb",
  },
  map: {
    flex: 1,
  },
  noLocation: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
