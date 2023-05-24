import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import {  useRef } from "react";
import { createPeriod } from "../../apis/period";

export default function AddPeriod () {

    const formRef = useRef();

    const defaultValues = {
        name: '',
        startPeriod: '',
        endPeriod: '',
        color: '#b38c52',
    }

    const shema = yup.object({
        name: yup.string().required('Ce champ est requis'),
        startPeriod: yup.string().required('Ce champ est requis'),
        endPeriod: yup.string().required('Ce champ est requis'),
    })

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
        console.log(values);
        try {
            clearErrors();
            await createPeriod(values);
        } catch (message) {
            console.error(message)
            setError('generic', {type: "generic", message})
        }
    })

    return (
        <section>
            <h1>Ajouter une période</h1>
            <form action="" ref={formRef} onSubmit={submit}>
                <div>
                    <label htmlFor="name">Nom de la période</label>
                    <input {...register('name')} name="name" type="text" />
                </div>
                {errors?.name && <p className='form-error'><i className="fa-solid fa-x"></i>{errors.name.message}</p> }
                
                <div>
                    <label htmlFor="startPeriod">Début de la période</label>
                    <input {...register('startPeriod')} type="text" name="startPeriod" />
                </div>
                {errors?.startPeriod && <p className='form-error'><i className="fa-solid fa-x"></i>{errors.startPeriod.message}</p> }

                <div>
                    <label htmlFor="endPeriod">Fin de la période</label>
                    <input {...register('endPeriod')} type="text" name="endPeriod" />
                </div>
                {errors?.endPeriod && <p className='form-error'><i className="fa-solid fa-x"></i>{errors.endPeriod.message}</p> }

                <input {...register('color')} type="color" name="color"  />
                {errors.generic && <p className='form-error'><i className="fa-solid fa-x"></i>{errors.generic.message}</p>}

                <button type="submit">Ajouter</button>
            </form>
        </section>
    )
}