import { NavLink, useParams } from 'react-router-dom';
import './ArticlePage.scss';
import { useEffect, useState } from 'react';
import { getArticleEvenement } from '../../apis/evenement';

export default function ArticlePage () {
    const { article } = useParams();
    const [components, setComponents] = useState([])

    useEffect(() => {
        getArticleEvenement(article).then(a => {
            setComponents(a)
        })

        
    }, [])

    let articleTitle = article.replaceAll('_', ' ')
    articleTitle = articleTitle.charAt(0).toUpperCase() + articleTitle.slice(1)

    return (
        <section className='article'>
            <h1> {articleTitle} </h1>
            <div>
                <div className="mediaArticle">
                    <img src="../../assets/images/sacre_de_louis_xv.jpg" alt="sacre_de_louis_xv" />
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