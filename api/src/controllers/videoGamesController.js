const axios = require("axios");
require('dotenv').config();
const apikey = process.env.API_KEY;
const URL = `https://api.rawg.io/api/games?key=${apikey}&page_size=40`;
const pageNum = 4;


const allDataVideogames = async () => {

    let response = [];
    let allResponse = [];

    for(let i = 1; i < pageNum; i++){
        response = await Promise.all([...response, axios.get(`${URL}&page=${i}`)])
    }

    response.forEach(element => {
        allResponse = allResponse.concat(element.data.results);
    })

    const dataGames = allResponse.map(           
        ({
            id,
            name,
            description,
            platforms,
            background_image,
            released,
            rating,
            genres
        }) => ({
            
            id: id,
            name: name,
            description: description,
            platforms: platforms,
            image: background_image,
            released: released,
            rating: rating,
            genres: genres.map(genre => genre.name)
        })
    )   
    console.log(dataGames.length)
    return dataGames;
    
}


module.exports = allDataVideogames
