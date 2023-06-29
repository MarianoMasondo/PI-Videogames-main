const  { Videogames, Genres }  = require("../db");

    const postVideogames = async (
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      genres,
    ) => {
    const newGame = await Videogames.create({
      
      name: name,
      description: description,
      platforms: platforms,
      image: background_image,
      released: released,
      rating: rating,
      
    });

    const addGenres = await Genres.findAll({
      where: {
        name: genres,
      }
    })

    await newGame.addGenre(addGenres);

    const gameRelation = await Videogames.findOne({
      where: {
        id: newGame.id,
      },
      include: [{
        model: Genres,
        attributes: ["name"],
        through: {
          attributes: []
        }
      }]
    })

    return gameRelation;

}

module.exports = postVideogames
