/*
  Warnings:

  - You are about to drop the column `birthDate` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `age` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "birthDate",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "city" VARCHAR(70) NOT NULL,
ADD COLUMN     "zipCode" INTEGER NOT NULL;
