const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
const router = require("express").Router()
const connexion = require("../../database/db")
const {key, keyPub} = require ("../../keys")

const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid'); // importer uuid pour générer un jeton unique
const connection = require("../../database/db")

const currentDate = new Date();
const futureDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 );
const formattedDate = futureDate.toISOString().slice(0,19).replace("T", " ");

const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limite de tentative
    message: JSON.stringify("trop de tentatives de connexion, réessayez plus tard.")
})

//! ajouter variable d'environnement pour son email et le mots de passe

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "historyline.company@gmail.com", // votre adresse Gmail 
        pass: 'cqpa lqfz rmse wmrl'
    }
})

// Middleware pour insérer un utilisateur
router.post('/', apiLimiter, async (req, res) => {
    const {pseudo, email, password} = req.body;

    const passwordCrypt = await bcrypt.hash(password, 8);
    const sqlInsertUser = `INSERT INTO user (pseudo, email, password) VALUES (?,?,?)`;

    const valuesInsertUser = [pseudo, email, passwordCrypt]

    connexion.query(sqlInsertUser, valuesInsertUser, (err, result) => {
        if (err) {
            if(err.errno === 1062) {
                res.status(400).json('email déjà utilisé')
                return
            } else {
                res.status(400).json("Oops il y a une erreur !")
                return
            }
        }

        const emailToken = uuidv4(); // génére un token unique
        const userId = result.insertId;

        const sqlInsertMailToken = ` 
            INSERT INTO mail_confirmation (token, expiration, idUser) VALUES (?, ?, ?)
        `

        const valuesInsertMailToken = [emailToken, formattedDate, userId];

        connexion.query(sqlInsertMailToken, valuesInsertMailToken, (err) => {
            if(err) {
                res.status(500).send(
                    JSON.stringify("Une erreur est survenu lors de la création du jeton d'email")
                );
            }

            const confirmationLink = `http://localhost:3000/confirmationEmail?token=${emailToken}`
            const mailOptions = {
                from: "historyline.company@gmail.com", // Votre adresse gmail 
                to: email,
                subject: 'Confirmation de votre email',
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

router.patch('/changePseudo', async (req, res) => {
    const {pseudo} = req.body;
    const {token} = req.cookies;
    if (token) {
        try {
            const decodedToken = jsonwebtoken.verify(token, key, {
                algorithms: "RS256",
            });
            const sqlSelectUser = `SELECT * FROM user WHERE user.idUser = ?`

            connexion.query(sqlSelectUser, decodedToken.sub, (err, result) => {
                const sqlUpdatePseudo = `UPDATE user SET user.pseudo = ? WHERE user.idUser= ? AND user.pseudo != ?`;
                const valueUpdatePseudo = [pseudo, decodedToken.sub, pseudo];
                if(pseudo !== result[0].pseudo) {
                    connexion.query(sqlUpdatePseudo, valueUpdatePseudo, (err, result) => {
                        if (err) throw err;
                    
                        res.status(200).json({
                            message: 'le pseudo à été modifier'
                        })
                    })
                    return
                } 
                if (pseudo === result[0].pseudo) {
                    res.status(200).json({
                        message: 'le pseudo est identique'
                    })
                    return
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
})

router.patch('/changePassword', async (req, res) => {
    const {newPassword, oldPassword} = req.body;
    const {token} = req.cookies;
    if(token) {
        try {
            const decodedToken = jsonwebtoken.verify(token, key, {
                algorithms: "RS256",
            });

           const sqlSelectUser = `SELECT * FROM user WHERE user.idUser = ?`
           const passwordCypt =  await bcrypt.hash(newPassword, 8);

           connexion.query(sqlSelectUser, decodedToken.sub, (err, result) => {
            const comparePassword = bcrypt.compareSync(oldPassword, result[0].password) 
  
            if (result && comparePassword && oldPassword!== newPassword) {
                const sqlUpdatePassword = `UPDATE user SET user.password = ? WHERE user.idUser= ?`;
                const valueUpdatePassword = [passwordCypt, decodedToken.sub];

                connexion.query(sqlUpdatePassword, valueUpdatePassword, (err, result) => {
                    if(err) throw err;
                    console.log('le mots de passe à été modifier');
                    res.status(200).json({
                        message: 'le mots de passe à été modifier'
                    })
                })
                return
            }
            
            if( comparePassword && oldPassword === newPassword) {
                res.status(200).json({
                    message: "le nouveaux mots de passe est identique à l'ancien"
                })
                return
            }

            if(!comparePassword) {
                res.status(200).json({
                    message: "Vous n'avez pas mis le bon mots de passe"
                })
                return
            }
           })
        } catch (error) {
            console.error(error);
        }
    }
})

module.exports = router;