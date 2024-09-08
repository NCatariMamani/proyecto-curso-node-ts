-- AlterTable
ALTER TABLE "reservaciones" ALTER COLUMN "cambio" DROP NOT NULL,
ALTER COLUMN "estadoCambio" DROP NOT NULL,
ALTER COLUMN "totalVenta" DROP NOT NULL;
