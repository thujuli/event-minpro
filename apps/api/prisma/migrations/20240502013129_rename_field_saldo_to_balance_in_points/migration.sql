/*
  Warnings:

  - You are about to drop the column `saldo` on the `points` table. All the data in the column will be lost.
  - Added the required column `balance` to the `points` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `points` DROP COLUMN `saldo`,
    ADD COLUMN `balance` INTEGER NOT NULL;
