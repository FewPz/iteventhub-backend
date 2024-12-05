-- AlterTable
ALTER TABLE `Event` ADD COLUMN `descriptionEN` VARCHAR(191) NULL,
    ADD COLUMN `descriptionTH` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `EventTicketType` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `ticketType` ENUM('FREE', 'PAID') NOT NULL,
    `price` DOUBLE NOT NULL DEFAULT 0,
    `ticketName` VARCHAR(191) NOT NULL,
    `quantityAvailable` INTEGER NOT NULL,
    `isShowRemainingTicket` BOOLEAN NOT NULL DEFAULT false,
    `salesStartAt` DATETIME(3) NOT NULL,
    `salesEndAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventImage` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `poster_url` VARCHAR(191) NOT NULL,
    `cover_url` VARCHAR(191) NOT NULL,
    `square_url` VARCHAR(191) NULL,
    `background_url` VARCHAR(191) NULL,

    UNIQUE INDEX `EventImage_eventId_key`(`eventId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EventTicketType` ADD CONSTRAINT `EventTicketType_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventImage` ADD CONSTRAINT `EventImage_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
