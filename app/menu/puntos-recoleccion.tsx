import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderMenu from '@/components/HeaderMenu'; 
import { useNavigation } from '@react-navigation/native'; 

// --- DEFINICIONES DE TIPOS ---
type RecoleccionPoint = {
    id: string;
    nombre: string;
    direccion: string;
    estado: 'Activo' | 'Inactivo';
    proximaRecoleccion: string;
    lat: number;
    lon: number;
};

// --- SIMULACIÓN DE DATOS ---
const MOCK_POINTS: RecoleccionPoint[] = [
    {
        id: 'P001',
        nombre: 'Casa Principal',
        direccion: 'Calle Las Palmas, #123',
        estado: 'Activo',
        proximaRecoleccion: 'Hoy, 16:30 hrs',
        lat: 13.71,
        lon: -89.20,
    },
    {
        id: 'P002',
        nombre: 'Apartamento Playa',
        direccion: 'Av. El Sol, Lote 5',
        estado: 'Inactivo',
        proximaRecoleccion: 'Mañana, 08:00 hrs',
        lat: 13.50,
        lon: -89.45,
    },
];

// --- COMPONENTE PRINCIPAL ---

export default function PuntosRecoleccionListScreen() {
    const navigation = useNavigation<any>(); 

    const handleSelectPoint = (point: RecoleccionPoint) => {
        // 🚨 CRÍTICO: Navegamos DE VUELTA al radar (la pantalla principal)
        // y le pasamos los datos del punto seleccionado.
        navigation.navigate('radar', { point }); 
    };

    const renderPointItem = ({ item }: { item: RecoleccionPoint }) => (
        <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleSelectPoint(item)}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.nombre}</Text>
                <View style={[
                    styles.stateBadge, 
                    item.estado === 'Activo' ? styles.badgeActive : styles.badgeInactive
                ]}>
                    <Text style={styles.badgeText}>{item.estado}</Text>
                </View>
            </View>
            
            <View style={styles.cardBody}>
                <Ionicons name="location-outline" size={16} color="#555" />
                <Text style={styles.cardAddress}>{item.direccion}</Text>
            </View>

            <View style={styles.cardFooter}>
                <Ionicons name="calendar-outline" size={16} color="#007BFF" />
                <Text style={styles.cardSchedule}>Próxima recolección: **{item.proximaRecoleccion}**</Text>
            </View>
            
            <Ionicons name="chevron-forward-outline" size={24} color="#007BFF" style={styles.chevron} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.fullContainer}>
            <HeaderMenu />
            
            <View style={styles.header}>
                <Text style={styles.screenTitle}>Mis Puntos de Recolección</Text>
            </View>

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

// --- ESTILOS (Mantenidos) ---
const styles = StyleSheet.create({
    fullContainer: { flex: 1, backgroundColor: '#f4f4f4', },
    header: { padding: 15, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee', },
    screenTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', },
    listContent: { padding: 10, },
    card: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
        position: 'relative',
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, },
    cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', },
    cardBody: { flexDirection: 'row', alignItems: 'center', marginBottom: 5, },
    cardAddress: { marginLeft: 5, fontSize: 14, color: '#555', flex: 1, },
    cardFooter: { flexDirection: 'row', alignItems: 'center', marginTop: 5, },
    cardSchedule: { marginLeft: 5, fontSize: 14, color: '#007BFF', fontWeight: '600', },
    stateBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 15, },
    badgeActive: { backgroundColor: '#D4EDDA', },
    badgeInactive: { backgroundColor: '#F8D7DA', },
    badgeText: { fontSize: 12, fontWeight: 'bold', color: '#333', },
    chevron: { position: 'absolute', right: 15, top: '50%', marginTop: -12, },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#999', }
});