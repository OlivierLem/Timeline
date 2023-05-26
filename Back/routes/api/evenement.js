const connection = require("../../database/db")
const router = require("express").Router()

router.post('/', async (req, res) => {
    const { name, date, image } = req.body;

    const sqlInsertEvent = `INSERT INTO evenements (name, date) VALUES ('${name}', '${date}') `;
    
    //const valuesInsert = [name, date]
    console.log(date)
    connection.query(sqlInsertEvent, (err, result) => {
        if (err) throw err;

        const sqlSelect = `SELECT idEvenement FROM evenements WHERE name = '${name}' `
        
        let idEvenement = result.insertId
        
        connection.query(sqlSelect, (err, result) => {
            if (err) throw err;
            
            if(result) {
                const sqlInsertImage = `INSERT INTO images (url, miniature,idEvenement) VALUES ('${image}', 1 ,'${idEvenement}')`;
                
                const valuesImageInsert = [image, 1, idEvenement]
                connection.query(sqlInsertImage, (err, result) => {
                    if (err) throw err;

                    console.log('évenement ajouté');
                    res.json('Evenement Ajouté')
                } )
            }
        })
    })     
})

module.exports = router