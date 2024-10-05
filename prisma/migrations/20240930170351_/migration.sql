-- CreateTable
CREATE TABLE `refer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parentCommission` INTEGER NOT NULL DEFAULT 50,
    `notReferCommission` INTEGER NOT NULL DEFAULT 0,
    `mwa` INTEGER NOT NULL DEFAULT 1,
    `usdt` INTEGER NOT NULL DEFAULT 80,
    `address` VARCHAR(500) NOT NULL DEFAULT '0x807A10D4426Bae24560f0499f561aC67e05c3BC4',
    `privatekey` VARCHAR(500) NOT NULL DEFAULT '0x240ba84803d2d38c422fc6d3c7d6bc70049d3221ad9bcefe9e7720c7f92d3ecf',
    `mda` INTEGER NOT NULL DEFAULT 1,
    `nxbt` INTEGER NOT NULL DEFAULT 1,
    `childrenCommission` INTEGER NOT NULL DEFAULT 100,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bonus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level1` DOUBLE NOT NULL DEFAULT 0.25,
    `level2` DOUBLE NOT NULL DEFAULT 0.2,
    `level3` DOUBLE NOT NULL DEFAULT 0.15,
    `level4` DOUBLE NOT NULL DEFAULT 0.1,
    `level5` DOUBLE NOT NULL DEFAULT 0.05,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` VARCHAR(50) NOT NULL DEFAULT '0',
    `email` VARCHAR(191) NOT NULL DEFAULT '0',
    `phone` VARCHAR(20) NOT NULL DEFAULT '0',
    `token` VARCHAR(500) NOT NULL DEFAULT '0',
    `name_user` VARCHAR(50) NOT NULL DEFAULT '0',
    `password` VARCHAR(50) NOT NULL DEFAULT '0',
    `money` INTEGER NOT NULL DEFAULT 0,
    `deposit` INTEGER NOT NULL DEFAULT 0,
    `code` VARCHAR(30) NOT NULL DEFAULT '0',
    `invite` VARCHAR(30) NOT NULL DEFAULT '0',
    `veri` INTEGER NOT NULL DEFAULT 0,
    `otp` VARCHAR(10) NOT NULL DEFAULT '0',
    `ip_address` VARCHAR(50) NOT NULL DEFAULT '0',
    `status` INTEGER NOT NULL DEFAULT 0,
    `time` VARCHAR(50) NOT NULL DEFAULT '0',
    `time_otp` VARCHAR(50) NOT NULL DEFAULT '0',
    `referrals` INTEGER NOT NULL DEFAULT 0,
    `approvedReferrals` VARCHAR(191) NULL,
    `earnedCommission` INTEGER NOT NULL DEFAULT 0,
    `pendingCommission` INTEGER NOT NULL DEFAULT 0,
    `pendingReferrals` VARCHAR(191) NULL,
    `level1` INTEGER NOT NULL DEFAULT 0,
    `level2` INTEGER NOT NULL DEFAULT 0,
    `level3` INTEGER NOT NULL DEFAULT 0,
    `level4` INTEGER NOT NULL DEFAULT 0,
    `level5` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wingo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `period` VARCHAR(100) NOT NULL,
    `game` VARCHAR(10) NOT NULL DEFAULT '0',
    `status` INTEGER NOT NULL DEFAULT 0,
    `time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `result` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `betwingo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_product` VARCHAR(191) NOT NULL DEFAULT '',
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `phone` VARCHAR(20) NOT NULL DEFAULT '0',
    `email` VARCHAR(500) NOT NULL DEFAULT '',
    `stage` VARCHAR(255) NOT NULL DEFAULT '0',
    `result` INTEGER NOT NULL DEFAULT 0,
    `betAmount` DECIMAL(65, 30) NOT NULL DEFAULT 0.000000000000000000000000000000,
    `fee` DECIMAL(65, 30) NOT NULL DEFAULT 0.000000000000000000000000000000,
    `get` DECIMAL(65, 30) NOT NULL DEFAULT 0.000000000000000000000000000000,
    `game` VARCHAR(50) NOT NULL DEFAULT '0',
    `bet` VARCHAR(10) NOT NULL DEFAULT '0',
    `status` INTEGER NOT NULL DEFAULT 0,
    `time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cur` VARCHAR(191) NOT NULL DEFAULT 'nxbt',
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `phone` VARCHAR(20) NOT NULL DEFAULT '0',
    `name_user` VARCHAR(50) NOT NULL DEFAULT '0',
    `points` INTEGER NOT NULL DEFAULT 0,
    `token` INTEGER NOT NULL DEFAULT 0,
    `type` VARCHAR(191) NOT NULL DEFAULT 'd',
    `game` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '0',
    `receiver` VARCHAR(500) NOT NULL DEFAULT '0',
    `sender` VARCHAR(500) NOT NULL DEFAULT '0',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `crashedplane` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nl` VARCHAR(191) NOT NULL DEFAULT '1',
    `nh` VARCHAR(191) NOT NULL DEFAULT '10',
    `sl` VARCHAR(191) NOT NULL DEFAULT '1',
    `sh` VARCHAR(191) NOT NULL DEFAULT '3',
    `sp` VARCHAR(191) NOT NULL DEFAULT '70',
    `sm` VARCHAR(191) NOT NULL DEFAULT '1.3',
    `ml` VARCHAR(191) NOT NULL DEFAULT '1',
    `mh` VARCHAR(191) NOT NULL DEFAULT '2',
    `mr` VARCHAR(191) NOT NULL DEFAULT '10',
    `da` VARCHAR(191) NOT NULL DEFAULT '40',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aviator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone` VARCHAR(50) NOT NULL DEFAULT '0',
    `betAmount` INTEGER NOT NULL,
    `withdrawAmount` INTEGER NOT NULL DEFAULT 0,
    `multiplier` DOUBLE NOT NULL DEFAULT 0,
    `betTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `withdrawTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `autoaviator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone` VARCHAR(50) NOT NULL DEFAULT '0',
    `betAmount` INTEGER NOT NULL,
    `withdrawAmount` INTEGER NOT NULL DEFAULT 0,
    `multiplier` DOUBLE NOT NULL DEFAULT 0,
    `betTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `withdrawTime` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bettime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time` VARCHAR(191) NOT NULL DEFAULT '0',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wingo1` VARCHAR(255) NOT NULL DEFAULT '''-1''',
    `wingo3` VARCHAR(255) NOT NULL DEFAULT '''-1''',
    `wingo5` VARCHAR(255) NOT NULL DEFAULT '''-1''',
    `wingo10` VARCHAR(255) NOT NULL DEFAULT '''-1''',
    `password` VARCHAR(191) NULL DEFAULT 'admin@123',
    `visiblepassword` VARCHAR(191) NULL DEFAULT 'admin@123',
    `username` VARCHAR(191) NOT NULL DEFAULT 'admin',
    `period1` VARCHAR(100) NOT NULL DEFAULT 'admin@123',
    `period10` VARCHAR(100) NOT NULL DEFAULT 'admin@123',
    `period3` VARCHAR(100) NOT NULL DEFAULT 'admin@123',
    `period5` VARCHAR(100) NOT NULL DEFAULT 'admin@123',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pendingUsers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `invite` VARCHAR(30) NOT NULL DEFAULT '0',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
