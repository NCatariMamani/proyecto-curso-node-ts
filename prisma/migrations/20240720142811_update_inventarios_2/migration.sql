/*
  Warnings:

  - You are about to drop the column `descripion` on the `inventarios` table. All the data in the column will be lost.
  - Added the required column `descripcion` to the `inventarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "inventarios" DROP COLUMN "descripion",
ADD COLUMN     "descripcion" TEXT NOT NULL;
