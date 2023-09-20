import axios from 'axios'
export default class FabricantesApi {
  async buscarFabricante() {
    const { data } = await axios.get('/fabricantes/')
    return data
  }
  async adicionarFabricante(fabricante) {
    const { data } = await axios.post('/fabricantes/', fabricante)
    return data
  }
  async atualizarFabricante(fabricante) {
    const { data } = await axios.put(`/fabricantes/${fabricante.id}/`, fabricante)
    return data
  }
  async excluirFabricante(id) {
    const { data } = await axios.delete(`/fabricantes/${id}/`)
    return data
  }
}
