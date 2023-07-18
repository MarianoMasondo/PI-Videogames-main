const allDataVideogames = require("../controllers/videoGamesController");

const getAllVideogames = async (req, res) => {
  try {
    const videoGames = await allDataVideogames();
    res.status(200).json(videoGames);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getAllVideogames };
