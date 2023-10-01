const connection = require("../../database/db");
const router = require("express").Router()

router.post('/', async (req, res) => {
    const { name, date, image } = req.body;
    // fonction qui tranforme le noms de l'event en slugName 
    // sans accent et les espaces sont remplacé par _
    function transformLink (value) {
        let link= value.normalize('NFD')
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .replaceAll(' ', '_')
        return link
    }

    const slugName = transformLink(name);
    // requête sql pour inséré dans la table evenements le name, le slugName, et la date
    const sqlInsertEvent = `INSERT INTO evenements (name, slugName, date) VALUES (?, ?, ?)`;
    const valueInsertEvent = [name, slugName, date] 

    // on effectue la requêté pour l'insertion
    connection.query(sqlInsertEvent, valueInsertEvent, (err, result) => {
        if (err) throw err;

        // on select l'evenement créer et on récupére son id

        const sqlSelect = `SELECT idEvenement FROM evenements WHERE name = "?"`
        
        const valueEvent = name
        let idEvenement = result.insertId
        
        connection.query(sqlSelect, valueEvent, (err, result) => {
            if (err) throw err;
            
            // on insert l'images de miniature associé à l'event récupérer grâce à son id, on mets 1 à miniature qui sera utilisé comme booléens 
            if(result) {
                const sqlInsertImage = `INSERT INTO images (url, miniature,idEvenement) VALUES ( ? , 1 , ?)`;
                const valueImageEvent = [image, idEvenement]
                console.log(valueImageEvent);

                connection.query(sqlInsertImage, valueImageEvent, (err, result) => {
                    if (err) throw err;
                    res.json('Evenement Ajouté')
                } )
            }
        })
    })     
})

router.get('/', async (req, res) => {
    try {
        // on select les événement trié par sa date
        const sql = `SELECT * FROM evenements ORDER BY date `;

        connection.query(sql, (err, result) => {
            if(err) throw err;
            // on select les evenement qui sont associé à une table textcomponent 
            // pour verifier si une table posséde une jointure avec textcomponent
            const sqlTestJoin = `
                SELECT DISTINCT evenements.name,
                CASE 
                    WHEN evenements.idEvenement = textcomponent.idEvenement 
                        THEN 1
                    END AS testJoin 
                FROM evenements 
                JOIN textcomponent ON evenements.idEvenement = textcomponent.idEvenement
            `;
            
            // on stocke le result dans event
            const event = result;

                connection.query(sqlTestJoin, (err, result) => {

                    // on créer un nouveau tableau à partir de la constante event et on ajoute une valeur à 0
                    const eventWithVerifArticle = event.map(e => {
                        const evenement = {...e, testArticle: 0}

                        // on vérifie si les event on une jointure avec textcomponent et si oui on modifie testArticle à 1
                        for (const testArticle of result) {
                            if (e.name === testArticle.name) {
                                evenement.testArticle = 1
                                break
                            }
                        }
                        return evenement; // on retourne le tableau modifier
                    })
                    res.send(eventWithVerifArticle) // envoie dans le front des evenements
                })
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/withMiniature', async (req, res) => {
    try {
        // on récupére les evenement avec son image de miniature
        const sql = `
            SELECT * FROM evenements 
            JOIN images 
            ON evenements.idEvenement = images.idEvenement 
            WHERE images.miniature = 1 ORDER BY evenements.date`;
            
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

    try {
        // on récupére l'événement courant d'un page avec ces images associé
        const sql = `
            SELECT 
                evenements.slugName, 
                evenements.idEvenement, 
                evenements.name, 
                evenements.date, 
                images.url 
            FROM evenements 
            JOIN images ON evenements.idEvenement = images.idEvenement 
            WHERE evenements.slugName = ? `;
            
        const valueCurrentEvent = slugName
        connection.query(sql, valueCurrentEvent, (err, result) => {
            if(err) throw err;

            res.send(result);
        })
    } catch (error) {
        console.error(error)
    }
})

router.post('/association', async (req, res) => {
    const { event, periode } = req.body;
    //! Where à ajouté
    // WHERE idEvenement <> '${event}' AND idPeriode <> '${periode}'
    const sql = `
        INSERT INTO periode_evenement (idEvenement, idPeriode) 
        VALUES (?, ?)  `;

    const valueLinkPeriodEvent = [event, periode]
    connection.query(sql, valueLinkPeriodEvent, (err, result) => {
        if (err) {
            res.status(400).json('le lien entre les 2 tables existe déja')
        }
        res.json('lien créer entre les 2 tables')
    })
})

router.delete('/', async (req, res) => {
    const { id } = req.body;

    // on supprime l'evenement + ces images + liens avec les periodes
    const sqlDeleteEvent = `DELETE FROM evenements WHERE idEvenement = ?`

    connection.query(sqlDeleteEvent, id, (err, result) => {
        if (err) throw err;

        console.log('événements supprimer')
        res.json('événements supprimer')
    })
})

router.post('/creerArticle', (req, res) => {
    const {slugName, components } = req.body;
    // on select l'événement
    const sql = `SELECT idEvenement FROM evenements WHERE slugName = ?`;

    const valueEventArticle = slugName
    connection.query(sql, valueEventArticle, (err, result) => {
        if(err) throw err;

        const id = result[0].idEvenement
        //! Vérifier que l'événement n'as pas encore d'article
        //! bug dans l'ajout d'article à vérifier
        // on créer une boucle pour modifier insertValues (les valeurs à insérer), on mets les paramétres 
        // qui seront insérer: l'id de l'event associé, le contenu du composant et l'ordre d'affichage des composants
        for (let i = 0; i < components.length; i++) {
            const c = components[i];
            
            const sqlInsertText = `INSERT INTO textComponent (content, orderValue, idEvenement) VALUES (?, ?, ?) `;
            let valueInsertText = [c.content, c.orderValue, id];
            connection.query(sqlInsertText, valueInsertText , (err, result) => {
                if(err) throw err;
            })
        }
        res.send('article ajouté')
        
    })
})

router.get('/getArticleEvenement', (req, res) => {
    const { slugName } = req.query;
    // on select un evenement
    const sql = `SELECT idEvenement FROM evenements WHERE slugName = ?`
    const valueGetArticle = slugName
    connection.query(sql, valueGetArticle, (err, result) => {
        if (err) throw err;

        let id = result[0].idEvenement;

        // on select les composant associé à la table evenement

        const sqlSelectArticle = `
            SELECT  
                evenements.name, 
                textcomponent.content, 
                textcomponent.orderValue 
            FROM evenements 
            JOIN textcomponent 
            ON evenements.idEvenement = textcomponent.idEvenement 
            WHERE evenements.idEvenement = ?`;

        const valueSelectArticle = id
        connection.query(sqlSelectArticle, valueSelectArticle, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    })
})

module.exports = router