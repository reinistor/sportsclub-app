import React, {
    createContext,
    ReactNode,
    useContext,
    useMemo,
    useState,
    useEffect,
} from 'react'
import { userAPI } from '../api/userAPI'
import { UserInterface } from '../interfaces/UserInterface'
import useLocalStorage from '../hooks/useLocalStorage'

interface LoginDetails {
    email: string
    password: string
}

interface AuthContextType {
    user?: UserInterface
    isAdmin?: boolean
    isLogged: boolean
    loading: boolean
    error?: any
    login: ({ email, password }: LoginDetails) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({
    children,
}: {
    children: ReactNode
}): JSX.Element {
    const [accessToken, setAccessToken] = useLocalStorage('accessToken', '')
    const [user, setUser] = useState<UserInterface>()
    const [error, setError] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const isLogged = !!user
    const isAdmin = user?.role === 'admin'

    useEffect(() => {
        if (accessToken) {
            setLoading(true)
            userAPI
                .me(accessToken)
                .then((response) => {
                    setUser(response.data)
                })
                .catch((err) => {
                    setError(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [accessToken])

    const login = async ({ email, password }: LoginDetails) => {
        try {
            setError(null)
            setLoading(true)
            const tokenResponse = await userAPI.login(email, password)
            const { accessToken } = tokenResponse.data
            setAccessToken(accessToken)

            const userResponse = await userAPI.me(accessToken)
            setUser(userResponse.data)
            console.log(userResponse.data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    function logout() {
        setUser(undefined)
        localStorage.clear()
    }

    const memoedValue = useMemo(
        () => ({
            user,
            isAdmin,
            loading,
            error,
            isLogged,
            login,
            logout,
        }),
        [user, loading, error]
    )

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}
