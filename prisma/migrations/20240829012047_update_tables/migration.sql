/*
  Warnings:

  - You are about to drop the column `alojamientoId` on the `productoCompras` table. All the data in the column will be lost.
  - Added the required column `departamento` to the `alojamientos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `compraId` to the `productoCompras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precioCompra` to the `productoCompras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precioVenta` to the `productoVentas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departamento` to the `productos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cambio` to the `reservaciones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estadoCambio` to the `reservaciones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalVenta` to the `reservaciones` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "productoCompras" DROP CONSTRAINT "productoCompras_alojamientoId_fkey";

-- AlterTable
ALTER TABLE "alojamientos" ADD COLUMN     "departamento" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "productoCompras" DROP COLUMN "alojamientoId",
ADD COLUMN     "compraId" INTEGER NOT NULL,
ADD COLUMN     "precioCompra" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "productoVentas" ADD COLUMN     "precioVenta" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "productos" ADD COLUMN     "departamento" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reservaciones" ADD COLUMN     "cambio" TEXT NOT NULL,
ADD COLUMN     "estadoCambio" TEXT NOT NULL,
ADD COLUMN     "totalVenta" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "productoCompras" ADD CONSTRAINT "productoCompras_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES "compras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
