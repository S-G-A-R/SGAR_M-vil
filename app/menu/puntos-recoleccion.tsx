import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderMenu from '@/components/HeaderMenu'; 
import { useNavigation } from '@react-navigation/native'; 

type RecoleccionPoint = {
    id: string;
    nombre: string;
    direccion: string;
    estado: 'Activo' | 'Inactivo';
    proximaRecoleccion: string;
    lat: number;
    lon: number;
};

//datos de prueba
const MOCK_POINTS: RecoleccionPoint[] = [
    { id: 'P001', nombre: 'Casa Principal', direccion: 'Calle Las Palmas, #123', estado: 'Activo', proximaRecoleccion: 'Hoy, 16:30 hrs', lat: 13.71, lon: -89.20, },
    { id: 'P002', nombre: 'Apartamento Playa', direccion: 'Av. El Sol, Lote 5', estado: 'Inactivo', proximaRecoleccion: 'Mañana, 08:00 hrs', lat: 13.50, lon: -89.45, },
    { id: 'P003', nombre: 'Centro Comercial', direccion: '25 Av. Norte, #345', estado: 'Activo', proximaRecoleccion: 'Miércoles, 14:00 hrs', lat: 13.70, lon: -89.19, },
    { id: 'P004', nombre: 'Bodega Industrial', direccion: 'Vía Panamericana, Km 10', estado: 'Activo', proximaRecoleccion: 'Viernes, 09:30 hrs', lat: 13.75, lon: -89.25, },
    { id: 'P005', nombre: 'Edificio Residencial', direccion: 'Calle El Mirador, #10', estado: 'Inactivo', proximaRecoleccion: 'Sábado, 11:00 hrs', lat: 13.68, lon: -89.22, },
];

const COLOR_NEGRO_PRINCIPAL = '#4b4b4b';
const COLOR_GRIS_FONDO = '#f4f4f4';
const COLOR_BLANCO = '#ffffff';
const COLOR_GRIS_CLARO = '#e0e0e0';
const COLOR_GRIS_BORDE = '#cccccc';
const COLOR_GRIS_TEXTO = '#333333';
const COLOR_AZUL_BOTON = '#007BFF'; 

export default function PuntosRecoleccionListScreen() {
    const navigation = useNavigation<any>(); 

    const handleSelectPoint = (point: RecoleccionPoint) => {
        navigation.navigate('menu/radar', { point }); 
    };

    const CustomListHeader = () => (
        <View style={styles.customHeaderBox}>
            <View style={styles.headerTitleContainer}>
                <Text style={styles.screenTitle}>Mis Puntos de Recolección</Text>
                <Text style={styles.screenSubtitle}>SGAR</Text>
            </View>
            <Image
                source={require("@/assets/images/ecoSgar.png")} 
                style={styles.headerLogo}
                resizeMode="contain"
            />
        </View>
    );

    const SearchAndFilterSection = () => (
        <View style={styles.searchContainer}>
            <View style={styles.searchInputRow}>
                <View style={styles.inputBox}>
                    <Text style={styles.inputPlaceholder}>Tipo de residuo</Text>
                </View>
                <TouchableOpacity style={styles.searchButton}>
                    <Ionicons name="search-outline" size={20} color={COLOR_BLANCO} />
                </TouchableOpacity>
            </View>

           
            <View style={styles.filterRow}>
                <TouchableOpacity style={[styles.filterButton, styles.buttonGreen]}>
                    <Text style={styles.filterTextGreen}>Ver Distancia</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.filterButton, styles.buttonYellow]}>
                    <Text style={styles.filterTextYellow}>Ver Horario</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderPointItem = ({ item }: { item: RecoleccionPoint }) => (
        <TouchableOpacity 
            style={styles.listItemRow} 
            onPress={() => handleSelectPoint(item)}
        >
            <Text style={styles.listItemTitle}>{item.nombre}</Text>
            
            <TouchableOpacity style={styles.mapButton}>
                <Text style={styles.mapButtonText}>Ver en mapa</Text>
                <Ionicons name="map-outline" size={16} color={COLOR_BLANCO} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.fullContainer}>
            <HeaderMenu />
            
            <CustomListHeader />
            
            <SearchAndFilterSection />

            
            <FlatList
                data={MOCK_POINTS}
                renderItem={renderPointItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<Text style={styles.emptyText}>No tienes puntos de recolección registrados.</Text>}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    fullContainer: { flex: 1, backgroundColor: COLOR_GRIS_FONDO },
    
    customHeaderBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLOR_NEGRO_PRINCIPAL,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    headerTitleContainer: {
        flexDirection: 'column',
    },
    screenTitle: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: COLOR_BLANCO, 
    },
    screenSubtitle: { 
        fontSize: 16, 
        fontWeight: '500', 
        color: COLOR_GRIS_CLARO, 
    },
    headerLogo: { 
        width: 40, 
        height: 40, 
        tintColor: COLOR_BLANCO, 
    },

    searchContainer: {
        backgroundColor: COLOR_BLANCO,
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLOR_GRIS_BORDE,
    },
    searchInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    inputBox: {
        flex: 1,
        backgroundColor: COLOR_GRIS_CLARO,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginRight: 10,
        height: 40, 
        justifyContent: 'center',
    },
    inputPlaceholder: {
        color: '#666',
        fontSize: 15,
    },
    searchButton: {
        backgroundColor: COLOR_NEGRO_PRINCIPAL,
        padding: 10,
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        borderWidth: 1,
        marginRight: 10,
    },
    buttonGreen: {
        borderColor: '#8BC34A', 
    },
    filterTextGreen: {
        color: '#8BC34A',
        fontWeight: 'bold',
    },
    buttonYellow: {
        borderColor: '#FFC107', 
    },
    filterTextYellow: {
        color: '#FFC107', 
        fontWeight: 'bold',
    },

    listContent: { 
        paddingHorizontal: 15, 
        paddingTop: 10 
    },
    listItemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLOR_BLANCO,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLOR_GRIS_CLARO,
    },
    listItemTitle: {
        fontSize: 16,
        color: COLOR_GRIS_TEXTO,
        fontWeight: '500',
        flex: 1,
    },
    mapButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR_AZUL_BOTON, 
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 5,
    },
    mapButtonText: {
        color: COLOR_BLANCO,
        fontSize: 13,
        marginRight: 5,
    },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#999', }
});