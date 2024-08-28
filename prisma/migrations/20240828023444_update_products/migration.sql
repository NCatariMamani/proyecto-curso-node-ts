/*
  Warnings:

  - Added the required column `estado` to the `productos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "productos" ADD COLUMN     "estado" TEXT NOT NULL;
