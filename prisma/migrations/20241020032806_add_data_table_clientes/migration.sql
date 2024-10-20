-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "paterno" TEXT NOT NULL,
    "materno" TEXT NOT NULL,
    "ci" INTEGER NOT NULL,
    "extencion" TEXT NOT NULL,
    "alojamientoId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_alojamientoId_fkey" FOREIGN KEY ("alojamientoId") REFERENCES "alojamientos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
