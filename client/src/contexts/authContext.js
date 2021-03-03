import { createContext, useCallback, useMemo, useState } from 'react';

export const AuthContext = createContext();

export default function  AuthProvider({children}) {
    const [isAutenticated, setIsAutenticated] = useState(localStorage.getItem('authentication'))

    const Login = useCallback(() => {
        window.localStorage.setItem('authentication', true)
        setIsAutenticated(true);
    }, []);

    const value = useMemo(() => ({
        Login,
        //logout,
        isAutenticated
    }), [isAutenticated, Login]);
    

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}