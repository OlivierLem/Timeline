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
            const sqlTestJoin = `
            SELECT DISTINCT evenements.name,
                CASE 
                WHEN evenements.idEvenement = textcomponent.idEvenement 
                    THEN 1
                END AS testJoin 
            FROM evenements 
            JOIN textcomponent ON evenements.idEvenement = textcomponent.idEvenement`
            const event = result;

                connection.query(sqlTestJoin, (err, result) => {
                    const eventWithVerifArticle = event.map(e => {
                        const evenement = {...e, testArticle: 0}

                        for (const testArticle of result) {
                            if (e.name === testArticle.name) {
                                evenement.testArticle = 1
                                break
                            }
                        }
                        return evenement;
                    })
                    res.send(eventWithVerifArticle)
                })
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/withMiniature', async (req, res) => {
    try {
        const sql = `
            SELECT * FROM evenements 
            JOIN images 
            ON evenements.idEvenement = images.idEvenement 
            WHERE images.miniature = 1 ORDER BY evenements.date`;
            
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
            SELECT 
                evenements.slugName, 
                evenements.idEvenement, 
                evenements.name, 
                evenements.date, 
                images.url 
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
    console.log(id);
    const sqlDeleteImages = `
        DELETE FROM images WHERE idEvenement = '${id}'     
    `

    connection.query(sqlDeleteImages, (err, result) => {
        if (err) throw err;
        const sqlDeleteLink = `DELETE FROM periode_evenement WHERE idEvenement = '${id}'`
        
        connection.query(sqlDeleteLink, (err, result) => {
            const sqlDeleteEvent = `DELETE FROM evenements WHERE idEvenement = '${id}'`

            connection.query(sqlDeleteEvent, (err, result) => {
                if (err) throw err;

                console.log('événements supprimer')
                res.json('événements supprimer')
            })
        })
    })
})

router.post('/creerArticle', (req, res) => {
    const {slugName, components } = req.body;
    console.log(req.body);
    const sql = `SELECT idEvenement FROM evenements WHERE slugName = '${slugName}'`;

    connection.query(sql, (err, result) => {
        if(err) throw err;

        const id = result[0].idEvenement
        //const sqlSelect = `SELECT evenements.idEvenement FROM evenements JOIN textcomponent ON evenements.idEvenement = textcomponent.idEvenement WHERE evenements.slugName = '${slugName}' AND textcomponent.idEvenement != ${id};`
        let insertValues = ''
        //! Vérifier que l'événement n'as pas encore d'article
        //! bug dans l'ajout d'article à vérifier
        for (let i = 0; i < components.length; i++) {
            const c = components[i];
            if (i === (components.length - 1)) {
                insertValues += `('${c.content}','${c.orderValue}','${id}')`
            } else {
                insertValues += `('${c.content}','${c.orderValue}','${id}'),`
            }
        }
        console.log(insertValues);
        const sqlInsertText = `INSERT INTO textComponent (content, orderValue, idEvenement) VALUES ${insertValues} `;

        connection.query(sqlInsertText, (err, result) => {
            if(err) throw err;
            console.log('article ajouté');
            res.send('article ajouté')
        })
        
    })
})

router.get('/getArticleEvenement', (req, res) => {
    const { slugName } = req.query;
    console.log('event');
    const sql = `SELECT idEvenement FROM evenements WHERE slugName = '${slugName}'`
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log('event query');

        let id = result[0].idEvenement;
        console.log(id);
        const sqlSelectArticle = `
            SELECT  
                evenements.name, 
                textcomponent.content, 
                textcomponent.orderValue 
            FROM evenements 
            JOIN textcomponent 
            ON evenements.idEvenement = textcomponent.idEvenement 
            WHERE evenements.idEvenement = '${id}'`;
        connection.query(sqlSelectArticle, (err, result) => {
            if (err) throw err;
            console.log('Envoie article');
            res.send(result)
        })
    })
})

module.exports = router