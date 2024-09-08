import { createContext } from "react";
import { login } from "../store/modules/login/sagas";
import Cookies from 'js-cookie';
import api from "../services/api";
import Swal from "sweetalert2";

export const sessionStatus = async (navigate) => {
    const token = Cookies.get('token');

    if (!token) {
        await Swal.fire("Acesso Negado!", "Você não possui permissão para acessar esta página ou sua sessão expirou!", "error");
        navigate("/");
    }
}

export const isAuthenticated = async (navigate) => {
    const token = Cookies.get('token');

    if (token) {
        navigate("/agendamentos");
    }
}

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    async function signIn(data) {
        const res = await login(data);

        if (res) {
            if (res.status == 201) {
                const { token } = res.data;

                Cookies.set('token', token, { 
                    expires: 1, // Expira em 1 dia
                    sameSite: 'Lax'
                }); 
                api.defaults.headers['Authorization'] = `Bearer ${token}`;

                return true;
            }
        }

        return false;
    }

    async function signOut(navigate) {
        Cookies.remove('token');

        navigate("/");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}