import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminPage from "../pages/adminPage/AdminPage";
import TimelinePage from "../pages/timelinePage/TimelinePage";
import ArticlePage from "../pages/ArticlePage/ArticlePage";
import AddEvent from "../pages/addEvent/AddEvent.jsx";
import AddPeriod from "../pages/addPeriod/AddPeriod.jsx";

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
                element: <AdminPage />
            },
            {
                path: '/articles/:article',
                element: <ArticlePage />
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
