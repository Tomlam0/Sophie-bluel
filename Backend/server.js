/**
 * Les modules nécessaires sont importés :
 * le module http qui permet de créer un serveur HTTP
 * et le module app qui représente l'application express que nous souhaitons exécuter.
 */
const http = require("http");
const app = require("./app");

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

/**
 * Cette fonction prend une valeur de port en entrée et la convertit en un nombre entier.
 * Si la conversion est réussie, elle renvoie le port en tant que nombre,
 * sinon elle renvoie la valeur d'origine.
 * Cette fonction est utilisée pour gérer les différentes formes de numéros de port possibles.
 */
const port = normalizePort(process.env.PORT || "5678");
app.set("port", port);

// Variblle utilisée pour gérer les erreurs de démarrage du serveur.
//Si une erreur se produit, elle vérifie le type d'erreur et affiche un message d'erreur approprié.
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Crée un serveur qui gère les requêtes HTTP entrantes en utilisant l'application express app.
 */
const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

// Le serveur commence à écouter les requêtes
server.listen(port);
