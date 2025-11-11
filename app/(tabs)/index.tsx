import HeaderMenu from '@/components/HeaderMenu';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {

const [modalVisible, setModalVisible] = useState(false);
const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <HeaderMenu />
      </View>
      {/* 🔹 Bloque de botones arriba */}
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.roleButton}
        onPress={() => router.push('/inicio/menuCiudadano')}>
          <Text style={styles.roleText}>Ciudadano</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roleButton}>
          <Text style={styles.roleText}>Operador</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roleButton}>
          <Text style={styles.roleText}>Asociado</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roleButton}>
          <Text style={styles.roleText}>Organización</Text>
        </TouchableOpacity>
      </View>

      {/*Logo*/}
      <Image
        source={require('../../assets/images/logoPrinc.jpg')}
        style={styles.logo}
      />

      {/* Texto de bienvenida */}
      <Text style={styles.welcomeText}>¡Bienvenido a S.G.A.R!</Text>

      {/* Botón de "Acerca de nosotros"*/}
      <TouchableOpacity
        style={styles.aboutButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.aboutText}>Acerca de nosotros</Text>
      </TouchableOpacity>

      {/* modal para info acerca de nosotros*/}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setModalVisible(false)} 
        >
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>🌱 Sobre EcoSGAR</Text>
            <Text style={styles.modalContent}>
              Sistema de Gestión de Aseo y Residuos. Sistema creado
             para optimizar los procesos de recolección de basura, 
             limpieza y gestión de desechos en municipios y empresas de aseo.
            </Text>
          </View>
        </Pressable>
      </Modal>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcdcdc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  buttonGrid: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 30,
  },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20, 
  },
  roleButton: {
    width: 150,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
  },
  roleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 25,
  },
  aboutButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 3,
  },
  aboutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#67978d',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#2e5d52',
  },
  modalContent: {
    fontSize: 15,
    textAlign: 'center',
    color: '#444',
  },
});
