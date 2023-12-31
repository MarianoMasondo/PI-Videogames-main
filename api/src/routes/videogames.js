const { Router } = require("express");
const { getAllVideogames } = require("../handlers/getVideogames");
const { getIdVideogames } = require("../handlers/idVideogames");
const { getNameVideogames } = require("../handlers/nameVideogames");
const postCreateVideogames = require("../handlers/createVideogames");

const videoRoutes = Router();

videoRoutes.get("/", getAllVideogames);
videoRoutes.get("/name", getNameVideogames);
videoRoutes.get("/:id", getIdVideogames);
videoRoutes.post("/", postCreateVideogames);

module.exports = videoRoutes;
