import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
} from "react-native";
import HeaderMenu from "@/components/HeaderMenu";

const { width } = Dimensions.get("window");

type DiaSemana =
    | "Lunes"
    | "Martes"
    | "Miércoles"
    | "Jueves"
    | "Viernes"
    | "Sábado"
    | "Domingo";

const dias: DiaSemana[] = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
];

const horariosPorZona: Record<string, Record<DiaSemana, string>> = {
    "Villa Lourdes": {
        Lunes: "08:00 AM - 10:00 AM",
        Martes: "08:00 AM - 10:00 AM",
        Miércoles: "09:00 AM - 10:30 AM",
        Jueves: "07:00 AM - 09:00 AM",
        Viernes: "07:30 AM - 09:30 AM",
        Sábado: "No disponible",
        Domingo: "No disponible",
    },
    "Campos Verdes": {
        Lunes: "09:00 AM - 11:00 AM",
        Martes: "09:00 AM - 11:00 AM",
        Miércoles: "10:00 AM - 12:00 PM",
        Jueves: "07:30 AM - 09:30 AM",
        Viernes: "08:00 AM - 10:00 AM",
        Sábado: "No disponible",
        Domingo: "No disponible",
    },
};

export default function HorariosZonas() {
    const [zonaSeleccionada, setZonaSeleccionada] = useState("Villa Lourdes");
    const [diaSeleccionado, setDiaSeleccionado] = useState<DiaSemana>("Lunes");

    return (
        <View style={styles.screen}>
            <HeaderMenu />

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Horarios y Zonas</Text>

                {/* Botones de zonas */}
                <View style={styles.zonaContainer}>
                    {Object.keys(horariosPorZona).map((zona) => (
                        <TouchableOpacity
                            key={zona}
                            style={[
                                styles.zonaButton,
                                zonaSeleccionada === zona && styles.zonaButtonActive,
                            ]}
                            onPress={() => setZonaSeleccionada(zona)}
                        >
                            <Text
                                style={[
                                    styles.zonaText,
                                    zonaSeleccionada === zona && styles.zonaTextActive,
                                ]}
                            >
                                {zona}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Calendario */}
                <View style={styles.calendar}>
                    {dias.map((dia, index) => (
                        <TouchableOpacity
                            key={dia}
                            style={[
                                styles.dayButton,
                                diaSeleccionado === dia && styles.dayButtonActive,
                            ]}
                            onPress={() => setDiaSeleccionado(dia)}
                        >
                            <Text
                                style={[
                                    styles.dayText,
                                    diaSeleccionado === dia && styles.dayTextActive,
                                ]}
                            >
                                {dia}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Resultado */}
                <View style={styles.resultCard}>
                    <Text style={styles.resultTitle}>
                        Horario para {diaSeleccionado} en {zonaSeleccionada}
                    </Text>

                    <Text style={styles.resultTime}>
                        {horariosPorZona[zonaSeleccionada][diaSeleccionado]}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#f3f4f6",
    },

    container: {
        paddingHorizontal: width * 0.05,
        paddingVertical: 20,
    },

    title: {
        fontSize: width * 0.07,
        fontWeight: "700",
        marginBottom: 20,
        color: "#1f2937",
        textAlign: "center",
    },

    // --- Zonas ---
    zonaContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    zonaButton: {
        flexBasis: "48%",
        paddingVertical: 14,
        backgroundColor: "#e5e7eb",
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 12,
    },

    zonaButtonActive: {
        backgroundColor: "#2563eb",
    },

    zonaText: {
        fontSize: width * 0.045,
        fontWeight: "600",
        color: "#374151",
        textAlign: "center",
    },

    zonaTextActive: {
        color: "#fff",
        fontWeight: "700",
    },

    // --- Calendario ---
    calendar: {
        marginBottom: 20,
    },

    dayButton: {
        padding: 14,
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: 10,
    },

    dayButtonActive: {
        backgroundColor: "#2563eb",
    },

    dayText: {
        fontSize: width * 0.045,
        color: "#374151",
        fontWeight: "500",
    },

    dayTextActive: {
        color: "white",
        fontWeight: "700",
    },

    // --- Resultado ---
    resultCard: {
        marginTop: 20,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },

    resultTitle: {
        fontSize: width * 0.045,
        fontWeight: "700",
        marginBottom: 8,
        textAlign: "center",
    },

    resultTime: {
        fontSize: width * 0.06,
        fontWeight: "700",
        color: "#2563eb",
        textAlign: "center",
    },
});
