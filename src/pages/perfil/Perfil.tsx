import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Perfil() {
    const navigate = useNavigate()

    const { usuario } = useContext(AuthContext)
    const token = usuario.token

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", "info")
            navigate("/")
        }
    }, [token])

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12"
            style={{ backgroundColor: "#13101E" }}>

            <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
                style={{ backgroundColor: "#1C1830", border: "1px solid rgba(255,255,255,0.07)" }}>

                {/* Foto */}
                <div className="flex flex-col items-center pt-10 pb-6 px-6">
                    <img
                        src={usuario.foto}
                        alt={`Foto de perfil de ${usuario.nome}`}
                        className="w-28 h-28 rounded-full object-cover"
                        style={{ border: "3px solid #C4849A" }}
                    />
                    <h2 className="mt-4 text-xl font-semibold"
                        style={{ color: "#E8EAF0" }}>
                        {usuario.nome}
                    </h2>
                    <p className="text-sm mt-1"
                        style={{ color: "#6B7280" }}>
                        {usuario.usuario}
                    </p>
                </div>

                {/* Divider */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />

                {/* Botão */}
                <div className="px-6 py-6 flex justify-center">
                    <Link to="/atualizarusuario">
                        <button
                            className="px-8 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                            style={{
                                backgroundColor: "#C4849A",
                                color: "#13101E",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                        >
                            Editar Perfil
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Perfil