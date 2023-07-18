const { Router } = require("express");
const getAllGenres = require("../handlers/genres");

const genresRoutes = Router();

genresRoutes.get("/", getAllGenres);

module.exports = genresRoutes;
