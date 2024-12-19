const express = require("express");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const favicon = require("serve-favicon");

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: ["http://localhost", "http://localhost:3000"],
};

app.use(cors(corsOptions));

// Serve favicon.ico
// app.use(
//   "app/assets/favicon.ico",
//   express.static(path.join(__dirname, "favicon.ico"))
// );

// Setup Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Movies API",
      version: "1.0.0",
      description: "API for managing movies in a MySQL database",
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
require("./backend/routes/movie.routes.js")(app);

// Starting the server
app.listen(PORT, () => {
  console.log(`Servidor ativo em: http://localhost:${PORT}.`);
  console.log(`Swagger UI disponível em: http://localhost:${PORT}/api-docs`);
});
