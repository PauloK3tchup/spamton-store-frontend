<script>
import ProdutoComp from '../components/ProdutoComp.vue'
import { useCounterStore } from '../stores/counter'
import { mapStores, mapActions, mapState } from 'pinia'
import ProdutosApi from '../api/produtos'
const produtosApi = new ProdutosApi()

export default {
  components: {
    ProdutoComp
  },
  data() {
    return {
      ProdutosRecentes: []
    }
  },
  computed: {
    ...mapStores(useCounterStore),
    ...mapState(useCounterStore, ['prodId', 'prodSelec', 'pesquisa'])
  },
  watch: {
    async pesquisa() {
      try {
        const response = await produtosApi.buscarProdutos()
        this.ProdutosRecentes = response.filter((produto) => {
          return produto.nome.toLowerCase().includes(this.pesquisa.toLowerCase())
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['selecionar', 'pesquisar']),

    async getProdutosRecentes() {
      try {
        const response = await produtosApi.buscarProdutos()
        this.ProdutosRecentes = response
      } catch (error) {
        console.log(error)
      }
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
        <ProdutoComp
          :fotos="produto.imagem"
          :thumbnail="produto.thumbnail"
          :nome="produto.nome"
          :preco="produto.preco"
          :precoPromo="produto.precoPromo"
          :promo="produto.promo"
          :id="produto.id"
          :url="produto.get_absolute_url"
          @click="selecionar(produto.id)"
        />
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
