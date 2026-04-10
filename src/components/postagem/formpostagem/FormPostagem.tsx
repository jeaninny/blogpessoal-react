import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import type Tema from "../../../models/Tema";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    // Estado para controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado que irá receber todos os temas persistidos no Backend
    const [temas, setTemas] = useState<Tema[]>([]);

    // Estado que irá receber os dados do tema no meu Backend
    // Esse estado é responsável por armazenar os dados do tema que será associado à postagem.
    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '', });

    // Estado que irá receber todos as postagens persistidas no Backend
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    // Acessar o parâmetro id da rota de edição
    const { id } = useParams<{ id: string }>();

    // Acessa o token do usuário autenticado
    const { usuario, handleLogout } = useContext(AuthContext)

    // Cria um objeto para armazenar o token
    const token = usuario.token


    // Função para buscar um tema pelo id no backend
    // que será atualizado no form
    async function buscarTemaPorId(id: string) {
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

    // Função para buscar todos os temas no backend
    async function buscarTemas() {
        try {

            setIsLoading(true);

            await buscar('/temas', setTemas, {
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

    // Função para buscar uma postagem pelo id no backend
    // que será atualizada no form

    async function buscarPostagemPorId(id: string) {
        try {
            setIsLoading(true);

            await buscar(`/postagens/${id}`, setPostagem, {
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
            ToastAlerta('Você precisa estar logado!', "info")
            navigate('/')
        }
    }, [token])

    //  Cria um useEffect para monitorar os Temas no select e Postagem no formulário (busca postagem por id)
    useEffect(() => {
        buscarTemas()

        if (id !== undefined) {
            buscarPostagemPorId(id)
        }
    }, [id])


    // Cria um useEffect para atualizar o tema da postagem sempre que o tema for atualizado
    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        })

    }, [tema])


    // Função de atualização do estado postagem
    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario
        })
    }

    function retornar() {
        navigate('/postagens');
    }

    async function gerarNovaPostagem(e: SyntheticEvent<HTMLFormElement>) {

        e.preventDefault();

        setIsLoading(true);

        if (id !== undefined) {

            // Atualização
            try {
                await atualizar('/postagens', postagem, setPostagem, {
                    headers: { Authorization: token }
                });

                ToastAlerta('Postagem atualizada com sucesso!', "sucesso")

            } catch (error: any) {

                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao Atualizar a Postagem!', "erro");
                }
            }

        } else {

            // Cadastro
            try {

                await cadastrar('/postagens', postagem, setPostagem, {
                    headers: { Authorization: token }
                });

                ToastAlerta('Postagem cadastrada com sucesso!', "sucesso")

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao Cadastrar a Postagem!', "erro");
                }
            }
        }

        setIsLoading(false);
        retornar();
    }

    const carregandoTema = tema.descricao === '';


    return (
        <>
            <div className="container flex flex-col items-center mx-auto py-8"
                style={{ backgroundColor: "#13101E" }}>
                <h1 className="text-2xl font-semibold text-center mb-6"
                    style={{ color: "#E8EAF0" }}>
                    {id === undefined ? "Cadastrar" : "Editar"} Postagem
                </h1>
                <button
                    onClick={retornar}
                    className="px-6 py-2 rounded-lg text-sm font-semibold mb-6 transition-all duration-200"
                    style={{ backgroundColor: "#C4849A", color: "#13101E" }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                    Voltar
                </button>

                <form className="w-1/2 flex flex-col gap-4"
                    onSubmit={gerarNovaPostagem}
                >
                    <div className="flex flex-col gap-1">
                        <label htmlFor="titulo" className="text-xs font-medium" style={{ color: "#B8C0CC" }}>
                            Título da Postagem
                        </label>
                        <input
                            type="text"
                            placeholder="Titulo"
                            name='titulo'
                            className="px-4 py-2 rounded-lg text-sm w-full focus:outline-none"
                            style={{ backgroundColor: "#1C1830", border: "1px solid rgba(255,255,255,0.12)", color: "#E8EAF0" }}
                            value={postagem.titulo}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="tema" className="text-xs font-medium" style={{ color: "#B8C0CC" }}>
                            Tema da Postagem
                        </label>
                        <select
                            name='tema'
                            id='tema'
                            className="px-4 py-2 rounded-lg text-sm w-full focus:outline-none"
                            style={{ backgroundColor: "#1C1830", border: "1px solid rgba(255,255,255,0.12)", color: "#E8EAF0" }}
                            value={tema.id === 0 ? '' : tema.id}
                            onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                        >
                            <option value="" disabled>Selecione um Tema</option>
                            {temas.map((tema) => (
                                <option key={tema.id} value={tema.id}>{tema.descricao}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="texto" className="text-xs font-medium" style={{ color: "#B8C0CC" }}>
                            Texto da Postagem
                        </label>
                        <textarea
                            placeholder="Texto"
                            name='texto'
                            className="px-4 py-2 rounded-lg text-sm w-full focus:outline-none h-40 resize-y"
                            style={{ backgroundColor: "#1C1830", border: "1px solid rgba(255,255,255,0.12)", color: "#E8EAF0" }}
                            value={postagem.texto}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => atualizarEstado(e)}
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-1/2 mx-auto py-2 rounded-lg text-sm font-semibold flex justify-center transition-all duration-200'
                        style={{ backgroundColor: carregandoTema ? "rgba(196,132,154,0.4)" : "#C4849A", color: "#13101E" }}
                        onMouseEnter={e => { if (!carregandoTema) e.currentTarget.style.opacity = "0.85" }}
                        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                        disabled={carregandoTema}
                    >
                        {isLoading ? <ClipLoader color="#13101E" size={20} /> : (id === undefined ? 'Cadastrar' : 'Atualizar')}
                    </button>


                </form>

            </div>


        </>
    )
}

export default FormPostagem;
