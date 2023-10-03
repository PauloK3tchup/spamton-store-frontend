import api from '../plugins/api'

export default class ProdutosApi {
  async buscarProdutos() {
    const { data } = await api.get('/produtos/')
    return data
  }
  async adicionarProduto(produto) {
    const { data } = await api.post('/produtos/', produto)
    return data
  }
  async atualizarProduto(produto) {
    const { data } = await api.put(`/produtos/${produto.id}/`, produto)
    return data
  }
  async excluirProduto(id) {
    const { data } = await api.delete(`/produtos/${id}/`)
    return data
  }
  async buscarProduto(id) {
    const { data } = await api.get(`/produtos/${id}/`)
    return data
  }
}
