const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

// Unirse a reto
exports.unirseReto = async (req, res) => {
  const { usuarioId, retoId } = req.body;
  
  try {
    const participacion = await prisma.participacionReto.create({
      data: {
        usuarioId: Number(usuarioId),
        retoId: Number(retoId)
      },
      include: {
        usuario: true,
        reto: true
      }
    });
    res.status(201).json(participacion);
  } catch (error) {
    res.status(400).json({ error: 'Error al unirse al reto', detalles: error.message });
  }
};

// Obtener participaciones por reto
exports.obtenerParticipacionesPorReto = async (req, res) => {
  const { retoId } = req.params;
  
  const participaciones = await prisma.participacionReto.findMany({
    where: { retoId: Number(retoId) },
    include: { usuario: true }
  });
  res.json(participaciones);
};

// Marcar como completado
exports.marcarCompletado = async (req, res) => {
  const { id } = req.params;
  const { completado } = req.body;
  
  try {
    const participacion = await prisma.participacionReto.update({
      where: { id: Number(id) },
      data: { completado: Boolean(completado) }
    });
    res.json(participacion);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar participación', detalles: error.message });
  }
};

// Abandonar reto
exports.abandonarReto = async (req, res) => {
  const { id } = req.params;
  await prisma.participacionReto.delete({ where: { id: Number(id) } });
  res.status(204).end();
};