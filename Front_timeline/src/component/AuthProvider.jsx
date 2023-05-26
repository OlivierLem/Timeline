import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import { AuthContext } from "../context/AuthContext.jsx";
import { getCurrentPeriod } from "../apis/period.js";



// eslint-disable-next-line react/prop-types
export default function AuthProvider({children}) {
    const initialUser = useLoaderData();
    const [period, setPeriod] = useState(initialUser);

    async function getPeriod(credentials) {
        const newUser = await getCurrentPeriod(credentials)
        setPeriod(newUser)
    }

    return (
        <AuthContext.Provider value={{period, getPeriod}}>
            {children}
        </AuthContext.Provider>
    )
}