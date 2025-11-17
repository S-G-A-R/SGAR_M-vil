import { Ionicons } from "@expo/vector-icons";
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
import { useRouter, Href } from "expo-router";

const { height, width } = Dimensions.get("window");

export default function HeaderMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-200))[0];
  const router = useRouter(); 

  const toggleMenu = () => {
    const toValue = isMenuOpen ? -200 : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
    setIsMenuOpen(!isMenuOpen);
  };

    const handleNavigate = (path: Href) => { 
      toggleMenu();
      router.push(path); 
    };

  const handleLogout = () => {
    toggleMenu(); 
    // Aquí ira el token de sesión
    router.replace("/menu/menuCiudadano"); 
  };

  return (
    <View style={{ zIndex: 100 }}>
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

        <TouchableOpacity style={styles.loginButton}>
          <Ionicons name="person-circle-outline" size={28} color="#000" />
          <Text style={styles.loginText}>Usuario</Text>
        </TouchableOpacity>
      </View>

      {isMenuOpen && (
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      
      <Animated.View
        style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}
      >
        <Text style={styles.menuTitle}>Menú</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleNavigate("/menu/menuCiudadano")} 
        >
          <Text style={styles.menuText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, ]}
          onPress={() => {
            toggleMenu();
            router.replace("/menu/perfil");
          }}
        >
        
          <Text style={styles.menuText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleLogout} 
        >
          <Text style={styles.menuText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingTop: 30,
    paddingBottom: 12,
    backgroundColor: "white",
    zIndex: 102,
  },
  menuButton: { padding: 5 },
  logo: {
    width: 60,
    height: 30,
    resizeMode: "contain",
  },
  loginButton: { flexDirection: "row", alignItems: "center" },
  loginText: {
    fontSize: 17,
    color: "#00050aff",
    marginLeft: 4,
    fontWeight: "500",
  },

  sideMenu: {
    position: "absolute",
    top: 60,
    left: 0,
    width: 180,
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
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
  menuTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 15,
    color: "#00050aff",
  },
  menuItem: { paddingVertical: 10, paddingHorizontal: 15 },
  menuText: { fontSize: 15, color: "#333" },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});