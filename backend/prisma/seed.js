const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient()

async function main() {
  // Crear Usuarios
  const usuarios = await prisma.usuario.createMany({
    data: Array.from({ length: 10 }, (_, i) => ({
      nombre: `Usuario ${i + 1}`,
      email: `usuario${i + 1}@correo.com`
    }))
  })

  // Crear Hábitos
  const habitos = await prisma.habito.createMany({
    data: [
      { nombre: 'Beber agua', dificultad: 'Facil' },
      { nombre: 'Leer 20 min', dificultad: 'Medio' },
      { nombre: 'Ejercicio', dificultad: 'Dificil' }
    ]
  })

  // Obtener IDs
  const allUsers = await prisma.usuario.findMany()
  const allHabits = await prisma.habito.findMany()

  // Crear Registros de Hábitos
  for (let i = 0; i < 10; i++) {
    await prisma.registroHabito.create({
      data: {
        usuarioId: allUsers[i].id,
        habitoId: allHabits[i % 3].id,
        progreso: { dias_consecutivos: i + 1, meta: 30 }
      }
    })
  }

  // Crear Retos
  const fecha = new Date()
  await prisma.reto.createMany({
    data: Array.from({ length: 5 }, (_, i) => ({
      nombre: `Reto ${i + 1}`,
      fecha_inicio: new Date(fecha.getTime() - 1000 * 60 * 60 * 24 * (i + 1)),
      fecha_fin: new Date(fecha.getTime() + 1000 * 60 * 60 * 24 * (i + 10))
    }))
  })

  // Crear Participaciones
  const allRetos = await prisma.reto.findMany()
  for (let i = 0; i < 5; i++) {
    await prisma.participacionReto.create({
      data: {
        usuarioId: allUsers[i].id,
        retoId: allRetos[i].id,
        completado: i % 2 === 0
      }
    })
  }

  console.log('Datos insertados con éxito.')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())
