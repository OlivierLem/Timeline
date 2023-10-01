const connection = require("../../database/db");
const fs = require('node:fs')
const path = require('path')

const router = require("express").Router()

router.post('/', async (req, res) => {
    const { name, startPeriod, endPeriod, color, audio } = req.body;

    // fonction qui tranforme le noms de la periode en slugName 
    // sans accent et les espaces sont remplacé par _
    function transformLink (value) {
        let link= value.normalize('NFD')
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .replaceAll(' ', '_')
        return link
    }

    const slugName = transformLink(name);

    const buff = Buffer.from(audio.content, 'base64');

    fs.writeFile(`audio/${audio.name}`, buff, (err) => {
        if (err) throw err;
        console.log('le fichier à été sauvegarder');
    })

    // requête sql pour insérer dans la table période le noms, son slugName, le debut et la fin de la période et sa couleur
    const sql = `INSERT INTO periodes (noms, slugName, debutPeriode, finPeriode, color, audio) VALUES (?, ?, ?, ?, ?, ?) `;
    
    const valuesInsert = [name, slugName, startPeriod, endPeriod, color, audio.name]
    
    connection.query(sql, valuesInsert, (err, result) => {
        if (err) throw err;
        res.json('periode ajouter');
    })    
})

router.get('/current', async (req, res) => {
    const { slugName } = req.query;

    // on récupére la période courrante avec ces événement associé et la miniature de l'event associé
    const sql = `SELECT * FROM periodes    
        INNER JOIN
            periode_evenement ON periodes.idPeriode = periode_evenement.idPeriode
        LEFT JOIN
            evenements ON periode_evenement.idEvenement = evenements.idEvenement
        INNER JOIN
            images ON evenements.idEvenement = images.idEvenement
        WHERE 
            periodes.slugName = ? 
        AND images.miniature = 1
    `
    const valueCurrentPeriod = slugName
    
    connection.query(sql, valueCurrentPeriod, (err, result) => {
        if(err) throw err;
  
          res.status(200).send([...result])
    })
   
})

router.get('/', async (req, res) => {

    const { eventYear } = req.query

    try {
        if (eventYear) {
            // si notre requête get posséde un queryParams eventYear
            // on récupére les périodes qui sont comprise dans l'année de l'event grâce à debut et fin de période puis on les trié par début de période

            const sql = `
                SELECT * FROM periodes 
                WHERE debutPeriode <= '${eventYear}' 
                    AND finPeriode >= '${eventYear}' 
                ORDER BY periodes.debutPeriode
            `;

            const valuePeriode = [eventYear, eventYear];
            connection.query(sql, valuePeriode, (err, result) => {
                if (err) throw err;
            
                res.send(result) // on envoie les periodes filtré
            })
        } 
        else {
            // on select les periode trié par début de période
            const sql = `SELECT * FROM periodes ORDER BY periodes.debutPeriode`;

            connection.query(sql, (err, result) => {
                if (err) {
                    throw err
                }
                const sqlTestJoin = `
                SELECT DISTINCT periodes.noms, 
                CASE 
                    WHEN periodes.idPeriode = quizz.idPeriode 
                        THEN 1 
                    END AS checkQuizzJoin                 
                FROM periodes 
                JOIN quizz ON periodes.idPeriode = quizz.idPeriode`

                // on stocke le result dans event
                const period = result; 
                connection.query(sqlTestJoin, (err, result) => {
                    // on créer un nouveau tableau à partir de la constante periode et on ajoute une valeur à 0

                    const periodWhithCheckQuizz = period.map(p => {
                        const periodMap = {
                            ...p, 
                            checkQuizz: 0, 
                        };

                        // on vérifie si les periodes on une jointure avec un quizz et si oui on modifie testArticle à 1
                        for (const checkPeriod of result) {

                            if (p.noms === checkPeriod.noms) {
                                periodMap.checkQuizz = 1;
                                break
                            }
                        }
                        return periodMap; // on retourne le tableau modifier
                    })

                    res.send(periodWhithCheckQuizz) // envoie dans le front des periodes

                })
            })
        }
        
    } catch (error) {
        console.error(error)
    }
})

router.get('/withEvent', async (req, res) => {
    // on selectionne les périodes qui ont une jointure avec la table associative periode_evenement
    const sql = `
        SELECT DISTINCT 
            periodes.idPeriode, periodes.noms, periodes.slugName, 
            periodes.debutPeriode, periodes.finPeriode 
        FROM periodes 
        JOIN periode_evenement 
        WHERE periodes.idPeriode = periode_evenement.idPeriode
        ORDER BY periodes.debutPeriode`;

    connection.query(sql, (err, result) => {
        res.send(result)
    })
})

module.exports = router