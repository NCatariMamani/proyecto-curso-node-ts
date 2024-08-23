/*
  Warnings:

  - Added the required column `alojamientoId` to the `reservaciones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservaciones" ADD COLUMN     "alojamientoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "reservaciones" ADD CONSTRAINT "reservaciones_alojamientoId_fkey" FOREIGN KEY ("alojamientoId") REFERENCES "alojamientos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
