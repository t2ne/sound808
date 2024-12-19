module.exports = (app) => {
  const artistas = require("../controllers/artista.controller.js");
  let router = require("express").Router();

  // Consultar todos os artistas
  router.get("/", artistas.selectAll);

  // Consultar um artista pelo id
  router.get("/:id", artistas.findById);

  // Inserir um novo artista
  router.post("/", artistas.insert);

  // Atualizar um artista pelo id
  router.put("/:id", artistas.update);

  // Apagar um artista pelo id
  router.delete("/:id", artistas.delete);

  // Apagar todos os artistas
  router.delete("/", artistas.deleteAll);

  app.use("/api/artistas", router);
};
