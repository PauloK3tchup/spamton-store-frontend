<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faShoppingCart, faSearch)
</script>

<template>
  <body>
    <header>
      <div class="wrapper">
        <nav>
          <div class="logoPesq">
            <div class="flex-container">
              <div class="nomeLogo">
                <img src="./assets/SpamtonOverworld.png" alt="Spamton logo" />
                <h1>Spamton Store</h1>
              </div>
              <div class="pesquisa">
                <input class="pesquisaInput" type="text" placeholder="Pesquisa" />
                <button class="enviar"><FontAwesomeIcon icon="fa-search" /></button>
              </div>
              <button class="carrinho"><FontAwesomeIcon icon="fa-shopping-cart" /></button>
            </div>
          </div>
        </nav>
        <div class="baixo">
          <RouterLink class="lado" to="/">Home</RouterLink>
          <RouterLink class="lado" to="/about">Categorias</RouterLink>
          <RouterLink class="lado" to="/about">Histórico</RouterLink>
          <RouterLink class="lado" to="/about">Contato</RouterLink>
          <RouterLink class="lado" to="/login">Entrar</RouterLink>
          <RouterLink class="lado" to="/cadastro">Criar Conta</RouterLink>
        </div>
      </div>
    </header>
    <RouterView />
  </body>
</template>

<style scoped>
body {
  margin: 0;
}

.lado {
  margin: 0 1rem;
  transition: 0.15s;
}

.pesquisaInput:focus {
  outline: none;
}

.lado:hover {
  transform: scale(1.1);
}

.lado:active {
  transform: scale(0.9);
}

.carrinho {
  padding: 10px;
  border: 1px solid #ffffff;
  background-color: #000000;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  transition: 0.15s;
}

.carrinho:hover {
  border: 1px solid #000000;
  background-color: #ffffff;
  color: #000000;
}

header {
  background-color: #000;
  color: #fff;
  padding: 1rem;
}

.baixo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 5px;
}

.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pesquisa {
  width: 400px;
  transition: 0.15s;
}

.nomeLogo {
  width: 200px;
  margin: 5px;
}

.pesquisa:focus-within {
  width: 600px;
}

img {
  height: auto;
  width: 25px;
  margin: 5px;
  float: left;
}

input {
  padding: 10px;
  border: none;
  width: 80%;
  transition: 0.25s;
}

button.enviar {
  padding: 10px;
  border: none;
  background-color: #fff;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  transition: 0.15s;
}

button.enviar:hover {
  background-color: #000000;
  color: #ffffff;
}

@media only screen and (max-width: 600px) {
  .flex-container {
    flex-direction: column;
    align-items: center;
  }

  .baixo {
    flex-direction: column;
  }

  .pesquisa {
    width: 100%;
    margin-top: 10px;
    align-self: center;
  }

  .carrinho {
    margin-top: 10px;
  }

  .pesquisa:focus-within {
    width: 100%;
  }

  body {
    overflow-x: hidden;
  }
}
</style>
