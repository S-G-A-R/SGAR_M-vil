import organizacionesService from "@/services/organizacionesService";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

type Organizacion = {
  id: number;
  nombreOrganizacion: string;
  telefono: string;
  email: string;
};

export default function ListOrganizaciones() {
  const [organizaciones, setOrganizaciones] = useState<Organizacion[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { residuo } = useLocalSearchParams();
  const tipo = Array.isArray(residuo) ? residuo[0] : residuo;

  
  const mapaTipos: any = {
    plastico: 7,
    vidrio: 4,
    papel: 3,
    organico: 1,
    metal: 5,
    electro: 6,
  };

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);

      try {
        let data = [];

        if (tipo) {
          const idTipo = mapaTipos[tipo.toLowerCase()];
          if (idTipo) {
            let idsOrganizaciones: number[] = [];
            idsOrganizaciones = await organizacionesService.obtenerOrganizacionesPorTipo(idTipo);
            for (const orgId of idsOrganizaciones) {
              const orgDetalles = await organizacionesService.obtenerDetallesOrganizacion(orgId);
              data.push(orgDetalles);
            }
          }
        } else {
          data = await organizacionesService.obtenerOrganizaciones();
        }

        setOrganizaciones(data);
      } catch (error) {
        console.error("Error cargando organizaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [tipo]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={{ marginTop: 10, color: "#555" }}>
          Cargando organizaciones...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 15,
          color: "#2E7D32",
        }}
      >
        {tipo ? `Organizaciones (${tipo})` : "Organizaciones"}
      </Text>

      {organizaciones.length === 0 ? (
        <Text style={{ color: "#777", fontSize: 16 }}>
          No hay organizaciones disponibles.
        </Text>
      ) : (
        organizaciones.map((org) => (
          <TouchableOpacity
            key={org.id}
            style={{
              backgroundColor: "#F1F8E9",
              padding: 18,
              marginBottom: 12,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#C5E1A5",
            }}
            onPress={() => router.push(`/barra/detalles?id=${org.id}`)}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#33691E" }}>
              {org.nombreOrganizacion}
            </Text>
            <Text style={{ color: "#558B2F", marginTop: 4 }}>{org.email}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}
