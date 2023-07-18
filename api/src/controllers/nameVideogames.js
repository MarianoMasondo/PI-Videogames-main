const axios = require("axios");
const apiKey = process.env.API_KEY;
const { Videogames, Genres } = require("../db");
const { Op } = require("sequelize");

const nameDataGames = async (name) => {
  const URL = `https://api.rawg.io/api/games?search=${name}&key=${apiKey}&page_size=15`;

  try {
    const response = await axios.get(URL);
    const apiData = response.data.results.map(
      ({
        id,
        name,
        // description,
        platforms,
        background_image,
        released,
        rating,
        genres,
      }) => ({
        id: id,
        name: name,
        // description: description,
        platforms: platforms,
        image: background_image,
        released: released,
        rating: rating,
        genres: genres.map((g) => g.name),
      })
    );

    const dbData = await Videogames.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: Genres,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
      limit: 15,
    });
    const dbDataGames = dbData.map(
      ({
        id,
        name,
        description,
        platforms,
        background_image,
        released,
        rating,
        Genres,
      }) => ({
        id: id,
        name: name,
        description: description,
        platforms: platforms,
        image: background_image,
        released: released,
        rating: rating,
        genres: Genres.map((genre) => genre.name),
      })
    );

    if (apiData.length === 0 && dbDataGames.length === 0) {
      return { message: "No se encontraron videojuegos con este nombre" };
    }

    const allData = [apiData, dbData];
    return allData;
  } catch (error) {
    throw new Error("Error al buscar los juegos");
  }
};

module.exports = nameDataGames;
