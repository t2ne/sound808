const Genero = require("../models/genero.model.js");

// Inserir um novo género
exports.insert = (req, res) => {
  // Validar a request
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "O conteúdo do género deve estar definido.",
    });
  } else {
    // Criar um "Genero"
    const genero = new Genero({
      nome: req.body.nome,
    });

    // Guardar "Genero" na base de dados
    Genero.insert(genero, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Ocorreu um erro ao inserir o género...",
        });
      else res.send(data);
    });
  }
};

exports.selectAll = (req, res) => {
  const title = req.query.title;

  Genero.selectAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro na obtenção do(s) género(s)...",
      });
    else res.send(data);
  });
};

// Devolver um género pelo seu id
exports.findById = (req, res) => {
  Genero.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.genero === "not_found") {
        res.status(404).send({
          message: `Não foi encontrada o género com id = ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Não foi encontrada o género com id = " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Atualizar um género pelo seu id
exports.update = (req, res) => {
  // Validar a request
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo do género deve estar definido.",
    });
  }

  Genero.updateById(req.params.id, new Genero(req.body), (err, data) => {
    if (err) {
      if (err.genero === "not_found") {
        res.status(404).send({
          message: `Não foi encontrada o género com id = ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Foi gerado um erro a atualizar o género com id = ${req.params.id}.`,
        });
      }
    } else res.send(data);
  });
};

// Apagar um género pelo seu id
exports.delete = (req, res) => {
  Genero.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.genero === "not_found") {
        res.status(404).send({
          message: `Não foi encontrada o género com id = ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Foi gerado um erro a apagar o género com id = ${req.params.id}.`,
        });
      }
    } else res.send({ message: "o género foi eliminada com sucesso." });
  });
};

// Apagar todos os géneros da base de dados
exports.deleteAll = (req, res) => {
  Genero.deleteAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Foi gerado um erro a apagar a totalidade dos géneros.",
      });
    else res.send({ message: "Todos os géneros foram eliminados..." });
  });
};
