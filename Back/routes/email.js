// * exemple pour la vérification de mail

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid"); // Importez uuid pour générer un jeton unique
const router = require("express").Router();
const connection = require("../../database/index");

const nodemailer = require("nodemailer");
const currentDate = new Date();
const futureDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours in milliseconds
const formattedDate = futureDate.toISOString().slice(0, 19).replace("T", " ");
// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: "pokecollec4@gmail.com", // Votre adresse email Gmail
		pass: "vgvzzivfldgvukqn", // Votre mot de passe Gmail
	},
});

router.post("/", async (req, res) => {
	const pseudo = req.body.pseudo;
	const email = req.body.email;
	const password = req.body.password;
	const passwordCrypt = await bcrypt.hash(password, 8);
	console.log(formattedDate);
	const values = [pseudo, email, passwordCrypt, formattedDate];

	const sql_verif = `SELECT * FROM utilisateur WHERE email = ?`;
	connection.query(sql_verif, [email], (err, result) => {
		if (err) throw err;

		if (result.length > 0) {
			res
				.status(400)
				.send(JSON.stringify("Le mail est déjà en base de données"));
		} else {
			const sql_verifPseudo = `SELECT * FROM utilisateur WHERE pseudo = ?`;
			connection.query(sql_verifPseudo, [pseudo], (err, result) => {
				if (err) throw err;

				if (result.length > 0) {
					res
						.status(400)
						.send(JSON.stringify("Le pseudo est déjà en base de données"));
				} else {
					// Générez un jeton unique
					const emailToken = uuidv4();

					// Insérez l'utilisateur dans la table utilisateur
					const sql_insertUser = `INSERT INTO utilisateur (pseudo, email, motDePasse, privilege, date) VALUES (?, ?, ?, 1, ?)`;
					connection.query(sql_insertUser, values, (err, userResult) => {
						if (err) throw err;

						// Récupérez l'ID de l'utilisateur inséré
						const userId = userResult.insertId;

						// Insérez le jeton dans la table email_tokens avec l'ID de l'utilisateur
						const sql_insertToken =
							"INSERT INTO email_tokens (token, idUtilisateur, expiration) VALUES (?, ?, ?)";
						connection.query(
							sql_insertToken,
							[emailToken, userId, formattedDate],
							(err) => {
								if (err) {
									res
										.status(500)
										.send(
											JSON.stringify(
												"Une erreur est survenue lors de la création du jeton d'email."
											)
										);
								} else {
									// Envoi de l'email de confirmation
									const confirmationLink = `http://localhost:3000/confirmationEmail?token=${emailToken}`;
									const mailOptions = {
										from: "pokecollec4@gmail.com", // Votre adresse email Gmail
										to: email,
										subject: "Confirmation d'email",
										text: `Cliquez sur le lien suivant pour confirmer votre email : ${confirmationLink}`,
									};

									transporter.sendMail(mailOptions, (err, info) => {
										if (err) {
											// Gestion des erreurs d'envoi de l'email
											console.error(
												"Erreur lors de l'envoi de l'email de confirmation :",
												err
											);
										} else {
											console.log(
												"Email de confirmation envoyé :",
												info.response
											);
										}
									});

									res.send(JSON.stringify(userResult));
								}
							}
						);
					});
				}
			});
		}
	});
});

module.exports = router;
