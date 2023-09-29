const connection = require("../../database/db");
const router = require('express').Router();
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
	service: "Gmail",
    auth: {
        user: "historyline.company@gmail.com", // votre adresse Gmail 
        pass: 'cqpa lqfz rmse wmrl'
    }
});

// middleware pour confirmer l'email de l'utilisateur
router.get('/*', (req, res) => {
    const { token: emailToken } = req.query;
	// Vérifiez si le jeton existe dans la base de données et n'a pas expiré
    const sqlVerifyToken = `SELECT * FROM mail_confirmation WHERE token = ? AND expiration > NOW()`;

    connection.query(sqlVerifyToken, emailToken, (err, result) => {
        if(err) {
            console.error(`Erreur lors de la vérification ${err}`)
            res.status(500).json({
                message: "Erreur lors de la vérification du jeton."
            }); 
        }

        if(result.length === 0) {
			// Aucun jeton valide trouvé
            res.status(400).json({
                message: 'Le jeton de confirmation est invalide ou a expiré.',
            })
        } else {
			// Mettez à jour la colonne email_confirmed de l'utilisateur
            const userId = result[0].idUser;
            const sqlUpdateEmailConfirmed = `UPDATE user SET email_confirmed = 1 WHERE idUser = ?`
            connection.query(sqlUpdateEmailConfirmed, userId, (err) => {
                if(err) {
                    console.error(`Erreur lors de la mise à jour de l'email confirmé : ${err}`)
                    res.status(500).json({
                        message: "Erreur lors de la mise à jour de l'email confirmé."
                    }) 
                } 

                res.status(200).json({
                    message: "Email confirmé avec succès."
                })
            })
        }
    })
})

// miidleware pour renvoyer un nouveau token à l'utilisateur
router.post("/resend", (req, res) => {
    const { email: userEmail } = req.body; // Récupérez l'e-mail de l'utilisateur à partir du formulaire
	
    // Générez un nouveau token UUID
    const newEmailToken = uuidv4();

	// Récupérez l'ID de l'utilisateur
    const sqlGetUserId = `SELECT idUser FROM user WHERE email = "?"`
    connection.query(sqlGetUserId, userEmail, (err, result) => {
        if (err) {
            console.error(`Erreur lors de la récupération de l'ID de l'utilisateur : ${err}`);
            res.status(500).json({
                message: "Erreur lors de la récupération de l'ID de l'utilisateur"
            })
        }

        if(result.length === 0) {
			// Aucun utilisateur trouvé avec cet e-mail
            res.status(400).json({
                message: "Aucun utilisateur trouvé avec cet e-mail.",
            })
        } else {
            const userId = result[0].idUser;
			
            // Mettez à jour le token dans la base de données email_tokens
            const sqlUpdateEmailToken = `UPDATE mail_confirmation SET token = "?" WHERE idUser = ?`;

            const valuesUpdateEmailToken = [newEmailToken, userId];

            connection.query(sqlUpdateEmailToken, valuesUpdateEmailToken, (err) => {
                if (err) {
                    console.error(`Erreur lors de la mise à jour du token d'e-mail : ${err}`);
                    res.status(500).json({
                        message: "Erreur lors de la mise à jour du token d'e-mail"
                    })
                }

				// Envoyez le nouvel e-mail de confirmation à l'utilisateur
                sendConfirmationEmail(userEmail, newEmailToken) // Vous devez créer une fonction pour envoyer un e-mail de confirmation
                res.status(200).json({
                    message: "Nouveau e-mail de confirmation envoyé avec succès."
                })
            })
        }
    })
})

const sendConfirmationEmail = (email, token) => {
    const confirmationLink = `http://localhost:3000/confirmationEmail?token=${token}`;
    const mailOptions = {
        from: "historyline.company@gmail.com", // Votre adresse email Gmail
        to: email,
        subject: "Confirmation d'email",
        text: `Cliquez sur le lien suivant pour confirmer votre email : ${confirmationLink}`,
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
			// Gestion des erreurs d'envoi de l'e-mail
            console.error(`Erreur lors de l'envoi de l'e-mail de confirmation : ${err}`);
        } else {
            console.log(`Email de confirmation envoyé : ${info.response}`)
        }
    })
}

module.exports = router;