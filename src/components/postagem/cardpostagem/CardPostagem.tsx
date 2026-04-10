import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem'

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
    return (
        <div className="flex flex-col rounded-xl overflow-hidden"
            style={{
                backgroundColor: "#1C1830",
                border: "0.5px solid rgba(255,255,255,0.07)"
            }}>
                
            <div className="flex flex-col flex-1">
                <div className="flex w-full py-3 px-4 items-center gap-3"
                    style={{ borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}>
                    <img
                        src={postagem.usuario?.foto}
                        className="w-14 h-14 rounded-full object-cover"
                        alt={postagem.usuario?.nome}
                        style={{ border: "2px solid #C4849A" }}
                    />
                    <h3 className="text-sm font-medium"
                        style={{ color: "#B8C0CC" }}>
                        {postagem.usuario?.nome}
                    </h3>
                </div>
                <div className="p-4 flex flex-col gap-3 flex-1">
                    <div className="flex flex-col gap-1">
                        <h4 className="text-base font-semibold"
                            style={{ color: "#E8EAF0" }}>
                            {postagem.titulo}
                        </h4>
                        <p className="text-xs" style={{ color: "#6B7280" }}>
                            {new Intl.DateTimeFormat("pt-BR", {
                                dateStyle: 'short',
                                timeStyle: 'short',
                            }).format(new Date(postagem.data))}
                        </p>
                    </div>
                    <p className="text-sm leading-relaxed flex-1"
                        style={{ color: "#B8C0CC" }}>
                        {postagem.texto}
                    </p>
                    <div className="mt-auto pt-2"
                        style={{ borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
                        <span className="text-xs font-medium px-2 py-1 rounded-full"
                            style={{
                                backgroundColor: "rgba(196,132,154,0.12)",
                                color: "#C4849A",
                                border: "0.5px solid rgba(196,132,154,0.25)",
                                maxWidth: "65%",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                display: "inline-block"
                            }}>
                            # {postagem.tema?.descricao}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex"
                style={{ borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
                <Link to={`/editarpostagem/${postagem.id}`}
                    className="w-full flex items-center justify-center py-2 text-xs font-medium transition-all duration-200"
                    style={{ color: "#C4849A", backgroundColor: "rgba(196,132,154,0.05)" }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(196,132,154,0.12)")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(196,132,154,0.05)")}>
                    Editar
                </Link>
                <Link to={`/deletarpostagem/${postagem.id}`}
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

export default CardPostagem