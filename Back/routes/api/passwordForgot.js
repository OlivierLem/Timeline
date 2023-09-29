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

// middleware pour envoyer un email pour changer le mots de passe
router.get('/', (req, res) => {
    
})

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

module.exports = router;