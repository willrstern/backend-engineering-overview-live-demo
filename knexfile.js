// this is a file that knexjs.org has you setup so migrations and seeds can connect to the database
// normally, the password values (called "secrets") wouldn't exist in the codebase
// you would enter them into CircleCI as Secrets and then CircleCI would add them as "environment variables"
// e.g. you could set a secret DB_PASSWORD = "test" in CircleCI
// then change password: "test" to password: process.env.DB_PASSWORD in this file
module.exports = {
  client: "pg",
  connection: {
    user: "postgres",
    password: "test",
    database: "test",
  },
  migrations: {
    directory: `${__dirname}/knex/migrations`,
    tableName: "knex_migrations",
  },
  seeds: {
    directory: `${__dirname}/knex/seeds`,
  },
}
