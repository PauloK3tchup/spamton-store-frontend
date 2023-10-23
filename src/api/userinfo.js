import api from '../plugins/api'

export default class UsuarioApi {
  async buscarUsuario(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (e) {
      return null
    }
  }
  async buscarUsuarioPorId(id) {
    const { data } = await api.get('/api/usuarios/' + id)
    return data
  }
  async adicionarUsuario(usuario) {
    const { data } = await api.post('/api/usuarios/', usuario)
    return data
  }
}
