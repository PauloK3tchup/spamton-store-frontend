<script>
import testeApi from '../api/teste'
import { useCounterStore } from '../stores/counter'
import { mapStores, mapActions, mapState } from 'pinia'

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
      this.produto = this.produtos.find((produto) => produto.id == this.prodSelec)
    }
  },
  created() {
    this.produto = this.produtos.find((produto) => produto.id == this.prodSelec)
  }
}
</script>
<template>
  <div class="caixaProd">
    <div class="fotoProduto">
      <img :src="produto.foto" alt="Sexo" class="fotoProd" />
    </div>
    <div class="textoProduto">
      <h1 v-if="!produto.promo" class="precoProd">R${{ produto.preco }}</h1>
      <p v-if="produto.promo" class="precoAntigo">R${{ produto.preco }}</p>
      <h1 v-if="produto.promo" class="precoPromo">R${{ produto.precoPromo }}</h1>
      <h3 class="nomeProd">{{ produto.nome }}</h3>
      <h3>{{ prodSelec }}</h3>
    </div>
  </div>
</template>
<style scoped>
.caixaProd {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
