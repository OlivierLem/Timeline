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
    console.log('test');
   
})

router.get('/', async (req, res) => {
    try {
        const sql = `SELECT * FROM periodes `;
        console.log('epoques envoyé')
        connection.query(sql, (err, result) => {
            res.send(result)
        })
    } catch (error) {
        console.error(error)
    }
})

module.exports = router