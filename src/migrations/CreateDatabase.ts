import { QueryInterface } from "sequelize";

module.exports = {
    async up(queryInterface: QueryInterface) {
        await queryInterface.sequelize.query("CREATE TABLE `employees` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `active` boolean NOT NULL, `dpId` int NULL, `userId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryInterface.sequelize.query("CREATE TABLE `departments` (`dpId` int NOT NULL AUTO_INCREMENT, `dpName` varchar(255) NOT NULL, PRIMARY KEY (`dpId`)) ENGINE=InnoDB");
        await queryInterface.sequelize.query("CREATE TABLE `users` (`id` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryInterface.sequelize.query("ALTER TABLE `employees` ADD CONSTRAINT `FK_372ff3ccd43940e3c85d0d5f6f8` FOREIGN KEY (`dpId`) REFERENCES `departments`(`dpId`) ON DELETE SET NULL ON UPDATE SET NULL");
        await queryInterface.sequelize.query("ALTER TABLE `employees` ADD CONSTRAINT `FK_3095b66464b4350e69ef82a828e` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL");
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.sequelize.query("ALTER TABLE `employees` DROP FOREIGN KEY `FK_3095b66464b4350e69ef82a828e`");
        await queryInterface.sequelize.query("ALTER TABLE `employees` DROP FOREIGN KEY `FK_372ff3ccd43940e3c85d0d5f6f8`");
        await queryInterface.sequelize.query("DROP TABLE `users`");
        await queryInterface.sequelize.query("DROP TABLE `departments`");
        await queryInterface.sequelize.query("DROP TABLE `employees`");
    }
};
