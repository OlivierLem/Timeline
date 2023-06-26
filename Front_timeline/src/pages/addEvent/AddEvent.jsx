import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { createEvenement } from "../../apis/evenement.js";
import { useState } from "react";
import moment from 'moment';
import './AddEvent.scss';

export default function AddEvent () {

    // useState pour l'input de type file
    const [selectedFile, setSelectedFile] = useState(null);
    // useState pour l'attribut src de la balise img
    const [previewImage, setPreviewImage] = useState(null);

    const defaultValues = {
        name: '',
        date: '',
        image: '',
    }

    // vérification du formulaire avec la librairie yup
    const shema = yup.object({
        name: yup.string()
            .required('Ce champ est requis'),
        date: yup.date()
            .max(new Date(), 'vous ne pouvez pas mettre une future date')
            .required('Vous devez choisir une date')
    })

    // librairie react hook form pour utiliser des formalaire en react
    // register fait une ref aux élément qui posséde un register
    // formState error permet d'afficher les message d'erreur si il y'a une erreur
    const {
        register, 
        handleSubmit, 
        formState: { errors },
        setError,
        clearErrors
    } = useForm({
        defaultValues,
        resolver: yupResolver(shema)
    })

    // déclaration de la fonction qui récupére un objet blob, le lit et le convertit en
    // une chaine de caractères base64 qui permet de coder tout type de données
    // une fois la promesse résolue, si aucune erreur n'a été rencontré, 
    // le fichier codé et renvoyé en retour de fonction
    const convertBlobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(blob);
            fileReader.onload= () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    // on change l'image on modifie les state selectedFile et previewImage avec le nouveau fichier récupérer
    // si on ne récupére pas de fichier on met le state previewImage à null
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        if(file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                setPreviewImage(fileReader.result);
            } 
        } else {
            setPreviewImage(null)
        }
    }

    const submit = handleSubmit (async (values) => {
        console.log(values);
        // vérifie si un fichier est séléctionner
        if (!selectedFile) {
            console.error('Veuillez sélectionner un fichier !');
            return
        }
        // on lie le fichier et on le transforme pour avoir un fichier blob puis on le converti en binaire
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(selectedFile);
        fileReader.onload = async () => {
            const buffer = fileReader.result;
            const blob = new Blob([buffer], { type: selectedFile.type})

            values.image = blob
            let {date} = values
            // on modifie le format de la date
            date = moment(date, 'DD-MM-YYYY')
            try {
                // on vide les erreurs et on envoie la requête fetch pour insérer un évenement
                clearErrors();
                await createEvenement(values);
            } catch (message) {
                // on vérifie si on à une erreur
                console.error(message)
                setError('generic', {type: "generic", message})
            }
        }
    })

    // pages pour créer un événement avec son formulaire
    // on vérifie si l'un des input text ou date à une erreur si oui on affiche le message d'erreur
    return (
        <section>
            <h1>Ajouter une évenement</h1>
            <form action=""  onSubmit={submit} className="formField">
                <div>
                    <label  htmlFor="name">Nom de l'événement</label>
                    <input {...register('name')} type="text" name="name" />
                </div>
                {errors?.name && <p className='form-error'><i className="fa-solid fa-x"></i>{errors.name.message}</p> }

                <div>
                    <label htmlFor="date">Date</label>
                    <input {...register('date')} type="date" name="date" id="" />
                </div>
                {errors?.date && <p className='form-error'><i className="fa-solid fa-x"></i>{errors.date.message}</p> }

                <input 
                    {...register('image')} 
                    type="file" 
                    name="image" 
                    onChange={handleFileChange}
                />
                
                <button type="submit">Ajouter</button>
            </form>
        </section>
    )
}