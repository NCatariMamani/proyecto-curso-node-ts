/*
  Warnings:

  - You are about to drop the column `ci` on the `reservaciones` table. All the data in the column will be lost.
  - You are about to drop the column `ciA` on the `reservaciones` table. All the data in the column will be lost.
  - You are about to drop the column `extencion` on the `reservaciones` table. All the data in the column will be lost.
  - You are about to drop the column `extencionA` on the `reservaciones` table. All the data in the column will be lost.
  - You are about to drop the column `materno` on the `reservaciones` table. All the data in the column will be lost.
  - You are about to drop the column `maternoA` on the `reservaciones` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `reservaciones` table. All the data in the column will be lost.
  - You are about to drop the column `nombreA` on the `reservaciones` table. All the data in the column will be lost.
  - You are about to drop the column `paterno` on the `reservaciones` table. All the data in the column will be lost.
  - You are about to drop the column `paternoA` on the `reservaciones` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "reservaciones" DROP COLUMN "ci",
DROP COLUMN "ciA",
DROP COLUMN "extencion",
DROP COLUMN "extencionA",
DROP COLUMN "materno",
DROP COLUMN "maternoA",
DROP COLUMN "nombre",
DROP COLUMN "nombreA",
DROP COLUMN "paterno",
DROP COLUMN "paternoA";
