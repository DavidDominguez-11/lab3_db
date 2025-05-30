-- CreateEnum
CREATE TYPE "TipoDificultad" AS ENUM ('Facil', 'Medio', 'Dificil');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habito" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "dificultad" "TipoDificultad" NOT NULL,

    CONSTRAINT "Habito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroHabito" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "habitoId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progreso" JSONB,

    CONSTRAINT "RegistroHabito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reto" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipacionReto" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "retoId" INTEGER NOT NULL,
    "completado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ParticipacionReto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "RegistroHabito" ADD CONSTRAINT "RegistroHabito_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroHabito" ADD CONSTRAINT "RegistroHabito_habitoId_fkey" FOREIGN KEY ("habitoId") REFERENCES "Habito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipacionReto" ADD CONSTRAINT "ParticipacionReto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipacionReto" ADD CONSTRAINT "ParticipacionReto_retoId_fkey" FOREIGN KEY ("retoId") REFERENCES "Reto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
