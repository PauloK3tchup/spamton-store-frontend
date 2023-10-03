import api from '../plugins/api'
export default class FabricantesApi {
  async buscarFabricante() {
    const { data } = await api.get('/fabricantes/')
    return data
  }
  async adicionarFabricante(fabricante) {
    const { data } = await api.post('/fabricantes/', fabricante)
    return data
  }
  async atualizarFabricante(fabricante) {
    const { data } = await api.put(`/fabricantes/${fabricante.id}/`, fabricante)
    return data
  }
  async excluirFabricante(id) {
    const { data } = await api.delete(`/fabricantes/${id}/`)
    return data
  }
}
