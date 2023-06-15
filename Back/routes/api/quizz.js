const connection = require("../../database/db");

const router = require('express').Router()

router.post('/', async (req, res) => {
    console.log(req.body)
    const { periode: slugName, times, questions } = req.body
    const sql = `SELECT idPeriode FROM periodes WHERE slugName = "${slugName}"`

    connection.query(sql, (err, result) => {
        if (err) throw err;

        const id = result[0].idPeriode
        const insertQuizzSql = `INSERT INTO quizz (timer, idPeriode) VALUES ('${times}', '${id}')`
        
        connection.query(insertQuizzSql, (err, result) => {
            if (err) throw err;
            //console.log(result);
            const idQuizz = result.insertId
            for (const question of questions) {
                const insertQuestionSql = `INSERT INTO question (intitule, idQuizz) VALUES ("${question.question}", "${idQuizz}")`;

                connection.query(insertQuestionSql, (err, result) => {
                    const idQuestion = result.insertId
                    console.log(result);
                        for (const reponse of question.reponses) {
                            let estCorrect = reponse.isValid === true ? 1 : 0
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
    console.log(req.body)
})

module.exports = router