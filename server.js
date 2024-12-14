const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: ["http://localhost", "http://localhost:3000"],
};

app.use(cors(corsOptions));

// tratamento (parse) de pedidos de content-type - application/json
app.use(express.json());

// tratamento (parse) de pedidos de content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Configura o Express para usar o middleware de análise de dados URL-encoded. Particularmente útil para o tratamento de formulários HTML que enviam dados através de pedidos POST ou PUT transformando-os num objeto acessível através de req.body. O uso de { extended: true } garante que a análise de dados possa lidar com arrays e objetos no formato URL-encoded.

// route de "entrada" - apenas para efeito de teste
app.get("/", (req, res) => {
  res.json({ message: "Movies API . IPVC" });
});

// importação das movie.routes com um argumento de inicialização
require("./app/routes/movie.routes.js")(app);

// ativação do servidor, onde serão recebidos os pedidos, na porta definida
app.listen(PORT, () => {
  console.log(`Servidor ativo em: http://localhost:${PORT}.`);
});
