import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker"; 
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const dynamicPadding = height * 0.16;


const ZONAS_API = [
  { label: "Urbana", value: "urbana" },
  { label: "Rural", value: "rural" },
];

const DEPARTAMENTOS_API = [
  { label: "San Salvador", value: "SS" },
  { label: "La Libertad", value: "LL" },
  { label: "Santa Ana", value: "SA" },
  { label: "San Miguel", value: "SM" },
];

const MUNICIPIOS_API = [
  { label: "Soyapango", value: "soy", idDepto: "SS" },
  { label: "Ilopango", value: "ilo", idDepto: "SS" },
  { label: "Santa Tecla", value: "st", idDepto: "LL" },
  { label: "Colón", value: "col", idDepto: "LL" },
  
];


export default function RegistroScreen() {
  const router = useRouter();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dui: "",
    correo: "",
    departamento: "", 
    municipio: "",
    zona: "",
    contrasena: "",
    confirmar: "",
  });

  const [departamentos, setDepartamentos] = useState<any[]>([]);
  const [municipios, setMunicipios] = useState<any[]>([]);
  const [zonas, setZonas] = useState<any[]>([]);
  const [municipiosFiltrados, setMunicipiosFiltrados] = useState<any[]>([]);

  useEffect(() => {
    // Aquí es donde harías el 'fetch' a tu API real
    // fetch('https://api.tuurl.com/departamentos')
    //   .then(res => res.json())
    //   .then(data => setDepartamentos(data))
    
    // Por ahora, usamos los datos simulados
    setDepartamentos(DEPARTAMENTOS_API);
    setMunicipios(MUNICIPIOS_API);
    setZonas(ZONAS_API);
  }, []); 

  useEffect(() => {
    if (form.departamento) {
      const filtrados = municipios.filter(
        (m) => m.idDepto === form.departamento
      );
      setMunicipiosFiltrados(filtrados);
    } else {
      setMunicipiosFiltrados([]); 
    }
  
    setForm(f => ({ ...f, municipio: "" }));
  }, [form.departamento, municipios]);  


  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegistro = () => {
    const { nombre, apellido, dui, correo, contrasena, confirmar } = form;

    if (!nombre || !apellido || !dui || !correo || !contrasena || !confirmar) {
      Alert.alert("Campos incompletos", "Por favor completa los campos obligatorios (*)");
      return;
    }

    if (contrasena !== confirmar) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    console.log("Datos enviados:", form);
    Alert.alert("Éxito", "Registro exitoso ✅");
    router.push("/login?rol=ciudadano"); 
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image
          source={require("@/assets/images/sgar.jpeg")}
          style={styles.logo}
          contentFit="contain"
        />
        <ThemedText style={styles.title}>Crear Perfil Ciudadano</ThemedText>

        <View style={styles.form}>
          <ThemedText style={styles.label}>Nombre *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu nombre"
            placeholderTextColor="#888" 
            value={form.nombre}
            onChangeText={(v) => handleChange("nombre", v)}
          />

          <ThemedText style={styles.label}>Apellido *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu apellido"
            placeholderTextColor="#888" 
            value={form.apellido}
            onChangeText={(v) => handleChange("apellido", v)}
          />

          <ThemedText style={styles.label}>DUI *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu DUI"
            placeholderTextColor="#888" 
            value={form.dui}
            onChangeText={(v) => handleChange("dui", v)}
            keyboardType="numeric"
          />

          <ThemedText style={styles.label}>Correo Electrónico *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="ejemplo@correo.com"
            placeholderTextColor="#888" 
            value={form.correo}
            onChangeText={(v) => handleChange("correo", v)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <ThemedText style={styles.label}>Departamento</ThemedText>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={form.departamento}
              onValueChange={(itemValue) => handleChange("departamento", itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecciona un departamento..." value="" />
              {departamentos.map((depto) => (
                <Picker.Item
                  key={depto.value}
                  label={depto.label}
                  value={depto.value}
                />
              ))}
            </Picker>
          </View>

          
          <ThemedText style={styles.label}>Municipio</ThemedText>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={form.municipio}
              onValueChange={(itemValue) => handleChange("municipio", itemValue)}
              style={styles.picker}
              enabled={!!form.departamento} 
            >
              <Picker.Item label="Selecciona un municipio..." value="" />
              {municipiosFiltrados.map((mun) => (
                <Picker.Item
                  key={mun.value}
                  label={mun.label}
                  value={mun.value}
                />
              ))}
            </Picker>
          </View>

          
          <ThemedText style={styles.label}>Zona</ThemedText>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={form.zona}
              onValueChange={(itemValue) => handleChange("zona", itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecciona una zona..." value="" />
              {zonas.map((zona) => (
                <Picker.Item
                  key={zona.value}
                  label={zona.label}
                  value={zona.value}
                />
              ))}
            </Picker>
          </View>

          <ThemedText style={styles.label}>Contraseña *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Crea una contraseña"
            placeholderTextColor="#888" 
            secureTextEntry
            value={form.contrasena}
            onChangeText={(v) => handleChange("contrasena", v)}
          />

          <ThemedText style={styles.label}>Confirmar Contraseña *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Repite la contraseña"
            placeholderTextColor="#888" 
            secureTextEntry
            value={form.confirmar}
            onChangeText={(v) => handleChange("confirmar", v)}
          />

          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.acceptButton]}
              onPress={handleRegistro}
            >
              <ThemedText style={styles.buttonText}>Aceptar</ThemedText>
            </Pressable>

            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={() => router.push("/login?rol=ciudadano")} 
            >
              <ThemedText style={styles.buttonText}>Cancelar</ThemedText>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    paddingTop: 60, 
    paddingBottom: 40,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 100,
    marginBottom: 10,
  },
  title: { 
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  form: {
    width: "90%",
    maxWidth: 400,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 5,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    fontSize: 15,
    color: "#000", 
  },
 
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    justifyContent: "center",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#000", 
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  acceptButton: {
    backgroundColor: "#007bff",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});