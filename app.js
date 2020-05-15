require("newrelic")
const express = require("express")
const axios = require("axios")
const session = require("express-session")
const db = require("knex")({
  client: "pg",
  connection: {
    user: "postgres",
    password: "test",
    database: "test",
  },
})

express()
  .use(
    session({
      secret: "a unique string used to secure the cookie e.g. 123k1j23l12312",
    })
  )
  .get("/session", (req, res) => {
    req.session.previousVisits += 1
    res.send(req.session)
  })
  .get("/", (req, res) => {
    res.send("Hello World!")
  })
  .get("/json", (req, res) => {
    // we can fetch data from anywhere and return JSON
    res.send({
      name: "Will Stern",
      hello: "world!",
    })
  })
  .get("/html", (req, res) => {
    // we can fetch data from anywhere and return html
    const pretendFetchedData = {
      name: "Will",
    }

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <h1>Hello ${pretendFetchedData.name}</h1>
      </body>
      </html>
    `)
  })
  .get("/hello/:name", (req, res) => {
    // we can break up the URL into variables
    // and do something dynamic with them
    res.send(`Hello ${req.params.name}!`)
  })
  .get("/github/:ghuser", async (req, res) => {
    // here we connect to another API to get data
    // this could be an internal API or a public one
    const response = await axios.get(
      `https://api.github.com/users/${req.params.ghuser}`
    )
    res.send(response.data)
  })
  .get("/users/:id", async (req, res) => {
    // we can connect to a database and use the ID from the url
    // to look up a profile and return it to the API response
    const user = await db("users").where("id", req.params.id).first()

    res.send(user)
  })
  .get("/users/with-github/:id", async (req, res) => {
    // we can connect multiple data sources together!
    // here we first fetch the user from the db,
    // then we use the github user from the user's profile to look up their github profile
    // and return both!
    const user = await db("users").where("id", req.params.id).first()
    const githubProfile = await axios.get(
      `https://api.github.com/users/${user.ghUsername}`
    )

    res.send({
      user,
      githubProfile: githubProfile.data,
    })
  })
  .listen(3000)
