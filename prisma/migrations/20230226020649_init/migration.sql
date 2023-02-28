/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "locations" TEXT[];

-- CreateTable
CREATE TABLE "StorageUnit" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "items" TEXT[],

    CONSTRAINT "StorageUnit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StorageUnit_name_key" ON "StorageUnit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");
