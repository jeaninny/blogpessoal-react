import axios from "axios";

// Cria uma nova instância do Axios
const api = axios.create({
    baseURL: "https://blogpessoal-dfwf.onrender.com"
})

// Função para cadastrar usuário
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data)
}

// Função para autenticar usuário
export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data)
}
