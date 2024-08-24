/*
  Warnings:

  - You are about to drop the column `productoId` on the `ventas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ventas" DROP CONSTRAINT "ventas_productoId_fkey";

-- AlterTable
ALTER TABLE "ventas" DROP COLUMN "productoId";
