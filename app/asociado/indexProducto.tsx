import React, { useState } from 'react';
import { 
    View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, 
    FlatList, Alert, TextInput 
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import HeaderMenu from '@/components/HeaderMenu';

const COLOR_NEGRO = '#2c3e50';
const COLOR_GRIS = '#7f8c8d';
const COLOR_BLANCO = '#fff';
const COLOR_AZUL = '#3498db';
const COLOR_ROJO = '#e74c3c';

export default function IndexProducto() {
    const [search, setSearch] = useState('');

    const [products, setProducts] = useState([
        { id: '1', name: 'Producto1', code: 'PRD001', img: require('@/assets/images/producto.jpg') },
        { id: '2', name: 'Producto2', code: 'PRD002', img: require('@/assets/images/producto.jpg') },
        { id: '3', name: 'Producto3', code: 'PRD003', img: require('@/assets/images/producto.jpg') },
    ]);

    const handleDelete = (id: string) => {
        Alert.alert(
            'Eliminar producto',
            'El registro será eliminado. ¿Deseas continuar?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Eliminar', 
                    style: 'destructive',
                    onPress: () => setProducts(prev => prev.filter(p => p.id !== id))
                }
            ]
        );
    };

    const filteredProducts = products.filter(
        p => p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            <HeaderMenu />
            <View style={styles.searchContainer}>
                <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Buscar producto..."
                    style={styles.searchInput}
                    placeholderTextColor="#999"
                />
            </View>

            <View style={styles.buttonsRow}>
                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Buscar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.createButton}
                    onPress={() => router.push("/asociado/productoCrear")}
                >
                    <Text style={styles.createButtonText}>Crear Producto</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Gestión de Productos</Text>

            <FlatList
                data={filteredProducts}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingBottom: 40 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={item.img} style={styles.image} />

                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.code}>Código: {item.code}</Text>
                        </View>

                        <View style={styles.actions}>
                            {/* VER */}
                            <TouchableOpacity
                                onPress={() =>
                                    router.push({
                                        pathname: "/asociado/productoDetalle",
                                        params: {
                                            productId: item.id,
                                            productName: item.name,
                                            image: item.img
                                        }
                                    })
                                }
                            >
                                <Ionicons name="document-text-outline" size={28} color={COLOR_NEGRO} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    router.push({
                                        pathname: "/asociado/productoEditar",
                                        params: { productId: item.id, image: item.img, productName: item.name }
                                    })
                                }
                            >
                                <Ionicons name="create-outline" size={28} color={COLOR_AZUL} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                <Ionicons name="trash-outline" size={28} color={COLOR_ROJO} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },

    searchContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },

    searchInput: {
        backgroundColor: COLOR_BLANCO,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 15,
        height: 48,
        fontSize: 16,
    },

    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
    },

    searchButton: {
        backgroundColor: COLOR_AZUL,
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        marginRight: 8,
        alignItems: 'center',
    },

    searchButtonText: { color: COLOR_BLANCO, fontWeight: 'bold', fontSize: 15 },

    createButton: {
        backgroundColor: '#2ecc71',
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        marginLeft: 8,
        alignItems: 'center',
    },

    createButtonText: { color: COLOR_BLANCO, fontWeight: 'bold', fontSize: 15 },

    title: {
        marginTop: 20,
        marginLeft: 22,
        fontSize: 20,
        fontWeight: '700',
        color: COLOR_NEGRO,
    },

    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR_BLANCO,
        borderRadius: 12,
        padding: 14,
        marginHorizontal: 20,
        marginTop: 12,

        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 5,
        elevation: 4,
    },

    image: { width: 70, height: 70, borderRadius: 10 },

    info: { flex: 1, marginLeft: 14 },
    name: { fontSize: 17, fontWeight: '700', color: COLOR_NEGRO },
    code: { fontSize: 14, color: COLOR_GRIS, marginTop: 2 },

    actions: {
        flexDirection: 'row',
        width: 110,
        justifyContent: 'space-between',
    },
});
