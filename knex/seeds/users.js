exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { firstName: "Will", lastName: "Stern", ghUser: "willrstern" },
        { firstName: "Ric", lastName: "Elias", ghUser: "ricstrodinary" },
      ])
    })
}
