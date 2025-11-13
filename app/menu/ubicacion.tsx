import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons"; 
import HeaderMenu from "@/components/HeaderMenu"; 



type Coordinate = {
  latitude: number;
  longitude: number;
};

type LocationType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const initialRegion: LocationType = {
  latitude: 13.7942,   
  longitude: -88.8965, 
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function UbicacionScreen() {
  const [isFollowing, setIsFollowing] = useState(false); 
  
  const [truckLocation, setTruckLocation] = useState<LocationType>(initialRegion); 
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>([]); 

  
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

  const handleToggleFollowing = () => {
    setIsFollowing(!isFollowing);
  };
  
  const handleStopFollowing = () => {
    setIsFollowing(false);
    setRouteCoordinates([]);
    setTruckLocation(initialRegion); 
  };


  return (
    <View style={styles.fullContainer}>
      <HeaderMenu /> 
      
      <View style={styles.container}>
        
        <View style={styles.controls}>
          
          <TouchableOpacity 
              style={[styles.button, styles.stopButton]} 
              onPress={handleStopFollowing}
              disabled={!isFollowing && routeCoordinates.length === 0} 
          >
            <Text style={styles.buttonText}>DETENER RUTA</Text>
          </TouchableOpacity>

          <TouchableOpacity 
              style={[styles.button, isFollowing ? styles.pauseButton : styles.startButton]} 
              onPress={handleToggleFollowing}
          >
              <Text style={styles.buttonText}>
                {isFollowing ? "PAUSAR SEGUIMIENTO" : "INICIAR SEGUIMIENTO"}
              </Text>
          </TouchableOpacity>
          
        </View>
        
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

        <TouchableOpacity style={styles.reminderButton}>
          <Text style={styles.reminderButtonText}>Recordarme</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 2,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  startButton: {
    backgroundColor: '#67978dff', 
  },
  pauseButton: {
    backgroundColor: '#FFC107', 
  },
  stopButton: {
    backgroundColor: '#DC3545', 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  reminderButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#007BFF', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  reminderButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});