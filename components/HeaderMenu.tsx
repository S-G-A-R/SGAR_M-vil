import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { height, width } = Dimensions.get("window");

// 🔹 función para tamaños proporcionales pero iguales visualmente
const wp = (v) => (width * v) / 100;

export default function HeaderMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 🔹 menú ahora se adapta a todos los teléfonos
  const menuWidth = wp(70);

  const slideAnim = useState(new Animated.Value(-menuWidth))[0];
  const router = useRouter();

  const toggleMenu = () => {
    Animated.timing(slideAnim, {
      toValue: isMenuOpen ? -menuWidth : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View style={{ zIndex: 100 }}>
      {/* Header */}
      <View style={styles.topBar}>
        <View style={styles.leftSection}>
          <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
            <Ionicons name="menu" size={28} color="#000" />
          </TouchableOpacity>

          <Image
            source={require("@/assets/images/sgar.jpg")}
            style={styles.logo}
          />
        </View>

        <TouchableOpacity style={styles.profileButton}>
          <Image
            source={require("@/assets/images/userIcon.jpg")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Overlay */}
      {isMenuOpen && (
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      {/* Menú lateral */}
      <Animated.View
        style={[
          styles.sideMenu,
          {
            width: menuWidth,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <View style={styles.profileContainer}>
          <Image
            source={require("@/assets/images/userIcon.jpg")}
            style={styles.menuProfileImage}
          />
          <Text style={styles.userName}>Usuario Ciudadano</Text>
          <Text style={styles.userEmail}>usuario@email.com</Text>
        </View>

        <TouchableOpacity
          style={[styles.menuItem, styles.buttonStyled]}
          onPress={() => {
            toggleMenu();
            router.replace("/menu/menuCiudadano");
          }}
        >
          <Ionicons name="home-outline" size={18} color="#333" style={{ marginRight: 6 }} />
          <Text style={styles.buttonText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, styles.buttonStyled]}
          onPress={() => {
            toggleMenu();
            router.replace("/menu/perfil");
          }}
        >
          <Ionicons name="person" size={18} color="#333" style={{ marginRight: 6 }} />
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>

        {/* Cerrar Sesión fijo abajo */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              toggleMenu();
              router.replace("/login");
            }}
          >
            <Ionicons name="log-out-outline" size={20} color="#d9534f" />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 50,
    backgroundColor: "#c4c0c0ff",
    zIndex: 102,
  },

  menuButton: { padding: 5 },

  logo: {
    width: wp(30),
    height: wp(9),
    borderRadius: 10,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  profileButton: {
    borderRadius: 50,
    overflow: "hidden",
  },
  profileImage: {
    width: wp(10),
    height: wp(10),
    borderRadius: 50,
  },

  sideMenu: {
    position: "absolute",
    top: 100,
    left: 0,
    height: height - 100,
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 103,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: "rgba(0,0,0,0.25)",
    zIndex: 101,
  },

  profileContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  menuProfileImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
  },
  userEmail: {
    fontSize: 13,
    color: "#666",
  },

  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 15,
    color: "#333",
  },

  logoutContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    width: "98%",
    paddingHorizontal: 20,
  },
  logoutButton: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f8d7da",
    borderRadius: 10,
  },
  logoutText: {
    color: "#d9534f",
    fontWeight: "700",
    marginLeft: 10,
  },
  buttonStyled: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#bfbfbf",
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 15,
    color: "#333",
    fontWeight: "600",
  },

});