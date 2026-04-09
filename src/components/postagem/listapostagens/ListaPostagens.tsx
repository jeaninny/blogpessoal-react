import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import CardPostagem from "../cardpostagem/CardPostagem";

function ListaPostagens() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    // Estado para controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Estado que irá receber todos as postagens persistidas no Backend
    const [postagens, setPostagens] = useState<Postagem[]>([])

    // Acessa o token do usuário autenticado
    const { usuario, handleLogout } = useContext(AuthContext)

    // Cria um objeto para armazenar o token
    const token = usuario.token

    // Cria um useEffect para monitorar o token
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    // Cria um useEffect para inicializar a função buscarPostagens
    useEffect(() => {
        buscarPostagens()    
    }, [postagens.length])

    // Função para buscar todas as postagens no backend
    async function buscarPostagens() {
        try {
            setIsLoading(true)

            await buscar('/postagens', setPostagens, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }finally {
            setIsLoading(false)
        }
    }

    return (
        <>

            {isLoading && (
                <div className="flex justify-center w-full my-8">
                    <SyncLoader
                        color="#312e81"
                        size={32}
                    />
                </div>
            )}

            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">

                    {(!isLoading && postagens.length === 0) && (
                            <span className="text-3xl text-center my-8">
                                Nenhuma Postagem foi encontrada!
                            </span>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                            {
                                postagens.map((postagem) => (
                                    <CardPostagem key={postagem.id} postagem={postagem}/>
                                ))
                            }
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaPostagens;