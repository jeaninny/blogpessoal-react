import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import type Postagem from "../../models/Postagem"
import { buscar } from "../../services/Service"
import { ToastAlerta } from "../../utils/ToastAlerta"
import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagens"
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem"
import { Player } from '@lottiefiles/react-lottie-player'
import bloggingAnimation from '../../assets/Blogging.json'

function Home() {

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
            ToastAlerta('Você precisa estar logado!', "info")
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
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {/* Hero */}
            <div style={{ backgroundColor: "#13101E" }}>
                <div className="container mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Esquerda */}
                    <div className="flex flex-col gap-4 justify-center">
                        <span className="text-xs w-fit px-3 py-1 rounded-full"
                            style={{
                                backgroundColor: "rgba(196,132,154,0.10)",
                                color: "#C4849A",
                                border: "0.5px solid rgba(196,132,154,0.22)"
                            }}>
                            Plataforma de publicação
                        </span>
                        <h2 className="text-4xl font-medium leading-tight"
                            style={{ color: "#E8EAF0", letterSpacing: "-0.02em" }}>
                            Escreva.<br />
                            <span style={{ color: "#C4849A" }}>Compartilhe.</span><br />
                            Conecte.
                        </h2>
                        <p className="text-sm" style={{ color: "#B8C0CC", maxWidth: "300px", lineHeight: "1.6" }}>
                            Um espaço para desenvolvedores publicarem ideias, reflexões e aprendizados.
                        </p>
                        <div className="mt-2">
                            <ModalPostagem />
                        </div>
                    </div>
                    
                    {/* Direita — animação */}
                    <div className="hidden md:flex items-center justify-center">
                        <Player
                            autoplay
                            loop
                            src={bloggingAnimation}
                            style={{ width: '100%', maxWidth: '520px' }}
                        />
                    </div>

                </div>
            </div>

            {/* Divisor */}
            <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.07)", backgroundColor: "#13101E" }} />

            {/* Lista de postagens */}
            <ListaPostagens postagens={postagens} isLoading={isLoading} />
        </>
    )
}

export default Home