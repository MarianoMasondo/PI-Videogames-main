const postVideogames = require("../controllers/createVideogames")

const postCreateVideogames = async (req, res) => {
    const { name, description, platforms, image, released, rating, genres} = req.body;
    if(!name || !description || !platforms){
        return res.status(404).send("Faltan datos para crear el juego")
    }
    try {
        const createGame = await postVideogames(name, description, platforms, image, released, rating, genres);
        res.status(200).json(createGame);     
    } catch (error) {
        res.status(404).json({error: error.message})        
    }
}

module.exports = postCreateVideogames;