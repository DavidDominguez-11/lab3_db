const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Importa las rutas
const usuarioRoutes = require('./src/routes/usuario.routes');
const retoRoutes = require('./src/routes/reto.routes');


// Rutas para usuarios
app.use('/usuarios', usuarioRoutes);

// Rutas para retos (nueva ruta)
app.use('/retos', retoRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`App listening on port ${port}`);
});
