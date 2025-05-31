const express = require('express');
const cors = require('cors'); // 👈 NUEVO
const app = express();
const port = 3000;

app.use(cors()); // 👈 NUEVO
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
  console.log(`App listening on port ${port}`);
});
