import { Link } from 'react-router-dom'
import type Tema from '../../../models/Tema'

interface CardTemaProps {
    tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
    return (
        <div className="flex flex-col rounded-xl overflow-hidden justify-between"
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
                <Link to={`/editartema/${tema.id}`}
                    className="w-full flex items-center justify-center py-2 text-xs font-medium transition-all duration-200"
                    style={{ color: "#C4849A", backgroundColor: "rgba(196,132,154,0.05)" }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(196,132,154,0.12)")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(196,132,154,0.05)")}>
                    Editar
                </Link>
                <Link to={`/deletartema/${tema.id}`}
                    className="w-full flex items-center justify-center py-2 text-xs font-medium transition-all duration-200"
                    style={{
                        color: "#E07070",
                        backgroundColor: "rgba(224,112,112,0.05)",
                        borderLeft: "0.5px solid rgba(255,255,255,0.05)"
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(224,112,112,0.12)")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(224,112,112,0.05)")}>
                    Deletar
                </Link>
            </div>
        </div>
    )
}

export default CardTema