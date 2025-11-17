import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ImageSourcePropType, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, RouteProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import HeaderMenu from '@/components/HeaderMenu'; 


interface ProductDetails {
    description: string;
    price: number;
    vendor: string;
}
interface MockDetailMap { [key: string]: ProductDetails; }
interface DetailRouteParams {
    productId: string;
    productName: string;
    imageUrl: ImageSourcePropType;
}
type DetailRouteProp = RouteProp<ParamListBase, 'productoDetalle'> & {
    params: DetailRouteParams;
};

const COLOR_NEGRO_PRINCIPAL = '#2c3e50';
const COLOR_GRIS_FONDO = '#f9f9f9';
const COLOR_BLANCO = '#ffffff';
const COLOR_GRIS_TEXTO_SECUNDARIO = '#7f8c8d';
const COLOR_ACCENT = '#3498db'; 
const COLOR_ACCENT_DARK = '#2980b9'; 

// Datos de ejemplo 
const mockDetail: MockDetailMap = {
    '1': { description: 'Cepillo de dientes con mango de bambú 100% biodegradable, ideal para el medio ambiente.', price: 50.00, vendor: 'EcoLife S.A.' },
    '2': { description: 'Detergente concentrado, libre de fosfatos y amigable con el agua, perfecto para ropa delicada.', price: 75.50, vendor: 'CleanStream' },
    '3': { description: 'Guantes de limpieza hechos con material 70% reciclado, cómodos y duraderos.', price: 40.00, vendor: 'ReCicla Corp.' },
    '4': { description: 'Desinfectante con aroma floral natural, elimina 99.9% de gérmenes sin químicos agresivos.', price: 60.00, vendor: 'FloresBio' },
    '5': { description: 'Esponja de limpieza de fibra natural, altamente absorbente y compostable.', price: 20.00, vendor: 'NatureClean' },
};

export default function ProductoDetalle() {
    const route = useRoute<DetailRouteProp>();
    const navigation = useNavigation();
    
    const { productId, productName, imageUrl } = route.params;
    const detailData = mockDetail[productId];

    const product = { 
        description: detailData?.description || 'Detalle no disponible.',
        price: detailData?.price || 0,
        vendor: detailData?.vendor || 'N/A',
        imageUrl: imageUrl,
    };
    
    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.fullContainer}>
            <Stack.Screen 
                options={{ headerShown: false }}
            />
            <HeaderMenu /> 
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.pageContent}>
                    
        
                    <View style={styles.cardContainer}>
                        
                    
                        <Text style={styles.productTitle}>{productName}</Text>

                        <View style={styles.detailContainer}>
                            
                            <View style={styles.imageWrapper}>
                                <View style={styles.imageBox}>
                                    <Image 
                                        source={product.imageUrl as ImageSourcePropType} 
                                        style={styles.productImage} 
                                        resizeMode="cover"
                                    />
                                </View>
                            </View>

                        
                            <View style={styles.infoBox}>
                                
                                <View style={styles.infoItem}>
                                    <Text style={styles.detailLabel}>Descripción</Text>
                                    <Text style={styles.detailText}>{product.description}</Text>
                                </View>

                                <View style={styles.infoItem}>
                                    <Text style={styles.detailLabel}>Proveedor</Text>
                                    <Text style={styles.detailText}>{product.vendor}</Text>
                                </View>
                                
                                <View style={styles.priceContainer}>
                                    <Text style={styles.priceLabel}>Precio:</Text>
                                    <Text style={styles.priceValue}>${product.price.toFixed(2)}</Text>
                                </View>
                                
                            </View>
                        </View>

                    </View>

                </View>
            </ScrollView>
            
        
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Ionicons name="arrow-back" size={20} color={COLOR_BLANCO} style={styles.backIcon} />
                    <Text style={styles.backButtonText}>Volver a Productos</Text>
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
    
    scrollContent: {
        flexGrow: 1, 
        justifyContent: 'center', 
    },
    pageContent: {
        width: '100%',
        alignItems: 'center', 
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    
    cardContainer: {
        width: '100%',
        maxWidth: 600,
        backgroundColor: COLOR_BLANCO,
        borderRadius: 12,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },

    productTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: COLOR_NEGRO_PRINCIPAL,
        marginBottom: 25,
        textAlign: 'center',
    },

    detailContainer: {
        flexDirection: 'column', 
        width: '100%',
    },

    imageWrapper: {
        width: '100%',
        alignItems: 'center', 
        marginBottom: 20,
    },
    imageBox: {
        width: 300, 
        height: 250,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: COLOR_GRIS_FONDO,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ecf0f1',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    
    infoBox: {
        width: '100%',
        paddingTop: 10,
    },
    infoItem: {
        marginBottom: 20, 
    },
    detailLabel: {
        fontSize: 13,
        fontWeight: 'bold',
        color: COLOR_GRIS_TEXTO_SECUNDARIO,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    detailText: {
        fontSize: 16,
        color: COLOR_NEGRO_PRINCIPAL,
    },
    
    priceContainer: {
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#ecf0f1',
        alignItems: 'center', 
    },
    priceLabel: {
        fontSize: 16,
        color: COLOR_NEGRO_PRINCIPAL,
        fontWeight: '600',
    },
    priceValue: {
        fontSize: 28,
        fontWeight: '900',
        color: COLOR_ACCENT,
    },

    bottomBar: {
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 30, 
        backgroundColor: COLOR_BLANCO,
        borderTopWidth: 1,
        borderTopColor: '#ecf0f1',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: COLOR_ACCENT_DARK,
        paddingVertical: 10,
        borderRadius: 8,
    },
    backIcon: {
        marginRight: 8,
    },
    backButtonText: {
        fontSize: 16,
        color: COLOR_BLANCO,
        fontWeight: 'bold',
    },
});