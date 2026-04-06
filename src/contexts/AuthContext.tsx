import { createContext, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";

interface AuthContextProps {
    usuario: UsuarioLogin;
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    // Inicializar o estado usuario (armazena os dados do usuário autenticado)
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    });

    // Inicializar o estado isLoading (controla o loader do componente Login)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Implementação da função de Login
    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true)

        try {
            await login("/usuarios/logar", usuarioLogin, setUsuario)
            alert("O usuário foi autenticado com sucesso!");
        } catch (error) {
            alert("Os dados do usuário estão inconsistentes!");
        }
        setIsLoading(false);
    }

    // Implementação da função de Logout
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}  