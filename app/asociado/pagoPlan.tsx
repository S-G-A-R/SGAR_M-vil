import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import HeaderMenu from '@/components/HeaderMenu';


const COLOR_GRIS_FONDO = '#f9f9f9';
const COLOR_BLANCO = '#ffffff';
const COLOR_NEGRO_PRINCIPAL = '#2c3e50';
const COLOR_GRIS_TEXTO = '#7f8c8d';
const COLOR_BORDE_WIRE = '#95a5a6';

const { width } = Dimensions.get('window');

export default function PagoPlan() {
    const router = useRouter();
    const params = useLocalSearchParams();
    
    // Recuperar datos o usar valores por defecto
    const title = typeof params.title === 'string' ? params.title : 'Plan Seleccionado';
    const price = typeof params.price === 'string' ? params.price : '$0.00';
    const duration = typeof params.duration === 'string' ? params.duration : 'N/A';

    const handlePayment = () => {
        Alert.alert('Procesando Pago', `Iniciando pago para: ${title}`);
        // Lógica de pago real iría aquí
    };

    return (
        <SafeAreaView style={styles.fullContainer}>
            <HeaderMenu />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.pageContent}>
                    <View style={styles.mainLayout}>
                        
                        <View style={styles.leftColumn}>
                            <View style={styles.wireframeCard}>
                                <Text style={styles.cardTitle}>Resumen de Compra</Text>

                                <View style={styles.tableContainer}>
                                    <View style={styles.tableHeader}>
                                        <Text style={styles.tableHeadText}>Tipo de Plan</Text>
                                        <View style={styles.verticalLine} />
                                        <Text style={styles.tableHeadText}>Precio</Text>
                                    </View>
                                    <View style={styles.horizontalLine} />
                                    
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableCell}>{duration}</Text>
                                        <Text style={styles.tableCell}>{price}</Text>
                                    </View>

                                    <View style={styles.totalRow}>
                                        <Text style={styles.totalLabel}>Total:</Text>
                                        <Text style={styles.totalValue}>{price}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.rightColumn}>
                            
                            <View style={[styles.wireframeCard, { marginBottom: 20 }]}>
                                <Text style={styles.cardTitle}>Información de Pago</Text>

                                <Text style={styles.label}>Número de Tarjeta</Text>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="0000 0000 0000 0000" 
                                    keyboardType="numeric"
                                    placeholderTextColor="#bdc3c7"
                                />

                                <View style={styles.rowInputs}>
                                    <View style={{ flex: 1, marginRight: 10 }}>
                                        <Text style={styles.label}>Fecha de caducidad (MM/AA)</Text>
                                        <TextInput style={styles.input} placeholder="MM/AA" placeholderTextColor="#bdc3c7" />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.label}>Código de seguridad</Text>
                                        <TextInput style={styles.input} placeholder="CVC" keyboardType="numeric" maxLength={4} placeholderTextColor="#bdc3c7" />
                                    </View>
                                </View>

                                <Text style={styles.label}>País</Text>
                                <View style={styles.dropdownFake}>
                                    <Text style={{color: '#333'}}>El Salvador</Text>
                                    <Text style={{color: '#333'}}>▼</Text>
                                </View>
                            </View>

                            <View style={styles.wireframeCard}>
                                <Text style={styles.cardTitle}>Opcional</Text>
                                <Text style={styles.subTitle}>Guardar mi información para un pago más rápido</Text>

                                <TextInput style={styles.input} placeholder="Correo Electrónico" keyboardType="email-address" placeholderTextColor="#bdc3c7" />
                                <TextInput style={styles.input} placeholder="Número de teléfono" keyboardType="phone-pad" placeholderTextColor="#bdc3c7" />
                                <TextInput style={styles.input} placeholder="Nombre y Apellido" placeholderTextColor="#bdc3c7" />

                                <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
                                    <Text style={styles.payButtonText}>Pagar Ahora</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: COLOR_GRIS_FONDO,
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },
    pageContent: {
        width: '100%',
        maxWidth: 1000, 
        paddingHorizontal: 20,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    backButton: {
        padding: 5,
    },
    backArrowIcon: {
        fontSize: 30,
        color: '#3498db', 
        fontWeight: 'bold',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userText: {
        textAlign: 'right',
        marginRight: 10,
        fontSize: 12,
        color: COLOR_NEGRO_PRINCIPAL,
        fontWeight: '600',
    },
    userAvatarIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#555',
        borderRadius: 20, 
    },
    mainLayout: {
        flexDirection: width < 768 ? 'column' : 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    leftColumn: {
        width: width < 768 ? '100%' : '35%',
        marginBottom: 20,
    },
    rightColumn: {
        width: width < 768 ? '100%' : '62%',
    },
    wireframeCard: {
        backgroundColor: COLOR_BLANCO,
        borderRadius: 25,
        borderWidth: 1.5,
        borderColor: COLOR_BORDE_WIRE,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLOR_NEGRO_PRINCIPAL,
        marginBottom: 15,
    },
    subTitle: {
        fontSize: 12,
        color: COLOR_GRIS_TEXTO,
        marginBottom: 15,
    },
    tableContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 5,
    },
    tableHeadText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    verticalLine: {
        width: 1.5,
        backgroundColor: '#333',
        height: '100%',
        marginHorizontal: 5,
    },
    horizontalLine: {
        height: 1.5,
        backgroundColor: '#333',
        width: '90%',
        marginBottom: 15,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginBottom: 40,
    },
    tableCell: {
        fontSize: 14,
        color: '#333',
    },
    totalRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 16,
        marginRight: 10,
        color: '#333',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    label: {
        fontSize: 13,
        color: '#333',
        marginBottom: 5,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#bdc3c7',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        fontSize: 14,
        backgroundColor: '#fff',
    },
    rowInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dropdownFake: {
        borderWidth: 1,
        borderColor: '#bdc3c7',
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fdfdfd', 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    payButton: {
        backgroundColor: '#636e72', 
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 30,
        alignSelf: 'flex-end', 
        marginTop: 10,
    },
    payButtonText: {
        color: COLOR_BLANCO,
        fontWeight: 'bold',
        fontSize: 16,
    },
});