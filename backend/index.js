const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Config de CORS 
const corsOptions = {
  origin: [
    'http://localhost:5500',
    'http://0.0.0.0:5500',
    '*'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware para manejar preflight requests
// Habilitar preflight para todas las rutas
app.options('*', cors(corsOptions));  

app.use(express.json());

// rutas
const usuarioRoutes = require('./src/routes/usuario.routes');
const retoRoutes = require('./src/routes/reto.routes');
const habitoRoutes = require('./src/routes/habito.routes');
const registroHabitoRoutes = require('./src/routes/registroHabito.routes');
const participacionRetoRoutes = require('./src/routes/participacionReto.routes');

// Enrutadores
app.use('/usuarios', usuarioRoutes);
app.use('/retos', retoRoutes);
app.use('/habitos', habitoRoutes);
app.use('/registros-habitos', registroHabitoRoutes);
app.use('/participaciones', participacionRetoRoutes);


app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor API corriendo en http://0.0.0.0:${port}`);
  console.log(`Configurado para aceptar solicitudes desde: http://localhost:5500`);
});