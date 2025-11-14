module.exports = (app) => {
  const albuns = require("../controllers/album.controller.js");
  let router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Álbuns
   *   description: Operações sobre os álbuns
   */

  /**
   * @swagger
   * /api/albuns:
   *   get:
   *     summary: Consultar todos os álbuns
   *     tags: [Álbuns]
   *     responses:
   *       200:
   *         description: Lista de álbuns
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
   *                   data:
   *                     type: string
   *                     format: date
   *                   id_genero:
   *                     type: integer
   *                   id_artista:
   *                     type: integer
   */

  router.get("/", albuns.selectAll);

  /**
   * @swagger
   * /api/albuns/{id}:
   *   get:
   *     summary: Consultar um álbum pelo id
   *     tags: [Álbuns]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do álbum a ser consultado
   *     responses:
   *       200:
   *         description: Álbum encontrado
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 nome:
   *                   type: string
   *                 data:
   *                   type: string
   *                   format: date
   *                 id_genero:
   *                   type: integer
   *                 id_artista:
   *                   type: integer
   *       404:
   *         description: Álbum não encontrado
   */

  router.get("/:id", albuns.findById);

  /**
   * @swagger
   * /api/albuns:
   *   post:
   *     summary: Inserir um novo álbum
   *     tags: [Álbuns]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *               data:
   *                 type: string
   *                 format: date
   *               id_genero:
   *                 type: integer
   *               id_artista:
   *                 type: integer
   *     responses:
   *       201:
   *         description: Álbum criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 nome:
   *                   type: string
   *                 data:
   *                   type: string
   *                   format: date
   *                 id_genero:
   *                   type: integer
   *                 id_artista:
   *                   type: integer
   */

  router.post("/", albuns.insert);

  /**
   * @swagger
   * /api/albuns/{id}:
   *   put:
   *     summary: Atualizar um álbum pelo id
   *     tags: [Álbuns]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do álbum a ser atualizado
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *               data:
   *                 type: string
   *                 format: date
   *               id_genero:
   *                 type: integer
   *               id_artista:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Álbum atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 nome:
   *                   type: string
   *                 data:
   *                   type: string
   *                   format: date
   *                 id_genero:
   *                   type: integer
   *                 id_artista:
   *                   type: integer
   *       404:
   *         description: Álbum não encontrado
   */

  router.put("/:id", albuns.update);

  /**
   * @swagger
   * /api/albuns/{id}:
   *   delete:
   *     summary: Apagar um álbum pelo id
   *     tags: [Álbuns]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do álbum a ser apagado
   *     responses:
   *       200:
   *         description: Álbum apagado com sucesso
   *       404:
   *         description: Álbum não encontrado
   */

  router.delete("/:id", albuns.delete);

  /**
   * @swagger
   * /api/albuns:
   *   delete:
   *     summary: Apagar todos os álbuns
   *     tags: [Álbuns]
   *     responses:
   *       200:
   *         description: Todos os álbuns apagados com sucesso
   */

  router.delete("/", albuns.deleteAll);

  app.use("/api/albuns", router);
};
