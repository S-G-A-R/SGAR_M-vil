import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import HeaderMenu from "@/components/HeaderMenu"; // <<----- IMPORTA AQUÍ

export default function Perfil() {
  const router = useRouter();

  const user = {
    nombre: "Ejemplo Usuario",
    email: "usuario@ejemplo.com",
    rol: "Ciudadano",
    foto: null,
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* 🔹 HEADER MENU */}
      <HeaderMenu />

      {/* 🔹 CONTENIDO DE PERFIL */}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileSection}>
          <Image
            source={
              user.foto
                ? { uri: user.foto }
                : require("@/assets/images/userIcon.jpg")
            }
            style={styles.profileImage}
          />

          <Text style={styles.name}>{user.nombre}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.role}>{user.rol}</Text>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>Editar perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 120, // 🔥 Espacio para que NO se meta debajo del header
    paddingHorizontal: 25,
    paddingBottom: 40,
  },

  profileSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  role: {
    marginTop: 5,
    fontSize: 14,
    color: "#888",
  },

  editButton: {
    backgroundColor: "#c4c0c0",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  editText: {
    fontWeight: "600",
    color: "#000",
    fontSize: 16,
  },

  logoutButton: {
    backgroundColor: "#f8d7da",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    fontWeight: "700",
    color: "#d9534f",
    fontSize: 16,
  },
});
