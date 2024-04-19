const { Router, request, response } = require("express");

const usersRouter = require("./users.routes");
const dishesRouter = require("./dishes.routes");
const favoritesRouter = require("./favorites.routes");
const resquestsRouter = require('./requests.routes');

const router = Router();
router.use("/users", usersRouter);
router.use('/dishes', dishesRouter);
router.use('/favorites', favoritesRouter);
router.use('/requests', resquestsRouter);

router.get('/', (request, response) =>
  response.send(`<h1>Welcome API FoodExplorer</h1>`));

module.exports = router;