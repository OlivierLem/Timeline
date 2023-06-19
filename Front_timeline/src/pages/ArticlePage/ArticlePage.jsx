import { NavLink, useParams } from 'react-router-dom';
import './ArticlePage.scss';
import { useEffect, useState } from 'react';
import { getArticleEvenement } from '../../apis/evenement';

export default function ArticlePage () {
    const { article } = useParams(); 
    const [components, setComponents] = useState([])

    useEffect(() => {
        // requête pour récuperer l'article de l'événement 
        getArticleEvenement(article).then(a => {
            setComponents(a)
        })

        
    }, [])

    // on transforme le query params pour afficher le titre de l'evenement
    let articleTitle = article.replaceAll('_', ' ') 
    articleTitle = articleTitle.charAt(0).toUpperCase() + articleTitle.slice(1)

    // page de l'article, dans la div contentArticle on affiche si on à un articles les composants de l'article trier par leur ordre
    // si l'article n'existe pas on mets un lien pour créer l'article
    return (
        <section className='article'>
            <h1> {articleTitle} </h1>
            <div>
                <div className="mediaArticle">
                
                </div>
                
                <div className={`contentArticle ${components.length === 0 && 'notNews'} `}>
                    {components.length > 0 ?
                        components.sort((n1, n2) => {
                            return n1.orderValue - n2.orderValue;
                        }).map(c => (
                             <p>{c.content}</p>
                        )) : (
                            <div>
                                <p className='notNews'>L'article n'existe pas encore</p>
                                <NavLink to={`/admin/evenements/article/${article}`}>Créer l'article</NavLink>
                            </div>
                        )
                    }
                </div>
            </div>
            
        </section>
    )
    
}