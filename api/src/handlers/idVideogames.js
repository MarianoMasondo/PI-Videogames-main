const idDataGames = require("../controllers/idVideogames");

const getIdVideogames = async (req, res) => {
    const{id} = req.params;
    try {
        const gameData = await idDataGames(id)
        res.status(200).json(gameData)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = {getIdVideogames};