/*
  Warnings:

  - You are about to drop the column `alojamientoId` on the `productoInventarios` table. All the data in the column will be lost.
  - Added the required column `inventarioId` to the `productoInventarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "productoInventarios" DROP CONSTRAINT "productoInventarios_alojamientoId_fkey";

-- AlterTable
ALTER TABLE "productoInventarios" DROP COLUMN "alojamientoId",
ADD COLUMN     "inventarioId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "productoInventarios" ADD CONSTRAINT "productoInventarios_inventarioId_fkey" FOREIGN KEY ("inventarioId") REFERENCES "inventarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
