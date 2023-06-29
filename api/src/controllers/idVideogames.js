const axios = require("axios");
const apiKey = process.env.API_KEY;
const { videoGames } = require("../db")

const idDataGames = async (id) => {
    
    if(id.length <= 4){
        const URL = `https://api.rawg.io/api/games/${id}?key=${apiKey}&page_size=40`;
        
        const response = await axios.get(URL);
        const data = response.data;      
        
        const idDataGame = {
            id: data.id,
            name: data.name,
            description: data.description,
            platforms: data.platforms,
            image: data.background_image,
            released: data.released,
            rating: data.rating,
            genres: data.genres.map((g) => g.name),
        }
        console.log(idDataGames.length)
        return idDataGame;
    }else{
        const searchById = await videoGames.findByPk(id, {
            include: {
                model: Genres,
                attributes: ["name"],
                through: { attributes: []},
            }
        });
        
        return searchById;
        
    }
}
module.exports = idDataGames