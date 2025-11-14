const sql = require("./db.js");

// construtor
const Musica = function (musica) {
  this.nome = musica.nome;
  this.tempo = musica.tempo;
  this.id_album = musica.id_album;
};

Musica.insert = (newMusica, result) => {
  sql.query("INSERT INTO musicas SET ?", newMusica, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Música inserida: ", { id: res.insertId, ...newMusica });
    result(null, { id: res.insertId, ...newMusica });
  });
};

// result representa uma função de callback que será chamada após a execução da query

Musica.findById = (id, result) => {
  sql.query(`SELECT * FROM musicas WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Música encontrada: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ musica: "not_found" }, null);
  });
};

// Este método, no caso de não receber qualquer nome de filme devolve todos
// os filmes, caso contrário filtra o(s) resultado(s) pelo nome do filme (total ou parcial)
Musica.selectAll = (nome, result) => {
  let query;
  query = "SELECT * FROM musicas";

  if (nome) {
    query += ` WHERE nome LIKE '%${nome}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Músicas: ", res);
    result(null, res);
  });
};

Musica.updateById = (id, musica, result) => {
  sql.query(
    "UPDATE musicas SET nome = ?, tempo = ?, id_album = ? WHERE id = ?",
    [musica.nome, musica.tempo, musica.id_album, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found musica
        result({ musica: "not_found" }, null);
        return;
      }

      console.log("Música atualizada: ", { id: id, ...musica });
      result(null, { id: id, ...musica });
    }
  );
};

Musica.delete = (id, result) => {
  sql.query("DELETE FROM musicas WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found musica with the id
      result({ musica: "not_found" }, null);
      return;
    }

    console.log("Música eliminada com o id: ", id);
    result(null, res);
  });
};

Musica.deleteAll = (result) => {
  sql.query("DELETE FROM musicas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Eliminada(s) ${res.affectedRows} música(s)`);
    result(null, res);
  });
};

module.exports = Musica;
