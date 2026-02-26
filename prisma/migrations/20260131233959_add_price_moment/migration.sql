/*
  Warnings:

  - You are about to drop the column `precio` on the `habitaciones` table. All the data in the column will be lost.
  - Added the required column `precioNoche` to the `habitaciones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precioTemporal` to the `habitaciones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "habitaciones" DROP COLUMN "precio",
ADD COLUMN     "precioNoche" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "precioTemporal" DECIMAL(10,2) NOT NULL;
