import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import HeaderMenu from '@/components/HeaderMenu'; 

const COLOR_GRIS_FONDO = '#f9f9f9';
const COLOR_BLANCO = '#ffffff';
const COLOR_NEGRO_PRINCIPAL = '#2c3e50'; 
const COLOR_ROJO_ACCENT = '#e74c3c'; 
const COLOR_GRIS_TEXTO_SECUNDARIO = '#7f8c8d'; 
const COLOR_BORDE = '#ecf0f1'; 
const { width } = Dimensions.get('window');


interface Plan {
    id: string;
    title: string;
    duration: string;
    price: string; 
    description: string;
}

const plans: Plan[] = [
    { 
        id: 'starter', 
        title: 'Plan Starter', 
        duration: 'Semanal', 
        price: '$XX', 
        description: 'Compra tu espacio publicitario para una semana' 
    },
    { 
        id: 'standard', 
        title: 'Plan Estándar', 
        duration: 'Anual', 
        price: '$XX', 
        description: 'Compra tu espacio publicitario para un año' 
    },
    { 
        id: 'basic', 
        title: 'Plan Básico', 
        duration: 'Mensual', 
        price: '$XX', 
        description: 'Compra tu espacio publicitario para un mes' 
    },
];

const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => {
    
    const handlePurchase = () => {
        console.log(`Comprando plan: ${plan.title}`);
    };

    return (
        <View style={planStyles.card}>
            <Text style={planStyles.title}>{plan.title}</Text>
            
            
            <View style={planStyles.priceBox}>
                <Text style={planStyles.price}>{plan.price}</Text>
                <Text style={planStyles.duration}>{plan.duration}</Text>
            </View>

            <Text style={planStyles.description}>{plan.description}</Text>
            
            
            <TouchableOpacity 
                style={planStyles.button} 
                onPress={handlePurchase}
            >
                <Text style={planStyles.buttonText}>Comprar</Text>
            </TouchableOpacity>
        </View>
    );
};


export default function ComprarPlan() {
    return (
        <SafeAreaView style={styles.fullContainer}>
            <HeaderMenu /> 


            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.pageContent}>
                    
                    <Text style={styles.pageTitle}>Tipos de Plan</Text>

                    <View style={styles.plansContainer}>
                        {plans.map(plan => (
                            <PlanCard key={plan.id} plan={plan} />
                        ))}
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
        paddingVertical: 30,
    },
    pageContent: {
        width: '100%',
        maxWidth: 900, 
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLOR_NEGRO_PRINCIPAL,
        marginBottom: 30,
        textAlign: 'center',
    },
    
 
    plansContainer: {
        flexDirection: width < 768 ? 'column' : 'row', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
    },
});

const planStyles = StyleSheet.create({
    card: {
        width: width < 768 ? '90%' : 250, 
        maxWidth: 300,
        backgroundColor: COLOR_BLANCO,
        borderRadius: 12,
        padding: 25,
        margin: 15,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLOR_BORDE,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: COLOR_NEGRO_PRINCIPAL,
        marginBottom: 20,
        textAlign: 'center',
    },
    priceBox: {
        borderBottomWidth: 1,
        borderBottomColor: COLOR_BORDE,
        paddingBottom: 15,
        marginBottom: 15,
        alignItems: 'center',
    },
    price: {
        fontSize: 48,
        fontWeight: '900',
        color: COLOR_NEGRO_PRINCIPAL,
    },
    duration: {
        fontSize: 16,
        color: COLOR_GRIS_TEXTO_SECUNDARIO,
        fontWeight: '600',
        marginTop: 5,
        textTransform: 'uppercase',
    },
    description: {
        fontSize: 14,
        color: COLOR_GRIS_TEXTO_SECUNDARIO,
        textAlign: 'center',
        marginBottom: 25,
        minHeight: 40, 
    },
    button: {
        backgroundColor: COLOR_ROJO_ACCENT,
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        shadowColor: COLOR_ROJO_ACCENT,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 4,
    },
    buttonText: {
        color: COLOR_BLANCO,
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});