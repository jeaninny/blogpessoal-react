import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import type Postagem from "../../models/Postagem"
import { buscar } from "../../services/Service"
import { ToastAlerta } from "../../utils/ToastAlerta"
import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagens"

function Postagens() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagens, setPostagens] = useState<Postagem[]>([])

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', "info")
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarPostagens()
    }, [postagens.length])

    async function buscarPostagens() {
        try {
            setIsLoading(true)
            await buscar('/postagens', setPostagens, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        } finally {
            setIsLoading(false)
        }
    }

    return <ListaPostagens postagens={postagens} isLoading={isLoading} />
}

export default Postagens