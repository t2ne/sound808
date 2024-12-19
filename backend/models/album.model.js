const sql = require("./db.js");

// construtor
const Album = function (album) {
  this.nome = album.nome;
  this.data = album.data;
  this.id_genero = album.id_genero;
  this.id_artista = album.id_artista;
};

Album.insert = (newAlbum, result) => {
  sql.query("INSERT INTO albuns SET ?", newAlbum, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Álbum inserido: ", { id: res.insertId, ...newAlbum });
    result(null, { id: res.insertId, ...newAlbum });
  });
};

// result representa uma função de callback que será chamada após a execução da query

Album.findById = (id, result) => {
  sql.query(`SELECT * FROM albuns WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Álbum encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ album: "not_found" }, null);
  });
};

// Este método, no caso de não receber qualquer nome de filme devolve todos
// os filmes, caso contrário filtra o(s) resultado(s) pelo nome do filme (total ou parcial)
Album.selectAll = (nome, result) => {
  let query;
  query = "SELECT * FROM albuns";

  if (nome) {
    query += ` WHERE nome LIKE '%${nome}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Álbums: ", res);
    result(null, res);
  });
};

Album.updateById = (id, album, result) => {
  sql.query(
    "UPDATE albuns SET nome = ?, data = ?, id_genero = ?, id_artista = ? WHERE id = ?",
    [album.nome, album.data, album.id_genero, album.id_artista, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found album
        result({ album: "not_found" }, null);
        return;
      }

      console.log("Álbum atualizado: ", { id: id, ...album });
      result(null, { id: id, ...album });
    }
  );
};

Album.delete = (id, result) => {
  sql.query("DELETE FROM albuns WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found album with the id
      result({ album: "not_found" }, null);
      return;
    }

    console.log("Álbum eliminado com o id: ", id);
    result(null, res);
  });
};

Album.deleteAll = (result) => {
  sql.query("DELETE FROM albuns", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Eliminado(s) ${res.affectedRows} álbum(s)`);
    result(null, res);
  });
};

module.exports = Album;
