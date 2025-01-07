/*
  Warnings:

  - You are about to drop the column `precioVenta` on the `productoVentas` table. All the data in the column will be lost.
  - Added the required column `cantidad` to the `productoVentas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precioTotal` to the `productoVentas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precioUni` to the `productoVentas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "productoVentas" DROP COLUMN "precioVenta",
ADD COLUMN     "cantidad" INTEGER NOT NULL,
ADD COLUMN     "precioTotal" TEXT NOT NULL,
ADD COLUMN     "precioUni" TEXT NOT NULL;
