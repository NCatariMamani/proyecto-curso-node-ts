/*
  Warnings:

  - Added the required column `montoEntregado` to the `reservaciones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservaciones" ADD COLUMN     "montoEntregado" TEXT NOT NULL;
