const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  // Crear 30 Usuarios
  const usuarios = await prisma.usuario.createMany({
    data: Array.from({ length: 30 }, (_, i) => ({
      nombre: `Usuario ${i + 1}`,
      email: `usuario${i + 1}@correo.com`
    }))
  });

  // Crear 3 Hábitos
  await prisma.habito.createMany({
    data: [
      { nombre: 'Beber agua', dificultad: 'Facil' },
      { nombre: 'Leer 20 min', dificultad: 'Medio' },
      { nombre: 'Ejercicio', dificultad: 'Dificil' }
    ]
  });

  // Obtener IDs
  const allUsers = await prisma.usuario.findMany();
  const allHabits = await prisma.habito.findMany();

  // Crear 30 Registros de Hábitos (1 por usuario, hábito rotativo)
  for (let i = 0; i < allUsers.length; i++) {
    await prisma.registroHabito.create({
      data: {
        usuarioId: allUsers[i].id,
        habitoId: allHabits[i % allHabits.length].id,
        progreso: {
          dias_consecutivos: Math.floor(Math.random() * 30) + 1,
          meta: 30
        }
      }
    });
  }

  // Crear 5 Retos
  const fecha = new Date();
  await prisma.reto.createMany({
    data: Array.from({ length: 5 }, (_, i) => ({
      nombre: `Reto ${i + 1}`,
      fecha_inicio: new Date(fecha.getTime() - 1000 * 60 * 60 * 24 * (i + 1)),
      fecha_fin: new Date(fecha.getTime() + 1000 * 60 * 60 * 24 * (i + 10))
    }))
  });

  // Obtener Retos
  const allRetos = await prisma.reto.findMany();

  // Crear Participaciones (cada usuario participa en 1 reto)
  for (let i = 0; i < allUsers.length; i++) {
    await prisma.participacionReto.create({
      data: {
        usuarioId: allUsers[i].id,
        retoId: allRetos[i % allRetos.length].id,
        completado: Math.random() < 0.5
      }
    });
  }

  console.log('Datos insertados con éxito.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
