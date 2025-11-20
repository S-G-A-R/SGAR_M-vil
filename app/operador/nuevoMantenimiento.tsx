import HeaderMenu from "@/components/HeaderMenu";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function NuevoMantenimiento() {
    const router = useRouter();

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipo, setTipo] = useState("");
    const [imagenes, setImagenes] = useState<string[]>([]);

    const seleccionarImagen = async () => {
        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
            allowsMultipleSelection: true,
        });

        if (!res.canceled) {
            const nuevas = res.assets.map((a) => a.uri);
            setImagenes([...imagenes, ...nuevas]);
        }
    };

    return (
        <View style={styles.screen}>
            {/* HEADER */}
            <HeaderMenu />

            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Nuevo Mantenimiento</Text>

                <Text style={styles.label}>Título del mantenimiento</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese el título"
                    value={titulo}
                    onChangeText={setTitulo}
                />

                <Text style={styles.label}>Descripción</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Ingrese la descripción"
                    multiline
                    value={descripcion}
                    onChangeText={setDescripcion}
                />

                <Text style={styles.label}>Tipo de situación</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese el tipo"
                    value={tipo}
                    onChangeText={setTipo}
                />

                <Text style={styles.label}>Adjuntar evidencias</Text>
                <TouchableOpacity style={styles.btnSecundario} onPress={seleccionarImagen}>
                    <Text style={styles.btnSecundarioText}>Adjuntar imágenes</Text>
                </TouchableOpacity>

                <View style={styles.imageContainer}>
                    {imagenes.map((img, index) => (
                        <Image key={index} source={{ uri: img }} style={styles.image} />
                    ))}
                </View>

                <TouchableOpacity style={styles.btnCrear}>
                    <Text style={styles.btnCrearText}>Crear</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnVolver}
                    onPress={() => router.push("/operador/menuOperador")}
                >
                    <Text style={styles.btnVolverText}>Volver al menú</Text>
                </TouchableOpacity>
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
        padding: 20,
        paddingTop: 80, // ← 🔥 Espacio para que NO choque con el Header
        paddingBottom: 40,
        backgroundColor: "#f3f4f6",
    },

    title: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 20,
        textAlign: "center",
        color: "#222",
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 6,
        color: "#333",
    },

    input: {
        backgroundColor: "white",
        padding: 14,
        borderRadius: 10,
        marginBottom: 16,
        fontSize: 16,
    },

    textArea: {
        height: 100,
    },

    btnSecundario: {
        backgroundColor: "#e5e7eb",
        padding: 14,
        borderRadius: 10,
        marginBottom: 16,
        alignItems: "center",
    },

    btnSecundarioText: {
        fontSize: 16,
        fontWeight: "600",
    },

    imageContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 20,
    },

    image: {
        width: 90,
        height: 90,
        borderRadius: 10,
    },

    btnCrear: {
        backgroundColor: "#2563eb",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 12,
    },

    btnCrearText: {
        color: "white",
        fontSize: 17,
        fontWeight: "700",
    },

    btnVolver: {
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#999",
        alignItems: "center",
        marginBottom: 40,
    },

    btnVolverText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
});
