import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useOperatorLocation } from '../hooks/useOperatorLocation';

export default function OperatorLocationMap() {
  const { locations } = useOperatorLocation();

  return (
    <MapView style={{ flex: 1 }}>
      {locations.map(loc => (
        <Marker
          key={loc.idOperador}
          coordinate={{
            latitude: loc.location.coordinates[1],
            longitude: loc.location.coordinates[0]
          }}
          title={`Operador ${loc.idOperador}`}
          description={`Actualizado: ${loc.fechaActualizacion}`}
        />
      ))}
    </MapView>
  );
}
