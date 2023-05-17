<script>
export default {
  data() {
    return {
      nome: 'Banana Foda',
      preco: 700,
      foto: 'https://www.infoescola.com/wp-content/uploads/2010/04/banana_600797891.jpg'
    }
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
