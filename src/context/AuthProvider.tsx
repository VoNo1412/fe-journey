import { createContext, useEffect, useState } from "react";
import { AUTH_API } from "../api/api";
import { IAuthContext } from "../common/interface";

const AuthContext = createContext<IAuthContext>({
    auth: null,
    setAuth: null,
    loading: false,
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<any>(null);
    const [loading, setLoading] = useState(true); // Prevent flicker

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await AUTH_API.apiGetMe();
                setAuth({ user: { ...response.user } });
            } catch (error) {
                console.error("User is not authenticated", error);
                setAuth(null);
            } finally {
                setLoading(false);
            }
        };

        verifyAuth();
    }, []);

    return <AuthContext.Provider value={{ auth, setAuth, loading }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
