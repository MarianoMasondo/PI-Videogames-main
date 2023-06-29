const axios = require("axios");
const apiKey = process.env.API_KEY;
const { Videogames } = require("../db");
const { Op } = require("sequelize");


const nameDataGames = async (name) => {
    const URL = `https://api.rawg.io/api/games?search=${name}&key=${apiKey}&page_size=15`;

    try{
        const response = await axios.get(URL);
        const apiData = response.data.results.map(         
            ({
                id,
                name,
                description,
                platforms,
                background_image,
                released,
                rating,
            }) => ({
                
                id: id,
                name: name,
                description: description,
                platforms: platforms,
                image: background_image,
                released: released,
                rating: rating,
            })
        );
        console.log(apiData.length)

        const dbData = await Videogames.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            limit: 15,
        })
        

        if(apiData.length === 0 && dbData.length === 0){
            return {message: "No se encontraron videojuegos con este nombre"}
        }

        const allData = [apiData, dbData];
        return allData;

    }catch(error){
        throw new Error("Error al buscar los juegos")
    }
}

module.exports = nameDataGames;
