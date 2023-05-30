const connection = require("../../database/db");

const router = require("express").Router()

router.post('/', async (req, res) => {
    const { name, startPeriod, endPeriod, color } = req.body;

    function transformLink (value) {
        let link= value.normalize('NFD')
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .replaceAll(' ', '_')
        return link
    }

    const slugName = transformLink(name);

    const sql = `INSERT INTO periodes (noms, slugName, debutPeriode, finPeriode, color) VALUES (?, ?, ?, ?, ?) `;
    
    const valuesInsert = [name, slugName, startPeriod, endPeriod, color]
    
    console.log('période ajouté');
    connection.query(sql, valuesInsert, (err, result) => {
        if (err) throw err;
        res.json('periode ajouter');
    })    
})

router.get('/current', async (req, res) => {
    const { slugName } = req.query;

    console.log(slugName);

    const sql = `SELECT * FROM periodes    
    INNER JOIN
        periode_evenement ON periodes.idPeriode = periode_evenement.idPeriode
    LEFT JOIN
        evenements ON periode_evenement.idEvenement = evenements.idEvenement
    INNER JOIN
        images ON evenements.idEvenement = images.idEvenement
    WHERE periodes.slugName = '${slugName}'
    `
    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result)
    })
   
})

router.get('/', async (req, res) => {

    const { eventYear } = req.query
    console.log(eventYear);

    try {
        if (eventYear) {
            const sql = `SELECT * FROM periodes WHERE debutPeriode <= '${eventYear}' AND finPeriode >= '${eventYear}' `;
            console.log('epoques avec dateEvent envoyé')
            connection.query(sql, (err, result) => {
                if (err) throw err;
                console.log(result);
                res.send(result)
            })
        } 
        else {
            const sql = `SELECT * FROM periodes `;
            console.log('epoques envoyé')
            connection.query(sql, (err, result) => {
            res.send(result)
            })
        }
        
    } catch (error) {
        console.error(error)
    }
})

module.exports = router