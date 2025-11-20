import HeaderMenu from "@/components/HeaderMenu";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MenuOperador() {
    return (
        <View style={styles.container}>
            
            {/* HEADER */}
            <HeaderMenu />

            {/* CONTENIDO CENTRADO */}
            <View style={styles.content}>
                <View style={styles.cardsContainer}>
                    
                    <Text style={styles.title}>Menú del Operador</Text>

                    {/* Ubicación */}
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => router.push("/operador/ubicacionOperador")}
                    >
                        <Ionicons name="location-outline" size={40} />
                        <View>
                            <Text style={styles.cardTitle}>Ubicación</Text>
                            <Text style={styles.cardSubtitle}>Administrar puntos GPS</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Horarios y Zonas */}
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => router.push("/operador/horariosYzonas")}
                    >
                        <Ionicons name="time-outline" size={40} />
                        <View>
                            <Text style={styles.cardTitle}>Horarios y Zonas</Text>
                            <Text style={styles.cardSubtitle}>Configurar disponibilidad</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f4f6",
    },

    // 🔥 Espacio dinámico para el HeaderMenu
    content: {
        flex: 1,
        paddingTop: 70, // ← AJUSTA según la altura de tu header
        justifyContent: "flex-start",
        alignItems: "center",
    },

    cardsContainer: {
        width: "55%",
        alignItems: "center",
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#222",
    },

    card: {
        width: "100%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
        marginBottom: 18,
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
    },

    cardSubtitle: {
        color: "#555",
        textAlign: "center",
    },
});