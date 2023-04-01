/*
  Warnings:

  - You are about to drop the `StoragesOnItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StoragesOnItems" DROP CONSTRAINT "StoragesOnItems_itemId_fkey";

-- DropForeignKey
ALTER TABLE "StoragesOnItems" DROP CONSTRAINT "StoragesOnItems_storageId_fkey";

-- DropTable
DROP TABLE "StoragesOnItems";

-- CreateTable
CREATE TABLE "_ItemToStorage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToStorage_AB_unique" ON "_ItemToStorage"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToStorage_B_index" ON "_ItemToStorage"("B");

-- AddForeignKey
ALTER TABLE "_ItemToStorage" ADD CONSTRAINT "_ItemToStorage_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToStorage" ADD CONSTRAINT "_ItemToStorage_B_fkey" FOREIGN KEY ("B") REFERENCES "Storage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
