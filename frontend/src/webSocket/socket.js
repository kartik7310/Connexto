import { io } from "socket.io-client";

export const createSocketConnection = () => {
  // Remove '/api/v1' from baseUrl and just use the base domain
  const socketUrl = import.meta.env.VITE_API_BASE_URL 
    ? import.meta.env.VITE_API_BASE_URL.replace('/api/v1', '')
    : 'http://localhost:5000';
  
  return io(socketUrl, {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 5,
  });
}