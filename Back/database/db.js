const mysql = require("mysql")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "timeline"
})

connection.connect((err) => {
    if (err) throw err;
    console.log("Connecté à la BDD");
})

module.exports = connection