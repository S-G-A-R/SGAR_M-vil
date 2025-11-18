import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import HeaderMenu from '@/components/HeaderMenu';

// Colores
const AZUL = "#2E86C1";
const VERDE = "#28B463";
const GRIS_FONDO = "#F4F6F7";
const NEGRO = "#2C3E50";
const BLANCO = "#FFFFFF";

const { width } = Dimensions.get("window");

export default function ProductoDetalleAsociado() {
    const route = useRoute<any>();
    const navigation = useNavigation();

    const params = route?.params ?? {};

    const productId = params.productId ?? "1";
    const productName = params.productName ?? "Producto sin nombre";

    // La imagen viene como require() desde el Index
    const image = params.image ?? require('@/assets/images/producto.jpg');

    const code = params.code ?? "SIN-CÓDIGO";

    // Datos simulados
    const detailData = {
        description: "Este es un producto de ejemplo. Aquí irá la descripción real cuando se conecte al backend.",
        price: 50.00,
        vendor: "Proveedor Genérico S.A.",
        stock: 25,
        category: "Limpieza"
    };

    const handleGoBack = () => navigation.goBack();

    const handleGoToEdit = () => {
        router.push({
            pathname: "/asociado/productoEditar",
            params: { id: productId }
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <HeaderMenu />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                <View style={styles.card}>

                    {/* Imagen */}
                    <View style={styles.imageContainer}>
                        <Image
                            source={image}
                            style={styles.productImage}
                            resizeMode="cover"
                        />
                    </View>

                    {/* Nombre */}
                    <Text style={styles.productName}>{productName}</Text>

                    {/* Código */}
                    <View style={styles.fieldBlock}>
                        <Text style={styles.label}>Código</Text>
                        <Text style={styles.text}>{code}</Text>
                    </View>

                    {/* Descripción */}
                    <View style={styles.fieldBlock}>
                        <Text style={styles.label}>Descripción</Text>
                        <Text style={styles.text}>{detailData.description}</Text>
                    </View>

                    {/* Proveedor */}
                    <View style={styles.fieldBlock}>
                        <Text style={styles.label}>Proveedor</Text>
                        <Text style={styles.text}>{detailData.vendor}</Text>
                    </View>

                    {/* Categoría */}
                    <View style={styles.fieldBlock}>
                        <Text style={styles.label}>Categoría</Text>
                        <Text style={styles.text}>{detailData.category}</Text>
                    </View>

                    {/* Stock */}
                    <View style={styles.fieldBlock}>
                        <Text style={styles.label}>Stock</Text>
                        <Text style={[styles.text, { color: detailData.stock > 0 ? VERDE : "red", fontWeight: "bold" }]}>
                            {detailData.stock} unidades
                        </Text>
                    </View>

                    {/* Precio */}
                    <View style={styles.priceBox}>
                        <Text style={styles.priceLabel}>Precio</Text>
                        <Text style={styles.priceValue}>${detailData.price.toFixed(2)}</Text>
                    </View>

                    {/* BOTONES */}
                    <View style={styles.buttonRow}>
                        
                        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                            <Ionicons name="arrow-back" size={22} color={NEGRO} />
                            <Text style={styles.backText}>Volver</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.editButton} onPress={handleGoToEdit}>
                            <MaterialCommunityIcons name="pencil-outline" size={22} color={BLANCO} />
                            <Text style={styles.editText}>Editar</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
}


// ----------------------------------------------------
// ESTILOS
// ----------------------------------------------------
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GRIS_FONDO
    },
    scrollContent: {
        padding: 20,
        alignItems: "center"
    },

    card: {
        width: "100%",
        backgroundColor: BLANCO,
        borderRadius: 16,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4
    },

    imageContainer: {
        width: "100%",
        height: width * 0.55,
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 20
    },
    productImage: {
        width: "100%",
        height: "100%"
    },

    productName: {
        fontSize: 26,
        fontWeight: "800",
        color: NEGRO,
        textAlign: "center",
        marginBottom: 20
    },

    fieldBlock: {
        marginBottom: 18
    },
    label: {
        fontSize: 13,
        fontWeight: "bold",
        color: AZUL,
        marginBottom: 4,
        textTransform: "uppercase"
    },
    text: {
        fontSize: 16,
        color: NEGRO
    },

    priceBox: {
        marginTop: 10,
        alignItems: "center"
    },
    priceLabel: {
        fontSize: 16,
        fontWeight: "600"
    },
    priceValue: {
        fontSize: 32,
        fontWeight: "900",
        color: VERDE,
        marginTop: 5
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        gap: 10
    },

    backButton: {
        flex: 1,
        backgroundColor: "#EAEDED",
        borderRadius: 10,
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D5D8DC"
    },
    backText: {
        marginLeft: 6,
        fontSize: 16,
        fontWeight: "600",
        color: NEGRO
    },

    editButton: {
        flex: 1,
        backgroundColor: AZUL,
        borderRadius: 10,
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    editText: {
        marginLeft: 6,
        fontSize: 16,
        fontWeight: "700",
        color: BLANCO
    }
});
