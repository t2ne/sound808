const Musica = require("../models/musica.model.js");

// Inserir uma nova música
exports.insert = (req, res) => {
  // Validar a request
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "O conteúdo da música deve estar definido.",
    });
  } else {
    // Criar uma "Musica"
    const musica = new Musica({
      nome: req.body.nome,
      tempo: req.body.tempo || "0.0",
      id_album: req.body.id_album,
    });

    // Guardar "Musica" na base de dados
    Musica.insert(musica, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Ocorreu um erro ao inserir a música...",
        });
      else res.send(data);
    });
  }
};

exports.selectAll = (req, res) => {
  const title = req.query.title;

  Musica.selectAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro na obtenção da(s) música(s)...",
      });
    else res.send(data);
  });
};

// Devolver uma música pelo seu id
exports.findById = (req, res) => {
  Musica.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.musica === "not_found") {
        res.status(404).send({
          message: `Não foi encontrada a música com id = ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Não foi encontrada a música com id = " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Atualizar uma música pelo seu id
exports.update = (req, res) => {
  // Validar a request
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo da música deve estar definido.",
    });
  }

  Musica.updateById(req.params.id, new Musica(req.body), (err, data) => {
    if (err) {
      if (err.musica === "not_found") {
        res.status(404).send({
          message: `Não foi encontrada a música com id = ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Foi gerado um erro a atualizar a música com id = ${req.params.id}.`,
        });
      }
    } else res.send(data);
  });
};

// Apagar uma música pelo seu id
exports.delete = (req, res) => {
  Musica.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.musica === "not_found") {
        res.status(404).send({
          message: `Não foi encontrada a música com id = ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Foi gerado um erro a apagar a música com id = ${req.params.id}.`,
        });
      }
    } else res.send({ message: "A música foi eliminada com sucesso." });
  });
};

// Apagar todas as músicas da base de dados
exports.deleteAll = (req, res) => {
  Musica.deleteAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Foi gerado um erro a apagar a totalidade das músicas.",
      });
    else res.send({ message: "Todas as músicas foram eliminadas..." });
  });
};
