import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import AdminPage from "../pages/adminPage/AdminPage";
import TimelinePage from "../pages/timelinePage/TimelinePage";
import ArticlePage from "../pages/ArticlePage/ArticlePage";
import AddEvent from "../pages/addEvent/AddEvent.jsx";
import AddPeriod from "../pages/addPeriod/AddPeriod.jsx";
import PeriodesList from "../pages/adminPage/component/PeriodesList";
import EvenementList from "../pages/adminPage/component/EvenementList";
import { PeriodEditPage } from "../pages/PeriodEditPage/PeriodEditPage";
import { EventEditPage } from "../pages/EventEditPage/EventEditPage";
import { EventEditArticle } from "../pages/EventEditPage/component/EventEditArticle";
import QuizzPage from "../pages/QuizzPage/QuizzPage";
import CreerQuizz from "../pages/CreerQuizz/CreerQuizz";
import { ListArticle } from "../pages/ListArticle/ListArticle";
import Quizz from "../pages/QuizzPage/component/Quizz";
import { Connexion } from "../pages/Connexion/Connexion";
import { Inscription } from "../pages/Inscription/Inscription";
import { ForgotPassword } from "../pages/ForgotPassword/ForgotPassword";
import { ConfirmationEmail } from "../pages/ConfirmationMail/ConfirmationMail";
import { userLoader } from "../loaders/userLoader";
import Profil from "../pages/Profil/Profil";
import { MentionsPage } from "../pages/Mentions/MentionsPage";
import { ErrorPage } from "../pages/ErrorPage";

// const AdminPage = lazy(() => import("../pages/adminPage/AdminPage")) // pour le lazy loading affiché la page que lors de son rendu

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,  
        loader: userLoader,
        errorElement: <ErrorPage />,      
        children: [
            {
                index: true,
                element: <TimelinePage />
            },
            {
                path: '/admin', 
                element: <AdminPage />,
                children: [
                    {
                        path: '/admin/periodes',
                        element: <PeriodesList />,
                    },
                    {
                        path: '/admin/evenements',
                        element: <EvenementList />
                    }
                ]
            },
            {
                path:'/admin/periodes/:periode',
                element:<PeriodEditPage />,
            },
            
            {
                path:'/admin/evenements/:evenement',
                element:<EventEditPage />,
            },
            {
                path:'/admin/evenements/article/:evenement/',
                element: <EventEditArticle />
            },
            {
                path:'/connexion',
                element: <Connexion />
            },
            {
                path:'/inscription',
                element: <Inscription />
            },
            {
                path:'/profil',
                element: <Profil />
            },
            {
                path:'/mots_de_passe_oublie',
                element: <ForgotPassword />
            },
            {
                path:'/confirmationEmail',
                element: <ConfirmationEmail />
            },
            {
                path: '/articles',
                element: <ListArticle />,
            },
            {
                path: '/articles/:article',
                element: <ArticlePage />,
            },
            {
                path: '/ajout_evenement',
                element: <AddEvent />
            },
            {
                path:'quizz',
                element:<QuizzPage />
            },
            {
                path:'quizz/:quizz',
                element: <Quizz />
            },
            {
                path:'/quizz/creerQuizz',
                element:<CreerQuizz />
            },
            {
                path: '/ajout_periode',
                element: <AddPeriod />
            }, 
            {
                path: '/mentions_legales',
                element: <MentionsPage />
            }
        ]
    }
])
