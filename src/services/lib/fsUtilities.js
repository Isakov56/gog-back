const { readJson, writeJson } = require("fs-extra")
const {join } = require("path")

const gamesPtah = join(__dirname, "../games/games.json")

const readDB = async filePath => {
    try{
        const fileJson = await readJson(filePath)
        return fileJson
    }catch(error){
        throw new Error(error)
    }
}

const writeDB = async (filePath, fileContent) => {
    try{
        await writeJson(filePath, fileContent)
    }catch(error){
        throw new Error(error)
    }
}

module.exports = {
    getGames: async ()=> readDB(gamesPtah),
    writeGames: async gamesData => writeDB(gamesPtah, gamesData)
}