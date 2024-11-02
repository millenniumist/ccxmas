/*
  Warnings:

  - Added the required column `firstName` to the `ChristmasRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `christmasregistration` ADD COLUMN `firstName` VARCHAR(191) NOT NULL;
