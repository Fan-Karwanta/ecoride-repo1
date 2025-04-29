import { Platform } from "react-native";

// Production deployment - Render.com
export const BASE_URL = 'https://ecoride-server1.onrender.com';
export const SOCKET_URL = 'wss://ecoride-server1.onrender.com';

// Alternative configurations (uncomment as needed)
// For local testing
// export const BASE_URL = 'http://localhost:3000';
// export const SOCKET_URL = 'ws://localhost:3000';

// For iOS simulator
// export const BASE_URL = 'http://127.0.0.1:3000';
// export const SOCKET_URL = 'ws://127.0.0.1:3000';

// For Android emulator
// export const BASE_URL = 'http://10.0.2.2:3000';
// export const SOCKET_URL = 'ws://10.0.2.2:3000';

// For testing on physical device (replace with your computer's IP address)
// export const BASE_URL = 'http://192.168.1.X:3000';
// export const SOCKET_URL = 'ws://192.168.1.X:3000';

// Previous active configuration
// export const BASE_URL = 'http://10.0.254.226:3000';
// export const SOCKET_URL = 'ws://10.0.254.226:3000';