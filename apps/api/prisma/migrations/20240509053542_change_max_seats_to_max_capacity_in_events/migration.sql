/*
  Warnings:

  - You are about to drop the column `maxSeats` on the `events` table. All the data in the column will be lost.
  - Added the required column `maxCapacity` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` DROP COLUMN `maxSeats`,
    ADD COLUMN `maxCapacity` INTEGER NOT NULL;
