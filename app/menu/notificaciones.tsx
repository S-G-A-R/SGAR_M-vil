import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderMenu from '@/components/HeaderMenu'; 
import { useNavigation } from '@react-navigation/native'; 

const COLOR_NEGRO_PRINCIPAL = '#4b4b4b';
const COLOR_GRIS_FONDO = '#f4f4f4';
const COLOR_BLANCO = '#ffffff';
const COLOR_GRIS_TEXTO = '#333333';
const COLOR_AZUL_BOTON = COLOR_NEGRO_PRINCIPAL; 

export default function NotificationCiudadanoScreen() {
    const navigation = useNavigation<any>(); 
      const handleViewOnMap = () => {
        console.log('Navegando a la pantalla de ubicación (Mapa)...');
        navigation.navigate('menu/ubicacion');
    };
    return (
        <SafeAreaView style={styles.fullContainer}>
            <HeaderMenu /> 

            <View style={styles.pageContent}>
                
               
                <Image
                    source={require("@/assets/images/ecoSgar.png")} 
                    style={styles.mainLogo}
                    resizeMode="contain"
                />

   
                <Text style={styles.mainTitle}>EcoSGAR</Text>
                <Text style={styles.mainSubtitle}>Assistant</Text>

               
                <View style={styles.notificationCard}>
                    
                   
                    <View style={styles.cardContent}>
                        <Image
                            source={require("@/assets/images/ecoSgar.png")} 
                            style={styles.cardLogo}
                            resizeMode="contain"
                        />
                        <Text style={styles.cardText}>
                            <Text style={styles.highlightText}>¡Hoy hay recolección de plástico en tu zona!</Text>
                        </Text>
                    </View>

            
                    <View style={styles.detailRow}>
                        <Ionicons name="time-outline" size={20} color={COLOR_GRIS_TEXTO} />
                        <Text style={styles.detailText}>De 8 AM a 12 PM</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Ionicons name="location-outline" size={20} color={COLOR_GRIS_TEXTO} />
                        <Text style={styles.detailText}>Punto: Parque Central</Text>
                    </View>
                </View>

                
                <TouchableOpacity style={styles.mapButton} onPress={handleViewOnMap}>
                    <Text style={styles.mapButtonText}>Ver en mapa</Text>
                    <Ionicons name="arrow-forward" size={20} color={COLOR_BLANCO} style={styles.mapButtonIcon} />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    fullContainer: { 
        flex: 1, 
        backgroundColor: COLOR_GRIS_FONDO, 
    },
    pageContent: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50, 
    },

    mainLogo: {
        width: 80,
        height: 80,
        marginBottom: 5,
        tintColor: COLOR_NEGRO_PRINCIPAL,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLOR_NEGRO_PRINCIPAL,
    },
    mainSubtitle: {
        fontSize: 20,
        color: COLOR_GRIS_TEXTO,
        marginBottom: 40,
    },

    notificationCard: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: COLOR_BLANCO,
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 30,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLOR_GRIS_FONDO,
        paddingBottom: 15,
        width: '100%',
        justifyContent: 'center',
    },
    cardLogo: {
        width: 30,
        height: 30,
        marginRight: 10,
        tintColor: COLOR_NEGRO_PRINCIPAL,
    },
    cardText: {
        fontSize: 16,
        color: COLOR_GRIS_TEXTO,
    },
    highlightText: {
        fontWeight: 'bold',
    },
    
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 8,
    },
    detailText: {
        fontSize: 16,
        color: COLOR_GRIS_TEXTO,
        marginLeft: 10,
    },

   
    mapButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR_AZUL_BOTON,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    mapButtonText: {
        color: COLOR_BLANCO,
        fontSize: 18,
        fontWeight: '600',
        marginRight: 10,
    },
    mapButtonIcon: {
       
    }
});