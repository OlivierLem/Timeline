import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { editInfosEvent } from "../apis/evenement";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export function FormEditEvent ({id, name, date}) {
    const defaultValues = {
        name: name,
        date: new Date().toISOString()
    }

    const navigate = useNavigate()
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

    const submit = handleSubmit (async (values) => {
        try {
            clearErrors()
            values.id = id
            let {date: newDate} = values;
            newDate = moment(newDate, 'DD-MM-YYYY')
            await editInfosEvent(values)
            navigate('/admin/evenements')
        } catch (error) {
            
        }
    })

    return (
        <form action="" onSubmit={submit} className="formField">
            <h2>Editer événement</h2>
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
            
            <button type="submit">Modifier événement</button>
        </form>
    )
}