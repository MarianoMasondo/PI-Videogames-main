const nameDataGames = require("../controllers/nameVideogames");

const getNameVideogames =  async(req, res) => {
    const getName = req.query.name.toLowerCase();
    try{
        const videoGames = await nameDataGames(getName);
        res.status(200).json(videoGames);
    }catch(error){
        res.status(404).json({error: error.message});
    } 
}
module.exports = {getNameVideogames};