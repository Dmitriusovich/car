/*
  Warnings:

  - You are about to drop the column `name` on the `VehicleEquipment` table. All the data in the column will be lost.
  - Added the required column `key` to the `VehicleEquipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `VehicleEquipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VehicleEquipment" DROP COLUMN "name",
ADD COLUMN     "key" VARCHAR(100) NOT NULL,
ADD COLUMN     "value" VARCHAR(100) NOT NULL;
