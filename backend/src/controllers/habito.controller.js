const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

const DIFICULTADES_VALIDAS = ["Facil", "Medio", "Dificil"];

// Obtener todos los hábitos
exports.obtenerHabitos = async (req, res) => {
  try {
    const habitos = await prisma.habito.findMany();
    res.json(habitos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los hábitos', detalles: error.message });
  }
};

// Obtener un hábito por ID
exports.obtenerHabitoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const habito = await prisma.habito.findUnique({
      where: { id: Number(id) },
    });
    res.json(habito);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el hábito', detalles: error.message });
  }
};

// Crear nuevo hábito
exports.crearHabito = async (req, res) => {
  const { nombre, dificultad } = req.body;

  if (!nombre || !dificultad) {
    return res.status(400).json({ error: 'Nombre y dificultad son campos requeridos' });
  }

  // Validar formato exacto de dificultad
  if (!DIFICULTADES_VALIDAS.includes(dificultad)) {
    return res.status(400).json({
      error: "Dificultad no válida",
      valores_permitidos: DIFICULTADES_VALIDAS
    });
  }

  try {
    const nuevoHabito = await prisma.habito.create({
      data: {
        nombre,
        dificultad,
      },
    });
    res.status(201).json(nuevoHabito);
  } catch (error) {
    // Manejar error de tipo ENUM si es necesario
    if (error.message.includes('Expected TipoDificultad')) {
      return res.status(400).json({
        error: 'Error en el formato de dificultad',
        mensaje: 'El valor debe coincidir exactamente con: Facil, Medio, Dificil',
        valores_permitidos: DIFICULTADES_VALIDAS
      });
    }
    res.status(400).json({ error: 'Error al crear hábito', detalles: error.message });
  }
};

// Actualizar hábito
exports.actualizarHabito = async (req, res) => {
  const { id } = req.params;
  const { nombre, dificultad } = req.body;

  // Validar dificultad si está presente
  if (dificultad && !DIFICULTADES_VALIDAS.includes(dificultad)) {
    return res.status(400).json({
      error: "Dificultad no válida",
      valores_permitidos: DIFICULTADES_VALIDAS
    });
  }

  try {
    const habitoActualizado = await prisma.habito.update({
      where: { id: Number(id) },
      data: {
        nombre,
        dificultad: dificultad || undefined,
      },
    });
    res.json(habitoActualizado);
  } catch (error) {
    // Manejar error de tipo ENUM
    if (error.message.includes('Expected TipoDificultad')) {
      return res.status(400).json({
        error: 'Error en el formato de dificultad',
        mensaje: 'El valor debe coincidir exactamente con: Facil, Medio, Dificil',
        valores_permitidos: DIFICULTADES_VALIDAS
      });
    }
    res.status(400).json({ error: 'Error al actualizar hábito', detalles: error.message });
  }
};

// Eliminar hábito
exports.eliminarHabito = async (req, res) => {
  const { id } = req.params;

  try {
    // Eliminar registros asociados
    await prisma.registroHabito.deleteMany({
      where: { habitoId: Number(id) },
    });

    // Eliminar hábito
    await prisma.habito.delete({
      where: { id: Number(id) },
    });

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar hábito', detalles: error.message });
  }
};