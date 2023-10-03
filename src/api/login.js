import api from '../plugins/api'

export default class LoginApi {
  async Login(user) {
    const { data } = await api.post('/token/', user)
    return data
  }
}
