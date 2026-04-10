import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    // Consumo do Contexto AuthContext 
    // usamos a desestruturação para selecionar apenas o que precisamos
    const { handleLogout, usuario } = useContext(AuthContext);

    function logout() {
        handleLogout();
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'sucesso')
        navigate("/")
    }

    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
            <div className="w-full flex justify-center px-8"
                style={{
                    background: "linear-gradient(180deg, #1A1528, #151220)",
                    borderBottom: "0.5px solid rgba(255,255,255,0.07)",
                    height: "52px"
                }}>

                <div className="container flex justify-between items-center">
                    <Link to="/home"
                        className="text-base font-medium"
                        style={{ color: "#E8EAF0", letterSpacing: "-0.03em" }}>
                        Blog <span style={{ color: "#C4849A" }}>Codex</span>
                    </Link>

                    <div className="flex gap-6 text-sm">
                        <Link to='/postagens' style={{ color: "#6B7280" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#E8EAF0")}
                            onMouseLeave={e => (e.currentTarget.style.color = "#6B7280")}>
                            Postagens
                        </Link>
                        <Link to='/temas' style={{ color: "#6B7280" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#E8EAF0")}
                            onMouseLeave={e => (e.currentTarget.style.color = "#6B7280")}>
                            Temas
                        </Link>
                        <Link to='/cadastrartema' style={{ color: "#6B7280" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#E8EAF0")}
                            onMouseLeave={e => (e.currentTarget.style.color = "#6B7280")}>
                            Cadastrar tema
                        </Link>
                        <Link to='/perfil' style={{ color: "#E8EAF0" }}>
                            Perfil
                        </Link>
                        <Link to='' onClick={logout} style={{ color: "#6B7280" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#E8EAF0")}
                            onMouseLeave={e => (e.currentTarget.style.color = "#6B7280")}>
                            Sair
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {component}
        </>
    )
}

export default Navbar