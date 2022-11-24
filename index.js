const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./database/config");

//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//Directorio Publico
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json());

//Rutas

//TODO: auth// crear, login, renew
app.use("/api/auth", require("./routes/auth"));

//TODO:

//Escuchar peticiones
app.listen(process.env, () => {
  console.log(`Servidor esta corriendo en el puerto!! ${process.env.PORT}`);
});
