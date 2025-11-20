import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const ORGS = [
  {
    id: 1,
    nombre: "Eco Punto San Miguel",
    horario: "Lun–Sab • 8:00 AM – 5:00 PM",
    tipos: ["Plástico", "Papel", "Vidrio"],
  },
  {
    id: 2,
    nombre: "ReciclaYa",
    horario: "Lun–Vier • 9:00 AM – 4:00 PM",
    tipos: ["Plástico", "Metal"],
  },
  {
    id: 3,
    nombre: "Centro Verde",
    horario: "Todos los días • 7:00 AM – 6:00 PM",
    tipos: ["Vidrio", "Orgánico", "Papel"],
  },
  {
    id: 4,
    nombre: "Planeta Limpio",
    horario: "Lun–Sab • 8:00 AM – 3:00 PM",
    tipos: ["Plástico", "Orgánico"],
  },
  {
    id: 5,
    nombre: "EcoVida Punto",
    horario: "Lun–Vier • 10:00 AM – 6:00 PM",
    tipos: ["Metal", "Vidrio"],
  }
];

export default function ListResiduo() {
  const params = useLocalSearchParams();
  const router = useRouter();

  // 🔥 Asegurar que siempre sea string
  const residuo = Array.isArray(params.residuo) ? params.residuo[0] : params.residuo;

  // 🔥 Filtrar correctamente
  const filtrados = ORGS.filter(org => org.tipos.includes(residuo));

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 50,     // 🔥 BAJA EL CONTENIDO
        alignItems: "center",
        paddingBottom: 30
      }}
      style={styles.container}
    >
      <View style={styles.card}>
        
        <Text style={styles.title}>
          Lugares que reciben: {residuo}
        </Text>

        {filtrados.length === 0 && (
          <Text style={styles.noData}>
            No se encontraron organizaciones para este tipo de residuo.
          </Text>
        )}

        {filtrados.map((org) => (
          <View key={org.id} style={styles.item}>
            <View>
              <Text style={styles.name}>{org.nombre}</Text>
              <Text style={styles.horario}>{org.horario}</Text>
            </View>

            {/* 🔥 Botón que lleva al detalle */}
            <TouchableOpacity
              style={styles.btnMas}
              onPress={() => router.push(`/barra/detalles?id=${org.id}`)}
            >
              <Text style={styles.mas}>+</Text>
            </TouchableOpacity>
          </View>
        ))}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",  
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  horario: {
    fontSize: 14,
    color: "#555",
  },
  btnMas: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
  },
  mas: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  noData: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
});
