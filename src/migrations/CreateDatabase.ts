import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query("CREATE TABLE `employees` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `active` boolean() NOT NULL, `webhook_secret` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
  },

  async down(queryInterface: QueryInterface) {
    // await queryInterface.sequelize.query("");
  }
};
