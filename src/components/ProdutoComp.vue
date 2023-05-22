<script>
import { RouterLink } from 'vue-router'
import { useCounterStore } from "../stores/counter";
import { mapStores, mapActions, mapState } from "pinia";

export default {
  components: {
    RouterLink
  },
  props: {
    nome: String,
    preco: Number,
    foto: String,
    precoPromo: Number,
    promo: Boolean,
    id: Number
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
  <RouterLink to="/produto">
    <div class="caixa">
      <img :src="foto" alt="Sexo" class="fotoProd" />
      <h1 v-if="promo == false" class="precoProd">R${{ preco }}</h1>
      <p v-if="promo == true" class="precoVelho">R${{ preco }}</p>
      <h1 v-if="promo == true" class="precoPromo">R${{ precoPromo }} OFERTA!</h1>
      <h3 class="nomeProd">{{ nome }}</h3>
    </div>
  </RouterLink>
</template>
<style scoped>
.caixa {
  width: 250px;
  height: 300px;
  background-color: #000;
  border-radius: 10px;
  margin: 20px;
  transition: 0.15s;
}

.caixa:hover {
  transform: scale(1.1);
}

.caixa:active {
  transform: scale(0.9);
}

.fotoProd {
  width: 100%;
  height: 200px;
  border-radius: 10px 10px 0 0;
}

.precoProd {
  color: #fff;
  font-size: 20px;
  margin: 10px;
}

.precoPromo {
  color: #00ff22;
  font-size: 20px;
  margin: -5px 10px -5px 10px;
}

.precoVelho {
  color: #ff0000;
  font-size: 12px;
  margin: 5px 5px 0 10px;
  text-decoration: line-through;
}

.nomeProd {
  color: #b4b4b4;
  font-size: 15px;
  margin: 10px;
}

@media only screen and (max-width: 600px) {
  .caixa {
    width: 170px;
    height: 204px;
    margin: 10px 5px 5px 5px;
  }

  .fotoProd {
    width: 100%;
    height: 136px;
    border-radius: 10px 10px 0 0;
  }

  .precoProd {
    font-size: 13px;
    margin: 5px;
  }

  .precoPromo {
    font-size: 13px;
    margin: -5px 5px -5px 5px;
  }

  .precoVelho {
    font-size: 8px;
    margin: 5px;
  }

  .nomeProd {
    font-size: 10px;
    margin: 5px;
  }
}
</style>
