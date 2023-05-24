const connection = require("../../database/db")

const router = require("express").Router()

router.post('/', async (req, res) => {
    const { name, startPeriod, endPeriod, color } = req.body;

    const sql = `INSERT INTO periodes (noms, debutPeriode, finPeriode, color) VALUES (?, ?, ?, ?) `;
    
    const valuesInsert = [name, startPeriod, endPeriod, color]

    connection.query(sql, valuesInsert, (err, result) => {
        if (err) throw err;
        console.log('ajout période');
        res.json('periode ajouter');
    })    
})

router.get('/current', async (req, res) => {
    console.log('test');
    /* const { token } = req.cookies;
    if (token) {
        console.log('token user trouvé');
        try {
            const decodedToken = jsonwebtoken.verify(token, keyPub, {
                algorithms: "RS256",
            });
            //console.log({decodedToken});

            const sql = `SELECT * FROM user WHERE idUser = '${decodedToken.sub}'`;

            connection.query(sql, (err, result) => {
                if (err) throw err;
                if (result) {
                    res.json(...result)
                } else {
                    console.log('no result');
                    res.json(null)
                }
            })
            
        } catch (error) {
            console.error(error)
            res.json(null)
        }
    } else {
        //console.log("il n'ya pas de token user");
        res.json(null)
    } */
})

module.exports = router