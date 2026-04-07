import { createContext, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";

// Todos os estados e funções que serão compartilhadas
// com toda a minha aplicação
interface AuthContextProps{
  usuario: UsuarioLogin
  handleLogout(): void
  handleLogin(usuario: UsuarioLogin): Promise<void>
  isLoading: boolean
}

// Quem irá consumir o meu provedor
interface AuthProviderProps{
  children: ReactNode
}

// Criar o meu contexto com a tipagem AuthContextProps
// O meu contexto irá disponibilizar os estados e funções do tipo AuthContextProps
export const AuthContext = createContext({} as AuthContextProps)

// Inicializar os estados e implementar as funções dentro do provedor
export function AuthProvider({ children }: AuthProviderProps){

  // Inicializar o estado usuario (armazenar os dados do usuário autenticado)
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: ""
  });

  // Inicializar o estado isLoading (controlar o loader do componente Login)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Implementação da função de Login
  async function handleLogin(usuarioLogin: UsuarioLogin){

    setIsLoading(true);

    try{
        await login('/usuarios/logar', usuarioLogin, setUsuario);
        alert('Usuário autenticado com sucesso!');
    }catch(error){
        alert('Os dados do Usuário estão inconsistentes!');
    }

    setIsLoading(false);
  }

  // Implementação da função de Logout
  function handleLogout(){
    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: ""
    })
  }

  return(
    <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )

}