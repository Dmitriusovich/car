/*
  Warnings:

  - Added the required column `dropOffId` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickUpId` to the `Rent` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Customer_email_key";

-- AlterTable
ALTER TABLE "Rent" ADD COLUMN     "dropOffId" INTEGER NOT NULL,
ADD COLUMN     "pickUpId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_uuid_key" ON "Location"("uuid");

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_pickUpId_fkey" FOREIGN KEY ("pickUpId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_dropOffId_fkey" FOREIGN KEY ("dropOffId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
