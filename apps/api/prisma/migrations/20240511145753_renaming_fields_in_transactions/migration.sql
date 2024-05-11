/*
  Warnings:

  - You are about to drop the column `price` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `redeemPoints` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `amount` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `price`,
    DROP COLUMN `redeemPoints`,
    ADD COLUMN `amount` INTEGER NOT NULL,
    ADD COLUMN `redeemedPoints` INTEGER NULL;
