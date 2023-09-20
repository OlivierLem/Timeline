import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { createPeriod } from "../../apis/period";
import './addPeriod.scss'
import { useState } from "react";
import InfoBulle from "../../component/infoBulle";

export default function AddPeriod () {

    // useState pour l'input de type file
    const [selectedFile, setSelectedFile] = useState(null)
    // pour l'affichege de message d'erreur pour l'input file
    const [audioError, setAudioError] = useState(null) 

    const defaultValues = {
        name: '',
        startPeriod: '',
        endPeriod: '',
        color: '',
    }

    // vérification du formulaire avec la librairie yup
    const shema = yup.object({
        name: yup.string().required('Ce champ est requis'),
        startPeriod: yup.number().lessThan(yup.ref('endPeriod'), 'Le champs début de la période doit être plus grand que le champs de fin').required('Ce champ est requis'),
        endPeriod: yup.number().moreThan(yup.ref('startPeriod'), 'Le champs fin de la période doit être plus grand que le champs de début').required('Ce champ est requis'),
        
    })


    // on change l'audio on modifie les state selectedFile et previewImage avec le nouveau fichier récupérer
    // si on ne récupére pas de fichier on met le state previewImage à null
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        if(file) {
            setAudioError(null)
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
        } 
        
    }

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

    // evenement submit pour faire une requête pour créer une periode
    const submit = handleSubmit (async (values) => {
        console.log(values.audio.type);
        if (!selectedFile) {
            console.error('Veuillez sélectionner un fichier !');
            setAudioError("Veuillez sélectionner un fichier !")
            return
        }

        // on lie le fichier et on le transforme pour avoir un fichier blob puis on le converti en binaire
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(selectedFile);
        fileReader.onload = async () => {
            const buffer = fileReader.result;
            console.log(buffer);
            const blob = new Blob([buffer], { type: selectedFile.type})

            console.log(selectedFile.type);

            const base64 = await convertBlobToBase64(blob);
            console.log(selectedFile);
            if(selectedFile.type === 'audio/mpeg') {
                try {
                    clearErrors();
                    values.audio = {
                        name: selectedFile.name,
                        content: base64
                    }
                   await createPeriod(values);
                } catch {
                    console.error("il y'a une erreur")
                    //setError('generic', {type: "generic", message})
                }
            } else {
                setAudioError("vous n'utiliser pas de fichier audio valide")
                return
            }
        }
        
    })

    // pages pour créer une période avec son formulaire
    // on vérifie si l'un des élément à une erreur si oui on affiche le message d'erreur
    return (
        <section>
            <h1 className="title">Créer une période</h1>
            <form action="" className="formField" onSubmit={submit}>
                <div>
                    <label htmlFor="name">Nom de la période</label>
                    <input {...register('name')} name="name" type="text" />
                    <InfoBulle>Insérer le nom la période</InfoBulle> 
                </div>
                {errors?.name && <p className='form-error'><i className="fa-solid fa-x"></i>{errors.name.message}</p> }
                
                <div>
                    <label htmlFor="startPeriod">Début de la période</label>
                    <input {...register('startPeriod')} type="text" name="startPeriod" />
                    <InfoBulle>Insérer l'année du début de la période</InfoBulle> 
                </div>
                {errors?.startPeriod && <p className='form-error'><i className="fa-solid fa-x"></i>{errors.startPeriod.message}</p> }

                <div>
                    <label htmlFor="endPeriod">Fin de la période</label>
                    <input {...register('endPeriod')} type="text" name="endPeriod" />
                    <InfoBulle>Insérer l'année de fin de la période</InfoBulle> 

                </div>
                {errors?.endPeriod && <p className='form-error'><i className="fa-solid fa-x"></i>{errors.endPeriod.message}</p> }
                <div className="colorField">
                    <label htmlFor="color">Couleur :</label>
                    <input {...register('color')} type="color" name="color"  />
                </div>
                {errors.generic && <p className='form-error'><i className="fa-solid fa-x"></i>{errors.generic.message}</p>}
                <input {...register('audio')} type="file" name="audio" id="audio" onChange={handleFileChange} />
                {audioError &&  <p className='form-error'><i className="fa-solid fa-x"></i>{audioError}</p>}
                <button type="submit">Créer la période</button>
            </form>
        </section>
    )
}