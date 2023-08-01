<script>
import ProdutoComp from '../components/ProdutoComp.vue'
import testeApi from '../api/teste'
import { useCounterStore } from '../stores/counter'
import { mapStores, mapActions, mapState } from 'pinia'
import axios from 'axios'

export default {
  components: {
    ProdutoComp
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
        .get('/produtos/')
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
