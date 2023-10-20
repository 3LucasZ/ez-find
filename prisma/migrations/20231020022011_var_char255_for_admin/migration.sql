/*
  Warnings:

  - You are about to alter the column `email` on the `Admin` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "email" SET DATA TYPE VARCHAR(255);
