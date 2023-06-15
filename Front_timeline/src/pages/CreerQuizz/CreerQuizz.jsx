import { Fragment, useEffect, useRef, useState } from "react"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import './CreerQuizz.scss'
import { useParams } from "react-router-dom";
import { createQuizz } from "../../apis/quizz";

export default function CreerQuizz () {
    const [stepFormQuizz, setStepFormQuizz] = useState(1)
    const [questionForm, setQestionForm]  = useState([])
    const [countQuestion, setCountQuestion] = useState()
    const selectRef = useRef()
    const questionRef = useRef()
    const reponseRef = useRef()
    const { periode } = useParams()

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
        question: yup.string().required("Ce champs est requis"),
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
     const newValues = {
        times: values.times,
        nQuestion: values.nQuestion,
        questions: questionForm,
        periode
     }
     console.log(newValues);
     createQuizz(newValues)
    })

    const handleNextStep = async () => {
        
        await trigger('times').then((value) => {
            if (value === true) {
                setStepFormQuizz(stepFormQuizz + 1)
                setCountQuestion(selectRef.current.children[1].value)
            }
        })
    }
    const handlePreviousStep = () => {
        if (stepFormQuizz > 0) {
            setStepFormQuizz(stepFormQuizz - 1)
        }
    }

    const handleAddQuestion = async () => {
        let questionCurrent = questionRef.current.children[0].value;
        let reponsesCurrent =  reponseRef.current.children;

        if(countQuestion > 0){
            let checkValidReponse = 0
            for (let i = 0; i < reponsesCurrent.length; i++) {
                if(reponsesCurrent[i].children[0].checked === true) {
                    checkValidReponse = 1
                    for (let j = 0; j < reponsesCurrent.length; j++) {
                        if (reponsesCurrent[j].children[1].value === '') {
                            return
                        }
                    }
                }
                
            if (i === reponsesCurrent.length - 1 && checkValidReponse === 0) {
                return
            }
            }
            let reponses = []
            for (const reponse of reponsesCurrent) {
                reponses.push({
                    name: reponse.children[1].value,
                    isValid: reponse.children[0].checked
                })
            }

            //console.log(reponses);
            if (questionCurrent !== '') {
                console.log(countQuestion);
                if (questionForm.length > 0) {
                    setQestionForm(() => [ ...questionForm, {
                        question: questionCurrent,
                        reponses, 
                    }])
                } else {
                    setQestionForm([{
                        question: questionCurrent,
                        reponses, 
                    }])
                }
                setCountQuestion(countQuestion - 1)

                questionRef.current.children[0].value = ''
                for (const reponse of reponsesCurrent) {
                        reponse.children[1].value = '';
                        reponse.children[0].checked = false;
                }
            }
        }
        
    }
    
    const renderQuestion = (nReponses) => {
        let reponse = []
        for (let i = 0; i < nReponses ; i++) {
            reponse.push(
            <Fragment key={i}>
                <div>
                    <input {...register(`responses[${i}].isValid`)} type="checkbox" />
                    <input {...register(`responses[${i}].name`)} type="text" placeholder={`réponse ${i + 1}`} />
                </div>
                {errors?.responses?.name &&  <p className={'errorMessage'}>{errors.responses.name.message}</p>}
            </Fragment>
            )
        }
        return reponse
    }

    return (
        <section>
            <h1>créer un quizz</h1>
            <form action="" className="formQuizz" onSubmit={submit}>
                    <div className={`paramsStep ${stepFormQuizz === 1 && 'active'}`}>
                        <div ref={selectRef}>
                            <label htmlFor="nQuestion">nombre de question</label>
                            <select {...register('nQuestion')}  name="nQuestion" >
                                <option value="2">2</option>
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
                    <div ref={questionRef} className={`questionStep ${stepFormQuizz === 2 && 'active'}`}>
                        <input {...register('question')}  type="text" name="question" placeholder="question" />
                        {errors?.question &&  <p className={'errorMessage'}>{errors.question.message}</p>}
                        
                        <div ref={reponseRef}>
                            {renderQuestion(4)}
                        </div>
                        <button type="button" onClick={handlePreviousStep}>Précédent</button>
                        {
                            countQuestion === 0 ? (
                                <button type="submit">créer le quizz</button>
                            ) : (
                                <button type="button" onClick={handleAddQuestion}>Ajouter</button>
                            )
                        }
                        
                    </div>
                
                
            </form>
        </section>
    )
}