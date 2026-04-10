import { SyncLoader } from "react-spinners";
import type Postagem from "../../../models/Postagem";
import CardPostagem from "../cardpostagem/CardPostagem";
import { useState } from "react";


interface ListaPostagemProps {
    postagens: Postagem[]
    isLoading: boolean
}

function ListaPostagens({ postagens, isLoading }: ListaPostagemProps) {

    const POSTAGENS_POR_PAGINA = 6

    const [paginaAtual, setPaginaAtual] = useState<number>(0)

    const totalPaginas = Math.ceil(postagens.length / POSTAGENS_POR_PAGINA)

    const postagensDaPagina = postagens.slice(
        paginaAtual * POSTAGENS_POR_PAGINA,
        paginaAtual * POSTAGENS_POR_PAGINA + POSTAGENS_POR_PAGINA
    )

    return (
        <>

            {isLoading && (
                <div className="flex justify-center w-full py-8 flex-1"
                    style={{ backgroundColor: "#13101E", minHeight: "100%" }}>
                    <SyncLoader color="#C4849A" size={12} />
                </div>
            )}

            <div className="flex justify-center w-full py-8"
                style={{ backgroundColor: "#13101E" }}>
                <div className="container flex flex-col">

                    {(!isLoading && postagens.length === 0) && (
                        <span className="text-3xl text-center my-8"
                            style={{ color: "#E8EAF0" }}>
                            Nenhuma postagem encontrada!
                        </span>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 
                lg:grid-cols-3 gap-8 items-stretch">
                        {postagensDaPagina.map((postagem) => (
                            <CardPostagem key={postagem.id} postagem={postagem} />
                        ))}
                    </div>

                    {totalPaginas > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-8">
                            <button
                                onClick={() => setPaginaAtual(p => p - 1)}
                                disabled={paginaAtual === 0}
                                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                                style={{
                                    backgroundColor: paginaAtual === 0 ? "rgba(196,132,154,0.2)" : "#C4849A",
                                    color: paginaAtual === 0 ? "#6B7280" : "#13101E",
                                    cursor: paginaAtual === 0 ? "not-allowed" : "pointer"
                                }}>
                                Anterior
                            </button>

                            <span className="text-sm" style={{ color: "#6B7280" }}>
                                {paginaAtual + 1} de {totalPaginas}
                            </span>

                            <button
                                onClick={() => setPaginaAtual(p => p + 1)}
                                disabled={paginaAtual === totalPaginas - 1}
                                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                                style={{
                                    backgroundColor: paginaAtual === totalPaginas - 1 ? "rgba(196,132,154,0.2)" : "#C4849A",
                                    color: paginaAtual === totalPaginas - 1 ? "#6B7280" : "#13101E",
                                    cursor: paginaAtual === totalPaginas - 1 ? "not-allowed" : "pointer"
                                }}>
                                Próxima
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default ListaPostagens;