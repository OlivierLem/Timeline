const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
const router = require("express").Router()
const connexion = require("../../database/db")
const {key, keyPub} = require ("../../keys")
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limite de tentative
    message: "trop de tentatives de connexion, réessayez plus tard."
})

router.post('/', apiLimiter, async (req, res) => {
    try {
        const { email, password, stayConnected } = req.body;
        const sql = `SELECT * FROM user WHERE email = ?`
        connexion.query(sql, email, (err, result) => {
            if (err) throw err;
            // récupération des données utilisateur si l'utilisateur à validé son email 
            if(result && result.length > 0) {  

                if (bcrypt.compareSync(password, result[0].password)) {
                    // si l'utilisateur veut rester connecter création d'un cookie
                    console.log('bcrypt')
                    if (stayConnected && result[0].email_confirmed === 1) {
                        const token = jsonwebtoken.sign({}, key, {
                            subject: result[0].idUser.toString(),
                            expiresIn: 3600 * 24 * 30 * 6,
                            algorithm: "RS256"
                        })
                        res.cookie('token', token);
                    }

                    // Si l'utilisateur n'a pas encore confirmé son email envoie message
                    if(result[0].email_confirmed === 0) {
                        res.status(400).json('Votre email doit être confirmé')
                        return
                    }
                    res.json(result)
                    return
                } 
            } else {
                console.log('else');
                res.status(400).json("Vous n'êtes pas encore inscrit")
            }
        })
        
    } catch (error) {
        res.status(400).json('Pseudo et/ou mots de passe incorrect')
    }
})

router.get('/current', async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        try {
            //! normalement utilisation la clé public (keyPub)
            const decodedToken = jsonwebtoken.verify(token, key, {
                algorithms: "RS256",
            });

            const sql = `SELECT * FROM user WHERE idUser = ?`;

            connexion.query(sql, decodedToken.sub, (err, result) => {
                if (err) throw err;
                if (result) {
                    res.json(...result)
                } else {
                    res.json(null)
                }
            })
            
        } catch (error) {
            console.error(error)
            res.json(null)
        }
    } else {
        res.json(null)
    }
})

router.delete('/', (req, res) => {
    res.clearCookie('token');
    res.end();
})

module.exports = router