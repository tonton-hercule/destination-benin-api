const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

//definition du port
const PORT = process.env.PORT || 8080;

const app = express()

//Declaration de l'origin 
var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

//mettre le content-type sur application/json
//Utiliser le midleware de bodyParser pour faire les controles necessaires sur les données entrantes
app.use(bodyParser.json())

//mettre le content-type sur application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//Page d'accueil du server api
app.get("/", (req, res) => {
    res.json({ message: "Bienvenue sur mon application de CRUD" });
})

//Recuperer le chemin des routes
//require("./routes/app.routes.js")(app);
//const programmingLanguagesRouter = require("./routes/appRoutes");
//app.use("/programming-languages", programmingLanguagesRouter);

const db = require("./app/models");

/** Les options fournies ({ useNewUrlParser: true, useUnifiedTopology: true }) sont 
 * des paramètres de configuration pour la connexion. Ces options permettent 
 * de s'assurer que la connexion utilise les dernières fonctionnalités de MongoDB. */

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

//Importer les routes du modules statuts
require("./routes/statuts.routes")(app)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})
