const connection = require("../../database/db");

const router = require('express').Router()

router.post('/', async (req, res) => {
    console.log(req.body)
    const { periode: slugName, times, questions } = req.body

    // on selectionne la periode
    const sql = `SELECT idPeriode FROM periodes WHERE slugName = "${slugName}"`

    connection.query(sql, (err, result) => {
        if (err) throw err;

        // on insert le quizz avec en valeur l'id de la période associé et la durée des question
        const id = result[0].idPeriode
        const insertQuizzSql = `INSERT INTO quizz (timer, idPeriode) VALUES ('${times}', '${id}')`
        
        connection.query(insertQuizzSql, (err, result) => {
            if (err) throw err;
            //console.log(result);
            const idQuizz = result.insertId

            // on insert les différentes question du quizz avec en valeur l'intitule de la question et l'idQuizz
            for (const question of questions) {
                const insertQuestionSql = `INSERT INTO question (intitule, idQuizz) VALUES ("${question.question}", "${idQuizz}")`;

                connection.query(insertQuestionSql, (err, result) => {
                    const idQuestion = result.insertId
                    console.log(result);

                        // on insert les réponse aux questions avec l'idQuestion, la réponse et un booléan qui vérifie si la réponse est bonne
                        for (const reponse of question.reponses) {
                            let estCorrect = reponse.isValid === true ? 1 : 0 // modifie le booléan on nombre pour être utilisé avec sql
                            console.log();
                            const insertReponsesSql = `INSERT INTO reponses (reponse, estCorrect, idQuestion) VALUES ("${reponse.name}","${estCorrect}", "${idQuestion}")`;

                            connection.query(insertReponsesSql, (err, result) => {
                                if(err) throw err;
                                console.log('quizz créer');
                            })
                        }

                })
            }
            res.json('quizz insérer')
        })
    })
})

router.get('/', async (req, res) => {
    const { slugName } = req.query
    
    // on select le quizz et ces questions
    const sql = `
        SELECT DISTINCT 
            question.intitule, quizz.timer, question.idQuestion 
        FROM periodes 
        JOIN quizz ON periodes.idPeriode = quizz.idPeriode 
        JOIN question ON quizz.idQuizz = question.idQuizz 
        WHERE periodes.slugName = "${slugName}"`

    connection.query(sql, (err, result) => {
        if (err) throw err;
        
        console.log("envoie du quizz");

        const quizz = result // on récupére le result dans la variable quizz

        // on select les réponses des questions
        const sqlSelectReponse = `
            SELECT reponses.idQuestion, reponses.reponse, reponses.estCorrect 
            FROM periodes 
            JOIN quizz ON periodes.idPeriode = quizz.idPeriode 
            JOIN question ON quizz.idQuizz = question.idQuizz 
            JOIN reponses ON question.idQuestion = reponses.idQuestion 
            WHERE periodes.slugName = "${slugName}"`

        connection.query(sqlSelectReponse, (err, result) => {
            if (err) throw err;

            // on créer un nouveau tableau à partir du tableau d'objet quizz
            // pour ajouter un tableau d'objet des réponses des question associé
            const newQuizz = quizz.map(q => {
                let quizzWithReponses = {...q,reponses: []}

                for (const reponse of result) {
                    if(reponse.idQuestion === q.idQuestion) {
                        quizzWithReponses.reponses.push({
                            reponse: reponse.reponse,
                            isValid: reponse.estCorrect
                        })
                    }
                }
                
                return quizzWithReponses
            })

            console.log(newQuizz);
            res.send(newQuizz)
        })
        
    })
})

module.exports = router

router.get('/listQuizz', async (req, res) => {
    
    const sqlGetListQuizz = `
        SELECT 
            periodes.noms, 
            periodes.slugName,
            quizz.type,
            quizz.timer, 
            COUNT(question.intitule) AS nQuestion
        FROM periodes 
        JOIN quizz ON quizz.idPeriode = periodes.idPeriode 
        JOIN question ON question.idQuizz = quizz.idQuizz 
        WHERE quizz.idQuizz = question.idQuizz 
        GROUP BY question.idQuizz;
    `

    connection.query(sqlGetListQuizz, (err, result) => {
        if (err) throw err;
        //console.log('récupération des données du quizz');
        res.send(result)
    })
})

module.exports = router