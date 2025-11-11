import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
} from "react-native";
import HeaderMenu from "@/components/HeaderMenu"; 
import { Calendar, LocaleConfig } from "react-native-calendars"; 
import { useRouter } from "expo-router";

LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ],
  monthNamesShort: [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
  ],
  dayNames: [
    "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado",
  ],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  today: "Hoy",
};
LocaleConfig.defaultLocale = "es";


export default function HorariosScreen() {
  const router = useRouter();

  
  const eventosMarcados = {
    "2025-05-05": { marked: true, dotColor: "#67978dff" },
    "2025-05-07": { marked: true, dotColor: "#67978dff" },
    "2025-05-09": { marked: true, dotColor: "#67978dff" },
  };

  const onDiaPresionado = (day: any) => {
    console.log("Día presionado:", day.dateString);
    if (day.dateString === "2025-05-09") {
        Alert.alert("Detalles", "Aquí se mostrarán los detalles del horario.");
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
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#b6c1cd",
              selectedDayBackgroundColor: "#67978dff",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#67978dff",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
              dotColor: "#67978dff",
              selectedDotColor: "#ffffff",
              arrowColor: "#67978dff",
              monthTextColor: "#333",
              indicatorColor: "blue",
              textDayFontWeight: "300",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "300",
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
          />
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
    marginHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});