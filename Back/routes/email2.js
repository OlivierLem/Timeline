const router = require("express").Router();
const connection = require("../../database/index");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: "pokecollec4@gmail.com", // Votre adresse email Gmail
		pass: "vgvzzivfldgvukqn", // Votre mot de passe Gmail
	},
});

router.get("/*", (req, res) => {
	const emailToken = req.query.token;
	// Vérifiez si le jeton existe dans la base de données et n'a pas expiré
	const sql_verifyToken =
		"SELECT * FROM email_tokens WHERE token = ? AND expiration > NOW()";
	connection.query(sql_verifyToken, [emailToken], (err, result) => {
		if (err) {
			console.error("Erreur lors de la vérification du jeton :", err);
			res
				.status(500)
				.json({ message: "Erreur lors de la vérification du jeton." });
		} else {
			if (result.length === 0) {
				// Aucun jeton valide trouvé
				res.status(400).json({
					message: "Le jeton de confirmation est invalide ou a expiré.",
				});
			} else {
				// Mettez à jour la colonne email_confirmed de l'utilisateur
				const userId = result[0].IdUtilisateur;
				console.log(userId);
				const sql_updateEmailConfirmed =
					"UPDATE utilisateur SET email_confirmed = 1 WHERE idUtilisateur = ?";
				connection.query(sql_updateEmailConfirmed, [userId], (err) => {
					if (err) {
						console.error(
							"Erreur lors de la mise à jour de l'email confirmé :",
							err
						);
						res.status(500).json({
							message: "Erreur lors de la mise à jour de l'email confirmé.",
						});
					} else {
						res.status(200).json({ message: "Email confirmé avec succès." });
					}
				});
			}
		}
	});
});

router.post("/resend", (req, res) => {
	const userEmail = req.body.email; // Récupérez l'e-mail de l'utilisateur à partir du formulaire

	// Générez un nouveau token UUID
	const newEmailToken = uuidv4();

	// Récupérez l'ID de l'utilisateur
	const sql_getUserId = "SELECT idUtilisateur FROM utilisateur WHERE email = ?";
	connection.query(sql_getUserId, [userEmail], (err, userResult) => {
		if (err) {
			console.error(
				"Erreur lors de la récupération de l'ID de l'utilisateur :",
				err
			);
			res.status(500).json({
				message: "Erreur lors de la récupération de l'ID de l'utilisateur.",
			});
		} else {
			if (userResult.length === 0) {
				// Aucun utilisateur trouvé avec cet e-mail
				res.status(400).json({
					message: "Aucun utilisateur trouvé avec cet e-mail.",
				});
			} else {
				const userId = userResult[0].idUtilisateur;
				// Mettez à jour le token dans la base de données email_tokens
				const sql_updateEmailToken =
					"UPDATE email_tokens SET token = ? WHERE idUtilisateur = ?";
				connection.query(
					sql_updateEmailToken,
					[newEmailToken, userId],
					(err) => {
						if (err) {
							console.error(
								"Erreur lors de la mise à jour du token d'e-mail :",
								err
							);
							res.status(500).json({
								message: "Erreur lors de la mise à jour du token d'e-mail.",
							});
						} else {
							// Envoyez le nouvel e-mail de confirmation à l'utilisateur
							sendConfirmationEmail(userEmail, newEmailToken); // Vous devez créer une fonction pour envoyer un e-mail de confirmation
							res.status(200).json({
								message: "Nouvel e-mail de confirmation envoyé avec succès.",
							});
						}
					}
				);
			}
		}
	});

	const sendConfirmationEmail = (email, token) => {
		const confirmationLink = `http://localhost:3000/confirmationEmail?token=${token}`;
		const mailOptions = {
			from: "pokecollec4@gmail.com", // Votre adresse email Gmail
			to: email,
			subject: "Confirmation d'email",
			text: `Cliquez sur le lien suivant pour confirmer votre email : ${confirmationLink}`,
		};

		transporter.sendMail(mailOptions, (err, info) => {
			if (err) {
				// Gestion des erreurs d'envoi de l'e-mail
				console.error(
					"Erreur lors de l'envoi de l'e-mail de confirmation :",
					err
				);
			} else {
				console.log("Email de confirmation envoyé :", info.response);
			}
		});
	};
});

module.exports = router;
