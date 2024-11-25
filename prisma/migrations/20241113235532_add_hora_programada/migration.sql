/*
  Warnings:

  - Added the required column `horaProgramada` to the `reservaciones` table without a default value. This is not possible if the table is not empty.
  - Made the column `clienteId` on table `reservaciones` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "reservaciones" DROP CONSTRAINT "reservaciones_clienteId_fkey";

-- AlterTable
ALTER TABLE "reservaciones" ADD COLUMN     "horaProgramada" TEXT NOT NULL,
ALTER COLUMN "clienteId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "reservaciones" ADD CONSTRAINT "reservaciones_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
