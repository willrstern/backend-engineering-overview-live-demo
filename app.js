// Ah packages...they do all the heavy lifting for us, so we can focus on coding
require("newrelic")
const express = require("express")
const axios = require("axios")
const session = require("express-session")

// Normally, I would move this into it's own file db.js that exports `db` so any file can require and use it
// Also, the password values (called "secrets") wouldn't exist in the codebase
// The place you run your container (e.g. AWS, Digital Ocean) allows you to configure "secrets" for your containers
// e.g. you could set a secret DB_PASSWORD = "test" in AWS,
// then change password: "test" to password: process.env.DB_PASSWORD in this file ezpz, now my code in GitHub is secured!
const db = require("knex")({
  client: "pg",
  connection: {
    user: "postgres",
    password: "test",
    database: "test",
  },
})

express()
  // .use applies "middleware" - meaning, it will interact with every request in some way
  // in this case, it sets a cookie so we can follow the user
  // then creates an in-memory session...useful for dev or prototyping
  // it adds req.session to every request that we recieve
  // in-memory means that every time the app restarts, all sessions disappear (not good)
  // it also means that I can't scale and run 2 servers - user sessions on server 1 wouldn't be on server 2
  // so normally, there would be some extra configuration that specifies a Redis database instead of in-memory
  // every server talks to the same redis database for sessions
  .use(
    session({
      secret: "a unique string used to secure the cookie e.g. 123k1j23l12312",
    })
  )
  .get("/", (req, res) => {
    res.send("Hello World!")
  })
  .get("/session", (req, res) => {
    // set a value on the user's session!
    // any other route here has access to req.session, and could also set values or read req.session.previousVisits
    req.session.previousVisits += 1
    res.send(req.session)
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
    const pretendWeFetchedDataFromSomewhere = {
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
        <h1>Hello ${pretendWeFetchedDataFromSomewhere.name}</h1>
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
    // this could be an internal/private API or a public one
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
    // then we use the github username from the user's profile to look up their github profile
    // and return both pieces of data!
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
