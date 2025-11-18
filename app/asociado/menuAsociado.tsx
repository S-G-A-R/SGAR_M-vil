import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import HeaderMenu from '@/components/HeaderMenu'; 
import { useRouter } from 'expo-router';

const { width } = Dimensions.get("window"); 

const COLOR_GRIS_FONDO = '#f9f9f9';
const COLOR_BLANCO = '#ffffff';
const COLOR_NEGRO_PRINCIPAL = '#2c3e50'; 
const COLOR_ICONOS = COLOR_NEGRO_PRINCIPAL;
const COLOR_BORDE = '#ecf0f1'; 


export default function AsociadosMenu() {
    const router = useRouter(); 

    return (
        <SafeAreaView style={styles.fullContainer}>
            <HeaderMenu/> 
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.menuTitle}>Menú de Asociados</Text>
                <View style={styles.gridContainer}>
                    
                    <TouchableOpacity 
                        style={styles.card} 
                        onPress={() => router.push("/asociado/comprarPlan")}>
                        <Ionicons name="folder-outline" size={48} color={COLOR_ICONOS} />
                        <Text style={styles.cardText}>Comprar Plan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.card} 
                        onPress={() => router.push("/asociado/indexProducto")}>
                        <Ionicons name="add-circle-outline" size={48} color={COLOR_ICONOS} />
                        <Text style={styles.cardText}>Registrar Producto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.card} 
                        onPress={() => router.push("/asociado/comprarPlan")}>
                        <Ionicons name="business-outline" size={48} color={COLOR_ICONOS} />
                        <Text style={styles.cardText}>Registrar Empresas</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    fullContainer: { 
        flex: 1, 
        backgroundColor: COLOR_BLANCO, 
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center', 
        paddingVertical: 20,
        backgroundColor: COLOR_GRIS_FONDO, 
    },
    menuTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLOR_NEGRO_PRINCIPAL,
        marginBottom: 20,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center', 
        paddingHorizontal: 10,
        maxWidth: 600, 
    },
    card: {
        width: width * 0.45 > 180 ? 180 : width * 0.45, 
        height: width * 0.45 > 180 ? 160 : width * 0.45 * 0.88, 
        backgroundColor: COLOR_BLANCO,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8, 
        padding: 10,
        
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: COLOR_BORDE,
    },
    cardText: {
        marginTop: 10,
        fontSize: 15, 
        color: COLOR_NEGRO_PRINCIPAL,
        fontWeight: '600',
        textAlign: 'center',
        paddingHorizontal: 5,
    },
});