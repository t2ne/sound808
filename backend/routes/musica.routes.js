module.exports = (app) => {
  const musicas = require("../controllers/musica.controller.js");
  let router = require("express").Router();

  // Consultar todas as músicas
  router.get("/", musicas.selectAll);

  // Consultar uma música pelo id
  router.get("/:id", musicas.findById);

  // Inserir uma nova música
  router.post("/", musicas.insert);

  // Atualizar uma música pelo id
  router.put("/:id", musicas.update);

  // Apagar uma música pelo id
  router.delete("/:id", musicas.delete);

  // Apagar todas as músicas
  router.delete("/", musicas.deleteAll);

  app.use("/api/musicas", router);
};
