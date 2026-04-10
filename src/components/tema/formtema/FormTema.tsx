import { useState, useContext, useEffect, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormTema() {

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

    // Função de atualização do estado tema
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    async function gerarNovoTema(e: SyntheticEvent<HTMLFormElement>) {

        e.preventDefault();

        setIsLoading(true);

        if (id !== undefined) {

            // Atualização
            try {

                await atualizar('/temas', tema, setTema, {
                    headers: { Authorization: token }
                });

                ToastAlerta('Tema atualizado com sucesso!', "sucesso")

            } catch (error: any) {

                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao Atualizar o Tema!', "erro");
                }
            }

        } else {

            // Cadastro
            try {

                await cadastrar('/temas', tema, setTema, {
                    headers: { Authorization: token }
                });

                ToastAlerta('Tema cadastrado com sucesso!', "sucesso")

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao Cadastrar o Tema!', "erro");
                }
            }

        }

        setIsLoading(false);
        retornar();
    }

    function retornar() {
        navigate('/temas');
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4"
            style={{ backgroundColor: "#13101E" }}>
            <h1 className="text-2xl font-semibold text-center mb-6"
                style={{ color: "#E8EAF0" }}>
                {id === undefined ? "Cadastrar" : "Editar"} Tema
            </h1>

            <form className="w-full max-w-sm flex flex-col gap-4"
                onSubmit={gerarNovoTema}
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="descricao" className="text-xs font-medium"
                        style={{ color: "#B8C0CC" }}>
                        Descrição do Tema
                    </label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name='descricao'
                        className="px-4 py-2 rounded-lg text-sm w-full focus:outline-none"
                        style={{ backgroundColor: "#1C1830", border: "1px solid rgba(255,255,255,0.12)", color: "#E8EAF0" }}
                        value={tema.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="w-full py-2 rounded-lg text-sm font-semibold flex justify-center transition-all duration-200"
                    style={{ backgroundColor: "#C4849A", color: "#13101E" }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                    type="submit">
                    {isLoading ? <ClipLoader color="#13101E" size={20} /> : (id === undefined ? "Cadastrar" : "Atualizar")}
                </button>
            </form>
        </div>
    );
}

export default FormTema;