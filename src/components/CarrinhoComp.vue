<script>
import ComprasApi from '../api/compras'
const comprasApi = new ComprasApi()

export default {
  data() {
    return {
      token_email: localStorage.getItem('email'),
      itens: [],
      id_atual: ''
    }
  },
  methods: {
    async carrinho() {
      const response = await comprasApi.buscarCompras()
      console.log(response)
      const bruh = response.filter((item) => {
        return item.usuario == this.token_email
      })
      this.itens = bruh.filter((item) => {
        return item.status == 'Carrinho'
      })
    },
    async remover() {
      await comprasApi.excluirCompra(this.id_atual)
      this.carrinho()
    }
  },
  mounted() {
    this.carrinho()
  },
  watch: {
    id_atual() {
      this.remover()
    }
  }
}
</script>

<template>
  <div class="caixa" v-for="compra in itens" :key="compra.id">
    <div class="caixaDentro" v-for="item in compra.itens" :key="item.id">
      <img class="foto" :src="item.produto.thumbnail.file" alt="Imagem" />
      <h2 class="nomeProd">{{ item.produto.nome }}</h2>
      <div class="status">
        <p>
          Status: <span class="negrito">{{ compra.status }}</span>
        </p>
      </div>
      <button @click="this.id_atual = compra.id" class="btnRemover">Remover</button>
    </div>
  </div>
</template>

<style>
.negrito {
  font-weight: bold;
}

.caixaDentro {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 20px;
  border: 1px solid black;
  border-radius: 10px;
  width: fit-content;
  max-width: 90%;
  background-color: black;
}

.foto {
  width: 150px;
  height: 150px;
  margin: 10px;
}

.nomeProd {
  margin: 10px;
  color: white;
}

.status {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 20px;
  border: 1px solid black;
  border-radius: 10px;
  width: fit-content;
  background-color: rgb(46, 46, 46);
}

.btnRemover {
  color: white;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 20px;
  border: 1px solid rgb(255, 0, 0);
  border-radius: 10px;
  width: fit-content;
  background-color: rgb(255, 0, 0);
  transition: 0.15s;
  cursor: pointer;
}

.btnRemover:hover {
  transform: scale(1.1);
}

.btnRemover:active {
  transform: scale(0.9);
}

.status p {
  color: white;
}
</style>
