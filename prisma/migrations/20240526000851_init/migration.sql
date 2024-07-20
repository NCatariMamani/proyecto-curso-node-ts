/*
  Warnings:

  - You are about to drop the column `create_at` on the `alojamientos` table. All the data in the column will be lost.
  - You are about to drop the column `numhabitacion` on the `alojamientos` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `created_at` to the `alojamientos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noHabitaciones` to the `alojamientos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `alojamientos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "alojamientos" DROP COLUMN "create_at",
DROP COLUMN "numhabitacion",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "noHabitaciones" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compras" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "alojamientoId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "compras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "encargados" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "paterno" TEXT NOT NULL,
    "materno" TEXT NOT NULL,
    "ci" INTEGER NOT NULL,
    "ext" TEXT NOT NULL,
    "celular" INTEGER NOT NULL,
    "alojamientoId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "encargados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habitaciones" (
    "id" SERIAL NOT NULL,
    "noHabitacion" INTEGER NOT NULL,
    "preferencias" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "alojamientoId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "habitaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventarios" (
    "id" SERIAL NOT NULL,
    "descricpion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "alojamientoId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productoCompras" (
    "id" SERIAL NOT NULL,
    "productoId" INTEGER NOT NULL,
    "alojamientoId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productoCompras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productoInventarios" (
    "id" SERIAL NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "entrada" INTEGER NOT NULL,
    "salida" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora" TEXT NOT NULL,
    "productoId" INTEGER NOT NULL,
    "alojamientoId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productoInventarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservaciones" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "paterno" TEXT NOT NULL,
    "materno" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "ci" INTEGER NOT NULL,
    "extencion" TEXT NOT NULL,
    "nombreA" TEXT NOT NULL,
    "paternoA" TEXT NOT NULL,
    "maternoA" TEXT NOT NULL,
    "edadA" INTEGER NOT NULL,
    "ciA" INTEGER NOT NULL,
    "extencionA" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "horaEntrada" TEXT NOT NULL,
    "horaSalida" TEXT NOT NULL,
    "tiempo" TEXT NOT NULL,
    "compania" TEXT NOT NULL,
    "costoHabitacion" DOUBLE PRECISION NOT NULL,
    "costoExtra" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "habitacionId" INTEGER NOT NULL,
    "encargadoId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ventas" (
    "id" SERIAL NOT NULL,
    "fecha" DOUBLE PRECISION NOT NULL,
    "reservacionId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ventas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productoVentas" (
    "id" SERIAL NOT NULL,
    "productoId" INTEGER NOT NULL,
    "ventaId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productoVentas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "compras" ADD CONSTRAINT "compras_alojamientoId_fkey" FOREIGN KEY ("alojamientoId") REFERENCES "alojamientos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encargados" ADD CONSTRAINT "encargados_alojamientoId_fkey" FOREIGN KEY ("alojamientoId") REFERENCES "alojamientos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encargados" ADD CONSTRAINT "encargados_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habitaciones" ADD CONSTRAINT "habitaciones_alojamientoId_fkey" FOREIGN KEY ("alojamientoId") REFERENCES "alojamientos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventarios" ADD CONSTRAINT "inventarios_alojamientoId_fkey" FOREIGN KEY ("alojamientoId") REFERENCES "alojamientos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productoCompras" ADD CONSTRAINT "productoCompras_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productoCompras" ADD CONSTRAINT "productoCompras_alojamientoId_fkey" FOREIGN KEY ("alojamientoId") REFERENCES "alojamientos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productoInventarios" ADD CONSTRAINT "productoInventarios_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productoInventarios" ADD CONSTRAINT "productoInventarios_alojamientoId_fkey" FOREIGN KEY ("alojamientoId") REFERENCES "alojamientos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservaciones" ADD CONSTRAINT "reservaciones_habitacionId_fkey" FOREIGN KEY ("habitacionId") REFERENCES "habitaciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservaciones" ADD CONSTRAINT "reservaciones_encargadoId_fkey" FOREIGN KEY ("encargadoId") REFERENCES "encargados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_reservacionId_fkey" FOREIGN KEY ("reservacionId") REFERENCES "reservaciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productoVentas" ADD CONSTRAINT "productoVentas_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productoVentas" ADD CONSTRAINT "productoVentas_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "ventas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
