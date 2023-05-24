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
  created() {
    this.produto = this.produtos.find((produto) => produto.id == this.prodSelec)
  }
}
</script>
<template>
  <div class="caixa">
    <img :src="produto.foto" alt="Sexo" class="fotoProd" />
    <h1 class="precoProd">R${{ produto.preco }}</h1>
    <h3 class="nomeProd">{{ produto.nome }}</h3>
    <h3>{{ prodSelec }}</h3>
  </div>
</template>
<style scoped></style>
