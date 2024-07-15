const WebSocket = require('ws');
const readline = require('readline');

// Dirección del servidor WebSocket
const wsUrl = 'ws://192.168.100.45:81'; // Reemplaza con la dirección IP y puerto adecuados

// Crear una nueva instancia de WebSocket
const ws = new WebSocket(wsUrl);

// Crear una interfaz de readline para leer la entrada del usuario desde la consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Variables para las dimensiones de la matriz
const N = 5; // Reemplaza con el valor deseado
const M = 4; // Reemplaza con el valor deseado

// Función para generar una matriz NxM
function generateMatrix(n, m) {
  const matrix = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < m; j++) {
      row.push(Math.floor(Math.random() * 100)); // Valores aleatorios del 0 al 99
    }
    matrix.push(row);
  }
  return matrix;
}

// Manejadores de eventos para WebSocket
ws.on('open', function open() {
  console.log('WebSocket connected');
  
  // Función para leer la entrada del usuario y enviar mensajes
  rl.on('line', (input) => {
    if (input.trim().toLowerCase() === 'map') {
      const matrix = generateMatrix(N, M);
      const matrixString = JSON.stringify(matrix);
      ws.send(matrixString);
      console.log('Matrix sent:', matrixString);
    } else {
      ws.send(input);
    }
  });
});

ws.on('message', function incoming(data) {
  console.log(`Received: ${data}`);
});

ws.on('error', function error(err) {
  console.error('WebSocket error:', err.message);
});

ws.on('close', function close() {
  console.log('WebSocket disconnected');
  rl.close(); // Cerrar la interfaz de readline cuando se cierre la conexión WebSocket
});
