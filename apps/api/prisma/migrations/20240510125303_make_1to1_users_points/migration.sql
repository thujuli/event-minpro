/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `points` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pointId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `pointId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `points_userId_key` ON `points`(`userId`);
