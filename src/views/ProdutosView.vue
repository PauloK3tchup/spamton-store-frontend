<script>
import ProdutoComp from '../components/ProdutoComp.vue'
import testeApi from "../api/teste"

export default {
  components: {
    ProdutoComp
  },
  data() {
    return {
      produtos: testeApi.produtos
    }
  }
}
</script>
<template>
  <main>
    <div class="wrapper">
      <div class="bloco" v-for="produto in produtos" :key="produto.id">
        <ProdutoComp :foto="produto.foto" :nome="produto.nome" :preco="produto.preco" :precoPromo="produto.precoPromo"
          :promo="produto.promo" :id="produto.id" />
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
