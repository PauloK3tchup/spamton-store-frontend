<script>
import ProdutoComp from '../components/ProdutoComp.vue'
import testeApi from '../api/teste'
import { useCounterStore } from '../stores/counter'
import { mapStores, mapActions, mapState } from 'pinia'

export default {
  components: {
    ProdutoComp
  },
  data() {
    return {
      produtos: testeApi.produtos
    }
  },
  computed: {
    ...mapStores(useCounterStore),
    ...mapState(useCounterStore, ['prodId', 'prodSelec'])
  },
  methods: {
    ...mapActions(useCounterStore, ['selecionar'])
  }
}
</script>
<template>
  <main>
    <div class="wrapper">
      <div class="bloco" v-for="produto in produtos" :key="produto.id">
        <ProdutoComp
          :fotos="produto.fotos"
          :nome="produto.nome"
          :preco="produto.preco"
          :precoPromo="produto.precoPromo"
          :promo="produto.promo"
          :id="produto.id"
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
