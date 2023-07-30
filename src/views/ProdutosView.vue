<script>
/* import ProdutoComp from '../components/ProdutoComp.vue' */
import testeApi from '../api/teste'
import { useCounterStore } from '../stores/counter'
import { mapStores, mapActions, mapState } from 'pinia'
import axios from 'axios'

export default {
  components: {
    /* ProdutoComp */
  },
  data() {
    return {
      produtos: testeApi.produtos,
      ProdutosRecentes: []
    }
  },
  computed: {
    ...mapStores(useCounterStore),
    ...mapState(useCounterStore, ['prodId', 'prodSelec'])
  },
  methods: {
    ...mapActions(useCounterStore, ['selecionar']),

    getProdutosRecentes() {
      axios
        .get('/api/v1/produtos-recentes/')
        .then((response) => {
          this.ProdutosRecentes = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.getProdutosRecentes()
  }
}
</script>
<template>
  <main>
    <div class="wrapper">
      <div class="bloco" v-for="produto in ProdutosRecentes" v-bind:key="produto.id">
        <!--  :precoPromo="produto.precoPromo"
          :promo="produto.promo"
          Ainda não adicionados -->
        <figure class="imagemProduto">
          <img v-bind:src="produto.get_thumbnail" />
        </figure>
        <!-- <ProdutoComp
          :id="produto.id"
          :nome="produto.nome"
          :preco="produto.preco"
          @click="selecionar(produto.id)"
        /> -->
        <h3 class="nomeProd">{{ produto.nome }}</h3>
        <h1 class="precoProd">R${{ produto.preco }}</h1>
      </div>
    </div>
  </main>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.bloco {
  display: inline-block;
}
</style>
