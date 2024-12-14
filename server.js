const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ["http://localhost", "http://localhost:3000"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de "entrada" - apenas para efeito de teste
app.get("/api", (req, res) => {
  res.json({ message: "Movies API . IPVC" });
});

// Importação das movie.routes com um argumento de inicialização
require("./app/routes/movie.routes.js")(app);

// --------------------- Serve Svelte Frontend ---------------------

// Middleware para servir arquivos estáticos da pasta de build do Svelte
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// Rota catch-all para servir o index.html do Svelte para roteamento no lado do cliente
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// ---------------------------------------------------------------

// Ativação do servidor, onde serão recebidos os pedidos, na porta definida
app.listen(PORT, () => {
  console.log(`Servidor ativo na porta ${PORT}.`);
});
