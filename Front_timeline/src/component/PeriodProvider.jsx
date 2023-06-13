import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import { getCurrentPeriod } from "../apis/period.js";
import { PeriodContext } from "../context/PeriodContext.jsx";
import moment from 'moment';
import { getEvenementsWithMiniature } from "../apis/evenement.js";



// eslint-disable-next-line react/prop-types
export default function PeriodProvider({children}) {
    const initialUser = useLoaderData();
    const [period, setPeriod] = useState(initialUser);
    const [evenements, setEvenements] = useState([])
    const [color, setColor] = useState('#598c9d')

    async function getPeriod(credentials) {
        if(credentials !== undefined) {
            const newPeriod = await getCurrentPeriod(credentials);
            //console.log(newPeriod);
            /*
            * Si on à plusieur images à récupérer
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
            // console.log(evenementsMap);
            setEvenements(evenementsMap);
    
            const periodeObj = {
                audio: newPeriod[0].audio,
                debutPeriode: newPeriod[0].debutPeriode,
                finPeriode: newPeriod[0].finPeriode,
                name: newPeriod[0].noms,
                slugName: newPeriod[0].slugName
            }
            console.log(periodeObj);
            setColor(newPeriod[0].color)
            setPeriod(periodeObj)
        } else {
            console.log('test event');
            setPeriod(null)
            setColor('#598c9d')
            getEvenementsWithMiniature().then(event => {
                moment().locale('fr')
                const eventChange = event.map(e => {
                    let date = `${moment(e.date).locale('fr').format('DD MMMM')} ${moment(e.date).year()}`    

                    let newEvent = {
                        id : e.idEvenement,
                        name:  e.name,
                        slugName: e.slugName,
                        date: date,
                        year: moment(e.date).year(),
                        miniature: e.url
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