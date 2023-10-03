const bodyParser = require("body-parser")
const port = 8000

const express = require("express")
const cookie = require("cookie-parser")

const app = express()
const routes = require("./routes/router.js")


app.use(cookie()) // on récupére les cookie

// limitation de la taille des fichiers
// si erreur vérifier votre fichier ini dans XAMPP et augmenter les tailles
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(routes) // les requête effectué

app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    next()
})

app.use("*", (req, res) => {
    res.status(404).end()
})

app.listen(port, () => {
    console.log(`Serveur NodeJS écoutant sur le port ${port}`);
})