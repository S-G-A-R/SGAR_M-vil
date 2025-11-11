import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeaderMenu from '@/components/HeaderMenu';

export default function menuScreen() {

  return (
    <View style={styles.container}>
      <HeaderMenu />

      {/* Contenido principal */}
      <View style={styles.content}>
        <Text style={styles.title}>Menú Ciudadano</Text>

        <View style={styles.grid}>
          <TouchableOpacity style={styles.card}>
            <MaterialIcons name="calendar-today" size={36} color="#67978dff" />
            <Text style={styles.cardText}>Horarios y zonas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Ionicons name="notifications" size={34} color="#67978dff" />
            <Text style={styles.cardText}>Notificaciones</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <MaterialCommunityIcons name="map-marker" size={34} color="#67978dff" />
            <Text style={styles.cardText}>Ubicaciones</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <MaterialIcons name="videogame-asset" size={34} color="#67978dff" />
            <Text style={styles.cardText}>SGAR Game</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <MaterialCommunityIcons name="shopping-outline" size={36} color="#67978dff" />
            <Text style={styles.cardText}>Espacio Pubicitario</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <MaterialCommunityIcons name="page-next" size={34} color="#67978dff" />
            <Text style={styles.cardText}>Formularios</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <MaterialCommunityIcons name="map-marker-radius" size={34} color="#67978dff" />
            <Text style={styles.cardText}>Radar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#eee', borderRadius: 10 }}>
              <Text style={{ fontSize: 32 }}>🦝</Text>
            </TouchableOpacity>
            <Text style={styles.cardText}>Asistente EcoSGAR</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tarjeta flotante */}
      <View style={styles.floatingCard}>
        <Text style={styles.floatingText}>🚛 ¡Atencion!
        </Text>
        <Text style={styles.floatingText}>El camión de recoleccion pasará por tu zona en 10 minutos.
        </Text>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c4c0c0ff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: 5,
  },
  logo: {
    width: 100,
    height: 30,
    borderRadius: 10,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#00050aff',
    marginLeft: 5,
    fontWeight: '500',
  },
  sideMenu: {
    position: 'absolute',
    top: 110,
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
    elevation: 10,  // <-- más alto
    zIndex: 100,
  },
  menuTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 15,
    color: '#00050aff',
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuText: {
    fontSize: 15,
    color: '#333',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // coloca el contenido arriba
    paddingTop: 30, // un poco de espacio, pero no mucho
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  card: {
    width: 180,
    height: 140,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardText: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  floatingCard: {
    position: 'absolute',
    bottom: 30,
    left: 25,
    right: 25,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    textAlign: 'center',
  },
  floatingText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)', // fondo oscuro semitransparente
    zIndex: 99, // justo debajo del menú
  },
});
