const connection = require("../../database/db");
const router = require("express").Router();
const bcrypt = require('bcrypt');

const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid'); // importer uuid pour générer un jeton unique

const currentDate = new Date();
const futureDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 );
const formattedDate = futureDate.toISOString().slice(0,19).replace("T", " ");

//! ajouter variable d'environnement pour son email et le mots de passe

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "historyline.company@gmail.com", // votre adresse Gmail 
        pass: "O25a+dfj8v706hpmaz5", // votre mot de passe gmail 
    }
})

// Middleware pour insérer un utilisateur
router.post('/', async (req, res) => {
    const {pseudo, email, password} = req.body;

    const passwordCrypt = await bcrypt.hash(password, 8)
    const sqlInsertUser = `INSERT INTO user (pseudo, email, password) VALUES (?,?,?)`;

    const valuesInsertUser = [pseudo, email, passwordCrypt]

    connection.query(sqlInsertUser, valuesInsertUser, (err, result) => {
        if (err) {
            console.error(err);
            if(err.errno === 1062) {
                res.status(400).json('email déjà utilisé')
            } else {
                res.status(400).json("Oops il y a une erreur !")
            }
        }

        const emailToken = uuidv4(); // génére un token unique
        const userId = result.insertId;

        const sqlInsertMailToken = ` 
            INSERT INTO mail_confirmation (token, expiration, idUser) VALUES (?, ?, ?)
        `

        const valuesInsertMailToken = [emailToken, formattedDate, userId];

        connection.query(sqlInsertMailToken, valuesInsertMailToken, (err) => {
            if(err) {
                res.status(500).send(
                    JSON.stringify("Une erreur est survenu lors de la création du jeton d'email")
                );
            }

            const confirmationLink = `http://localhost:3000/confirmationEmail${emailToken}`
            const mailOptions = {
                from: "historyline.company@gmail.com", // Votre adresse gmail 
                to: email,
                subjet: 'Confirmation de votre email',
                text: `Cliquer sur le lien suivant pour confirmer votre email : ${confirmationLink}`
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    console.error(`Erreur lors de l'envoi de l'email de confirmation : ${err}`)
                } else {
                    console.log(`Email de confirmation envoyé : ${info.response}`);
                }
            });

            res.send(JSON.stringify(result))
        })
    })
});

module.exports = router;