-- CreateEnum
CREATE TYPE "operation_enum" AS ENUM ('alquiler', 'venta');

-- CreateEnum
CREATE TYPE "property_type_enum" AS ENUM ('casa', 'departamento', 'campo', 'duplex', 'local_comercial', 'terreno');

-- CreateTable
CREATE TABLE "admin" (
    "id_admin" SERIAL NOT NULL,
    "admin_email" VARCHAR(255) NOT NULL,
    "admin_password" VARCHAR(255) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "characteristic" (
    "id_characteristic" SERIAL NOT NULL,
    "characteristic" VARCHAR(255) NOT NULL,
    "amount" INTEGER NOT NULL,
    "property_id" INTEGER NOT NULL,

    CONSTRAINT "Characteristic_pkey" PRIMARY KEY ("id_characteristic")
);

-- CreateTable
CREATE TABLE "property" (
    "id_property" SERIAL NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "property_type_id_property_type" "property_type_enum" NOT NULL,
    "categoria_id_category" "operation_enum" NOT NULL,
    "address" TEXT,

    CONSTRAINT "property_pkey" PRIMARY KEY ("id_property")
);

-- AddForeignKey
ALTER TABLE "characteristic" ADD CONSTRAINT "Characteristic_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("id_property") ON DELETE RESTRICT ON UPDATE CASCADE;

