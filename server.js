const express = require("express");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: ["http://localhost", "http://localhost:3000"],
};

app.use(cors(corsOptions));

// Setup Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Sound808",
      version: "1.0.0",
      description: "API for managing music stuff.",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: [
    "./backend/routes/*.js",
    "./backend/controllers/*.js",
    "./backend/models/*.js",
  ], // Paths to API doc comments
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware for handling requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Movies API . IPVC" });
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
