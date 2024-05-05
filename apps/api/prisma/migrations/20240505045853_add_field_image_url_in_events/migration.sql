/*
  Warnings:

  - Added the required column `imageURL` to the `events` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `limitCheckout` on table `events` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `events` ADD COLUMN `imageURL` VARCHAR(191) NOT NULL,
    MODIFY `description` TEXT NOT NULL,
    MODIFY `limitCheckout` INTEGER NOT NULL,
    MODIFY `isActive` BOOLEAN NOT NULL DEFAULT true;
