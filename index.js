const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express();
//Declaration de l'origin 
var corsOptions = {
    origin: "http://localhost:8080"
}

app.use(cors(corsOptions))

const mongoose = require("mongoose")
const dotenv = require("dotenv")

//Importation des routes
const usersRoute = require('./routes/users')
const categoriesRoute = require("./routes/categories")
const produitsRoute = require("./routes/produits")
const authRoute = require("./routes/authentification")

dotenv.config();

/** Les options fournies ({ useNewUrlParser: true, useUnifiedTopology: true }) sont 
 * des paramètres de configuration pour la connexion. Ces options permettent 
 * de s'assurer que la connexion utilise les dernières fonctionnalités de MongoDB. */

mongoose.connect(process.env.BD_URL, {
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

//Page d'accueil du server api
app.get("/", (req, res) => {
    res.json({ message: "Bienvenue sur mon application de CRUD" });
})

//mettre le content-type sur application/json
//Utiliser le midleware de bodyParser pour faire les controles necessaires sur les données entrantes
app.use(bodyParser.json())
//mettre le content-type sur application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

/**Routes de l'API */
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/categories", categoriesRoute)
app.use("/api/produits", produitsRoute)


/**End Routes de l'API */

//Démarer l'application sur le port
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}.`);
})