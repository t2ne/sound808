const express = require("express");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
  ],
};

app.use(cors(corsOptions));

// Definição do Swagger
const swaggerDefinition = {
  openapi: "3.0.1",
  info: {
    title: "Sound808 API",
    version: "1.0.0",
    description: "API de gestão de músicas, álbuns, artistas e géneros.",
    contact: {
      name: "t2ne - cyzuko - eduardoc0uto",
    },
  },
  basePath: "/",
};

// Opções do Swagger
const swaggerOptions = {
  swaggerDefinition,
  apis: ["./backend/routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Middleware para servir a documentação do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware para fazer parse do body das requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota Teste
app.get("/", (req, res) => {
  res.json({ message: "Sound808 API" });
});

// Rotas
require("./backend/routes/album.routes.js")(app);
require("./backend/routes/artista.routes.js")(app);
require("./backend/routes/genero.routes.js")(app);
require("./backend/routes/musica.routes.js")(app);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor ativo em: http://localhost:${PORT}.`);
  console.log(`Swagger UI disponível em: http://localhost:${PORT}/api-docs`);
});
