<script>
import testeApi from "../api/teste"
import { useCounterStore } from "../stores/counter";
import { mapStores, mapActions, mapState } from "pinia";


export default {
  data() {
    return {
      produtos: testeApi.produtos
    }
  },
  computed: {
    ...mapStores(useCounterStore),
    ...mapState(useCounterStore, ["prodId", "prodSelec"]),
  },
  methods: {
    ...mapActions(useCounterStore, ["pesquisar"]),
  }
}
</script>
<template>
  <div class="caixa">
    <img :src="foto" alt="Sexo" class="fotoProd" />
    <h1 class="precoProd">R${{ preco }}</h1>
    <h3 class="nomeProd">{{ nome }}</h3>
  </div>
</template>
<style scoped></style>