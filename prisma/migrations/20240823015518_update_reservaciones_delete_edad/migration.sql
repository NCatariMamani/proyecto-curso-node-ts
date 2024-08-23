/*
  Warnings:

  - You are about to drop the column `edad` on the `reservaciones` table. All the data in the column will be lost.
  - You are about to drop the column `edadA` on the `reservaciones` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "reservaciones" DROP COLUMN "edad",
DROP COLUMN "edadA";
