const axios = require("axios");
const { Videogames, Genres } = require("../db");
const { Op } = require("sequelize");

const apiKey = process.env.API_KEY;

const nameDataGames = async (name) => {
  const URL = `https://api.rawg.io/api/games?search=${name}&key=${apiKey}&page_size=15`;

  try {
    const response = await axios.get(URL);

    const apiData = response.data.results.map(
      ({ id, name, platforms, background_image, released, rating, genres }) => ({
        id,
        name,
        platforms,
        image: background_image,
        released,
        rating,
        genres: genres.map((genre) => genre.name),
        createDB: false,
      }),
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
      ({ id, name, description, platforms, image, released, rating, genres, createDB }) => ({
        id,
        name,
        description,
        platforms,
        image,
        released,
        rating,
        genres: genres.map((genre) => genre.name),
        createDB,
      }),
    );

    if (apiData.length === 0 && dbDataGames.length === 0) {
      return { message: "No se encontraron videojuegos con este nombre" };
    }

    const allData = [...dbDataGames, ...apiData];

    return allData.slice(0, 15);
  } catch (error) {
    console.error("Error real en nameVideogames:", error);
    throw new Error("Error al buscar los juegos");
  }
};

module.exports = nameDataGames;