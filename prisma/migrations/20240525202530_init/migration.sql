-- CreateTable
CREATE TABLE "alojamientos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "numhabitacion" INTEGER NOT NULL,
    "direccion" TEXT NOT NULL,

    CONSTRAINT "alojamientos_pkey" PRIMARY KEY ("id")
);
