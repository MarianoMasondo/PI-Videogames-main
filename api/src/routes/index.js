const { Router } = require('express');
const videoRoutes = require('./videogames');
const genresRoutes = require('./genres');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videoRoutes)
router.use("/genres", genresRoutes)

module.exports = router;
