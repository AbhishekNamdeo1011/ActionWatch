import {
    createContext,
    useContext,
    useMemo,
    useState,
    useCallback,
} from "react";

import {
    setToken,
    clearToken,
} from "@/lib/tokenManager";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [accessToken, setAccessTokenState] = useState(null);

    const [loading, setLoading] = useState(true);

    const login = useCallback(({ user, accessToken }) => {

        setUser(user);

        setAccessTokenState(accessToken);

        setToken(accessToken);

    }, []);

    const logout = useCallback(() => {

        clearToken();

        setUser(null);

        setAccessTokenState(null);

    }, []);

    const setAccessToken = useCallback((token) => {

        setAccessTokenState(token);

        setToken(token);

    }, []);

    const value = useMemo(() => ({

        user,

        accessToken,

        loading,

        setLoading,

        login,

        logout,

        setUser,

        setAccessToken,

        isAuthenticated: !!user,

    }), [

        user,

        accessToken,

        loading,

        login,

        logout,

        setAccessToken,

    ]);

    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    );

};

export const useAuthContext = () => {

    const context = useContext(AuthContext);

    if (!context) {

        throw new Error(

            "useAuthContext must be used inside AuthProvider"

        );

    }

    return context;

};