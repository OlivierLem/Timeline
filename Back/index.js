const bodyParser = require("body-parser")
const port = 8000

const express = require("express")
const cookie = require("cookie-parser")

const app = express()
const routes = require("./routes/router.js")


app.use(cookie())

// limitation de la taille des fichiers
//si erreur vérifier votre fichier ini dans XAMPP et augmenter les tailles
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "15mb" }));

app.use(routes)

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