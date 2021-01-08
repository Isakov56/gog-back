const express = require("express")
require("dotenv").config()
const listEndpoints = require("express-list-endpoints")
const cors =require("cors")
const gamesRouter = require("./services/games")
const {
    notFoundHandler,
    badRequistHandler,
    unauthorizedHandler,
    forbiddenHandler,
    catchAllHandler
} = require("./errorHandling")

const server = express()

server.use(cors())

server.use(express.json())

server.use("/games", gamesRouter)

const port = process.env.PORT || 3002

server.use(notFoundHandler)
server.use(badRequistHandler)
server.use(unauthorizedHandler)
server.use(forbiddenHandler)
server.use(catchAllHandler)

console.log(listEndpoints(server))

server.listen(port, ()=> console.log("Server is running on port ", port))