const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

// Obtener datos de la vista vista_registro_habitos
exports.obtenerVistaRegistroHabitos = async (req, res) => {
  try {
    const resultados = await prisma.$queryRaw`SELECT * FROM vista_registro_habitos`;
    res.json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener vista_registro_habitos', detalles: error.message });
  }
};

// Obtener datos de la vista vista_participacion_retos
exports.obtenerVistaParticipacionRetos = async (req, res) => {
  try {
    const resultados = await prisma.$queryRaw`SELECT * FROM vista_participacion_retos`;
    res.json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener vista_participacion_retos', detalles: error.message });
  }
};
