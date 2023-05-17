<script>
import ProdutoComp from '../components/ProdutoComp.vue'

export default {
  components: {
    ProdutoComp
  },
  data() {
    return {
      produtos: [
        {
          nome: 'Banana muito foda',
          preco: 700,
          foto: 'https://www.infoescola.com/wp-content/uploads/2010/04/banana_600797891.jpg',
          id: 1
        },
        {
          nome: 'Among us',
          preco: 90,
          foto: 'https://cdn1.epicgames.com/salesEvent/salesEvent/amoguslandscape_2560x1440-3fac17e8bb45d81ec9b2c24655758075',
          id: 1
        }
      ]
    }
  }
}
</script>
<template>
  <main>
    <div class="wrapper">
      <div class="bloco" v-for="produto in produtos" :key="produto.id">
        <ProdutoComp :foto="produto.foto" :nome="produto.nome" :preco="produto.preco" />
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
