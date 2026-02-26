/*
  Warnings:

  - Made the column `precio` on table `habitaciones` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "habitaciones" ALTER COLUMN "precio" SET NOT NULL;
