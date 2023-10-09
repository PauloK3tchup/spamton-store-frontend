<script>
import LoginApi from '../api/login'
import UsuarioApi from '../api/userinfo'
import { reactive } from 'vue'
const loginApi = new LoginApi()
const usuarioApi = new UsuarioApi()

export default {
  data() {
    return {
      user: reactive({
        email: '',
        password: ''
      }),
      erro: '',
      token: localStorage.getItem('token'),
      info: ''
    }
  },
  methods: {
    async logar() {
      try {
        const response = await loginApi.Login(this.user)
        localStorage.setItem('token', response.access)
        console.log(response.access)
        this.user = reactive({
          email: '',
          password: ''
        })
        this.erro = ''
        this.token = localStorage.getItem('token')
        window.location.reload()
      } catch (error) {
        console.log(error)
        this.erro = 'Email ou senha incorretos'
      }
    },
    deslogar() {
      localStorage.removeItem('token')
      this.token = ''
      window.location.reload()
    },
    async buscarUsuario() {
      try {
        const response = await usuarioApi.buscarUsuario(this.token)
        console.log(response)
        this.info = await usuarioApi.buscarUsuarioPorId(response.user_id)
        console.log(this.info)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    if (this.token) {
      this.buscarUsuario()
    }
  }
}
</script>

<template>
  <main>
    <body>
      <div v-if="!token" class="center">
        <h1 class="title">Login</h1>
        <form method="">
          <div class="txt_field">
            <input v-model="user.email" type="email" required />
            <span></span>
            <label>Email</label>
          </div>
          <div class="txt_field">
            <input v-model="user.password" type="password" required />
            <span></span>
            <label>Senha</label>
          </div>
          <div
            onclick="window.open('https://thumbs.dreamstime.com/b/excited-african-guy-pointing-finger-camera-laughing-yellow-background-i-choose-you-american-shouting-excitement-220600621.jpg')"
            class="pass"
          >
            Esqueceu sua senha?
          </div>
          <button @click="logar" type="button" class="btn-logar">Entrar</button>
          <p class="textoErro">{{ erro }}</p>
          <div class="signup_link">
            Não tem conta? <RouterLink to="/cadastro"> Crie uma!</RouterLink>
          </div>
        </form>
      </div>
      <div v-else class="center">
        <div class="txt_field" v-if="token">
          <div class="infos">
            <img
              class="foto_perfil"
              v-if="info.imagem_perfil"
              :src="info.imagem_perfil"
              alt="Imagem de Perfil"
            />
            <img
              class="foto_perfil"
              v-else
              src="../assets/default-avatar-icon.jpg"
              alt="Imagem de Perfil"
            />
            <h1>{{ info.first_name }} {{ info.last_name }}</h1>
            <h3 class="ciminha"><span class="negrito">Email: </span>{{ info.email }}</h3>
            <h3><span class="negrito">CPF: </span>{{ info.cpf }}</h3>
            <h3><span class="negrito">Telefone: </span>{{ info.telefone }}</h3>
            <button @click="deslogar" type="button" class="btn-logar ciminha">Sair</button>
          </div>
        </div>
      </div>
    </body>
  </main>
</template>
<style scoped>
@import '../assets/login.css';

.foto_perfil {
  width: 120px;
  height: 120px;
  border-radius: 240px;
  object-fit: cover;
}

.ciminha {
  margin-top: 20px;
}

.baixinho {
  margin-bottom: 20px;
}

.infos {
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.negrito {
  font-weight: bold;
}
</style>
