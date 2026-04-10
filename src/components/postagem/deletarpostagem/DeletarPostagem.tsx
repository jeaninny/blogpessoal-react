import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Postagem from "../../../models/Postagem"
import { buscar, deletar } from "../../../services/Service"
import { ClipLoader } from "react-spinners"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarPostagem() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate()

    // Estado para controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Estado que irá receber todos as postagens persistidas no Backend
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    // Acessar o parâmetro id da rota de edição
    const { id } = useParams<{ id: string }>()

    // Acessa o token do usuário autenticado
    const { usuario, handleLogout } = useContext(AuthContext)

    // Cria um objeto para armazenar o token
    const token = usuario.token

    // Função para buscar uma postagem pelo id no backend
    // será apagada
    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    // Cria um useEffect para monitorar o token
    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'info')
            navigate('/')
        }
    }, [token])

    // Cria um useEffect para monitorar o id (rota)
    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarPostagem() {
        setIsLoading(true)

        try {
            await deletar(`/postagens/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Postagem apagada com sucesso', 'sucesso')

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao deletar a postagem', 'erro')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/postagens")
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4"
            style={{ backgroundColor: "#13101E" }}>

            <h1 className="text-2xl font-semibold text-center mb-2"
                style={{ color: "#E8EAF0" }}>
                Deletar Postagem
            </h1>
            <p className="text-sm text-center mb-6"
                style={{ color: "#6B7280" }}>
                Você tem certeza de que deseja apagar a postagem a seguir?
            </p>

            <div className="w-full max-w-sm rounded-xl overflow-hidden"
                style={{
                    backgroundColor: "#1C1830",
                    border: "0.5px solid rgba(255,255,255,0.07)"
                }}>

                <div className="flex w-full py-3 px-4 items-center gap-3"
                    style={{ borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}>
                    <img
                        src={postagem.usuario?.foto}
                        className="w-8 h-8 rounded-full object-cover"
                        alt={postagem.usuario?.nome}
                        style={{ border: "2px solid #C4849A" }}
                    />
                    <h3 className="text-sm font-medium"
                        style={{ color: "#B8C0CC" }}>
                        {postagem.usuario?.nome}
                    </h3>
                </div>

                <div className="p-4 flex flex-col gap-2">
                    <h4 className="text-sm font-medium"
                        style={{ color: "#E8EAF0" }}>
                        {postagem.titulo}
                    </h4>
                    <p className="text-xs leading-relaxed"
                        style={{ color: "#B8C0CC" }}>
                        {postagem.texto}
                    </p>
                </div>

                <div className="flex"
                    style={{ borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
                    <button
                        className="w-full py-2 text-xs font-medium transition-all duration-200"
                        style={{ color: "#E07070", backgroundColor: "rgba(224,112,112,0.05)" }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(224,112,112,0.12)")}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(224,112,112,0.05)")}
                        onClick={retornar}>
                        Não
                    </button>
                    <button
                        className="w-full py-2 text-xs font-medium flex items-center justify-center transition-all duration-200"
                        style={{
                            color: "#C4849A",
                            backgroundColor: "rgba(196,132,154,0.05)",
                            borderLeft: "0.5px solid rgba(255,255,255,0.05)"
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(196,132,154,0.12)")}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(196,132,154,0.05)")}
                        onClick={deletarPostagem}>
                        {isLoading ? <ClipLoader color="#C4849A" size={16} /> : "Sim"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarPostagem