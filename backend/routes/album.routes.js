module.exports = (app) => {
  const albuns = require("../controllers/album.controller.js");
  let router = require("express").Router();

  // Consultar todos os albuns
  router.get("/", albuns.selectAll);

  // Consultar um album pelo id
  router.get("/:id", albuns.findById);

  // Inserir um novo album
  router.post("/", albuns.insert);

  // Atualizar um album pelo id
  router.put("/:id", albuns.update);

  // Apagar um album pelo id
  router.delete("/:id", albuns.delete);

  // Apagar todos os albuns
  router.delete("/", albuns.deleteAll);

  app.use("/api/albuns", router);
};
