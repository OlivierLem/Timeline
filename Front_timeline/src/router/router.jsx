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

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
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
                element:<PeriodEditPage />
            },
            {
                path:'/admin/evenements/:evenement',
                element:<EventEditPage />,
            },
            {
                path:'/admin/evenements/:evenement/article',
                element: <EventEditArticle />
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
                path: '/ajout_periode',
                element: <AddPeriod />
            }
        ]
    }
])
