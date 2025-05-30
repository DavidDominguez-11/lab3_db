const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// rutas
const usuarioRoutes = require('./src/routes/usuario.routes');
const retoRoutes = require('./src/routes/reto.routes');
const habitoRoutes = require('./src/routes/habito.routes');
// rutas tablas de cruce
const registroHabitoRoutes = require('./src/routes/registroHabito.routes');
const participacionRetoRoutes = require('./src/routes/participacionReto.routes');


// Rutas para usuarios
app.use('/usuarios', usuarioRoutes);

// Rutas para retos
app.use('/retos', retoRoutes);

// Rutas para habitos
app.use('/habitos', habitoRoutes);

// rutas tablas de cruce
app.use('/registros-habitos', registroHabitoRoutes);
app.use('/participaciones', participacionRetoRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`App listening on port ${port}`);
});