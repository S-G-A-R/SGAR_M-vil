import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable, 
  TouchableOpacity, 
 
} from "react-native";
import HeaderMenu from "@/components/HeaderMenu";
import { Image } from "expo-image";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useRouter } from "expo-router";


LocaleConfig.locales["es"] = {
  monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  today: "Hoy",
};
LocaleConfig.defaultLocale = "es";

// --- Simulación de datos de la API ---
const datosDeHorario: any = {
  "2025-05-09": {
    titulo: "Recolección Zona 1",
    operador: "Santiago",
    zona: "Las Delicias",
    entrada: "7:00 am",
    salida: "11:30 am",
    dias: "Lun, Mié, Jue",
  },
  "2025-05-05": {
    titulo: "Recolección Zona 1",
    operador: "Marcos",
    zona: "Parque Centro",
    entrada: "8:00 am",
    salida: "12:00 pm",
    dias: "Lun, Mar",
  },
};


export default function HorariosScreen() {
  const router = useRouter();

  const eventosMarcados = {
    "2025-05-05": { marked: true, dotColor: "#67978dff" },
    "2025-05-07": { marked: true, dotColor: "#67978dff" },
    "2025-05-09": { marked: true, dotColor: "#67978dff" },
  };

  
  const [datosDia, setDatosDia] = useState<any>(null); 

  const onDiaPresionado = (day: any) => {
    const fecha = day.dateString;
    console.log("Día presionado:", fecha);

    
    if (datosDeHorario[fecha]) {
      setDatosDia(datosDeHorario[fecha]);
    } else {
      setDatosDia(null); 
    }
  };

  return (
    <View style={styles.container}>
      <HeaderMenu />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Calendario de horarios</Text>

        
        <View style={styles.calendarContainer}>
          <Calendar
            current={"2025-05-01"}
            markedDates={eventosMarcados}
            onDayPress={onDiaPresionado}
            theme={{
              
              backgroundColor: "#ffffff", calendarBackground: "#ffffff", textSectionTitleColor: "#b6c1cd", selectedDayBackgroundColor: "#67978dff", selectedDayTextColor: "#ffffff", todayTextColor: "#67978dff", dayTextColor: "#2d4150", textDisabledColor: "#d9e1e8", dotColor: "#67978dff", selectedDotColor: "#ffffff", arrowColor: "#67978dff", monthTextColor: "#333", indicatorColor: "blue", textDayFontWeight: "300", textMonthFontWeight: "bold", textDayHeaderFontWeight: "300", textDayFontSize: 16, textMonthFontSize: 18, textDayHeaderFontSize: 14,
            }}
          />
        </View>

        
        <View style={styles.detailsContainer}>
          {datosDia ? (
            // --- Detalles del Horario ---
            <View style={styles.detailsContent}>
              <Text style={styles.detailsTitle}>Detalles del horario</Text>
              
              <Text style={styles.detailsLabelTitle}>{datosDia.titulo}</Text>
              
              <View style={styles.infoRow}>
                <Text style={styles.detailsLabel}>Operador:</Text>
                <Text style={styles.detailsValue}>{datosDia.operador}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.detailsLabel}>Zona:</Text>
                <Text style={styles.detailsValue}>{datosDia.zona}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.detailsLabel}>Hora de entrada:</Text>
                <Text style={styles.detailsValue}>{datosDia.entrada}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.detailsLabel}>Hora de salida:</Text>
                <Text style={styles.detailsValue}>{datosDia.salida}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.detailsLabel}>Día:</Text>
                <Text style={styles.detailsValue}>{datosDia.dias}</Text>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setDatosDia(null)} 
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>

          ) : (
            
            
            <View style={styles.defaultContainer}>
              <Image 
                source={require('@/assets/images/sgarlimp.png')} 
                style={styles.defaultImage} 
                contentFit="contain"
              />
              <Text style={styles.defaultText}>
                Selecciona un día en el calendario para ver los detalles del horario.
              </Text>
            </View>

          )}
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  scrollContainer: {
    paddingBottom: 30,
    alignItems: 'center', 
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  calendarContainer: {
    width: '90%', 
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  detailsContainer: {
    width: '90%', 
    marginTop: 20, 
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  defaultContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  defaultImage: {
    width: 200,
    height: 130,
    marginBottom: 15,
  },
  defaultText: {
    fontSize: 17,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 10,
  },

  detailsContent: {
    alignItems: "stretch",
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  detailsLabelTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#67978dff",
    textAlign: "center",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailsLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  detailsValue: {
    fontSize: 16,
    color: "#000",
    fontWeight: '500',
  },
  closeButton: {
    backgroundColor: "#6c757d",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 15, 
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  
});