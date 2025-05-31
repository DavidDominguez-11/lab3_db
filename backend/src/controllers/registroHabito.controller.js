const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

// Crear registro
exports.crearRegistro = async (req, res) => {
  const { usuarioId, habitoId, progreso } = req.body;
  
  try {
    const registro = await prisma.registroHabito.create({
      data: {
        usuarioId: Number(usuarioId),
        habitoId: Number(habitoId),
        progreso: progreso || {}
      },
      include: {
        usuario: true,
        habito: true
      }
    });
    res.status(201).json(registro);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear registro', detalles: error.message });
  }
};

// Obtener registros por usuario
exports.obtenerRegistrosPorUsuario = async (req, res) => {
  const { usuarioId } = req.params;
  
  const registros = await prisma.registroHabito.findMany({
    where: { usuarioId: Number(usuarioId) },
    include: { habito: true }
  });
  res.json(registros);
};

// Actualizar progreso
exports.actualizarRegistro = async (req, res) => {
  const { id } = req.params;
  const { progreso } = req.body;
  
  try {
    const registro = await prisma.registroHabito.update({
      where: { id: Number(id) },
      data: { progreso }
    });
    res.json(registro);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar registro', detalles: error.message });
  }
};

// Eliminar registro
exports.eliminarRegistro = async (req, res) => {
  const { id } = req.params;
  await prisma.registroHabito.delete({ where: { id: Number(id) } });
  res.status(204).json({
    mensaje: 'Registro eliminado correctamente'
  });
};