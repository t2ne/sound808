/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     description: Returns a list of all movies from the database.
 *     responses:
 *       200:
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   genre:
 *                     type: string
 */
module.exports = (app) => {
  const movies = require("../controllers/movie.controller.js");
  let router = require("express").Router();

  // Consultar todos os filmes
  router.get("/", movies.selectAll);

  /**
   * @swagger
   * /api/movies/{id}:
   *   get:
   *     summary: Get a movie by ID
   *     description: Returns a single movie based on the ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: The movie ID
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: The movie details
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 title:
   *                   type: string
   *                 genre:
   *                   type: string
   */
  // Consultar um filme pelo id
  router.get("/:id", movies.findById);

  /**
   * @swagger
   * /api/movies:
   *   post:
   *     summary: Insert a new movie
   *     description: Adds a new movie to the database
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               genre:
   *                 type: string
   *     responses:
   *       201:
   *         description: Movie created successfully
   */
  // Inserir um novo filme
  router.post("/", movies.insert);

  /**
   * @swagger
   * /api/movies/{id}:
   *   put:
   *     summary: Update a movie by ID
   *     description: Updates an existing movie in the database
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: The movie ID
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               genre:
   *                 type: string
   *     responses:
   *       200:
   *         description: Movie updated successfully
   */
  // Atualizar um filme pelo id
  router.put("/:id", movies.update);

  /**
   * @swagger
   * /api/movies/{id}:
   *   delete:
   *     summary: Delete a movie by ID
   *     description: Deletes a movie from the database by its ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: The movie ID
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Movie deleted successfully
   */
  // Apagar um filme pelo id
  router.delete("/:id", movies.delete);

  /**
   * @swagger
   * /api/movies:
   *   delete:
   *     summary: Delete all movies
   *     description: Deletes all movies from the database
   *     responses:
   *       200:
   *         description: All movies deleted successfully
   */
  // Apagar todos os filmes
  router.delete("/", movies.deleteAll);

  app.use("/api/movies", router);
};
