<script>
import testeApi from '../api/teste'
import { useCounterStore } from '../stores/counter'
import { mapStores, mapActions, mapState } from 'pinia'
import axios from 'axios'

export default {
  data() {
    return {
      produtos: testeApi.produtos,
      produto: {}
    }
  },
  computed: {
    ...mapStores(useCounterStore),
    ...mapState(useCounterStore, ['prodId', 'prodSelec'])
  },
  methods: {
    ...mapActions(useCounterStore, ['pesquisar'])
  },
  watch: {
    prodSelec() {
      axios
        .get('/api/v1/produtos-recentes/' + this.prodSelec)
        .then((response) => {
          this.produto = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<template>
  <div class="caixaProd">
    <div class="fotoProduto">
      <!-- <img :src="produto.foto" alt="Sexo" class="fotoProd" /> -->
      <div class="wrapper">
        <nav class="lil-nav">
          <a v-for="foto in produto.fotos" :key="foto" :href="'#' + foto">
            <img class="lil-nav__img" :src="foto" alt="Yosemite" />
          </a>
        </nav>
        <div class="gallery">
          <img
            v-for="foto in produto.fotos"
            :key="foto"
            class="gallery__img"
            :id="foto"
            :src="foto"
            alt="Yosemite"
          />
        </div>
      </div>
    </div>
    <div class="textoProduto">
      <h1 v-if="!produto.promo" class="precoProd">R${{ produto.preco }}</h1>
      <p v-if="produto.promo" class="precoAntigo">R${{ produto.preco }}</p>
      <h1 v-if="produto.promo" class="precoPromo">R${{ produto.precoPromo }}</h1>
      <h3 class="nomeProd">{{ produto.nome }}</h3>
      <h3>{{ prodSelec }}</h3>
      <div class="botaoComprar">
        <h3>Comprar</h3>
      </div>
      <div class="botaoCarrinho">
        <h3>Carrinho</h3>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import '../assets/slideshow.css';

.caixaProd {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.botaoComprar {
  margin-right: 4px;
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: 48%;
  height: 40px;
  text-align: center;
  padding: 5px;
  border-radius: 10px;
  background-color: rgb(255, 0, 0);
  color: white;
  cursor: pointer;
}

.botaoCarrinho {
  margin-left: 4px;
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: 48%;
  height: 40px;
  text-align: center;
  padding: 5px;
  border-radius: 10px;
  background-color: rgb(243, 227, 8);
  color: rgb(0, 0, 0);
  cursor: pointer;
}

.fotoProd {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.fotoProduto {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  margin: 10px 0 10px 10px;
  padding: 10px;
  height: 500px;
  background-color: black;
  display: inline-block;
}
.textoProduto {
  display: flex;
  width: 500px;
  margin: 10px 10px 10px 0;
  padding: 10px;
  height: 500px;
  background-color: rgb(0, 0, 0);
  display: inline-block;
  vertical-align: top;
  color: white;
}
</style>
