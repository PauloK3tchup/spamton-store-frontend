<script setup>
import axios from 'axios'
import { ref } from 'vue'

const user = ref({
  email: '',
  password: ''
})

const logar = async () => {
  const { data } = await axios.post('/token/', user.value)
  if (data) {
    localStorage.setItem('token', data.access)
    console.log(data)
  }
}
</script>

<template>
  <main>
    <body>
      <div class="center">
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
          <input @click="logar" type="submit" value="Login" />
          <div class="signup_link">
            Não tem conta? <RouterLink to="/cadastro"> Crie uma!</RouterLink>
          </div>
        </form>
      </div>
    </body>
  </main>
</template>
<style scoped>
@import '../assets/login.css';
</style>
