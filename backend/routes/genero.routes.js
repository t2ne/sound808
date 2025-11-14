module.exports = (app) => {
  const generos = require("../controllers/genero.controller.js");
  let router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Géneros
   *   description: Operações sobre os géneros musicais
   */

  /**
   * @swagger
   * /api/generos:
   *   get:
   *     summary: Consultar todos os géneros
   *     tags: [Géneros]
   *     responses:
   *       200:
   *         description: Lista de géneros
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
   */

  router.get("/", generos.selectAll);

  /**
   * @swagger
   * /api/generos/{id}:
   *   get:
   *     summary: Consultar um género pelo id
   *     tags: [Géneros]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do género a ser consultado
   *     responses:
   *       200:
   *         description: Género encontrado
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 nome:
   *                   type: string
   *       404:
   *         description: Género não encontrado
   */

  router.get("/:id", generos.findById);

  /**
   * @swagger
   * /api/generos:
   *   post:
   *     summary: Inserir um novo género
   *     tags: [Géneros]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *     responses:
   *       201:
   *         description: Género criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 nome:
   *                   type: string
   */

  router.post("/", generos.insert);

  /**
   * @swagger
   * /api/generos/{id}:
   *   put:
   *     summary: Atualizar um género pelo id
   *     tags: [Géneros]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do género a ser atualizado
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *     responses:
   *       200:
   *         description: Género atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 nome:
   *                   type: string
   *       404:
   *         description: Género não encontrado
   */

  router.put("/:id", generos.update);

  /**
   * @swagger
   * /api/generos/{id}:
   *   delete:
   *     summary: Apagar um género pelo id
   *     tags: [Géneros]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do género a ser apagado
   *     responses:
   *       200:
   *         description: Género apagado com sucesso
   *       404:
   *         description: Género não encontrado
   */

  router.delete("/:id", generos.delete);

  /**
   * @swagger
   * /api/generos:
   *   delete:
   *     summary: Apagar todos os géneros
   *     tags: [Géneros]
   *     responses:
   *       200:
   *         description: Todos os géneros apagados com sucesso
   */

  router.delete("/", generos.deleteAll);

  app.use("/api/generos", router);
};
