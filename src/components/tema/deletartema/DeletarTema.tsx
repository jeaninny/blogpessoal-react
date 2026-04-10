import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarTema() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    // Estado para controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado que irá receber os dados do tema que será persistido no Backend
    const [tema, setTema] = useState<Tema>({} as Tema);

    // Acessa o token do usuário autenticado
    const { usuario, handleLogout } = useContext(AuthContext);

    // Cria um objeto para armazenar o token
    const token = usuario.token;

    // Acessar o parâmetro id da rota de edição do tema
    const { id } = useParams<{ id: string }>();

    // Função para buscar um tema pelo id no backend
    // que será atualizado no form
    async function buscarTemaPorId() {
        try {

            setIsLoading(true);

            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            });

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        } finally {
            setIsLoading(false);
        }
    }

    // Cria um useEffect para monitorar o token
    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', "info");
            navigate('/')
        }
    }, [token])

    // Cria um useEffect para monitorar o id (rota)
    useEffect(() => {
        if (id !== undefined) {
            buscarTemaPorId();
        }
    }, [id])

    function retornar() {
        navigate('/temas');
    }

    async function deletarTema() {

        setIsLoading(true);

        try {

            await deletar(`/temas/${id}`, {
                headers: { Authorization: token }
            });

            ToastAlerta('Tema deletado com sucesso!', "sucesso")

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        }

        setIsLoading(false);
        retornar()

    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4"
            style={{ backgroundColor: "#13101E" }}>

            <h1 className="text-2xl font-semibold text-center mb-2"
                style={{ color: "#E8EAF0" }}>
                Deletar Tema
            </h1>
            <p className="text-sm text-center mb-6"
                style={{ color: "#6B7280" }}>
                Você tem certeza de que deseja apagar o tema a seguir?
            </p>

            <div className="w-full max-w-sm rounded-xl overflow-hidden"
                style={{
                    backgroundColor: "#1C1830",
                    border: "0.5px solid rgba(255,255,255,0.07)"
                }}>

                <div className="py-2 px-4"
                    style={{ borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}>
                    <span className="text-xs font-medium"
                        style={{ color: "#7C8FD4" }}>
                        Tema
                    </span>
                </div>

                <p className="p-6 text-base font-medium"
                    style={{ color: "#E8EAF0" }}>
                    {tema.descricao}
                </p>

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
                        onClick={deletarTema}>
                        {isLoading ? <ClipLoader color="#C4849A" size={16} /> : "Sim"}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarTema