const Album = require("../models/album.model.js");

// Inserir um novo álbum
exports.insert = (req, res) => {
  // Validar a request
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "O conteúdo do álbum deve estar definido.",
    });
  } else {
    // Criar um "Album"
    const album = new Album({
      nome: req.body.nome,
      data: req.body.data,
      nacionalidade: req.body.nacionalidade,
      id_genero: req.body.id_genero,
      id_artista: req.body.id_artista,
    });

    // Guardar "Album" na base de dados
    Album.insert(album, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Ocorreu um erro ao inserir o álbum...",
        });
      else res.send(data);
    });
  }
};

exports.selectAll = (req, res) => {
  const title = req.query.title;

  Album.selectAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro na obtenção da(s) música(s)...",
      });
    else res.send(data);
  });
};

// Devolver um álbum pelo seu id
exports.findById = (req, res) => {
  Album.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.album === "not_found") {
        res.status(404).send({
          message: `Não foi encontrada o álbum com id = ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Não foi encontrada o álbum com id = " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Atualizar um álbum pelo seu id
exports.update = (req, res) => {
  // Validar a request
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo do álbum deve estar definido.",
    });
  }

  Album.updateById(req.params.id, new Album(req.body), (err, data) => {
    if (err) {
      if (err.album === "not_found") {
        res.status(404).send({
          message: `Não foi encontrada o álbum com id = ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Foi gerado um erro a atualizar o álbum com id = ${req.params.id}.`,
        });
      }
    } else res.send(data);
  });
};

// Apagar um álbum pelo seu id
exports.delete = (req, res) => {
  Album.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.album === "not_found") {
        res.status(404).send({
          message: `Não foi encontrada o álbum com id = ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Foi gerado um erro a apagar o álbum com id = ${req.params.id}.`,
        });
      }
    } else res.send({ message: "A música foi eliminada com sucesso." });
  });
};

// Apagar todas as músicas da base de dados
exports.deleteAll = (req, res) => {
  Album.deleteAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Foi gerado um erro a apagar a totalidade das músicas.",
      });
    else res.send({ message: "Todas as músicas foram eliminadas..." });
  });
};
