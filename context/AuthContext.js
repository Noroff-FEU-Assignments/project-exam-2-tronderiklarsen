import { createContext, useState, useEffect} from "react"
import { useRouter } from "next/router"
import {API_URL} from "../constants/api"

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [admin, setAdmin] = useState(null)
    const [error, setError] = useState(null)

    const login = async ({username:identifier, password}) => {
        console.log({ identifier, password})
    }

    const logout = async () => {
        console.log("Logout")
    }

    const checkAdminLoggedIn = async (admin) => {
        console.log("Check")
    }

    return (
        <AuthContext.Provider value={{ admin, error, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext