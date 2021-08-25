import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query("INSERT INTO `departments` (`dpId`, `dpName`) VALUES (1, 'HR')");
    await queryInterface.sequelize.query("INSERT INTO `departments` (`dpId`, `dpName`) VALUES (2, 'Finance')");
    await queryInterface.sequelize.query("INSERT INTO `departments` (`dpId`, `dpName`) VALUES (3, 'Tech')");
    await queryInterface.sequelize.query("INSERT INTO `users` (`id`, `email`, `password`) VALUES ('10adf9d0-f1ee-4c85-b8a7-7849b05047f5', 'valerii_ign@gmail.com', '$2a$10$n6Ypt82gzp.ebzsr8bbnDuPUhWTFZtTlrQRkzC8HQR7rX0yRJqs.K')");
    await queryInterface.sequelize.query("INSERT INTO `users` (`id`, `email`, `password`) VALUES ('6303dbd6-bfa1-4150-bf5e-fd0182f48626', 'john_smith@mail.com', '$2a$10$Dqr/ncUt4rl/5agI/mXbLuP4aU9A/eL4L1d58mJKWyCnxJV..K3.6')");
    await queryInterface.sequelize.query("INSERT INTO `employees` (`id`, `name`, `active`, `dpId`, `userId`) VALUES (1, 'Lisa', 1, 1, '10adf9d0-f1ee-4c85-b8a7-7849b05047f5')");
    await queryInterface.sequelize.query("INSERT INTO `employees` (`id`, `name`, `active`, `dpId`, `userId`) VALUES (2, 'Erik', 1, 2, '6303dbd6-bfa1-4150-bf5e-fd0182f48626')");
    await queryInterface.sequelize.query("INSERT INTO `employees` (`id`, `name`, `active`, `dpId`, `userId`) VALUES (3, 'Don', 1, 3, '10adf9d0-f1ee-4c85-b8a7-7849b05047f5')");
    await queryInterface.sequelize.query("INSERT INTO `employees` (`id`, `name`, `active`, `dpId`, `userId`) VALUES (4, 'Peter', 0, 2, '6303dbd6-bfa1-4150-bf5e-fd0182f48626')");
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query("DELETE FROM `departments` WHERE `dpId` = 1");
    await queryInterface.sequelize.query("DELETE FROM `departments` WHERE `dpId` = 2");
    await queryInterface.sequelize.query("DELETE FROM `departments` WHERE `dpId` = 3");
    await queryInterface.sequelize.query("DELETE FROM `users` WHERE `id` = '10adf9d0-f1ee-4c85-b8a7-7849b05047f5'");
    await queryInterface.sequelize.query("DELETE FROM `users` WHERE `id` = '6303dbd6-bfa1-4150-bf5e-fd0182f48626'");
    await queryInterface.sequelize.query("DELETE FROM `employees` WHERE `id` = 1");
    await queryInterface.sequelize.query("DELETE FROM `employees` WHERE `id` = 2");
    await queryInterface.sequelize.query("DELETE FROM `employees` WHERE `id` = 3");
    await queryInterface.sequelize.query("DELETE FROM `employees` WHERE `id` = 4");
  }
};
