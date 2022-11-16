/* ---------------------IMPORTACION DE MODULO POR EL METODO COMMON JS (CJS) ---------------------*/
// SE SUSTITUYE LA FUNCION IMPORT POR EL METODO REQURE

const express = require("express");
const app = express();
const logger = require("./loggerMiddleware");
const cors = require("cors");

//MIDDLEWARES
/* CORS ( Cross-Origin Resource Sharing ) control de acceso
 * se tiene que instalar el paquete "cors" desde node ( es una dependencia de produccion)
 */
app.use(cors());

// METODO DE EXPRESS PARA PARSEAR A JSON EL BODY DE LA PETICION
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "TITULO CAMBIADO",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
    categories: ["sport", "food", "home"],
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

/* METODO PARA LEVANTAR UN SERVIDOR  CON HTTP */

// const http = require("http");

// const app = http.createServer((request, response) => {
//  response.writeHead(200, { "Content-type": "application/json" });
//  response.end(JSON.stringify(notes));
// });

/* ---------------------SERVIDOR CON EXPRESS ---------------------*/

app.get("/", (request, response) => {
  response.send("<h1>Primera ruta creada</h1>");
});

app.get("/notes", (request, response) => {
  response.json(notes);
});

// Capturar un segmento de la ruta de acceso

app.get("/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  response.json(note);
});

app.delete("/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

app.post("/notes", (request, response) => {
  const note = request.body;
  const allId = notes.map((el) => el.id);
  const maxId = Math.max(...allId);

  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== "undefined" ? note.important : false,
  };
  notes = [...notes, newNote];

  response.send(newNote);
});
/* USO DE MIDDLEWARE PARA MANEJO DE ERRORES  */
app.use(logger);

/* ASIGNACION DE PUERTOS Y ESCUCHA */

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
