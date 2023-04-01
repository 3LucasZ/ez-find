/*
  Warnings:

  - You are about to drop the `StorageUnit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StoragesOnItems" DROP CONSTRAINT "StoragesOnItems_storageId_fkey";

-- DropTable
DROP TABLE "StorageUnit";

-- CreateTable
CREATE TABLE "Storage" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Storage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Storage_name_key" ON "Storage"("name");

-- AddForeignKey
ALTER TABLE "StoragesOnItems" ADD CONSTRAINT "StoragesOnItems_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
