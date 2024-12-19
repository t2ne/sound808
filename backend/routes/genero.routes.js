module.exports = (app) => {
  const generos = require("../controllers/genero.controller.js");
  let router = require("express").Router();

  // Consultar todos os géneros
  router.get("/", generos.selectAll);

  // Consultar um género pelo id
  router.get("/:id", generos.findById);

  // Inserir um novo género
  router.post("/", generos.insert);

  // Atualizar um género pelo id
  router.put("/:id", generos.update);

  // Apagar um género pelo id
  router.delete("/:id", generos.delete);

  // Apagar todos os géneros
  router.delete("/", generos.deleteAll);

  app.use("/api/generos", router);
};
