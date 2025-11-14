module.exports = (app) => {
  const artistas = require("../controllers/artista.controller.js");
  let router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Artistas
   *   description: Operações sobre os artistas
   */

  /**
   * @swagger
   * /api/artistas:
   *   get:
   *     summary: Consultar todos os artistas
   *     tags: [Artistas]
   *     responses:
   *       200:
   *         description: Lista de artistas
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                   nome:
   *                     type: string
   *                   idade:
   *                     type: integer
   *                   nacionalidade:
   *                     type: string
   */

  router.get("/", artistas.selectAll);

  /**
   * @swagger
   * /api/artistas/{id}:
   *   get:
   *     summary: Consultar um artista pelo id
   *     tags: [Artistas]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do artista a ser consultado
   *     responses:
   *       200:
   *         description: Artista encontrado
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 nome:
   *                   type: string
   *                 idade:
   *                   type: integer
   *                 nacionalidade:
   *                   type: string
   *       404:
   *         description: Artista não encontrado
   */

  router.get("/:id", artistas.findById);

  /**
   * @swagger
   * /api/artistas:
   *   post:
   *     summary: Inserir um novo artista
   *     tags: [Artistas]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *               idade:
   *                 type: integer
   *               nacionalidade:
   *                 type: string
   *     responses:
   *       201:
   *         description: Artista criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 nome:
   *                   type: string
   *                 idade:
   *                   type: integer
   *                 nacionalidade:
   *                   type: string
   */

  router.post("/", artistas.insert);

  /**
   * @swagger
   * /api/artistas/{id}:
   *   put:
   *     summary: Atualizar um artista pelo id
   *     tags: [Artistas]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do artista a ser atualizado
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *               idade:
   *                 type: integer
   *               nacionalidade:
   *                 type: string
   *     responses:
   *       200:
   *         description: Artista atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 nome:
   *                   type: string
   *                 idade:
   *                   type: integer
   *                 nacionalidade:
   *                   type: string
   *       404:
   *         description: Artista não encontrado
   */

  router.put("/:id", artistas.update);

  /**
   * @swagger
   * /api/artistas/{id}:
   *   delete:
   *     summary: Apagar um artista pelo id
   *     tags: [Artistas]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do artista a ser apagado
   *     responses:
   *       200:
   *         description: Artista apagado com sucesso
   *       404:
   *         description: Artista não encontrado
   */

  router.delete("/:id", artistas.delete);

  /**
   * @swagger
   * /api/artistas:
   *   delete:
   *     summary: Apagar todos os artistas
   *     tags: [Artistas]
   *     responses:
   *       200:
   *         description: Todos os artistas apagados com sucesso
   */

  router.delete("/", artistas.deleteAll);

  app.use("/api/artistas", router);
};
