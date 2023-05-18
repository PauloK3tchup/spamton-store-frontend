<template>
  <main>
    <body>
      <div class="center">
        <h1 class="title">Criar Conta</h1>
        <form method="post">
          <div class="txt_field">
            <input type="text" required />
            <span></span>
            <label>Nome de usuário</label>
          </div>
          <div class="txt_field">
            <input type="text" required />
            <span></span>
            <label>Email</label>
          </div>
          <div class="txt_field">
            <input type="password" required />
            <span></span>
            <label>Senha</label>
          </div>
          <div class="txt_field">
            <input type="password" required />
            <span></span>
            <label>Confirmar Senha</label>
          </div>
          <input type="submit" value="Registrar" />
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
