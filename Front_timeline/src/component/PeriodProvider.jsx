import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import { getCurrentPeriod } from "../apis/period.js";
import { PeriodContext } from "../context/PeriodContext.jsx";
import moment from 'moment';



// eslint-disable-next-line react/prop-types
export default function PeriodProvider({children}) {
    const initialUser = useLoaderData();
    const [period, setPeriod] = useState(initialUser);
    const [evenements, setEvenements] = useState([])
    const [color, setColor] = useState('#6ff855')

    async function getPeriod(credentials) {
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
                let evenement = {
                    id: p.idEvenement,
                    name:  p.name,
                    slugName: p.slugName,
                    date: moment(p.date).locale('fr').format('DD MMMM YYYY'),
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
        //console.log(evenementsMap);
        setEvenements(evenementsMap);

        const periodeObj = {
            audio: newPeriod[0].audio,
            debutPeriode: newPeriod[0].debutPeriode,
            finPeriode: newPeriod[0].finPeriode,
            name: newPeriod[0].noms,
        }
        console.log(periodeObj);
        setColor(newPeriod[0].color)
        setPeriod(periodeObj)
    }

    return (
        <PeriodContext.Provider value={{period, color, evenements, getPeriod}}>
            {children}
        </PeriodContext.Provider>
    )
}