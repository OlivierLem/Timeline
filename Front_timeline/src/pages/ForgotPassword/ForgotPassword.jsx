import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { resetPassword } from '../../apis/user';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";


export function ForgotPassword() {
    const { user } = useContext(AuthContext)

    const defaultValues = {
        email: '',
    }
    const navigate = useNavigate()
     
    const shemaConnexion = yup.object({
        email: yup
            .string()
            .required('Ce champ est vide')
            .email('email incorrect'),
    })

    const { 
        register, 
        handleSubmit,
        formState: { errors, isSubmitting } ,
        setError, 
        clearErrors
    } = useForm({
        defaultValues,
        resolver: yupResolver(shemaConnexion)
    })

    const submit = handleSubmit(async (values) => {
        console.log(values);
        try {
            clearErrors();
            await resetPassword(values)
            navigate('/')
        } catch (message) {
            setError('generic', {type: 'generic', message})
        }
    })
    return (
        <>
            {
                user ? (
                    <Navigate to='/' />
                ) : (
                <section>
                    <h1 className="title">Mots de passe oublié</h1>
                    <form onSubmit={submit} className="formField">
                        <p>Veuillez saisir votre adresse email ci-dessous et nous vous enverrons un mail pour réinitialiser votre mot de passe.</p>
                        <div>
                            <input {...register('email')} type="text" placeholder="Email" aria-placeholder="Email"/>
                        </div>
                        {errors?.email && <p className='form-error'><i className="fa-solid fa-x"></i>{errors.email.message}</p>}

                        <button type="submit">Envoyer un mail</button>
                    </form>
                </section>
                )
            }
        </>
    )
}