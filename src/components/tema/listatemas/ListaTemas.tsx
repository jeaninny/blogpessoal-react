import { useNavigate } from "react-router-dom";
import CardTema from "../cardtema/CardTema"
import { useContext, useEffect, useState } from "react";
import type Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";

function ListaTemas() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    // Estado para controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado que irá receber todos os temas persistidos no Backend
    const [temas, setTemas] = useState<Tema[]>([]);

    // Acessa o token do usuário autenticado
    const { usuario, handleLogout } = useContext(AuthContext);

    // Cria um objeto para armazenar o token
    const token = usuario.token;

    // Cria um useEffect para monitorar o token
    useEffect( () => {
        if(token === ''){
            alert('Você precisa estar logado!');
            navigate('/')
        }
    },[token])

    // Cria um useEffect para inicializar a função buscarTemas
    useEffect( () => {
        buscarTemas();
    }, [temas.length])

    // Função para buscar todos os temas no backend
    async function buscarTemas(){
        try{

            setIsLoading(true);

            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            });

        }catch(error: any){
            if(error.toString().includes('401')){
                handleLogout();
            }
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <>
            {
                isLoading && (
                    <div className="flex justify-center w-full my-8">
                        <SyncLoader
                            color="#312e81"
                            size={32}
                        />
                    </div>
                )
            }
            
            <div className="flex justify-center w-full px-4 my-4">
                <div className="container flex flex-col">

                    {
                       (!isLoading && temas.length === 0) &&(
                            <span className="text-3xl text-center my-8">
                                Nenhum Tema foi encontrado!
                            </span>
                       )
                    }

                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                        {
                            temas.map( (tema) => (
                                <CardTema key={tema.id} tema={tema}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaTemas;