// src/socket.js
import { io } from 'socket.io-client';

const socket = io(process.env.API_URL, {
  transports: ['websocket'],
}); // Replace with your NestJS server URL

export default socket;
