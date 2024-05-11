-- DropIndex
DROP INDEX `vouchers_name_key` ON `vouchers`;

-- AlterTable
ALTER TABLE `vouchers` MODIFY `expiryDate` DATETIME(3) NULL;
