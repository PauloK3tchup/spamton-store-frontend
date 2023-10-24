<script>
import UsuarioApi from '../api/userinfo'
const usuarioApi = new UsuarioApi()

export default {
  data() {
    return {
      usuario: {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      },
      password2: ''
    }
  },
  methods: {
    async criarUsuario() {
      try {
        if (this.usuario.password === this.password2) {
          const response = await usuarioApi.adicionarUsuario(this.usuario)
          console.log(response)
          this.$router.push('/login')
        } else {
          alert('As senhas não são iguais')
        }
      } catch (error) {
        console.log(error)
        alert('Verifique os dados e tente novamente')
      }
    }
  }
}
</script>

<template>
  <main>
    <body>
      <div class="center">
        <h1 class="title">Criar Conta</h1>
        <form>
          <div class="txt_field">
            <input v-model="usuario.first_name" type="text" required />
            <span></span>
            <label>Nome</label>
          </div>
          <div class="txt_field">
            <input v-model="usuario.last_name" type="text" required />
            <span></span>
            <label>Sobrenome</label>
          </div>
          <div class="txt_field">
            <input v-model="usuario.email" type="text" required />
            <span></span>
            <label>Email</label>
          </div>
          <div class="txt_field">
            <input v-model="usuario.password" type="password" required />
            <span></span>
            <label>Senha</label>
          </div>
          <div class="txt_field">
            <input v-model="password2" type="password" required />
            <span></span>
            <label>Confirmar Senha</label>
          </div>
          <button type="button" class="btnMandar" @click="criarUsuario">Registrar</button>
          <div class="signup_link">
            Já tem conta? <RouterLink to="/login"> Entre agora!</RouterLink>
          </div>
        </form>
      </div>
    </body>
  </main>
</template>
<style scoped>
@import '../assets/login.css';
</style>
