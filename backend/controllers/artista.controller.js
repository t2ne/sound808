const Artista = require("../models/artista.model.js");

// Inserir um novo artista
exports.insert = (req, res) => {
  // Validar a request
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "O conteúdo do artista deve estar definido.",
    });
  } else {
    // Criar um "Artista"
    const artista = new Artista({
      nome: req.body.nome,
      idade: req.body.idade,
      nacionalidade: req.body.nacionalidade,
    });

    // Guardar "Artista" na base de dados
    Artista.insert(artista, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Ocorreu um erro ao inserir o artista...",
        });
      else res.send(data);
    });
  }
};

exports.selectAll = (req, res) => {
  const title = req.query.title;

  Artista.selectAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro na obtenção da(s) música(s)...",
      });
    else res.send(data);
  });
};

// Devolver um artista pelo seu id
exports.findById = (req, res) => {
  Artista.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.artista === "not_found") {
        res.status(404).send({
          message: `Não foi encontrada o artista com id = ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Não foi encontrada o artista com id = " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Atualizar um artista pelo seu id
exports.update = (req, res) => {
  // Validar a request
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo do artista deve estar definido.",
    });
  }

  Artista.updateById(req.params.id, new Artista(req.body), (err, data) => {
    if (err) {
      if (err.artista === "not_found") {
        res.status(404).send({
          message: `Não foi encontrada o artista com id = ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Foi gerado um erro a atualizar o artista com id = ${req.params.id}.`,
        });
      }
    } else res.send(data);
  });
};

// Apagar um artista pelo seu id
exports.delete = (req, res) => {
  Artista.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.artista === "not_found") {
        res.status(404).send({
          message: `Não foi encontrada o artista com id = ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Foi gerado um erro a apagar o artista com id = ${req.params.id}.`,
        });
      }
    } else res.send({ message: "A música foi eliminada com sucesso." });
  });
};

// Apagar todas as músicas da base de dados
exports.deleteAll = (req, res) => {
  Artista.deleteAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Foi gerado um erro a apagar a totalidade das músicas.",
      });
    else res.send({ message: "Todas as músicas foram eliminadas..." });
  });
};
