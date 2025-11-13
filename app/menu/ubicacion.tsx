import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons"; 
import HeaderMenu from "@/components/HeaderMenu"; 

const { height } = Dimensions.get("window");

type Coordinate = { latitude: number; longitude: number; };
type LocationType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const initialRegion: LocationType = {
  latitude: 13.7942,   
  longitude: -88.8965, // Coordenadas de ejemplo (luego cambiar por la api real)
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const distanceOptions = [100, 200, 500, 1000]; 

export default function UbicacionScreen() {
  const [isStarted, setIsStarted] = useState(false); 
  const [isFollowing, setIsFollowing] = useState(false); 
  const [truckLocation, setTruckLocation] = useState<LocationType>(initialRegion); 
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>([]); 
  
  const [isReminderPickerOpen, setIsReminderPickerOpen] = useState(false);

  useEffect(() => {
    let interval: any = null; 
    
    if (isFollowing) {
      interval = setInterval(() => {
        setTruckLocation(prevLoc => {
          const newLatitude = prevLoc.latitude + (Math.random() - 0.5) * 0.0005;
          const newLongitude = prevLoc.longitude + (Math.random() - 0.5) * 0.0005;
          
          const newLocation = { 
              ...prevLoc, 
              latitude: newLatitude, 
              longitude: newLongitude 
          };
          
          setRouteCoordinates(prevCoords => [
              ...prevCoords, 
              { latitude: newLatitude, longitude: newLongitude }
          ]);
          return newLocation;
        });
      }, 2000) as any;
      
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFollowing]);


  const handleStartSearch = () => { setIsStarted(true); };
  const handleToggleFollowing = () => { setIsFollowing(!isFollowing); };
  
  const handleStopRoute = () => {
    setIsFollowing(false);
    setRouteCoordinates([]);
    setIsStarted(false); 
    setTruckLocation(initialRegion); 
  };
  
  const handleSetReminder = (distance: number) => {
      alert(`Recordatorio establecido: ¡Te avisaremos cuando el camión esté a ${distance} metros!`);
      setIsReminderPickerOpen(false); 
  };


  const renderReminderPickerModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isReminderPickerOpen}
      onRequestClose={() => setIsReminderPickerOpen(false)}
    >
      <View style={styles.reminderOverlay}>
        <View style={styles.reminderContent}>
          <Text style={styles.reminderTitle}>¿A qué distancia deseas el recordatorio?</Text>
          <View style={styles.distanceContainer}>
            {distanceOptions.map(distance => (
              <TouchableOpacity
                key={distance}
                style={styles.distanceButton}
                onPress={() => handleSetReminder(distance)}
              >
                <Text style={styles.distanceButtonText}>{distance} m</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={() => setIsReminderPickerOpen(false)}>
            <Text style={styles.reminderCancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );


  return (
    <View style={styles.fullContainer}>
      <HeaderMenu /> 
      
      <View style={styles.container}>
        
        {!isStarted && (
          <View style={styles.initialState}>
            <Text style={styles.initialText}>Presione Iniciar para ver la ubicación del camión.</Text>
            <TouchableOpacity 
              style={styles.bigStartButton} 
              onPress={handleStartSearch}
            >
              <Text style={styles.bigStartButtonText}>INICIAR</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {isStarted && (
          <View style={{ flex: 1, width: '100%' }}>
            <View style={styles.controls}>
              
              <TouchableOpacity 
                  style={[styles.button, styles.stopRouteButton, isFollowing && styles.trackingActiveButton]} 
                  onPress={handleStopRoute}
              >
                <Text style={styles.buttonText}>DETENER RUTA</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                  style={[styles.button, isFollowing ? styles.pauseButton : styles.startButton, isFollowing && styles.trackingActiveButton]} 
                  onPress={handleToggleFollowing}
              >
                  <Text style={styles.buttonText}>
                    {isFollowing ? "DETENER CAMIÓN" : "SEGUIR AL CAMIÓN"}
                  </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map} 
                initialRegion={initialRegion}
                region={truckLocation} 
                showsUserLocation={true} 
              >
                <Marker
                  coordinate={truckLocation}
                  title="Camión de Recolección"
                  description={isFollowing ? "En movimiento" : "En espera"}
                >
                   <Ionicons name="trash-bin" size={30} color="#67978dff" />
                </Marker>
                
                {routeCoordinates.length > 1 && (
                  <Polyline
                    coordinates={routeCoordinates}
                    strokeColor="#1E90FF" 
                    strokeWidth={4}
                  />
                )}
              </MapView>

              <TouchableOpacity style={styles.reminderButton} onPress={() => setIsReminderPickerOpen(true)}>
                <Ionicons name="time-outline" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        
      </View>

      
      {renderReminderPickerModal()}
      
    </View>
  );
}



const styles = StyleSheet.create({
  fullContainer: { flex: 1, backgroundColor: '#f4f4f4', },
  container: { flex: 1, alignItems: 'center', },
  
  
  initialState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30, },
  initialText: { fontSize: 18, textAlign: 'center', marginBottom: 40, color: '#333', },
  bigStartButton: { backgroundColor: '#67978dff', paddingVertical: 20, paddingHorizontal: 50, borderRadius: 10, elevation: 5, },
  bigStartButtonText: { color: 'white', fontWeight: 'bold', fontSize: 20, },
  
  
  mapContainer: { flex: 1, marginHorizontal: 15, marginVertical: 10, borderRadius: 10, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 8, backgroundColor: 'white', },
  map: { flex: 1, width: '100%', },
  controls: { flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee', elevation: 2, },
  button: { paddingVertical: 12, paddingHorizontal: 10, borderRadius: 8, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center', flex: 1, opacity: 1, },
  startButton: { backgroundColor: '#67978dff', },
  pauseButton: { backgroundColor: '#FFC107', },
  stopRouteButton: { backgroundColor: '#DC3545', },
  trackingActiveButton: { backgroundColor: '#B0B0B0', opacity: 0.8, },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 15, },
  
  reminderButton: {
    position: 'absolute',
    top: 15, 
    right: 15, 
    backgroundColor: '#007BFF', 
    padding: 8,
    borderRadius: 50, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },

  reminderOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  reminderContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  distanceContainer: { 
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  distanceButton: { 
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 5,
  },
  distanceButtonText: { 
    color: 'white',
    fontWeight: 'bold',
  },
  reminderCancelText: {
    marginTop: 10,
    color: '#DC3545',
    fontSize: 16,
  }
});