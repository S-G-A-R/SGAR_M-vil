import io from 'socket.io-client';

let socket: any = null;

export function connectOperatorSocket() {
  if (!socket) {
    socket = io('https://sgar-navigation.onrender.com', { transports: ['websocket', 'polling'] });
  }
  return socket;
}

export function sendOperatorLocation(data: {
  idOperador: number;
  idHorario: number;
  lon: number;
  lat: number;
}) {
  const sock = connectOperatorSocket();
  sock.emit('actualizarUbicacion', data);
}
