import { useParams } from 'react-router-dom';
import './ArticlePage.scss';

export default function ArticlePage () {
    const { article } = useParams();

    let articleTitle = article.replaceAll('_', ' ')
    articleTitle = articleTitle.charAt(0).toUpperCase() + articleTitle.slice(1)

    return (
        <section className='article'>
            <h1> {articleTitle} </h1>
            <div>
                <div className="mediaArticle">
                    <img src="../../assets/images/sacre_de_louis_xv.jpg" alt="sacre_de_louis_xv" />
                </div>
                
                <div className='contentArticle'>
                    <p>Pierre-Denis Martin, dit « Martin le Jeune » (né à Paris, vers 1663, et mort dans la même ville en 1742), fut, sous le règne de Louis XIV, pourvu de pensions et de la charge de « peintre ordinaire du roi ». À ce titre, il peignit nombre de tableaux pour orner les châteaux royaux de Versailles, Choisy et Compiègne (scènes de chasse, vues en perspective des villes, des domaines princiers). Il est évident que les cérémonies du sacre de Louis XV, en octobre 1722, dont il est le témoin actif, inaugurent une nouvelle étape de son œuvre et une forme de consécration personnelle, si besoin en était.
                    </p>
                    <p>
                    Si le souci de témoigner est si grand et la commande officielle si évidente (il faut établir aux yeux de tous la surpuissance mystérieuse d’un roi élu du ciel, investi d’une force invincible et miraculeuse), c’est que, plus que tout autre cérémonial d’État, le sacre est essentiel dans la religion royale. Malgré l’instantanéité de la succession conférée par l’hérédité – « le roi est mort, vive le roi » –, seule cette cérémonie fondatrice confère au souverain la totalité de son pouvoir et de sa puissance. L’affaire est d’importance dans le cas des héritiers mineurs : Louis XV n’a que cinq ans en 1715, lorsque meurt Louis XIV, et il est confié aux soins de son grand-oncle, le duc d’Orléans, « régent du royaume » jusqu’au 15 février 1723. Le sacre précède de quelques mois l’entrée en fonction du jeune prince.
                    </p>
                    <p>
                    Célébré à Reims, il se déroule en plusieurs temps, sur plusieurs jours : une nuit de recueillement, un jour de solennités (serments, messes, intronisation, sainte onction, hommages), le tout mêlant rites de chevalerie et cérémoniel catholique. C’est en « Roi Très-Chrétien », c’est-à-dire en défenseur universel de la foi, que Louis est couronné par douze pairs du royaume. Viennent ensuite le temps du festin puis, le lendemain ou le surlendemain, celui de la cavalcade, les deux moments clés retenus par l’artiste.
                    </p>
                </div>
            </div>
            
        </section>
    )
    
}