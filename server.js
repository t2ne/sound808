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

const swaggerDefinition = {
  openapi: "3.0.1",
  info: {
    title: "Sound808 API",
    version: "1.0.0",
    description: "API de gestão de músicas, álbuns, artistas e géneros.",
    contact: {
      name: "t8ne - cyzuko - eduardoc0uto",
    },
  },
  basePath: "/",
};
const swaggerOptions = {
  swaggerDefinition,
  apis: ["./backend/routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware for handling requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Sound808 API" });
});

// Importing routes
require("./backend/routes/album.routes.js")(app);
require("./backend/routes/artista.routes.js")(app);
require("./backend/routes/genero.routes.js")(app);
require("./backend/routes/musica.routes.js")(app);

// Starting the server
app.listen(PORT, () => {
  console.log(`Servidor ativo em: http://localhost:${PORT}.`);
  console.log(`Swagger UI disponível em: http://localhost:${PORT}/api-docs`);
});
