const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  const usuarios = await prisma.usuario.findMany({
    include: {
      registrosHabito: true,
    },
  });
  res.json(usuarios);
};

// Obtener un usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  const usuario = await prisma.usuario.findUnique({
    where: { id: Number(id) },
    include: {
      registrosHabito: true,
    },
  });
  res.json(usuario);
};

// Crear un usuario con hábitos (tabla intermedia)
exports.crearUsuario = async (req, res) => {
  const { nombre, email, habitos } = req.body;

  try {
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        registrosHabito: {
          create: habitos.map(h => ({
            habitoId: h.habitoId,
            progreso: h.progreso,
          })),
        },
      },
    });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al crear el usuario', detalles: error.message });
  }
};

// Actualizar un usuario (no cambia hábitos aquí)
exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;

  try {
    const usuario = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { nombre, email },
    });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar usuario', detalles: error.message });
  }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  await prisma.usuario.delete({ where: { id: Number(id) } });
  res.status(204).end();
};
