const connection = require("../../database/db")

const router = require("express").Router()

router.post('/', async (req, res) => {
    const { name, date, image } = req.body;

    const sqlInsertEvent = `INSERT INTO evenement (name, date) VALUES (?, ?) `;
    
    const valuesInsert = [name, date]

    connection.query(sqlInsertEvent, valuesInsert, (err, result) => {
        if (err) throw err;

       const sqlSelect = `SELECT idEvenement FROM evenement WHERE name = ${name} `
        const idEvenement = result.id
        
        connection.query(sqlSelect, (err, result) => {
            if (err) throw err;
            
            if(result) {
                const sqlInsertImage = `INSERT INTO images (url, imagesPrincipal, idEvenement) VALUES (?, ?, ?)`;
                
                const valuesImageInsert = [image, 1, idEvenement]
                connection.query(sqlInsertImage, valuesImageInsert, (err, result) => {
                    if (err) throw err;

                    console.log('évenement ajouté');
                    res.json('Evenement Ajouté')
                } )
            }
        })
    })     
})

module.exports = router