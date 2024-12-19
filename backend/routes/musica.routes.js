module.exports = (app) => {
  const musicas = require("../controllers/musica.controller.js");
  let router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Músicas
   *   description: Operações sobre as músicas
   */

  /**
   * @swagger
   * /api/musicas:
   *   get:
   *     summary: Consultar todas as músicas
   *     tags: [Músicas]
   *     responses:
   *       200:
   *         description: Lista de músicas
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
   *                   tempo:
   *                     type: string
   *                   id_album:
   *                     type: integer
   */

  router.get("/", musicas.selectAll);

  /**
   * @swagger
   * /api/musicas/{id}:
   *   get:
   *     summary: Consultar uma música pelo id
   *     tags: [Músicas]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID da música a ser consultada
   *     responses:
   *       200:
   *         description: Música encontrada
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 nome:
   *                   type: string
   *                 tempo:
   *                   type: string
   *                 id_album:
   *                   type: integer
   *       404:
   *         description: Música não encontrada
   */

  router.get("/:id", musicas.findById);

  /**
   * @swagger
   * /api/musicas:
   *   post:
   *     summary: Inserir uma nova música
   *     tags: [Músicas]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *               tempo:
   *                 type: string
   *               id_album:
   *                 type: integer
   *     responses:
   *       201:
   *         description: Música criada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 nome:
   *                   type: string
   *                 tempo:
   *                   type: string
   *                 id_album:
   *                   type: integer
   */

  router.post("/", musicas.insert);

  /**
   * @swagger
   * /api/musicas/{id}:
   *   put:
   *     summary: Atualizar uma música pelo id
   *     tags: [Músicas]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID da música a ser atualizada
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *               tempo:
   *                 type: string
   *               id_album:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Música atualizada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 nome:
   *                   type: string
   *                 tempo:
   *                   type: string
   *                 id_album:
   *                   type: integer
   *       404:
   *         description: Música não encontrada
   */

  router.put("/:id", musicas.update);

  /**
   * @swagger
   * /api/musicas/{id}:
   *   delete:
   *     summary: Apagar uma música pelo id
   *     tags: [Músicas]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID da música a ser apagada
   *     responses:
   *       200:
   *         description: Música apagada com sucesso
   *       404:
   *         description: Música não encontrada
   */

  router.delete("/:id", musicas.delete);

  /**
   * @swagger
   * /api/musicas:
   *   delete:
   *     summary: Apagar todas as músicas
   *     tags: [Músicas]
   *     responses:
   *       200:
   *         description: Todas as músicas apagadas com sucesso
   */

  router.delete("/", musicas.deleteAll);

  app.use("/api/musicas", router);
};
