-- AlterTable
ALTER TABLE "compras" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "encargados" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "habitaciones" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "inventarios" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "productoCompras" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "productoInventarios" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "productoVentas" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "productos" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "reservaciones" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ventas" ALTER COLUMN "updated_at" DROP NOT NULL;
