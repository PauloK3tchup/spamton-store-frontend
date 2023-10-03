<script>
import LoginApi from '../api/login'
import { reactive } from 'vue'
const loginApi = new LoginApi()

export default {
  data() {
    return {
      user: reactive({
        email: '',
        password: ''
      }),
      erro: '',
      token: localStorage.getItem('token')
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
      } catch (error) {
        console.log(error)
        this.erro = 'Email ou senha incorretos'
      }
    },
    deslogar() {
      localStorage.removeItem('token')
      this.token = ''
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
          <button @click="logar" type="button" class="btn-logar">Login</button>
          <p class="textoErro">{{ erro }}</p>
          <div class="signup_link">
            Não tem conta? <RouterLink to="/cadastro"> Crie uma!</RouterLink>
          </div>
        </form>
      </div>
      <button v-else @click="deslogar" type="button" class="btn-logar">Deslogin</button>
    </body>
  </main>
</template>
<style scoped>
@import '../assets/login.css';
</style>
