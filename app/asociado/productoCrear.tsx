import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, Alert, Platform,
  ScrollView, 
} from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HeaderMenu from '@/components/HeaderMenu'; 

// --- COLORES ---
const COLOR_NEGRO = '#2c3e50';
const COLOR_BLANCO = '#fff';
const COLOR_AZUL = '#3498db';
const COLOR_ROJO = '#e74c3c';
const COLOR_GRIS = '#7f8c8d';

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'url';
  multiline?: boolean;
}
const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  multiline = false
}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && styles.textArea]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={COLOR_GRIS}
      keyboardType={keyboardType}
      multiline={multiline}
      numberOfLines={multiline ? 4 : 1}
      blurOnSubmit={!multiline} 
    />
  </View>
);

export default function ProductoCrearScreen() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleCrear = () => {
    if (!nombre || !precio) {
      Alert.alert('Error', 'El nombre y el precio son obligatorios.');
      return;
    }
    Alert.alert('Éxito', 'Producto creado correctamente (simulado).', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const handleCancelar = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMenu />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentWrapper}
        keyboardShouldPersistTaps="handled" 
      >
        <Text style={styles.title}>Crear Producto</Text>
        <View style={styles.imageSection}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => Alert.alert('Subir Imagen', 'Selector de imágenes.')}
          >
            <MaterialCommunityIcons
              name="cloud-upload-outline"
              size={60}
              color={COLOR_NEGRO}
            />
            <Text style={styles.imageText}>Subir imagen</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <FormInput
            label="Nombre"
            value={nombre}
            onChangeText={setNombre}
            placeholder="Nombre del producto"
          />
          <FormInput
            label="Descripción"
            value={descripcion}
            onChangeText={setDescripcion}
            placeholder="Descripción detallada"
            multiline={true}
          />
          <FormInput
            label="Precio"
            value={precio}
            onChangeText={setPrecio}
            placeholder="0.00"
            keyboardType="numeric"
          />
          <FormInput
            label="Stock"
            value={stock}
            onChangeText={setStock}
            placeholder="0"
            keyboardType="numeric"
          />
          <FormInput
            label="Categoría"
            value={categoria}
            onChangeText={setCategoria}
            placeholder="Ej: Electrónica"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.createButton]}
            onPress={handleCrear}
          >
            <Text style={styles.buttonText}>Crear</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancelar}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  
  scrollView: {
    flex: 1,
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10, 
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLOR_NEGRO,
    textAlign: 'center',
    marginBottom: 25,
  },

  imageSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  imageContainer: {
    width: 160,
    height: 160,
    borderWidth: 1,
    borderColor: '#d0d4d6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_BLANCO,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageText: {
    marginTop: 8,
    fontSize: 14,
    color: COLOR_NEGRO,
    fontWeight: '500',
  },

  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: COLOR_NEGRO,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#cfd4d8',
    backgroundColor: COLOR_BLANCO,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 15,
    color: COLOR_NEGRO,
  },
  textArea: {
    height: 70,
    textAlignVertical: 'top',
    paddingTop: 10, 
  },


  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    paddingVertical: 10,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: '48%', 
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  createButton: { backgroundColor: COLOR_AZUL },
  cancelButton: { backgroundColor: COLOR_ROJO },
  buttonText: {
    color: COLOR_BLANCO,
    fontSize: 16,
    fontWeight: 'bold',
  },
});