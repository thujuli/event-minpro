/*
  Warnings:

  - Added the required column `originalAmount` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `discountedAmount` INTEGER NULL,
    ADD COLUMN `originalAmount` INTEGER NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `transaction_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transaction_details` ADD CONSTRAINT `transaction_details_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
