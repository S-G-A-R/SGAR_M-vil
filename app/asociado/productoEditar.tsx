import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HeaderMenu from '@/components/HeaderMenu';

export default function EditarProducto() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Imagen recibida desde el index (expo la manda como número)
  const imageFromParams = params.image ? Number(params.image) : null;
  const image = imageFromParams ? imageFromParams : require('@/assets/images/producto.jpg');

  // Datos simulados o desde params
  const initialProduct = {
    name: params.productName ? String(params.productName) : "Producto de ejemplo",
    description: params.description ? String(params.description) : "Descripción de ejemplo.",
    price: params.price ? String(params.price) : "15.99",
    empresa: params.empresa ? String(params.empresa) : "Empresa Demo",
  };

  // Estados controlados
  const [name, setName] = useState(initialProduct.name);
  const [description, setDescription] = useState(initialProduct.description);
  const [price, setPrice] = useState(initialProduct.price);
  const [empresa, setEmpresa] = useState(initialProduct.empresa);

  const handleSave = () => {
    if (!name.trim() || !price.trim()) {
      Alert.alert('Error', 'El nombre y el precio son obligatorios.');
      return;
    }

    Alert.alert('Guardado', 'Los cambios han sido guardados.', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderMenu />

      <ScrollView style={styles.screen}>
        
        {/* --- TARJETA --- */}
        <View style={styles.card}>

          {/* IMAGEN */}
          <View style={styles.imageSection}>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => Alert.alert("Cambiar Imagen", "Aquí iría el selector de imágenes.")}
              activeOpacity={0.8}
            >
              <Image source={image} style={styles.productImage} resizeMode="cover" />

              <View style={styles.imageOverlay}>
                <MaterialCommunityIcons name="image-edit-outline" size={40} color="#fff" />
                <Text style={styles.overlayText}>Cambiar imagen</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* FORMULARIO */}
          <View style={styles.form}>
            <Text style={styles.label}>Nombre del Producto</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Nombre del producto"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Descripción"
              placeholderTextColor="#999"
              multiline
            />

            <Text style={styles.label}>Precio ($)</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="0.00"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Empresa</Text>
            <TextInput
              style={styles.input}
              value={empresa}
              onChangeText={setEmpresa}
              placeholder="Empresa"
              placeholderTextColor="#999"
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Guardar Cambios</Text>
            </TouchableOpacity>
          </View>

        </View>
        {/* --- FIN TARJETA --- */}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 18,
  },

  // -------------------
  // TARJETA
  // -------------------
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingBottom: 20,
    overflow: 'hidden',

    // Sombra
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
  },

  // Imagen
  imageSection: {
    width: '100%',
    height: 220,
    backgroundColor: '#eee',
  },

  imageContainer: {
    width: '100%',
    height: '100%',
  },

  productImage: {
    width: '100%',
    height: '100%',
  },

  imageOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlayText: {
    marginTop: 8,
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Formulario
  form: {
    padding: 18,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 14,
    color: '#111',
  },

  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },

  saveButton: {
    backgroundColor: '#1E88E5',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },

  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
  },
});
