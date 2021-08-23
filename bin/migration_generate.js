const fs = require("fs").promises;
const path = require("path");

function getArgs() {
  const args = process.argv;

  if (args.length !== 4) {
    return usage("Incorrect number of arguments specified", args);
  }

  // check if directory exists
  const migrationPath = path.resolve(args[2]);
  const migrationName = String(args[3]);

  return {
    migrationPath,
    migrationName
  };
}

function usage(msg, args = []) {
  if (msg) {
    console.log(msg);
  }
  console.log(`Usage: ${args[1]} <migration directory> <migration name>`);
  console.log(`Example: ${args[1]} ./migrations test-migration`);
  process.exit(1);
}

async function createMigration(args) {
  const migrationFilename = path.join(args.migrationPath, `${args.migrationName}.ts`);

  console.log(`Generating migration ${migrationFilename}`);
  await fs.writeFile(migrationFilename, `import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    // await queryInterface.sequelize.query("");
  },

  async down(queryInterface: QueryInterface) {
    // await queryInterface.sequelize.query("");
  }
};
`);
  console.log(`New migration was created at ${migrationFilename}`);
}

createMigration(getArgs());
