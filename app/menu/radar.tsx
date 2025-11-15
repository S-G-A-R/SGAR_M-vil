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
const CARD_WIDTH = Math.min(400, width - 40);
const CARD_HEIGHT = CARD_WIDTH * 1.25;

const COLOR_NEGRO_PRINCIPAL = '#4b4b4b';
const COLOR_GRIS_FONDO = '#f4f4f4';
const COLOR_BLANCO = '#ffffff';
const COLOR_GRIS_TARJETA = '#e0e0e0';
const COLOR_GRIS_MAPA = '#c4c4c4';
const COLOR_GRIS_TEXTO = '#333333';

export default function RadarCompactScreen() {
  const navigation = useNavigation<any>();
  const handleNavigateToList = () => navigation.navigate('menu/puntos-recoleccion');

  return (
    <SafeAreaView style={styles.safe}>
      <HeaderMenu /> 

      <View style={styles.headerButtonContainer}>
        <TouchableOpacity style={styles.smallPuntosButton} onPress={handleNavigateToList}>
          <Text style={styles.smallPuntosText}>Mis puntos de recolección</Text>
          <Ionicons name="chevron-forward" size={16} color={COLOR_GRIS_TEXTO} />
        </TouchableOpacity>
      </View>

      <View style={styles.page}>
        <View style={styles.card}>
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

          <View style={styles.mapStrip}>
            <View style={styles.mapInner}>
              <View style={[styles.mapLineHorizontal, { top: '30%', left: '10%', width: '80%' }]} />
              <View style={[styles.mapLineVertical, { top: '10%', left: '50%', height: '80%' }]} />
              <View style={[styles.mapLineDiagonal, { transform: [{ rotate: '40deg' }] }]} />

              <View style={[styles.marker, { left: '18%', top: '25%' }]}>
                <Ionicons name="leaf-outline" size={20} color={COLOR_GRIS_TEXTO} /> 
              </View>

              <View style={[styles.marker, styles.markerLocation]}>
                <Ionicons name="location-sharp" size={24} color={COLOR_GRIS_TEXTO} />
                <Text style={styles.ubicacionText}>Tu ubicación</Text>
              </View>

              <View style={[styles.marker, { right: '15%', top: '30%' }]}>
                <Ionicons name="trash-bin-outline" size={20} color={COLOR_GRIS_TEXTO} />
              </View>
              
            </View>

            
            <TouchableOpacity style={styles.searchRow} onPress={handleNavigateToList}>
              <Ionicons name="search" size={18} color={COLOR_BLANCO} />
              <Text style={styles.searchText}>Buscar puntos cercanos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLOR_GRIS_FONDO },

  headerButtonContainer: {
   position: 'absolute',
    top: 90, 
    right: 15,
    zIndex: 10,
    paddingBottom: 5,
  },
  
  page: {
    flex: 1,
    alignItems: 'center',
    
    paddingTop: 36, 
  },

  smallPuntosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR_BLANCO,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  smallPuntosText: { color: COLOR_GRIS_TEXTO, marginRight: 4, fontSize: 13, fontWeight: '400' },

  
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: COLOR_GRIS_TARJETA,
    borderRadius: 0,
    overflow: 'hidden',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  
  headerBox: {
    backgroundColor: COLOR_NEGRO_PRINCIPAL,
    alignItems: 'center',
    paddingVertical: 35,
  },

  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: { width: 38, height: 38, tintColor: COLOR_BLANCO },
  title: { color: COLOR_BLANCO, fontSize: 22, fontWeight: '700', textAlign: 'center' },

  
  mapStrip: {
    flex: 1,
    backgroundColor: COLOR_BLANCO,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mapInner: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: COLOR_GRIS_TARJETA,
    alignItems: 'center',
  },

  mapLineHorizontal: {
    position: 'absolute',
    backgroundColor: COLOR_GRIS_MAPA,
    height: 3,
  },
  mapLineVertical: {
    position: 'absolute',
    backgroundColor: COLOR_GRIS_MAPA,
    width: 3,
  },
  mapLineDiagonal: {
    position: 'absolute',
    width: '100%',
    height: 3,
    backgroundColor: COLOR_GRIS_MAPA,
    top: '55%',
  },

  marker: {
    position: 'absolute',
    padding: 8,
    borderRadius: 25,
    backgroundColor: COLOR_BLANCO,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  markerLocation: {
    padding: 0,
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: COLOR_GRIS_TARJETA,
    top: '40%',
    left: '48%',
  },

  ubicacionText: {
    position: 'absolute',
    bottom: -20,
    fontSize: 14,
    color: COLOR_GRIS_TEXTO,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },

  searchRow: {
    position: 'absolute',
    bottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR_NEGRO_PRINCIPAL,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 5,
  },
  searchText: {
    color: COLOR_BLANCO,
    fontSize: 15,
    marginLeft: 8,
    fontWeight: '600',
  },
});