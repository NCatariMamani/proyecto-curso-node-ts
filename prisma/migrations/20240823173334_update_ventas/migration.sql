/*
  Warnings:

  - Added the required column `productoId` to the `ventas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ventas" ADD COLUMN     "productoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
