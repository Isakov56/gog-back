const express = require("express")
const {getGames, writeGames} = require("../lib/fsUtilities")
const uniqid = require("uniqid")

const gamesRouter = express.Router()

gamesRouter.get("/", async (req, res, next) => {
    const gamesDB = await getGames()
    res.status(200).send(gamesDB)
})
gamesRouter.get("/:id", async (req, res, next) => {
    gamesDB = await getGames()
    const index = gamesDB.find(game => game.id === req.params.id)

    if(!index){
        const error = new Error()
        error.httpStatusCode = 404
        next(error)
    }else{
        const gameFound = gamesDB.filter(game => game.id === req.params.id)
        res.send(gameFound)
    }
})
gamesRouter.post("/", async (req, res, next) => {
    const gamesDB = await getGames()
    gamesDB.push({
        ...req.body,
        id: uniqid(),
        createdAt: new Date(),
    })

    await writeGames(gamesDB)
    res.status(201).send("Posted seccessfully!")
})
gamesRouter.put("/:id", async (req, res, next) => {
    const gamesDB = await getGames()
    const indexFound = gamesDB.findIndex(game => game.id === req.params.id)

    if(indexFound !== -1){
        const updatedGames =[...gamesDB.slice(0, indexFound),{...gamesDB[indexFound], ...req.body}, ...gamesDB.slice(indexFound + 1)]
        await writeGames(updatedGames)
        res.send(updatedGames)
    }else{
        const err = new Error()
        err.httpStatusCode = 404
        next(err)
    }
})
gamesRouter.delete("/:id", async (req, res, next) => {
    const gamesDB = await getGames()
    const gameFound = gamesDB.find(game => game.id === req.params.id)

    if(!gameFound){
        const error = new Error()
        error.httpStatusCode = 404
        next(error)
    }else{
        const newDB = await gamesDB.filter(game => game.id !== req.params.id)
        await writeGames(newDB)
        res.send("Deleted succsessfully!")
    }
})

module.exports = gamesRouter