import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export default function AuthProvider({children}) {
    const initialUser = useLoaderData();
    const [user, setUser] = useState(initialUser);

    async function signin(user) {
        //const newUser = await login(user)
        //setUser(newUser)
    }

    async function signout() {
        //await logout()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, signin, signout}}>
            {children}
        </AuthContext.Provider>
    )
}