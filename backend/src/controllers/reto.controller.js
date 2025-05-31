const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

// Obtener todos los retos
exports.obtenerRetos = async (req, res) => {
  try {
    const retos = await prisma.reto.findMany({
      include: {
        participaciones: {
          include: {
            usuario: true
          }
        }
      }
    });
    res.json(retos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los retos', detalles: error.message });
  }
};

// Obtener un reto por ID
exports.obtenerRetoPorId = async (req, res) => {
  const { id } = req.params;
  
  try {
    const reto = await prisma.reto.findUnique({
      where: { id: Number(id) },
      include: {
        participaciones: {
          include: {
            usuario: true
          }
        }
      }
    });
    
    if (!reto) {
      return res.status(404).json({ error: 'Reto no encontrado' });
    }
    
    res.json(reto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el reto', detalles: error.message });
  }
};

// Crear un reto con participaciones (tabla intermedia)
exports.crearReto = async (req, res) => {
  const { nombre, fecha_inicio, fecha_fin, participaciones } = req.body;

  // Validación básica
  if (!nombre || !fecha_inicio || !fecha_fin) {
    return res.status(400).json({ error: 'Nombre, fecha_inicio y fecha_fin son campos requeridos' });
  }

  try {
    const nuevoReto = await prisma.reto.create({
      data: {
        nombre,
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: new Date(fecha_fin),
        participaciones: participaciones ? {
          create: participaciones.map(p => ({
            usuarioId: p.usuarioId,
            completado: p.completado || false
          }))
        } : undefined
      },
      include: {
        participaciones: true
      }
    });
    res.status(201).json(nuevoReto);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al crear el reto', detalles: error.message });
  }
};

// Actualizar un reto (no cambia participaciones aquí)
exports.actualizarReto = async (req, res) => {
  const { id } = req.params;
  const { nombre, fecha_inicio, fecha_fin } = req.body;

  try {
    const retoActualizado = await prisma.reto.update({
      where: { id: Number(id) },
      data: {
        nombre,
        fecha_inicio: fecha_inicio ? new Date(fecha_inicio) : undefined,
        fecha_fin: fecha_fin ? new Date(fecha_fin) : undefined
      }
    });
    
    res.json(retoActualizado);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Reto no encontrado' });
    }
    res.status(400).json({ error: 'Error al actualizar el reto', detalles: error.message });
  }
};

// Eliminar reto
exports.eliminarReto = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Primero eliminamos las participaciones relacionadas
    await prisma.participacionReto.deleteMany({
      where: { retoId: Number(id) }
    });
    
    // Luego eliminamos el reto
    await prisma.reto.delete({
      where: { id: Number(id) }
    });
    
    res.status(204).json({
      mensaje: 'Registro eliminado correctamente'
    });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Reto no encontrado' });
    }
    res.status(500).json({ error: 'Error al eliminar el reto', detalles: error.message });
  }
};