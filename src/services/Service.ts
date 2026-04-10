import axios from "axios";

// Cria uma nova instância do Axios
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// Função para Cadastrar Usuário
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
}

// Função para Autenticar Usuário
export const login = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
}

// Função para Consultar com token
export const buscar = async (url: string, setDados: Function, header: Object) => {
  const resposta = await api.get(url, header);
  setDados(resposta.data);
}

// Função para Cadastrar com token
export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
}

// Função para Atualizar com token
export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
}

// Função para Deletar com token
export const deletar = async (url: string, header: Object) => {
  await api.delete(url, header);
}
