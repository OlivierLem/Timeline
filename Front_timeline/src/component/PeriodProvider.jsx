import { useLayoutEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import { getCurrentPeriod } from "../apis/period.js";
import { PeriodContext } from "../context/PeriodContext.jsx";
import moment from 'moment';
import { getEvenementsWithMiniature } from "../apis/evenement.js";
import { hexToHSL } from "../assets/script/hexToHsl.js";

export default function PeriodProvider({children}) {
    const [period, setPeriod] = useState();
    const [evenements, setEvenements] = useState([])
    const [color, setColor] = useState() 

    useLayoutEffect(() => {
        // si on color change on modifie les variable css primary et secondary
        if(period?.color) {
            const r = document.querySelector(':root');
            // modification de la variable css primary avec la variable color de la période
            r.style.setProperty('--primary', period.color)
            // conversion du code couleur d'héxa à hsl
            let colorConverter = hexToHSL(period.color)
            // modification de la variable css secondary 
            // variable color en hsl avec moins de luminosité
            r.style.setProperty('--secondary', `hsl(
                ${colorConverter.h},
                ${colorConverter.s}%,
                ${colorConverter.l - 6}%
            )`)
        }
    }, [color, period]);

    // requête pour afficher la période courante si on à un paramétres ou pour afficher toute les périodes
    async function getPeriod(credentials) {
        if(credentials !== undefined) {
            const newPeriod = await getCurrentPeriod(credentials);
            /* // Si on à plusieur images à récupérer
            const imgForAddIntoEvent = periode.map(p => ({
                name: p.name,
                images: p.url
            })) */

            // on filtre pour ne pas avoir de doublon
            // on map pour n'avoir que les données de l'événement
            const evenementsMap = await newPeriod
                .filter((p, i) => {
                    let nextIndex = i + 1
                    return p.name !==  newPeriod[nextIndex]?.name;
                }).map(p => { 
                    moment().locale('fr')
                    let date = `${moment(p.date).locale('fr').format('DD MMMM')} ${moment(p.date).year()}`
                    let evenement = {
                        id: p.idEvenement,
                        name:  p.name,
                        slugName: p.slugName,
                        date: date,
                        year: moment(p.date).year(),
                        miniature: p.url
                    };
    
                    /* 
                    * Si on à plusieur images à récupérer
                    * push les images dans leur evenement correspondant
                    for (const i of imgForAddIntoEvent) {
                        if(i.name === p.name) {
                            console.log(i.name, p.name);
                            evenement.images.push(i.images)
                        }
                    } */

                    return evenement
                })
            setEvenements(evenementsMap);
    
            // objet qui ne posséde que les paramétres de la période courante
            const periodeObj = {
                audio: newPeriod[0].audio,
                debutPeriode: newPeriod[0].debutPeriode,
                finPeriode: newPeriod[0].finPeriode,
                name: newPeriod[0].noms,
                slugName: newPeriod.at(-1),
                color: newPeriod[0].color
            }
            setColor(newPeriod[0].color) // on modifie le state color
            setPeriod(periodeObj)
        } else {
            // on remet par défault le state periode et color
            setPeriod(null)

            getEvenementsWithMiniature().then(event => {
                moment().locale('fr') // date traduite en français
                console.log(event);

                // map les événement en tableau d'objet
                const eventChange = event.map(e => {
                    let date = `${moment(e.date).locale('fr').format('DD MMMM')} ${moment(e.date).year()}`    

                    let newEvent = {
                        id : e.idEvenement,
                        name:  e.name,
                        slugName: e.slugName,
                        date: date,
                        year: moment(e.date).year(),
                        miniature: e.url,
                        color: '#598c9d'
                    }
                    return newEvent
                })
                console.log(eventChange);
                setEvenements(eventChange);
            })
        }
        
    }

    return (
        <PeriodContext.Provider value={{period, color, evenements, getPeriod}}>
            {children}
        </PeriodContext.Provider>
    )
}