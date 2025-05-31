const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

// Config de CORS 
const corsOptions = {
  origin: [
    'http://localhost:8080',
    'http://0.0.0.0:8080',
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

app.use(express.json());

// rutas
const usuarioRoutes = require('./src/routes/usuario.routes');
const retoRoutes = require('./src/routes/reto.routes');
const habitoRoutes = require('./src/routes/habito.routes');
// rutas tablas de cruce
const registroHabitoRoutes = require('./src/routes/registroHabito.routes');
const participacionRetoRoutes = require('./src/routes/participacionReto.routes');
// rutas vistas
const vistasRoutes = require('./src/routes/vistas.routes');

// Rutas para usuarios
app.use('/usuarios', usuarioRoutes);

// Rutas para retos
app.use('/retos', retoRoutes);

// Rutas para habitos
app.use('/habitos', habitoRoutes);

// rutas tablas de cruce
app.use('/registros-habitos', registroHabitoRoutes);
app.use('/participaciones', participacionRetoRoutes);

// rutas para las vistas
app.use('/vistas', vistasRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`App listening on port ${port}`);
});