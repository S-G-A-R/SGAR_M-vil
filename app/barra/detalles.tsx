// app/barra/detalles.tsx
import organizacionesService from "@/services/organizacionesService";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function DetallesOrganizacion() {
  const { id } = useLocalSearchParams();
  const [org, setOrg] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const data = await organizacionesService.obtenerDetallesOrganizacion(
            Number(id)
          );
          setOrg(data);
        } catch (e) {
          console.log("Error cargando detalles", e);
        } finally {
          setCargando(false);
        }
      })();
    }
  }, [id]);

  if (cargando)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Cargando detalles...</Text>
      </View>
    );

  if (!org) return <Text>No se encontró la organización.</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          color: "#2c3e50",
          marginBottom: 10,
        }}
      >
        {org.nombreOrganizacion}
      </Text>

      {/* Info base */}
      <View
        style={{
          backgroundColor: "white",
          padding: 15,
          borderRadius: 12,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 2,
          marginBottom: 15,
        }}
      >
        <Text style={{ fontSize: 16 }}>
          📞 Teléfono: <Text style={{ fontWeight: "600" }}>{org.telefono}</Text>
        </Text>
        <Text style={{ fontSize: 16, marginTop: 6 }}>
          📧 Email: <Text style={{ fontWeight: "600" }}>{org.email}</Text>
        </Text>
      </View>

      {/* Ubicación */}
      {org.ubicacion && (
        <View
          style={{
            backgroundColor: "#ecf0f1",
            padding: 15,
            borderRadius: 12,
            marginBottom: 15,
          }}
        >
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            🗺 Ubicación
          </Text>
          <Text>Latitud: {org.ubicacion.latitud}</Text>
          <Text>Longitud: {org.ubicacion.longitud}</Text>
          <Text>
            Horario: {org.ubicacion.horaApertura} - {org.ubicacion.horaCierre}
          </Text>
        </View>
      )}

      {/* Tipos de residuo */}
      {org.tiposResiduo && (
        <View
          style={{
            backgroundColor: "#dfe6e9",
            padding: 15,
            borderRadius: 12,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", marginBottom: 6 }}>
            ♻ Tipos de residuo que maneja
          </Text>
          {org.tiposResiduo.map((t: any) => (
            <Text key={t.id}>• {t.nombre}</Text>
          ))}
        </View>
      )}
    </View>
  );
}
