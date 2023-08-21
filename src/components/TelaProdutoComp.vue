<script>
import testeApi from '../api/teste'
import { useCounterStore } from '../stores/counter'
import { mapStores, mapActions, mapState } from 'pinia'
import axios from 'axios'

export default {
  data() {
    return {
      produtos: testeApi.produtos,
      produto: {},
      imagens: [],
      imagensSim: []
    }
  },
  computed: {
    ...mapStores(useCounterStore),
    ...mapState(useCounterStore, ['prodId', 'prodSelec'])
  },
  methods: {
    ...mapActions(useCounterStore, ['pesquisar'])
  },
  mounted() {
    axios
      .get('/produtos/' + this.prodSelec)
      .then((response) => {
        this.produto = response.data
        this.imagensSim = this.produto.imagens
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
<template>
  <div class="caixaProd">
    <div class="fotoProduto">
      <div class="wrapper">
        <nav class="lil-nav">
          <a v-for="imagem in imagensSim" :key="imagem.id" :href="'#' + imagem.file">
            <img class="lil-nav__img" :src="imagem.file" :alt="'Foto' + imagem.id" />
          </a>
        </nav>
        <div class="gallery">
          <div class="gallery__img" v-for="imagem in imagensSim" :key="imagem.id" :id="imagem.file">
            <img :src="imagem.file" :alt="'Foto' + imagem.id" />
          </div>
        </div>
      </div>
    </div>
    <div class="textoProduto">
      <h1 v-if="!produto.promo" class="precoProd">R${{ produto.preco }}</h1>
      <p v-if="produto.promo" class="precoAntigo">R${{ produto.preco }}</p>
      <h1 v-if="produto.promo" class="precoPromo">R${{ produto.precoPromo }}</h1>
      <p>{{ produto.descricao }}</p>
      <h3 class="nomeProd">{{ produto.nome }}</h3>
      <h3>{{ prodSelec }}</h3>
      <h3>{{}}</h3>
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
