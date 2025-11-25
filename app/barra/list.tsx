import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import organizacionesService from "@/services/organizacionesService";

type Organizacion = {
  id: number;
  nombreOrganizacion: string;
  telefono: string;
  email: string;
};

export default function ListOrganizaciones() {
  const [organizaciones, setOrganizaciones] = useState<Organizacion[]>([]);
  const router = useRouter();

  useEffect(() => {
    organizacionesService.obtenerOrganizaciones().then(setOrganizaciones);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Organizaciones
      </Text>

      {organizaciones.map((org) => (
        <TouchableOpacity
          key={org.id}
          style={{
            padding: 15,
            backgroundColor: "#eee",
            marginBottom: 10,
            borderRadius: 8,
          }}
          onPress={() => router.push(`/barra/detalles?id=${org.id}`)}
        >
          <Text style={{ fontSize: 18, fontWeight: "500" }}>
            {org.nombreOrganizacion}
          </Text>
          <Text style={{ color: "#555" }}>{org.email}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
