import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom"
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {

  // Objeto responsável por redirecionar o usuário para uma outra rota
  const navigate = useNavigate();

  // Estado para controlar o Loader (animação de carregamento)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Estado para confirmar a senha digitada pelo usuário
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  // Estado usuario para armazenar os dados do usuário que será cadastrado
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: ""
  });

  // useEffect que vai controlar o redirecionamento para a página de login
  // caso o cadastro seja bem-sucedido
  useEffect(() => {
    if (usuario.id !== 0) {
      retornar()
    }
  }, [usuario])

  // Função de atualização do estado usuario
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  // Função de atualização do estado confirmarSenha
  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }

  // Função para enviar os dados para o Backend (Submit)
  async function cadastrarNovoUsuario(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario("/usuarios/cadastrar", usuario, setUsuario)
        ToastAlerta("Usuário cadastrado com sucesso!", "sucesso")

      } catch (error) {
        ToastAlerta("Erro ao cadastrar o usuário!", "erro")
      }

    } else {
      ToastAlerta("Dados do usuário inconsistentes!", "info")
      setUsuario({
        ...usuario,
        senha: ""
      })
      setConfirmarSenha("")
    }
    setIsLoading(false)
  }

  // Função de retornar
  function retornar() {
    navigate("/")
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 py-12"
        style={{ backgroundColor: "#13101E" }}>
        <div className="w-full max-w-sm rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "#1C1830",
            border: "0.5px solid rgba(255,255,255,0.07)"
          }}>

          <div className="p-10 flex flex-col gap-5">

            <div className="text-center mb-2">
              <p className="text-lg font-medium" style={{ color: "#E8EAF0", letterSpacing: "-0.03em" }}>
                Blog <span style={{ color: "#C4849A" }}>Codex</span>
              </p>
              <p className="text-xs mt-1" style={{ color: "#6B7280" }}>Crie sua conta</p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={cadastrarNovoUsuario}>
              <div className="flex flex-col gap-1">
                <label htmlFor="nome" className="text-xs font-medium" style={{ color: "#B8C0CC" }}>
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Nome"
                  className="px-4 py-2 rounded-lg text-sm w-full focus:outline-none"
                  style={{ backgroundColor: "#13101E", border: "1px solid rgba(255,255,255,0.12)", color: "#E8EAF0" }}
                  value={usuario.nome}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="usuario" className="text-xs font-medium" style={{ color: "#B8C0CC" }}>
                  Usuario
                </label>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  placeholder="Usuario"
                  className="px-4 py-2 rounded-lg text-sm w-full focus:outline-none"
                  style={{ backgroundColor: "#13101E", border: "1px solid rgba(255,255,255,0.12)", color: "#E8EAF0" }}
                  value={usuario.usuario}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="foto" className="text-xs font-medium" style={{ color: "#B8C0CC" }}>
                  Foto
                </label>
                <input
                  type="text"
                  id="foto"
                  name="foto"
                  placeholder="Foto"
                  className="px-4 py-2 rounded-lg text-sm w-full focus:outline-none"
                  style={{ backgroundColor: "#13101E", border: "1px solid rgba(255,255,255,0.12)", color: "#E8EAF0" }}
                  value={usuario.foto}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="senha" className="text-xs font-medium" style={{ color: "#B8C0CC" }}>
                  Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="Senha"
                  className="px-4 py-2 rounded-lg text-sm w-full focus:outline-none"
                  style={{ backgroundColor: "#13101E", border: "1px solid rgba(255,255,255,0.12)", color: "#E8EAF0" }}
                  value={usuario.senha}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="confirmarSenha" className="text-xs font-medium" style={{ color: "#B8C0CC" }}>
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  placeholder="Confirmar Senha"
                  className="px-4 py-2 rounded-lg text-sm w-full focus:outline-none"
                  style={{ backgroundColor: "#13101E", border: "1px solid rgba(255,255,255,0.12)", color: "#E8EAF0" }}
                  value={confirmarSenha}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="reset"
                  className="w-1/2 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                  style={{ backgroundColor: "#E07070", color: "#13101E" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  onClick={retornar}>
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 rounded-lg text-sm font-semibold flex justify-center transition-all duration-200"
                  style={{ backgroundColor: "#C4849A", color: "#13101E" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  disabled={isLoading}>
                  {isLoading ? <ClipLoader color="#13101E" size={20} /> : "Cadastrar"}
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default Cadastro