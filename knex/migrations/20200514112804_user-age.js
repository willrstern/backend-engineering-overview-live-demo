exports.up = function (knex) {
  // add "age" column to users table
  return knex.schema.alterTable("users", (table) => {
    table.integer("age")
  })
}

exports.down = function (knex) {
  // remove "age" column from users table
  return knex.schema.alterTable("users", (table) => {
    table.dropColumn("age")
  })
}
