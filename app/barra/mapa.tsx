import { API_NAV } from "@/constants/api";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

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

export default function MapaScreen() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando ubicaciones...</Text>
      </View>
    );
  }

  return (
    <MapView style={styles.map} initialRegion={{
      latitude: 13.588273768651174,
      longitude: -89.2884625581808,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    }}>
      {locations.map((location) => (
        <Marker
          key={location._id}
          coordinate={{
            latitude: location.location.coordinates[1],
            longitude: location.location.coordinates[0],
          }}
          title={location.descripcion}
        >
          <Callout>
            <View>
              <Text>Descripción: {location.descripcion}</Text>
              <Text>Horario: {location.horaApertura} - {location.horaCierre}</Text>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
