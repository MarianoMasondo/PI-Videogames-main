const axios = require("axios");
require('dotenv').config();
const apikey = process.env.API_KEY;
const URL = `https://api.rawg.io/api/genres?key=${apikey}`;
const { Genres } = require("../db");

const allGenres = async () => {
    const response = await axios.get(URL);

    const data = response.data.results;

    const nameGenres  = data.map(n => n.name);

    const genreCount = await Genres.count();
    if(genreCount === 0){
        const genreData = nameGenres.map(name => ({name}))
        await Genres.bulkCreate(genreData);
        return genreData;
    }

    const genresFromDatabase = await Genres.findAll(
        {
          attributes: ["name"],  
        }
    );

    const genreNamesFromDatabase = genresFromDatabase.map(genres => (genres));
    return genreNamesFromDatabase;
}

module.exports = allGenres;