import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import organizacionesService from "@/services/organizacionesService";

export default function DetallesOrganizacion() {
  const { id } = useLocalSearchParams();
  const [org, setOrg] = useState<any>(null);

  useEffect(() => {
    if (id) {
      organizacionesService
        .obtenerDetallesOrganizacion(String(id))
        .then(setOrg);
    }
  }, [id]);

  if (!org) return <Text>Cargando...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        {org.nombreOrganizacion}
      </Text>
      <Text style={{ marginTop: 10 }}>Teléfono: {org.telefono}</Text>
      <Text>Email: {org.email}</Text>

      {org.ubicacion && (
        <>
          <Text style={{ marginTop: 20, fontWeight: "bold" }}>Ubicación</Text>
          <Text>Latitud: {org.ubicacion.latitud}</Text>
          <Text>Longitud: {org.ubicacion.longitud}</Text>
          <Text>
            Horario: {org.ubicacion.horaApertura} - {org.ubicacion.horaCierre}
          </Text>
        </>
      )}

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>
        Tipos de residuo
      </Text>

      {org.tiposResiduo?.map((t: any) => (
        <Text key={t.id}>• {t.nombre}</Text>
      ))}
    </View>
  );
}
