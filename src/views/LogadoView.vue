<script setup>
import ProdutoComp from '../components/ProdutoComp.vue'
</script>
<template>
  <main>
    <div class="wrapper">
      <ProdutoComp />
      <ProdutoComp />
      <ProdutoComp />
      <ProdutoComp />
      <ProdutoComp />
      <ProdutoComp />
      <ProdutoComp />
      <ProdutoComp />
      <ProdutoComp />
      <ProdutoComp />
    </div>
  </main>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
