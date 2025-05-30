/*
  Warnings:

  - You are about to drop the `Habito` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ParticipacionReto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RegistroHabito` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ParticipacionReto" DROP CONSTRAINT "ParticipacionReto_retoId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipacionReto" DROP CONSTRAINT "ParticipacionReto_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "RegistroHabito" DROP CONSTRAINT "RegistroHabito_habitoId_fkey";

-- DropForeignKey
ALTER TABLE "RegistroHabito" DROP CONSTRAINT "RegistroHabito_usuarioId_fkey";

-- DropTable
DROP TABLE "Habito";

-- DropTable
DROP TABLE "ParticipacionReto";

-- DropTable
DROP TABLE "RegistroHabito";

-- DropTable
DROP TABLE "Reto";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habito" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "dificultad" "TipoDificultad" NOT NULL,

    CONSTRAINT "habito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registrohabito" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "habitoId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progreso" JSONB,

    CONSTRAINT "registrohabito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reto" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participacionreto" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "retoId" INTEGER NOT NULL,
    "completado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "participacionreto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "registrohabito" ADD CONSTRAINT "registrohabito_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrohabito" ADD CONSTRAINT "registrohabito_habitoId_fkey" FOREIGN KEY ("habitoId") REFERENCES "habito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participacionreto" ADD CONSTRAINT "participacionreto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participacionreto" ADD CONSTRAINT "participacionreto_retoId_fkey" FOREIGN KEY ("retoId") REFERENCES "reto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
