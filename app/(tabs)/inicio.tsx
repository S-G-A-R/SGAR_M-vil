import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";

import { Pressable, StyleSheet, View } from "react-native";

export default function InicioScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLoginOption = (rol: string) => {
    setMenuVisible(false);
    router.push(`/login?rol=${rol}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <Pressable>
          <ThemedText style={styles.icon}>☰</ThemedText>
        </Pressable>

        <ThemedText style={styles.headerTitle}>S.G.A.R</ThemedText>

        <View style={styles.dropdownContainer}>
          <Pressable onPress={() => setMenuVisible(!menuVisible)}>
            <ThemedText type="link" style={styles.dropdownTrigger}>
              Iniciar sesión ▾
            </ThemedText>
          </Pressable>

          {menuVisible && (
            <View style={styles.dropdownMenu}>
              {["Ciudadano", "Operador", "Asociado", "Organización"].map(
                (rol) => (
                  <Pressable
                    key={rol}
                    style={styles.dropdownItem}
                    onPress={() => handleLoginOption(rol.toLowerCase())}
                  >
                    <ThemedText style={styles.dropdownText}>{rol}</ThemedText>
                  </Pressable>
                )
              )}
            </View>
          )}
        </View>
      </ThemedView>

      <ThemedView style={styles.body}>
        <Image
          source={require("@/assets/images/sgar.jpeg")}
          style={styles.bodyLogo}
          contentFit="cover"
        />

        <Pressable style={styles.buttonWrapper}>
          <ThemedView style={styles.button}>
            <ThemedText style={styles.buttonText}>Bienvenidos</ThemedText>
          </ThemedView>
        </Pressable>

        <Pressable style={styles.buttonWrapper}>
          <ThemedView style={styles.button}>
            <ThemedText style={styles.buttonText}>
              Acerca de nosotros
            </ThemedText>
          </ThemedView>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  icon: {
    fontSize: 24,
    color: "#000",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  dropdownContainer: {
    position: "relative",
  },

  dropdownTrigger: {
    color: "#007bff",
    fontSize: 16,
  },
  dropdownMenu: {
    position: "absolute",
    top: 25,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    zIndex: 10,
    elevation: 3,
    minWidth: 160,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 15,
    color: "#333",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  bodyLogo: {
    width: 200,
    height: 200,
    marginBottom: 40,
    borderRadius: 10,
  },
  buttonWrapper: {
    width: "90%",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
});
