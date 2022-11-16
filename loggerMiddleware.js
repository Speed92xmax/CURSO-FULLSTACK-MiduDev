const logger = (request, response) => {
  response.status(404).json({
    error: "Not Found",
  });
};
/* METODO PARA EXPORTAR CON COMMONJS */
module.exports = logger;
