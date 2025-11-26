import { API_NAV } from "@/constants/api";
import { useNavigation } from '@react-navigation/native';
import * as Location from "expo-location";
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView, { Callout, Marker } from "react-native-maps";

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = Math.min(400, width - 40);
const CARD_HEIGHT = CARD_WIDTH * 1.25;

const COLOR_NEGRO_PRINCIPAL = '#4b4b4b';
const COLOR_GRIS_FONDO = '#f4f4f4';
const COLOR_BLANCO = '#ffffff';
const COLOR_GRIS_TARJETA = '#e0e0e0';
const COLOR_GRIS_MAPA = '#c4c4c4';
const COLOR_GRIS_TEXTO = '#333333';

interface LocationData {
  _id: string;
  location: {
    coordinates: [number, number];
    type: string;
  };
  descripcion: string;
  horaApertura: string;
  horaCierre: string;
}

export default function RadarCompactScreen() {
  const navigation = useNavigation<any>();
  const handleNavigateToList = () => navigation.navigate('menu/puntos-recoleccion');

  const [locations, setLocations] = useState<LocationData[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrganization, setSelectedOrganization] = useState<string | null>(null);

  const fetchLocations = async () => {
    try {
      const response = await fetch(`${API_NAV}/collection-locations/`);
      const data: LocationData[] = await response.json();
      setLocations(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const fetchUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      await fetchLocations();
      await fetchUserLocation();
      setLoading(false);
    };

    initialize();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      {selectedOrganization && (
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Organización: {selectedOrganization}</Text>
        </View>
      )}

      <View style={styles.mapWrapper}>
        {loading ? (
          <Text style={styles.loadingText}>Cargando mapa...</Text>
        ) : (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: userLocation?.latitude || 13.588273768651174,
              longitude: userLocation?.longitude || -89.2884625581808,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            {userLocation && (
              <Marker
                coordinate={userLocation}
                title="Tu ubicación"
                pinColor="blue"
              />
            )}

            {locations.map((location) => (
              <Marker
                key={location._id}
                coordinate={{
                  latitude: location.location.coordinates[1],
                  longitude: location.location.coordinates[0],
                }}
                title={location.descripcion}
                onPress={() => setSelectedOrganization(location.descripcion)}
              >
                <Callout>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutTitle}>{location.descripcion}</Text>
                    <Text style={styles.calloutText}>Horario: {location.horaApertura} - {location.horaCierre}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  labelContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  labelText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },

  mapWrapper: {
    flex: 1,
    margin: 20,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    elevation: 3,
    height: "70%", // Reduce el tamaño del mapa
  },

  map: {
    width: "100%",
    height: "100%",
  },

  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },

  calloutContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  calloutTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },

  calloutText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});