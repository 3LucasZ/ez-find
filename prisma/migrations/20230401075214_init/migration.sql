/*
  Warnings:

  - You are about to drop the column `locations` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `items` on the `StorageUnit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "locations";

-- AlterTable
ALTER TABLE "StorageUnit" DROP COLUMN "items";

-- CreateTable
CREATE TABLE "StoragesOnItems" (
    "itemId" INTEGER NOT NULL,
    "storageId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StoragesOnItems_pkey" PRIMARY KEY ("itemId","storageId")
);

-- AddForeignKey
ALTER TABLE "StoragesOnItems" ADD CONSTRAINT "StoragesOnItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoragesOnItems" ADD CONSTRAINT "StoragesOnItems_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "StorageUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
