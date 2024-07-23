/*
  Warnings:

  - You are about to drop the column `descricpion` on the `inventarios` table. All the data in the column will be lost.
  - Added the required column `descripion` to the `inventarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "inventarios" DROP COLUMN "descricpion",
ADD COLUMN     "descripion" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "encargados" ADD CONSTRAINT "encargados_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
