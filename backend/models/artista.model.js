const sql = require("./db.js");

// construtor
const Artista = function (artista) {
  this.nome = artista.nome;
  this.idade = artista.idade;
  this.nacionalidade = artista.nacionalidade;
};

Artista.insert = (newArtista, result) => {
  sql.query("INSERT INTO artistas SET ?", newArtista, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Artista inserido: ", { id: res.insertId, ...newArtista });
    result(null, { id: res.insertId, ...newArtista });
  });
};

// result representa uma função de callback que será chamada após a execução da query

Artista.findById = (id, result) => {
  sql.query(`SELECT * FROM artistas WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Artista encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ artista: "not_found" }, null);
  });
};

// Este método, no caso de não receber qualquer nome de filme devolve todos
// os filmes, caso contrário filtra o(s) resultado(s) pelo nome do filme (total ou parcial)
Artista.selectAll = (nome, result) => {
  let query;
  query = "SELECT * FROM artistas";

  if (nome) {
    query += ` WHERE nome LIKE '%${nome}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Artistas: ", res);
    result(null, res);
  });
};

Artista.updateById = (id, artista, result) => {
  sql.query(
    "UPDATE artistas SET nome = ?, idade = ?, nacionalidade = ? WHERE id = ?",
    [artista.nome, artista.idade, artista.nacionalidade, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found artista
        result({ artista: "not_found" }, null);
        return;
      }

      console.log("Artista atualizado: ", { id: id, ...artista });
      result(null, { id: id, ...artista });
    }
  );
};

Artista.delete = (id, result) => {
  sql.query("DELETE FROM artistas WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found artista with the id
      result({ artista: "not_found" }, null);
      return;
    }

    console.log("Artista eliminado com o id: ", id);
    result(null, res);
  });
};

Artista.deleteAll = (result) => {
  sql.query("DELETE FROM artistas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Eliminado(s) ${res.affectedRows} artista(s)`);
    result(null, res);
  });
};

module.exports = Artista;
