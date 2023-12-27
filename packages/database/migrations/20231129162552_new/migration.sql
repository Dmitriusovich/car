/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Approver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Avatar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MembersOnProjects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RefreshToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoleEdge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubordinateToRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SystemSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RentStatusEnum" AS ENUM ('Placed', 'Accepted', 'Rejected', 'During', 'Completed', 'Canceled');

-- CreateEnum
CREATE TYPE "UnitTypeEnum" AS ENUM ('Metric', 'Imperial');

-- CreateEnum
CREATE TYPE "FuelTypeEnum" AS ENUM ('Gas', 'Diesel', 'Electric', 'Hybrid');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Approver" DROP CONSTRAINT "Approver_approver_id_fkey";

-- DropForeignKey
ALTER TABLE "Approver" DROP CONSTRAINT "Approver_project_id_fkey";

-- DropForeignKey
ALTER TABLE "Approver" DROP CONSTRAINT "Approver_request_id_fkey";

-- DropForeignKey
ALTER TABLE "MembersOnProjects" DROP CONSTRAINT "MembersOnProjects_projectId_fkey";

-- DropForeignKey
ALTER TABLE "MembersOnProjects" DROP CONSTRAINT "MembersOnProjects_role_id_fkey";

-- DropForeignKey
ALTER TABLE "MembersOnProjects" DROP CONSTRAINT "MembersOnProjects_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_userId_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_requester_id_fkey";

-- DropForeignKey
ALTER TABLE "RoleEdge" DROP CONSTRAINT "RoleEdge_boss_id_fkey";

-- DropForeignKey
ALTER TABLE "RoleEdge" DROP CONSTRAINT "RoleEdge_subordinate_id_fkey";

-- DropForeignKey
ALTER TABLE "SubordinateToRole" DROP CONSTRAINT "SubordinateToRole_role_id_fkey";

-- DropForeignKey
ALTER TABLE "SubordinateToRole" DROP CONSTRAINT "SubordinateToRole_subordinate_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_avatar_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_global_role_id_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Approver";

-- DropTable
DROP TABLE "Avatar";

-- DropTable
DROP TABLE "MembersOnProjects";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "RefreshToken";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "Request";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "RoleEdge";

-- DropTable
DROP TABLE "SubordinateToRole";

-- DropTable
DROP TABLE "SystemSettings";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "EImageTypeGender";

-- DropEnum
DROP TYPE "EProjectStatus";

-- DropEnum
DROP TYPE "ERequestStatus";

-- DropEnum
DROP TYPE "ERequestType";

-- DropEnum
DROP TYPE "ERolePermission";

-- DropEnum
DROP TYPE "ESystemSettingsParams";

-- DropEnum
DROP TYPE "EUserStatus";

-- CreateTable
CREATE TABLE "Rental" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "unitTypeId" INTEGER NOT NULL,

    CONSTRAINT "Rental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalManager" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "activationToken" TEXT,
    "activationTokenExpiration" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rentalId" INTEGER NOT NULL,

    CONSTRAINT "RentalManager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitType" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "name" "UnitTypeEnum" NOT NULL,

    CONSTRAINT "UnitType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FuelType" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "name" "FuelTypeEnum" NOT NULL,

    CONSTRAINT "FuelType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "brand" VARCHAR(30) NOT NULL,
    "model" VARCHAR(50) NOT NULL,
    "year" INTEGER NOT NULL,
    "description" TEXT,
    "mileage" INTEGER NOT NULL,
    "licensePlate" VARCHAR(20) NOT NULL,
    "pricePerDay" DECIMAL NOT NULL,
    "name" VARCHAR(50),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fuelTypeId" INTEGER NOT NULL,
    "rentalId" INTEGER NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleEquipment" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "VehicleEquipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleService" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "VehicleService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehiclePhoto" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "VehiclePhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rent" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "notes" TEXT NOT NULL,
    "status" "RentStatusEnum" NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Rent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "firstName" VARCHAR(30) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "birthDate" DATE NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "phoneNumber" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rental_uuid_key" ON "Rental"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "RentalManager_uuid_key" ON "RentalManager"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "RentalManager_email_key" ON "RentalManager"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UnitType_uuid_key" ON "UnitType"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "FuelType_uuid_key" ON "FuelType"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_uuid_key" ON "Vehicle"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleEquipment_uuid_key" ON "VehicleEquipment"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleService_uuid_key" ON "VehicleService"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "VehiclePhoto_uuid_key" ON "VehiclePhoto"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Rent_uuid_key" ON "Rent"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Rent_customerId_key" ON "Rent"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_uuid_key" ON "Customer"("uuid");

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_unitTypeId_fkey" FOREIGN KEY ("unitTypeId") REFERENCES "UnitType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalManager" ADD CONSTRAINT "RentalManager_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "Rental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_fuelTypeId_fkey" FOREIGN KEY ("fuelTypeId") REFERENCES "FuelType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "Rental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleEquipment" ADD CONSTRAINT "VehicleEquipment_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleService" ADD CONSTRAINT "VehicleService_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehiclePhoto" ADD CONSTRAINT "VehiclePhoto_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
