<script>
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useCounterStore } from '../stores/counter'
import { mapStores, mapActions, mapState } from 'pinia'

export default {
  components: {
    RouterLink,
    FontAwesomeIcon
  },
  data() {
    return {
      pesquisaValue: ''
    }
  },
  computed: {
    ...mapStores(useCounterStore),
    ...mapState(useCounterStore, ['pesquisa'])
  },
  methods: {
    ...mapActions(useCounterStore, ['pesquisar'])
  }
}
</script>

<template>
  <div class="wrapper">
    <nav>
      <div class="logoPesq">
        <div class="flex-container">
          <div class="nomeLogo">
            <RouterLink to="/">
              <img src="../assets/SpamtonOverworld.png" alt="Spamton logo" />
              <h1 style="color: white">Spamton Store</h1>
            </RouterLink>
          </div>
          <div class="pesquisa">
            <input
              class="pesquisaInput"
              v-model="pesquisaValue"
              type="text"
              placeholder="Pesquisa"
              @keydown.enter="pesquisar(pesquisaValue)"
            />
            <button @click="pesquisar(pesquisaValue)" class="enviar">
              <FontAwesomeIcon icon="fa-search" />
            </button>
          </div>
          <button @click="this.$router.push('/carrinho')" class="carrinho">
            <FontAwesomeIcon icon="fa-shopping-cart" />
          </button>
        </div>
      </div>
    </nav>
    <div class="drop">
      <h3 class="bruh">
        <FontAwesomeIcon icon="fa-bars" />
      </h3>
      <div class="baixo">
        <RouterLink class="lado" to="/tabela">Tabela</RouterLink>
        <RouterLink class="lado" to="/cadastrar">Cadastro</RouterLink>
        <RouterLink class="lado" to="/registro">Registro</RouterLink>
        <RouterLink class="lado" to="/login">Conta</RouterLink>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  background-color: #000000;
  color: #ffffff;
  padding: 15px;
}
.lado {
  margin: 0 1rem;
  transition: 0.15s;
}

.bruh {
  display: none;
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
  transition: 0.15s;
}

.nomeLogo:hover {
  transform: scale(1.1);
}

.nomeLogo:active {
  transform: scale(0.9);
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

  .drop:hover .baixo {
    display: flex;
    flex-direction: column;
  }

  .bruh {
    flex-direction: column;
    display: block;
  }

  .baixo {
    transition: 0.15s;
    flex-direction: column;
    display: none;
    align-items: flex-start;
  }

  .drop {
    display: block;
    transition: 0.15s;
  }

  .pesquisa {
    width: 100%;
    margin: 10px 0 0 12%;
    justify-content: center;
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
