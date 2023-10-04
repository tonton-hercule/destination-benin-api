/**
 * Configurer et exporter un module Node.js qui permet d'interagir avec une base de données MongoDB en utilisant Mongoose
 */
//recupérer les config de la base
const dbConfig = require("../config/db.config.js");

//importer le package mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//Création d'un objet vide pour stocker les propriétés de la base
const db = {};
db.mongoose = mongoose; //Pour accéder à l'instance mongoose n'importe o^dans l'application
db.url = dbConfig.url; //Recupérer l'url de connexion vers la db
db.statuts = require("./statuts.model.js")(mongoose);

//Exporter l'objet db
module.exports = db;