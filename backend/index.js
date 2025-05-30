const express = require('express');
const app = express();
const port = 3000;

// Importa las rutas correctamente
const usuarioRoutes = require('./src/routes/usuario.routes');

app.use(express.json());

// Ruta correcta para el CRUD de usuarios
app.use('/usuarios', usuarioRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`App listening on port ${port}`);
});
