const connection = require("../../database/db");
const router = require('express').Router();
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { key, keyPub } = require("../../keys");



// Fonction utilitaire pour envoyer un email
function sendEmail(email, link, callback) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "historyline.company@gmail.com", // votre adresse Gmail 
            pass: 'cqpa lqfz rmse wmrl'
        }
    });
    const mailOptions = {
      from: "historyline.company@gmail.com",
      to: email,
      subject: "Mot de passe généré aléatoirement",
      text: `Veuillez cliquer sur le lien pour réinitialiser votre mot de passe : ${link}`,
    };
  
    transporter.sendMail(mailOptions, callback);
}



const sendEmailChangePassword = (email, token) => {
    const confirmationLink = `http://localhost:3000/reinitialiser_mots_de_passe?token=${token}`;
    const mailOptions = {
        from: "historyline.company@gmail.com", // Votre adresse email Gmail
        to: email,
        subject: "Mots de passe oublié",
        text: `Cliquez sur le lien suivant pour confirmer votre email : ${confirmationLink}`,
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
			// Gestion des erreurs d'envoi de l'e-mail
            console.error(`Erreur lors de l'envoi de l'e-mail : ${err}`);
        } else {
            console.log(`Email envoyé : ${info.response}`)
        }
    })
}

// Fonction utilitaire pour vérifier le token JWT
function verifyToken(token) {
    try {
      return jsonwebtoken.verify(token, key);
    } catch (error) {
      return null; // En cas d'erreur de vérification, retourne null
    }
}

const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limite de tentative
    message: JSON.stringify("trop de tentatives d'envoie de mail, réessayez plus tard.")
})

router.post("/", apiLimiter, (req, res) => {
    try {
        const { email } = req.body;
        console.log(req.body);
        const sql = `SELECT * FROM user WHERE email = ?`;
        connection.query(sql, [email], (err, result) => {
            if(err) throw err;

            if(result[0]) {
                const token = jsonwebtoken.sign(
                    {email: result[0].email, id: result[0].idUser},
                    key,
                    {
                        expiresIn: '20m',
                        algorithm: 'RS256'
                    }
                )
                const link = `http://localhost:8000/api/forgotpassword/${result[0].idUser}/${token}`;

                sendEmail(email, link, (error, info) => {
                    if (error) {
                      res
                        .status(500)
                        .send(JSON.stringify("Erreur lors de l'envoi de l'e-mail."));
                    } else {
                      res.status(200).send({ message: "Email envoyé avec succès." });
                    }
                  });
            } else {
                res.status(400).send(JSON.stringify("Utilisateur inconnu"));
            }
        });

    } catch (error) {
        console.error(error)
    }
}) 

router.get("/:id/:token", (req, res) => {
    try {
        const {id, token} = req.params;
        const verify = verifyToken(token);
        if(verify) {
            res.render("index", {
                email: verify.email, 
                status: false, 
                same: false
            })
        } else {
            res.send("Vérification invalide")
        }
    } catch (error) {
        console.error("Une erreur est survenue :", error);
        res
        .status(500)
        .send("Une erreur est survenue lors du traitement de la requête.");
    }
})

router.post("/:id/:token", (req, res) => {
    try {
        const { id, token } = req.params;
        const { password } = req.body;

        const sql = `SELECT * FROM user WHERE idUser = ?`;
        connection.query(sql, [id], async (err, result) => {
            if(err) throw err;

            if(result[0]) {
                const passwordCrypt = await bcrypt.hash(password, 8);
                const verify = verifyToken(token);

                if(verify) {
                    const same = bcrypt.compareSync(password, result[0].password);
                    
                    if (same) {
                        res.render("index", {
                            email: verify.email,
                            status: false,
                            same: true
                        })
                    } else {
                        const updateSql = `UPDATE user SET password = ? WHERE idUser = ?`
                        connection.query(updateSql, [passwordCrypt, id], (err, result) => {
                            if(err) throw err;
                            res.render("index", {
                                email: verify.email,
                                status: true,
                                same: false,
                            });
                        });
                    }
                } else {
                    res.send(JSON.stringify(false))
                }
            } else {
                res.send(JSON.stringify(false))
            }
        })
    } catch (error) {
        console.error("Une erreur est survenue :", error);
        res
          .status(500)
          .send("Une erreur est survenue lors du traitement de la requête.");
    }
});

module.exports = router;