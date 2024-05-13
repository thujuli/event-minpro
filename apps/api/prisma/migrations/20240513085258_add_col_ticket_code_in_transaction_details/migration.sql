/*
  Warnings:

  - Added the required column `ticketCode` to the `transaction_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction_details` ADD COLUMN `ticketCode` VARCHAR(191) NOT NULL;
