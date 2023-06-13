import { useEffect, useRef, useState } from "react"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";

export default function CreerQuizz () {
    const [stepFormQuizz, setStepFormQuizz] = useState(1)
    const [questionsForm, setQestionForm]  = useState([])
    const [countQuestion, setCountQuestion] = useState(0)
    const selectRef = useRef()
    const questionRef = useRef()
    const reponseRef = useRef()

    const defaultValues = {
        times: '25',
        question: '',
        responses: [
            {
                name: '',
                isValid: false
            },
            {
                name: '',
                isValid: false
            },
            {
                name: '',
                isValid: false
            },
            {
                name: '',
                isValid: false
            },
        ]
    }

    const shema = yup.object({
        times:  yup.number()
            .required("Ce champs est requis")
            .positive("Entrer un nombre supérieur à 0")
            .lessThan(101, 'Vous ne pouvez pas noter un nombre supérieur à 100'),
        question: yup.string()
            .required("Ce champs est requis"),
        responses: yup.array().of(
            yup.object({
                name: yup.string().required('Ce champs est requis')
            })
        )
    })

    const { 
        register, 
        handleSubmit: handleSubmit, 
        formState: { errors, isValid },
        trigger,
        setError,
        clearErrors
    } = useForm({
        defaultValues,
        resolver: yupResolver(shema)
    })

    const submit = handleSubmit (async (values) => {
        
        /*  try {
             clearErrors();
             if(question === undefined) {
                 await addQuestion(values)
             } else {
                 console.log('attente edit question');
                 await editQuestion({
                     id: question._id,
                     ...values
                 })
             }
             navigate('/')
 
         } catch (message) {
             console.error(message)
             setError('generic', {type: "generic", message})
         } */
     console.log(values);
    })

    const handleNextStep = async () => {
        
        await trigger('times').then((value) => {
            if (value === true) {
                setStepFormQuizz(stepFormQuizz + 1)
            }
        })
    }
    const handlePreviousStep = () => {
        if (stepFormQuizz > 1) {
            setStepFormQuizz(stepFormQuizz - 1)
        }
    }

    const handleAddQuestion = () => {
        let questionCurrent = questionRef.current.value;
        if(countQuestion > 0){
            console.log('test');
            setQestionForm(questionsForm.push({
                question: questionCurrent,
        }))

        }
        console.log(questionsForm);
        questionRef.current.value= ''

    }

    const renderQuestion = (nReponses) => {
        let reponse = []
        for (let i = 0; i < nReponses ; i++) {
            reponse.push(
            <>
                <div key={i}>
                    <input {...register(`responses[${i}].isValid`)} type="checkbox" />
                    <input {...register(`responses[${i}].name`)} type="text" placeholder={`réponse ${i + 1}`} />
                </div>
                {errors?.responses?.name &&  <p className={'errorMessage'}>{errors.responses.name.message}</p>}
            </>
            )
        }
        return reponse
    }


    return (
        <section>
            <h1>créer un quizz</h1>
            <form action="" onSubmit={submit}>
                {stepFormQuizz === 1 && (
                    <div className="paramsStep">
                    <div>
                        <label htmlFor="nQuestion">nombre de question</label>
                        <select {...register('nQuestion')} ref={selectRef} name="nQuestion" >
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="times">Durée question</label>
                        <input {...register('times')} type="text" placeholder="times" name="times" />
                    </div>
                    {errors?.times &&  <p className={'errorMessage'}>{errors.times.message}</p>}
                    <button type="button" onClick={handleNextStep}>Suivant</button>
                </div>
                )}                
                {
                    stepFormQuizz === 2 && (
                        <div className="questionStep">
                            <input {...register('question')} ref={questionRef} type="text" placeholder="question" />
                            {errors?.question &&  <p className={'errorMessage'}>{errors.question.message}</p>}
                            
                            <div ref={reponseRef}>
                                {renderQuestion(4)}
                            </div>
                            <button type="button" onClick={handlePreviousStep}>Précédent</button>
                            <button type="button" onClick={handleAddQuestion} >Ajouter</button>
                            {/* <button type="submit">créer le quizz</button> */}
                        </div>
                    )
                }
                
            </form>
        </section>
    )
}