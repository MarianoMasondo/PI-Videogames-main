const axios = require("axios");
const { Videogames, Genres} = require("../db");
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
    const dbData = await Videogames.findAll({

        include:[{
            model: Genres,
            attributes: ["name"],
            through:{
                attributes: []
            }
        }],
        limit: 15,
    })
    console.log(dbData)
    const dbDataGames = dbData.map(({
        id,
        name,
        description,
        platforms,
        image,
        released,
        rating,
        genres,
        createDB
    }) => ({
        id: id,
        name: name,
        description: description,
        platforms: platforms,
        image: image,
        released: released,
        rating: rating,
        genres: genres.map(genre => genre.name),
        createDB
    }))
    

    // if(dataGames.length === 0 && dbDataGames.length === 0){
    //     return {message: "No se encontraron videojuegos con este nombre"}
    // }

    const allData = [...dataGames, ...dbDataGames];
    return allData;
    
}



module.exports = allDataVideogames
