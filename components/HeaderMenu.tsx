import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

export default function HeaderMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const slideAnim = useState(new Animated.Value(-200))[0];

    const toggleMenu = () => {
        const toValue = isMenuOpen ? -200 : 0;
        Animated.timing(slideAnim, {
            toValue,
            duration: 250,
            useNativeDriver: true,
        }).start();
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <View style={{ zIndex: 100 }}>
            <View style={styles.topBar}>
                {/* 🔹 Sección izquierda: menú + logo */}
                <View style={styles.leftSection}>
                    <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
                        <Ionicons name="menu" size={28} color="#000" />
                    </TouchableOpacity>

                    <Image
                        source={require('../assets/images/sgar.jpg')}
                        style={styles.logo}
                    />
                </View>

                {/* 🔹 Botón de inicio de sesión a la derecha */}
                <TouchableOpacity style={styles.loginButton}>
                    <Ionicons name="person-circle-outline" size={28} color="#000" />
                    <Text style={styles.loginText}>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>


            {/* 🔹 Overlay que cubre toda la pantalla */}
            {isMenuOpen && (
                <TouchableWithoutFeedback onPress={toggleMenu}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            )}

            {/* 🔹 Menú lateral */}
            <Animated.View
                style={[
                    styles.sideMenu,
                    { transform: [{ translateX: slideAnim }] },
                ]}
            >
                <Text style={styles.menuTitle}>Menú</Text>

                <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
                    <Text style={styles.menuText}>Inicio</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
                    <Text style={styles.menuText}>Perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
                    <Text style={styles.menuText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 50,
        backgroundColor: '#c4c0c0ff',
        zIndex: 102, // encima del overlay
    },
    menuButton: { padding: 5 },
    logo: { width: 100, height: 30, borderRadius: 10 },
    loginButton: { flexDirection: 'row', alignItems: 'center' },
    loginText: { fontSize: 14, color: '#00050aff', marginLeft: 5, fontWeight: '500' },

    sideMenu: {
        position: 'absolute',
        top: 100,
        left: 0,
        width: 180,
        backgroundColor: '#fff',
        paddingVertical: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
        zIndex: 103,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        backgroundColor: 'rgba(0,0,0,0.25)', // cubre TODA la pantalla
        zIndex: 101,
    },
    menuTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 10, marginLeft: 15, color: '#00050aff' },
    menuItem: { paddingVertical: 10, paddingHorizontal: 15 },
    menuText: { fontSize: 15, color: '#333' },

    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8, // 🔹 Espacio pequeñito entre el menú y el logo
    },
});
