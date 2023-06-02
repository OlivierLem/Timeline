const connection = require("../../database/db");
const router = require("express").Router()

router.post('/', async (req, res) => {
    const { name, date, image } = req.body;

    function transformLink (value) {
        let link= value.normalize('NFD')
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .replaceAll(' ', '_')
        return link
    }

    const slugName = transformLink(name);

    const sqlInsertEvent = `INSERT INTO evenements (name, slugName, date) VALUES ("${name}", "${slugName}", '${date}') `;
    
    //const valuesInsert = [name, date]
    console.log(date)
    connection.query(sqlInsertEvent, (err, result) => {
        if (err) throw err;

        const sqlSelect = `SELECT idEvenement FROM evenements WHERE name = "${name}" `
        
        let idEvenement = result.insertId
        
        connection.query(sqlSelect, (err, result) => {
            if (err) throw err;
            
            if(result) {
                const sqlInsertImage = `INSERT INTO images (url, miniature,idEvenement) VALUES ("${image}", 1 ,'${idEvenement}')`;
                
                const valuesImageInsert = [image, 1, idEvenement]
                console.log('événement envoyé');
                connection.query(sqlInsertImage, (err, result) => {
                    if (err) throw err;
                    res.json('Evenement Ajouté')
                } )
            }
        })
    })     
})

router.get('/', async (req, res) => {
    try {
        const sql = `SELECT * FROM evenements ORDER BY date `;
        console.log('evenement envoyé')
        connection.query(sql, (err, result) => {
            if(err) throw err;

            res.send(result)
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/current', async (req, res) => {

    const { slugName } = req.query
    console.log(slugName);
    try {
        const sql = `
            SELECT evenements.idEvenement, evenements.name, evenements.date, images.url 
            FROM evenements 
            JOIN images ON evenements.idEvenement = images.idEvenement 
            WHERE evenements.slugName = "${slugName}" `;
            
        console.log('evenement ajouté')
        connection.query(sql, (err, result) => {
            if(err) throw err;
            
            res.send(result);
        })
    } catch (error) {
        console.error(error)
    }
})

router.post('/association', async (req, res) => {
    const { event, periode } = req.body;
    console.log(req.body);
    //! Where à ajouté
    // WHERE idEvenement <> '${event}' AND idPeriode <> '${periode}'
    const sql = `
        INSERT INTO periode_evenement (idEvenement, idPeriode) 
        VALUES ('${event}', '${periode}')  `;

    connection.query(sql, (err, result) => {
        if (err) {
            res.status(400).json('le lien entre les 2 tables existe déja')
        }
        console.log('lien créer entre les 2 tables');
        res.json('lien créer entre les 2 tables')
    })
})

router.delete('/', async (req, res) => {
    const { id } = req.body;
    console.log('test delete');

    const sqlDeleteImages = `
        DELETE FROM images WHERE idEvenement = '${id}'     
    `

    connection.query(sqlDeleteImages, (err, result) => {
        if (err) throw err;
        const sqlDeleteEvent = `DELETE FROM evenements WHERE idEvenement = '${id}'`

        connection.query(sqlDeleteEvent, (err, result) => {
            console.log('événements supprimer')
            res.json('événements supprimer')
        })
    })
})

router.post('/creerArticle', (req, res) => {
    const {slugName, content} = req.body;
    const sql = `SELECT idEvenement FROM evenements WHERE slugName = '${slugName}'`;

    /* connection.query(sql, (err, result) => {
        const sqlInsert = `INSERT INTO textcomponent (content, idEvenement) VALUES ()`
    }) */
})

module.exports = router