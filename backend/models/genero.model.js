const sql = require("./db.js");

// construtor
const Genero = function (genero) {
  this.nome = genero.nome;
};

Genero.insert = (newGenero, result) => {
  sql.query("INSERT INTO generos SET ?", newGenero, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Género inserido: ", { id: res.insertId, ...newGenero });
    result(null, { id: res.insertId, ...newGenero });
  });
};

// result representa uma função de callback que será chamada após a execução da query

Genero.findById = (id, result) => {
  sql.query(`SELECT * FROM generos WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Género encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ genero: "not_found" }, null);
  });
};

// Este método, no caso de não receber qualquer nome de filme devolve todos
// os filmes, caso contrário filtra o(s) resultado(s) pelo nome do filme (total ou parcial)
Genero.selectAll = (nome, result) => {
  let query;
  query = "SELECT * FROM generos";

  if (nome) {
    query += ` WHERE nome LIKE '%${nome}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Géneros: ", res);
    result(null, res);
  });
};

Genero.updateById = (id, genero, result) => {
  sql.query(
    "UPDATE generos SET nome = ? WHERE id = ?",
    [genero.nome, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found genero
        result({ genero: "not_found" }, null);
        return;
      }

      console.log("Género atualizado: ", { id: id, ...genero });
      result(null, { id: id, ...genero });
    }
  );
};

Genero.delete = (id, result) => {
  sql.query("DELETE FROM generos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found genero with the id
      result({ genero: "not_found" }, null);
      return;
    }

    console.log("Género eliminado com o id: ", id);
    result(null, res);
  });
};

Genero.deleteAll = (result) => {
  sql.query("DELETE FROM generos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Eliminado(s) ${res.affectedRows} género(s)`);
    result(null, res);
  });
};

module.exports = Genero;
