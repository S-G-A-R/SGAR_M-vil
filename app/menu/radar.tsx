import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderMenu from '@/components/HeaderMenu';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = Math.min(760, width - 40);
const CARD_HEIGHT = height * 0.82; // TARJETA MÁS GRANDE Y COMPACTA

export default function RadarCompactScreen() {
  const navigation = useNavigation<any>();
  const handleNavigateToList = () => navigation.navigate('puntos-recoleccion');

  return (
    <SafeAreaView style={styles.safe}>
      <HeaderMenu />

      <View style={styles.page}>
        {/* Botón superior */}
        <TouchableOpacity style={styles.smallPuntosButton} onPress={handleNavigateToList}>
          <Text style={styles.smallPuntosText}>Mis puntos de recolección</Text>
          <Ionicons name="chevron-forward" size={16} color="#2f6b63" />
        </TouchableOpacity>

        {/* 🔳 TARJETA PRINCIPAL GRANDE */}
        <View style={styles.card}>
          {/* Cabecera */}
          <View style={styles.headerBox}>
            <View style={styles.logoContainer}>
              <Image
                source={require("@/assets/images/raccoon.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.title}>Recolección{"\n"}SGAR</Text>
          </View>

          {/* MAPA DENTRO DE LA TARJETA */}
          <View style={styles.mapStrip}>
            <View style={styles.mapInner}>
              {/* ICONOS EXACTOS DEL DISEÑO */}
              <View style={[styles.marker, { left: '20%', top: '30%' }]}>
                <Ionicons name="refresh-outline" size={20} color="#555" />
              </View>

              <View style={[styles.marker, { left: '50%', top: '45%' }]}>
                <Ionicons name="location-outline" size={20} color="#555" />
              </View>

              <View style={[styles.marker, { left: '78%', top: '25%' }]}>
                <Ionicons name="bag-handle-outline" size={20} color="#555" />
              </View>

              <Text style={styles.ubicacionText}>Tu ubicación</Text>
            </View>

            {/* Buscar puntos dentro de la franja */}
            <TouchableOpacity style={styles.searchRow} onPress={handleNavigateToList}>
              <Ionicons name="search" size={18} color="#fff" />
              <Text style={styles.searchText}>Buscar puntos cercanos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f4f4f4' },

  page: {
    alignItems: 'center',
    marginTop: 10,
  },

  smallPuntosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    marginBottom: 10,
  },
  smallPuntosText: { color: '#2f6b63', marginRight: 6, fontSize: 14 },

  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 6,
  },

  headerBox: {
    backgroundColor: '#4b4b4b',
    alignItems: 'center',
    paddingVertical: 22,
  },

  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: { width: 48, height: 48, tintColor: '#fff' },
  title: { color: '#fff', fontSize: 20, fontWeight: '700', textAlign: 'center' },

  mapStrip: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  mapInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  marker: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 8,
    borderRadius: 20,
    elevation: 2,
  },

  ubicacionText: {
    position: 'absolute',
    bottom: 70,
    fontSize: 14,
    color: '#444',
  },

  searchRow: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#67978dff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 26,
    elevation: 4,
  },
  searchText: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 8,
    fontWeight: '600',
  },
});
