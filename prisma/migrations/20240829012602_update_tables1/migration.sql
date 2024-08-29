-- CreateTable
CREATE TABLE "entradas" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "productoInventarioId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "entradas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salidas" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "productoInventarioId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "salidas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "entradas" ADD CONSTRAINT "entradas_productoInventarioId_fkey" FOREIGN KEY ("productoInventarioId") REFERENCES "productoInventarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salidas" ADD CONSTRAINT "salidas_productoInventarioId_fkey" FOREIGN KEY ("productoInventarioId") REFERENCES "productoInventarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
