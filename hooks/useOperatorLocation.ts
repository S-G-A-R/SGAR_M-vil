import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = 'https://sgar-navigation.onrender.com';

export function useOperatorLocation() {
  const [locations, setLocations] = useState<any[]>([]);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, { transports: ['websocket', 'polling'] });

    socketRef.current.on('connect', () => {
      console.log('Socket conectado:', socketRef.current.id);
    });

    socketRef.current.on('nuevaUbicacionOperador', (data: any) => {
      setLocations((prev) => {
        const idx = prev.findIndex(loc => loc.idOperador === data.idOperador);
        if (idx !== -1) {
          prev[idx] = data;
          return [...prev];
        }
        return [...prev, data];
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return { locations };
}
