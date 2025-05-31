const express = require('express');
const cors = require('cors');
const app = express();
const cors = require('cors');
const port = 3000;

// Config de CORS 
const corsOptions = {
  origin: [
<<<<<<< HEAD
    'http://localhost:5500',
    'http://0.0.0.0:5500',
=======
    'http://localhost:8080',
    'http://0.0.0.0:8080',
>>>>>>> main
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

<<<<<<< HEAD
// Middleware para manejar preflight requests
// Habilitar preflight para todas las rutas
app.options('*', cors(corsOptions));  

=======
>>>>>>> main
app.use(express.json());

// rutas
const usuarioRoutes = require('./src/routes/usuario.routes');
const retoRoutes = require('./src/routes/reto.routes');
const habitoRoutes = require('./src/routes/habito.routes');
const registroHabitoRoutes = require('./src/routes/registroHabito.routes');
const participacionRetoRoutes = require('./src/routes/participacionReto.routes');
<<<<<<< HEAD

// Enrutadores
=======
// rutas vistas
const vistasRoutes = require('./src/routes/vistas.routes');

// Rutas para usuarios
>>>>>>> main
app.use('/usuarios', usuarioRoutes);
app.use('/retos', retoRoutes);
app.use('/habitos', habitoRoutes);
app.use('/registros-habitos', registroHabitoRoutes);
app.use('/participaciones', participacionRetoRoutes);

<<<<<<< HEAD
=======
// rutas para las vistas
app.use('/vistas', vistasRoutes);
>>>>>>> main

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor API corriendo en http://0.0.0.0:${port}`);
  console.log(`Configurado para aceptar solicitudes desde: http://localhost:5500`);
});